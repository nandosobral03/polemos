const axios = require("axios");

const runGames = async () => {
    const token = await login();
    const timeTaken = [];
    console.log("Token", token);
    for(let i = 0; i< 10000; i++){
        try {
            const start = Date.now();
            const resp = await axios.post("http://localhost:3000/game",{}, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            const end = Date.now();
            timeTaken.push(end - start);
            console.log(`Time taken for game ${i+1}: ${end - start}ms`);
        } catch (err) {
            console.log("Error creating game", err);
        }
    }
    console.log("Average time taken: ", timeTaken.reduce((a,b) => a+b)/timeTaken.length);
}

const login = async () => {
    const resp = await axios.post("http://localhost:3000/auth", {
        username: "guest",
        password: "guest",
    });
    return resp.data.token;
}

runGames();