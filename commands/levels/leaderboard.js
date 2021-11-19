const { MessageEmbed } = require('discord.js');
const canvacord = require('canvacord');

module.exports.run = async (client, message, args) => {

    try {
        let data = client.qdb.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
        if (data.length < 1) return message.channel.send("No leaderboard");
        let myrank = data.map(m => m.ID).indexOf(`xp_${message.author.id}`) + 1 || "N/A";
        data.length = 20;
        let lb = [];
        for (let i in data) {
            let id = data[i].ID.split("_")[1];
            let user = await client.users.cache.get(id);
            user = user ? user.tag : "Unknown User#0000";
            let rank = data.indexOf(data[i]) + 1;
            let level = client.qdb.get(`level_${id}`);
            let xp = data[i].data;
            let xpreq = Math.floor(Math.pow(level / 0.1, 2));
            lb.push({
                user: { id, tag: user },
                rank,
                level,
                xp,
                xpreq
            });
        };

        const embed = new MessageEmbed()
            .setColor(message.guild.roles.highest.hexColor)
            .setAuthor(`${message.guild.name} - Server Member Leaderboard`, message.guild.iconURL())
            .setThumbnail(message.guild.iconURL())

        lb.forEach(d => {
            embed.addField(`${d.rank}. ${d.user.tag}`, `**Level**: \`${d.level}\`\n**XP**: \`${d.xp}/${d.xpreq}\``, true);
        });
        embed.setFooter(`Your Position: ${myrank}`);
        return message.channel.send(embed);
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
    name: "leaderboard",
    category: "Levels",
    description: "View the global leaderboard for user xp and levels",
    usage: `leaderboard`,
    aliases: ["leaderboard"],
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