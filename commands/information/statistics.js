const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


module.exports.run = async (client, message, args) => {
    try {
        const stats = await fetch(`https://api.statcord.com/v3/${client.user.id}`).then(response => response.json());
        const recent = stats.data[0];

        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString();
            const min = Math.floor((ms / (1000 * 60)) % 60).toString();
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();

            return `${days.padStart(1, '0')}d, ${hrs.padStart(2, '0')}h, ${min.padStart(2, '0')}m, ${sec.padStart(2, '0')}s`
        };

        const start = process.hrtime();
        client.db;
        const difference = process.hrtime(start);

        const embed = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`${client.user.username} - Realtime Statistics | Brought to you by Statcord`, client.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`This is where all the current statistics for **${client.user.username}** are displayed. You can view information such as commands run, bandwith, CPU load e.t.c. Powered by [**Statcord.**](https://statcord.com/bot/794411847117832202)`)
            .addField(`<:file:795827719714635796> General Statistics `, `\`\`\`md\n> Total Servers: ${recent.servers}\n> Total Users: ${recent.users}\n> Active Users: ${recent.active}\n> Commands Run Today: ${recent.commands}\n> Popular Commands: ${recent.popular[0].name}, ${recent.popular[1].name}, ${recent.popular[2].name}\`\`\``)
            .addField(`<:globe:795827719707033621> Network Information`, `\`\`\`md\n> Memory Active: ${recent.memactive / 1000000} MB\n> Memory Load: ${recent.memload}%\n> Bandwidth: ${recent.bandwidth / 1000000} MB\n> CPU Load: ${recent.cpuload}%\n> Bot Uptime: ${duration(client.uptime)}\n> Process Uptime: ${duration(process.uptime())}\n> Database Ping: ${Math.round(difference[1] / 1e3)}ms\`\`\``)
            .addField(`<:config_white_icon:796178894927298611> System Information`, `\`\`\`md\n> OS: Microsoft Windows 10 Home (x64-based PC)\n> Process Platform: ${process.platform}\n> Version: 10.0.18363 Build 18363\n> Processor: Intel(R) Celeron(R) N4000 CPU @ 1.10GHz, 1101 Mhz, 2 Core(s), 2 Logical Processor(s)\`\`\``);

        const loading = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`<a:discord_loading:796184140378144808> **Fetching recent data and statistics, please wait.**`);

        await message.channel.send(loading)
            .then(loading => {
                setTimeout(function () {
                    loading.delete();
                    return message.channel.send(embed);
                }, 4000)
            })       
    } catch (err) {
        const errorEmbed = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`Whoops! Looks like something has gone wrong.`, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey there, **${message.author.username}**. Unfortunately it looks like something went wrong and **${client.user.username}** was unable to run this command. Please try again later. **Good luck, soldier.** \n\n<:blue_icon_hint:794005804343754752> **Did you know you can join ${client.user.username}'s support server? Join us [here!](https://discord.gg/gpy2pAM7AC)**`)

        message.channel.send(errorEmbed);
        return console.log(`[ ${client.user.username} ] ${err.stack}`);
    }
};

module.exports.help = {
    name: "statistics",
    category: "Information",
    description: "View recent statistics for Legion from Statcord",
    usage: "statistics",
    aliases: ["stats", " status"],
    deletable: false
};

module.exports.requirements = {
    clientPerms: ["SEND_MESSAGES"],
    userPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
}

module.exports.limits = {
    cooldown: 10
}