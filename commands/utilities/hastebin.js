const { MessageEmbed } = require('discord.js');
const hastebin = require("hastebin-gen");

module.exports.run = async (client, message, args) => {

    try {
        const code = message.content.split(' ').slice(1).join(' ');
        if (!code) {
            const noArgs = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide text to be put into the bin and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} This is your new, shiny bin.\``);

            return message.channel.send(noArgs);
        }

        const tooLong = new MessageEmbed()
            .setColor(0x2F3136)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`The provided text was too long.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.author}, please provide some text shorter than 2000 characters.\n\n**Usage:** \`${client.prefix[message.guild.id]}ascii <text>\`\n**Example:** \`${client.prefix[message.guild.id]}ascii Hello World!\``);

        if (code.length > 2000) return message.channel.send(tooLong)

        hastebin(code)
            .then(async haste => {
                const generatingEmbed = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setDescription('<a:discord_loading:796184140378144808> **Please wait while your bin is processed and generated.**');

                const completeEmbed = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Your bin has finished generating.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`${message.author}, your bin you created has now been successfully generated and is ready for viewing.\n\n**Link:** You can view the bin [**here.**](${haste})`);

                const msg = await message.channel.send(generatingEmbed);
                setTimeout(async function () {
                    return msg.edit(completeEmbed);
                }, 4000)
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
    name: "hastebin",
    category: "Utilities",
    description: "Create a new code file bin with hastebin.com",
    usage: `hastebin <text>`,
    aliases: ["bin"],
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