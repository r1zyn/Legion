const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports.run = async (client, message, args) => {

    try {
        const command_name = this.help.name;
        const command_usage = this.help.usage;

        weather.find({ search: args.join(" "), degreeType: 'C' }, async function (error, result) {

            const noQuery = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${command_name}\` command was cancelled as no arguments were provided. Please provide a location to display the weather forecast for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${command_usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${command_name} Auckland\``);

            const invalidLocation = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${command_name}\` command was cancelled as the provided arguments were invalid. Please provide a valid location to display the weather forecast for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${command_usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${command_name} Auckland\``);


            if (!args[0]) return message.channel.send(noQuery);

            if (result === undefined || result.length === 0) return message.channel.send(invalidLocation);

            var current = result[0].current;
            var location = result[0].location;

            const loadingEmbed = new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription('<a:discord_loading:796184140378144808> **Fetching weather forecast data from sources. Please wait.**');

            const msg = await message.channel.send(loadingEmbed);

            const weatherinfo = new MessageEmbed()
                .setDescription(`**Current Weather:** ${current.skytext}`)
                .setAuthor(`Weather forecast for ${current.observationpoint}`, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(current.imageUrl)
                .setColor(0x2F3136)
                .addField('Timezone', `\`UTC+${location.timezone}\``, true)
                .addField('Degree Type', '\`Celsius\`', true)
                .addField('Temperature', `\`${current.temperature}°\``, true)
                .addField('Wind', `\`${current.winddisplay}\``, true)
                .addField('Feels like', `\`${current.feelslike}°\``, true)
                .addField('Humidity', `\`${current.humidity}%\``, true);

            setTimeout(function () {
                return msg.edit(weatherinfo);
            }, 3000);
        });
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
    name: "weather",
    category: "Utilities",
    description: "Check the weather forecast",
    usage: `weather <location>`,
    aliases: ["forecast", "weatherforecast", "weather-forecast"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 8
};