const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");


let token = null;
const _events = require("./guest_events.js");  
const _statuses = [];
const _sponsors = [];
const _teams = [];
const _players = [];
const load = async () => {
  dotenv.config();
  await deleteUser();
  await createUser();
  token = await login();
  await loadSponsors();
  await loadStatuses();
  await loadTeams();
  await loadPlayers();
    await loadEvents();
};

const deleteUser = async () => {
  try {
    const resp = await axios.delete("http://localhost:3000/users/guest", {
      headers: {
        Authorization: `${process.env.ADMIN_KEY}`,
      },
    });
    console.log("User deleted");
  } catch (err) {
    console.log("Error deleting user", err);
  }
};

const createUser = async () => {
  try {
    const resp = await axios.post(
      "http://localhost:3000/users",
      {
        username: "guest",
        password: "guest",
      },
      {
        headers: {
          Authorization: `${process.env.ADMIN_KEY}`,
        },
      }
    );
    console.log("User created");
  } catch (err) {
    console.log("Error creating user");
  }
};

const login = async () => {
  try {
    const resp = await axios.post("http://localhost:3000/auth", {
      username: "guest",
      password: "guest",
    });
    console.log("Logged in");

    return resp.data.token;
  } catch (err) {
    console.log("Error logging in");
  }
};

const loadSponsors = async () => {
  const sponsors = [
    { name: "Sponsor 1" },
    { name: "Sponsor 2" },
    { name: "Sponsor 3" },
    { name: "Sponsor 4" },
  ];
  const token = await login();
  for (let sponsor of sponsors) {
    try {
      const resp = await axios.post(
        "http://localhost:3000/sponsors",
        { name: sponsor.name },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      _sponsors.push({
        ...sponsor,
        id: resp.data.sponsor.id,
      });
      console.log(`Sponsor ${sponsor.name} created`);
    } catch (err) {
      console.log("Error creating sponsor");
    }
  }
};

const loadStatuses = async () => {
  const statuses = [
    {
      color: "#E9AC50",
      name: "Inspired",
      health_increase: 2,
      damage_reduction: 1,
    },
    {
      color: "#FF3B3F",
      name: "Wounded",
      health_increase: 0.5,
      damage_reduction: 2,
    },
  ];

  for (let status of statuses) {
    try {
      const resp = await axios.post("http://localhost:3000/statuses", status, {
        headers: {
          Authorization: `${token}`,
        },
      });
        _statuses.push({
            ...status,
            id: resp.data.id,
        });


      console.log(`Status ${status.name} created`);
    } catch (err) {
      console.log("Error creating status",err);
    }
  }
};

const loadTeams = async () => {
  for (let i = 1; i <= 12; i++) {
    try {
      const resp = await axios.post(
        "http://localhost:3000/teams",
        {
          name: `District ${i}`,
          // first 4 teams sponsored by sponsor 1, next 4 by sponsor 2, etc
          sponsor: _sponsors[Math.floor((i - 1) / 4)].id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      _teams.push(resp.data.team.id);
      console.log(`Team ${i} created`);
    } catch (err) {
      console.log("Error creating team");
    }
  }
};

const loadPlayers = async () => {
  const players = [
    "Marvel",
    "Glimmer",
    "Cato",
    "Clove",
    "Craig",
    "Martine",
    "Stefano",
    "Lene",
    "Ragnar",
    "Foxface",
    "Jason",
    "Johanna",
    "Tihomir",
    "Khava",
    "Logan",
    "Mandy",
    "Eric",
    "Jennifer",
    "Mathew",
    "Lucy",
    "Rue",
    "Thresh",
    "Peeta",
    "Katniss",
  ];
  for (let i = 1; i <= 24; i++) {
    const player = players[i - 1];
    try {
      const resp = await axios.post(
        "http://localhost:3000/players",
        {
          name: player,
          team_id: _teams[Math.floor((i - 1) / 2)],
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      _players.push({ name: player, id: resp.data.player.id });
      console.log(`Player ${player} created`);
    } catch (err) {
      console.log(`Error creating ${player}`);
    }
  }
  for (let i = 1; i <= 24; i++) {
    const player = _players[i - 1];
    try {
      const formData = new FormData();
      formData.append(
        "image",
        fs.createReadStream(path.join(__dirname, `./guest_images/${i}.png`))
      );
      const resp = await axios.put(
        `http://localhost:3000/players/image/${player.id}`,
        formData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(`Image for ${player.name} uploaded`);
    } catch (err) {
      console.log(`Error uploading image for ${player.name}`, err);
    }
  }
};

const loadEvents = async () => {
    for(let event of _events){
        const body = {
            ...event,
            victim_status: event.victim_status == '#N/A' ? '1' : _statuses.find(status =>status.name ==  event.victim_status).id,
            status_odds: event.status_odds == 'FALSE' ? 100 : event.status_odds,
            event_type: "Events"
        }
        try{
            const resp = await axios.post("http://localhost:3000/events", body, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(`Event ${event.description} created`)
        } catch(err){
            console.log(`Error creating ${event.description}`,err)
        }
    }

}


load();
