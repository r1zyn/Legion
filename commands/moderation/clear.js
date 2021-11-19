const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    try {
        const amount = args[0];

        const amountError1 = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a number of messages to delete under 100 to delete and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 100\``);

        const amountError2 = new MessageEmbed()
            .setColor(0x2F3136)
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a number of messages to delete over 1 and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 100\``);

        const amountError3 = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid number of messages to delete and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 100\``);


        if (!amount) {
            const noArgs = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a number of messages to be deleted and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 100\``);

            return message.channel.send(noArgs);
        } else if (isNaN(amount)) {
            return message.channel.send(amountError3);
        } else if (amount > 100) {
            return message.channel.send(amountError1);
        } else if (amount < 1) {
            return message.channel.send(amountError2);
        };

        const clearedEmbed = new MessageEmbed()
            .setColor(0x2F3136)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`Channel bulk message deletion successful.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.author}, \`${amount}\` messages were succesfully deleted in this channel, ${message.channel}. You can view more information in the server's audit log if you have access to it.`);

        await message.channel.messages.fetch({
            limit: amount
        })
            .then(async messages => {
                await (message.channel).bulkDelete(messages.size);
            });

        await message.channel.send(clearedEmbed)
            .then(clearedEmbed => {
                setTimeout(function () {
                    return clearedEmbed.delete();
                }, 10000)
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
    name: "clear",
    category: "Moderation",
    description: "Delete a certain amount of messages",
    usage: `clear <amount>`,
    aliases: ["purge"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    clientPerms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 6
};