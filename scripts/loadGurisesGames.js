
const axios = require('axios');
const _teams = require('./teams.js');
const _events = require('./events.js');
const _status = require('./status.js');

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const _sponsors = [
    {
        name:"Yo",
        teams: [1,8,11,18,23]
    },
    {
        name:"Alex",
        teams: [2,10,13,16,21]
    },
    {
        name:"Esti",
        teams: [3,7,15,20,22]
    },
    {
        name:"Pancho",
        teams: [4,6,14,17,25]
    },
    {
        name:"Pesca",
        teams: [5,9,12,19,24]
    }
]

const load = async () => {
        const response = await axios.post('http://localhost:3000/auth', {
            username: 'admin',
            password: 'ares'
        })
        const sponsors = await loadSponsors(response.data.token);
        await loadTeams(response.data.token, sponsors);
        await loadEvents(response.data.token);
       
    }

const loadSponsors = async (token) => {
    const sponsors = [];
    for(let sponsor of _sponsors){
        try{
            const resp = await axios.post('http://localhost:3000/sponsors', {name: sponsor.name}, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(`Sponsor ${sponsor.name} created`);
            sponsors.push({
                ...sponsor,
                id: resp.data.sponsor.id
            });
        }
        catch(err){
            console.log('Error creating sponsor');
        }
    }
    return sponsors;
}

const loadTeams = async (token, sponsors) => {
    const teams = [];
    for(let player of _teams){
       const team = teams.find(team => team.name === player.team)
       await downloadImage(player.img, player.id);
        if(team){
            team.players.push({
                name: player.name,
            })
       }else{
            teams.push({
            name: player.team,
            sponsor: sponsors.find(sponsor => sponsor.teams.includes(player.teamId)).id,
            players: [{
                    name: player.name
                }]
            })
       }
    }
    for(let team of teams){
        try{
            const resp = await axios.post('http://localhost:3000/teams', team, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(`Team ${team.name} created`);
        }
        catch(err){
            console.log('Error creating team', err);
        }
    }

    const teamsResp = await axios.get('http://localhost:3000/teams', {
        headers: {
            Authorization: `${token}`
        }
    });

    for(let player of _teams){
        const team = teamsResp.data.find(team => team.name === player.team);
        let newId = (team.players.find(p => p.name === player.name)).id;
        try{
            // form data
            const formData = new FormData();
            formData.append('image', fs.createReadStream(path.join(__dirname, `./images/${player.id}.png`)));
            const resp = await axios.put(`http://localhost:3000/players/image/${newId}`, formData, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(`Player ${player.name} image updated`);
        }
        catch(err){
            console.log('Error updating player image', err);
        }
    }

}

const downloadImage = async (url, id) => {
    if(fs.readdirSync(path.join(__dirname, './images')).some(file => file.split('.')[0] === id.toString())){
        return;
    }
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const download_image = (url, image_path) =>
    axios({
      url,
      responseType: 'stream',
    }).then(
      response =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(image_path))
            .on('finish', () => resolve())
            .on('error', e => reject(e));
        }),
    );
  
    await download_image(url, path.join(__dirname, `./images/${id}.png`));
}


const loadEvents = async (token) => {
    const statuses = [];
    for(let status of _status){
        try{
            const resp = await axios.post('http://localhost:3000/statuses', status, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(`Status ${status.name} created`);
            statuses.push({
                ...status,
                id: resp.data.id
            });
        }
        catch(err){
            console.log('Error creating status', err);
        }
    }



    for(let event of _events){
        const eventBody = {
            attacker_count: event.atk,
            victim_count: event.def,
            direct_damage: event.dmgAV,
            reflected_damage: event.dmgVA,
            description: event.desc,
            victim_status: statuses.find(status => status.name === event.statusV)?.id || "1",
            status_odds: event.statusPercent || 100,
            event_type: "none"
        }
        try{
            const resp = await axios.post('http://localhost:3000/events', eventBody, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(`Event ${event.desc} created`);
        }
        catch(err){
            console.log('Error creating event', err);
        }

    }

}

load();
