const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { capitalizeFirstLetter } = require('../../functions/capitalizefirstletter');

module.exports.run = (client, message, args) => {

    try {
        let countries = args.join(" ");

        if (!args[0]) {
            const noArgs = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a location for the COVID-19 statistics to be displayed and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} New Zealand\``);

            return message.channel.send(noArgs);
        }

        if ((args[0] === "all") || (args[0] === "global") || !args.length) {
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new MessageEmbed()
                        .setColor(0x2f3136)
                        .setAuthor(`Worldwide COVID-19 Statistics | COVID-19 Global Cases`, message.author.displayAvatarURL({ dynamic: true }))
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                        .addField('Confirmed Cases', confirmed, true)
                        .addField('Recovered', recovered, true)
                        .addField('Deaths', deaths, true)
                        .setFooter(`To view the statistics for a country, run ${client.prefix[message.guild.id]}coronavirus <country>`)
                        .setTimestamp();

                    return message.channel.send(embed);
                });
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new MessageEmbed()
                        .setColor(0x2f3136)
                        .setAuthor(`${capitalizeFirstLetter(countries)} COVID-19 Statistics | COVID-19 National Cases`, message.author.displayAvatarURL({ dynamic: true }))
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                        .addField('Confirmed Cases', confirmed, true)
                        .addField('Recovered', recovered, true)
                        .addField('Deaths', deaths, true)
                        .setFooter(`To view the statistics for the world, run ${client.prefix[message.guild.id]}coronavirus global`)
                        .setTimestamp();


                    message.channel.send(embed)
                }).catch(e => {
                    console.log(`[ ${client.user.username} ] ${e.stack}`);
                    const invalidArguments = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid location for the COVID-19 statistics to be displayed, ensure that it is a country not a city, and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} New Zealand\``);

                    return message.channel.send(invalidArguments);
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
    name: "coronavirus",
    category: "Information",
    description: "Track a country's or worldwide COVID-10",
    usage: "coronavirus <country | \"global\" | \"all\">",
    aliases: ["covid", "covid-19", "covid19"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 5
};