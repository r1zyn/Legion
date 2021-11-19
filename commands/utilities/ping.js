const { MessageEmbed } = require('discord.js');
const { duration } = require('../../functions/duration');

module.exports.run = async (client, message, args) => {

    try {
        const pingingEmbed = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription('<a:discord_loading:796184140378144808> **Fetching data from sources. Please wait.**');

        /*const channel = message.mentions.channels.first() || message.channel;

        channel.updateOverwrite(message.mentions.members.first(), {
            MANAGE_CHANNEL: true
        });*/

        const msg = await message.channel.send(pingingEmbed);
        setTimeout(function () {
            const timeDiff = Math.floor(msg.createdTimestamp - message.createdTimestamp);
            const start = process.hrtime();
            client.db;
            const difference = process.hrtime(start);

            const pingedEmbed = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`${client.user.username} - API, ${client.user.username} Hosting & Database Data`, client.user.displayAvatarURL({ dynamic: true }))
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Information for API, ${client.user.username} & database received in \`${timeDiff}ms\`**`)
                .addField(`<:status_bar:761134398602477568> **Discord API**`, `\`\`\`apache\n${client.ws.ping}ms\`\`\``, true)
                .addField(`<:clyde:762779174351405106> **${client.user.username}**`, `\`\`\`apache\n${timeDiff}ms\`\`\``, true)
                .addField(`<:server:761134398619648000> **Database**`, `\`\`\`apache\n${Math.round(difference[1] / 1e3)}ms\`\`\``, true)
                .setFooter(`${client.user.username} Uptime: ${duration(client.uptime)}`)
                .setTimestamp();

            return msg.edit(pingedEmbed);
        }, 2000)
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
    name: "ping",
    category: "Utilities",
    description: "Get the speed of the Discord API, ${client.user.username} and database.",
    usage: `ping`,
    aliases: ["ping"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 6
};