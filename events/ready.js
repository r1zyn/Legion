"use-strict"

const { version, prefix } = require('../config');
const { statcord } = require('../index');
const antispam = require('../handlers/antispam');
const { post } = require('../functions/post');

module.exports = async (client) => {
    client.user.setPresence({
        status: "idle",
        activity: {
            name: `${client.guilds.cache.size} servers | ${prefix}help`,
            type: "WATCHING"
        }
    });

    statcord.autopost();

    statcord.on("post", status => {
        if (!status) console.log("[ Statcord ] Successful post");
        else console.error(`[ Statcord ] ${status}`);
    });

    statcord.on("autopost-start", () => {
        console.log("[ Statcord ] Started autopost");
    });

    antispam(client, {
        limitUntilWarn: 3,
        limitUntilMuted: 5,
        interval: 2000,
        warningMessage: "",
        muteMessage: "",
        maxDuplicatesWarning: 7,
        maxDuplicatesMute: 14,
        ignoredRoles: [],
        ignoredMembers: ["Archreus#4200", "Crown Tech#2586", "Mystic#1134", "lucaslah#9297"],
        mutedRole: "Muted",
        timeMuted: 1000 * 600,
        logChannel: "bot-alerts"
    });

    //setInterval(() => {
    post(client);
    //}, 300000)


    return console.log(`[ ${client.user.username} Client ] Connected to ${client.user.tag} | Version ${version}`);
};
