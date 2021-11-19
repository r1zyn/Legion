const { MessageEmbed } = require('discord.js');
const { version, owners } = require('../../config');
const { capitalizeFirstLetter } = require('../../functions/capitalizefirstletter');

module.exports.run = async (client, message, args) => {

    try {

        if (!args[0]) {
            const start = process.hrtime();
            client.db;
            const difference = process.hrtime(start);

            function duration(ms) {
                const sec = Math.floor((ms / 1000) % 60).toString();
                const min = Math.floor((ms / (1000 * 60)) % 60).toString();
                const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
                const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();

                const presence = client.user.presence.status.replace(/^\w/, (c) => c.toUpperCase());
 
                return `Client Status    :: ${presence}\nUser Activity    :: ${client.user.presence.activities.length ? `${capitalizeFirstLetter(client.user.presence.activities[0].type.toLowerCase())} ${client.user.presence.activities[0]}` : "No activity detected"}\nDiscord API Ping :: ${client.ws.ping.toFixed(2)}ms\nClient Uptime    :: ${days.padStart(1, '0')}d, ${hrs.padStart(2, '0')}h, ${min.padStart(2, '0')}m, ${sec.padStart(2, '0')}s\nDatabase         :: ${Math.round(difference[1] / 1e3)}ms`
            };

            const guilds = client.guilds.cache.size;
            const users = client.users.cache.size;
            const channels = client.channels.cache.size;

            const messageArray = [
                `**Did you know:** ${client.user.username} is the public version of VoTech?`,
                `**Did you know:** ${client.user.username} has a different creator from VoTech.`,
                `**Do you ever wonder:** who writes these messages?`,
                `**Do you ever wonder:** do people even read these?`,
                `**You can join the conversation at ${client.user.username}'s support server** [**here.**](https://discord.gg/gpy2pAM7AC)`,
                `**Did you know:** ${client.user.username} is made with JavaScript.`
            ];

            const loadingBotInformation = new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<a:discord_loading:796184140378144808> ${messageArray[Math.round(Math.random() * 5)]}`);

            const clientCreated = new Date().getMonth() - client.user.createdAt.getMonth();
            const clientJoined = new Date().getMonth() - message.guild.me.joinedAt.getMonth();


            const botInformationEmbed = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`${client.user.username} - Bot Information, Statistics & Status`, client.user.avatarURL())
                //.setThumbnail(client.user.avatarURL())
                .setDescription( `Meet ${client.user.username}, the ultimate Discord server management and multi-purpose utility bot by ${await client.users.cache.get(owners[3]).tag}.`)
                //.addField(`<:white_legion:799408590187659356> **${client.user.username}**`, `\`\`\`http\nMeet ${client.user.username}, the ultimate Discord server management and multi-purpose utility bot by Archreus and the Midnight Development team.\`\`\``)
                .addField(`<:file:795827719714635796> **General Information**`, `\`\`\`asciidoc\nDiscriminator    :: #${client.user.discriminator}\nUser ID          :: ${client.user.id}\nVersion          :: v${version}\nCurrent Prefix   :: ${client.prefix[message.guild.id]}\nOwners           :: ${await client.users.cache.get(owners[3]).tag}, ${await client.users.cache.get(owners[1]).tag}\nAccount Creation :: ${client.user.createdAt.toLocaleString("en-NZ", { weekday: "long" })} ${client.user.createdAt.getDate()} ${client.user.createdAt.toLocaleString("en-NZ", { month: "long" })} ${client.user.createdAt.getFullYear()} (${clientCreated} months ago)\nDate Joined      :: ${message.guild.me.joinedAt.toLocaleString("en-NZ", { weekday: "long" })} ${message.guild.me.joinedAt.getDate()} ${message.guild.me.joinedAt.toLocaleString("en-NZ", { month: "long" })} ${message.guild.me.joinedAt.getFullYear()} (${clientJoined} months ago)\`\`\``)
                .addField(`<:statistic_line:795827549035823125> **Bot Statistics**`, `\`\`\`asciidoc\nTotal Commands   :: ${client.commands.size}\nCategory Size    :: 7\nServer Count     :: ${guilds}\nTotal Users      :: ${users}\nChannels         :: ${channels}\nEmoji Count      :: ${client.emojis.cache.size}\`\`\``)
                .addField(`**<:status_bar:761134398602477568> Client Status**`, `\`\`\`asciidoc\n${duration(client.uptime)}\`\`\``)
                .setFooter(`©️${new Date().getFullYear()} ${client.user.username}. By ${await client.users.cache.get(owners[3]).tag}. All rights reserved  •  Page 1/2`, client.user.displayAvatarURL({ dynamic: true }))

            await message.channel.send(loadingBotInformation)
                .then(loadingBotInformation => {
                    setTimeout(async function () {
                        loadingBotInformation.delete();
                        return message.channel.send(botInformationEmbed);   
                    }, 4000)
                });
        } else if (args[0] === "2") {
            const messageArray = [
                `**Did you know:** ${client.user.username} is the public version of VoTech?`,
                `**Did you know:** ${client.user.username} has a different creator from VoTech.`,
                `**Do you ever wonder:** who writes these messages?`,
                `**Do you ever wonder:** do people even read these?`,
                `**You can join the conversation at ${client.user.username}'s support server** [**here.**](https://discord.gg/gpy2pAM7AC)`,
                `**Did you know:** ${client.user.username} is made with JavaScript.`
            ];

            const loadingBotInformation = new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<a:discord_loading:796184140378144808> ${messageArray[Math.round(Math.random() * 5)]}`);

            const botInformationEmbed2 = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`${client.user.username} - Bot Information & Statistics`, client.user.avatarURL())
                //.setThumbnail(client.user.avatarURL())
                .addField(`<:time:795827549044473956> **Change Log (New features and bug fixes)**`, `\`\`\`md\n# January 10, 2021\n> Created hastebin command\n> Added trivia system, 2 extra answers added per question.\n> Created 8ball command. Redid embed by Mystic.\n\n# January 11, 2021\n> Economy system partially functional, balance and daily commands available.\n> Rebuilt rank card, loads faster.\n> Redid bot information embeds, added extra information and embed pages.\`\`\``)
                .addField("**<:config_white_icon:796178894927298611> Development Team**", "```md\n# Midnight Development Legion Development Team\n> Archreus#4200 (Head Developer)\n> Crown Tech#2586 (Server Owner)\n> Mystic#1134 (Developer)\n> lucaslah#9297 (Tester)\n> TheDevBird#3364 (Website Developer)```")
                .addField("**<:link:796178895144747068> Important Links**", "```md\n# Support Server: https://discord.gg/gpy2pAM7AC\n# Invite Link: http://bit.ly/2MPTa26\n# https://statcord.com/bot/794411847117832202\n# Bot Page: https://discordbots.co/bot/legion```")
                //.addField(`**<:blue_icon_hint:794005804343754752> Extra Information**`, `For more information, click [**here.**](https://statcord.com/bot/794411847117832202)`, true)
                //.addField(`**<:external_link:795827549157589052> Invite ${client.user.username}**`, `Add ${client.user.username} to your server [**here.**](https://discord.com/oauth2/authorize?client_id=794411847117832202&permissions=8&scope=bot)`, true)
                .setFooter(`©️${new Date().getFullYear()} ${client.user.username}. By ${await client.users.cache.get(owners[3]).tag}. All rights reserved  •  Page 2/2`, client.user.displayAvatarURL({ dynamic: true }))

            await message.channel.send(loadingBotInformation)
                .then(loadingBotInformation => {
                    setTimeout(async function () {
                        loadingBotInformation.delete();
                        return message.channel.send(botInformationEmbed2);
                    }, 4000)
                });
        }
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
    name: "info",
    category: "Information",
    description: "Get information and statistics for Legion",
    usage: `information`,
    aliases: ["botinfo", "info", "infobot", "bot-info", "info-bot", "bot", "legion"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 4
}