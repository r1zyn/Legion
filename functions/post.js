const axios = require('axios');
const { authorization, id } = require('../config');

module.exports = {
    async post(client) {
        try {
            await axios.default.post(`https://api.discordbots.co/v1/public/bot/${id}/stats`, {
                "serverCount": client.guilds.cache.size,
                "shardCount": 0
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authorization
                }
            })
                .then(resp => {
                    console.log(resp.data);
                })
                .catch(err => {
                    return console.error(`{ error: true, response: '${err.response.data.response || "The API may be down as the web server did not give back an proper response."}' }`)
                })
        } catch (err) {
            return console.error(`${err.stack}`)
        }
    }
}