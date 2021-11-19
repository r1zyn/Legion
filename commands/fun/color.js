const { MessageEmbed, MessageAttachment } = require('discord.js');
const canva = require('canvacord');

module.exports.run = async (client, message, args) => {

    try {
        if (!args[0]) {
            const colorEmbed = new MessageEmbed()
                .setColor("RANDOM");

            colorEmbed.setDescription(`**${message.author}, your color is:** \`${colorEmbed.hexColor}\``);
            return message.channel.send(colorEmbed)
        } else {
            let colorOfChoice = args[0];
            if (!args[0].startsWith("#")) {
                const invalidArguments = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid hex color and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} #2f3136\``);

                return message.channel.send(invalidArguments);
            }

            let image = await canva.Canvas.color(`${colorOfChoice}`);

            const colorImage = new MessageAttachment(image, 'color.png');

            const colorEmbed = new MessageEmbed()
                .setColor(colorOfChoice)
                .setAuthor(`${client.user.username} - Color Command (${colorOfChoice})`, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter(`Requested by ${message.author.tag}`)
                .setTimestamp(new Date())
                .attachFiles(colorImage)
                .setImage('attachment://color.png');

            return message.channel.send(colorEmbed);
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
    name: "color",
    category: "Fun",
    description: "Generate a triggered image of a user",
    usage: "color <hexcolor>",
    aliases: ["colour"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 2
};