const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message) => {

    try {
        const args = message.content.split(" ").slice(1).join(' ');
        const query = args;

        if (!query) {
            const noQuery = new MessageEmbed()
                .setColor(0x2296F3)
                .setAuthor(`Discord.js Docs (stable)`, "https://images-ext-1.discordapp.net/external/5T4uh_keplxixt9k8Rnivq5dMvrLOW2Z11k-OXn-3io/https/discord.js.org/favicon.ico")
                .setDescription(`${message.author}, the page number was not found for \`${args[0]}\`. Please try again. \n\n**Usage:** \`${client.prefix[message.guild.id]}member-search <keyword> <page number>\`\n**Example:** \`${client.prefix[message.guild.id]}member-search a 1\``)
                .setTitle("Search results:")
                .setDescription(`No query was given. Please provide a query to search for within the discord.js documentation.`)
            const msg = await message.channel.send(noQuery);

            msg.react("🗑️");

            let react;

            react = await msg.awaitReactions(
                (reaction, user) => reaction.emoji.name === '🗑️' && user.id === message.author.id,
                { max: 1, time: null, errors: ['time'] }
            );

            if (react && react.first()) return msg.delete() && message.delete();
        }

        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;

        const docFetch = await fetch(url)
        const embed = await docFetch.json();

        if (!embed || embed.error) {
            const msg = await message.channel.send(new MessageEmbed().setColor("#2296F3").setAuthor(`Discord.js Docs (stable)`, "https://images-ext-1.discordapp.net/external/5T4uh_keplxixt9k8Rnivq5dMvrLOW2Z11k-OXn-3io/https/discord.js.org/favicon.ico").setTitle("Search results:").setDescription("No results found."));
            msg.react("🗑️");

            let react;

            react = await msg.awaitReactions(
                (reaction, user) => reaction.emoji.name === '🗑️' && user.id === message.author.id,
                { max: 1, time: null, errors: ['time'] }
            );

            if (react && react.first()) msg.delete() && message.delete();
        } else {

            if (!message.guild) {
                const msg = await message.util.send({ embed });
                msg.react("🗑️");

                let react;

                react = await msg.awaitReactions(
                    (reaction, user) => reaction.emoji.name === '🗑️' && user.id === message.author.id,
                    { max: 1, time: null, errors: ['time'] }
                );

                if (react && react.first()) msg.delete() && message.delete();
            }

            const msg = await message.channel.send({ embed });
            msg.react('🗑️');

            let react;
            try {
                react = await msg.awaitReactions(
                    (reaction, user) => reaction.emoji.name === '🗑️' && user.id === message.author.id,
                    { max: 1, time: null, errors: ['time'] }
                );
            } catch (err) {
                msg.reactions.removeAll();
            }

            if (react && react.first()) msg.delete() && message.delete();
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
    name: "djs",
    category: "Search",
    description: "Get information from the official discord.js documentation",
    usage: `djs <query>`,
    aliases: ["djs", "djs-docs", "djsdocs", "discord.js", "discordjs"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES", , "ADD_REACTIONS"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 4
}