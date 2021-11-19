const { MessageEmbed } = require('discord.js');
const math = require('mathjs');

module.exports.run = async (client, message, args) => {

    try {
        /*const noQuery = new MessageEmbed()
            .setColor(0x2F3136)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`No equation was provided to calculate.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.author}, please provide an equation to be calculated.\n\n**Usage:** \`${client.prefix[message.guild.id]}calculate <equation>\`\n**Example:** \`${client.prefix[message.guild.id]}calculate 40 * 3 / 7^2\``);

        const invalid = new MessageEmbed()
            .setColor(0x2F3136)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`The provided equation was invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.author}, please provide a **valid** equation to be calculated. The equation you provided was not valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}calculate <equation>\`\n**Example:** \`${client.prefix[message.guild.id]}calculate 40 * 3 / 7^2\``);

        if (!args[0]) return message.channel.send(noQuery);
        if (isNaN(args[0])) {
            return message.channel.send(invalid);
        } else {

            let resp;

            try {
                resp = math.evaluate(args.join(" "));

                const embed = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setTitle('Calculator')
                    .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
                    .addField('Answer', `\`\`\`css\n${resp}\`\`\``);

                return message.channel.send(embed);
            } catch (e) {
                const errorEmbed = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Whoops! Looks like something has gone wrong.`, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Hey there, **${message.author.username}**. Unfortunately it looks like something went wrong and **${client.user.username}** was unable to run this command. Please try again later. **Good luck, soldier.** \n\n<:blue_icon_hint:794005804343754752> **Did you know you can join ${client.user.username}'s support server? Join us [here!](https://discord.gg/gpy2pAM7AC)**`)

                message.channel.send(errorEmbed);
                return console.log(`[ ${client.user.username} ] ${e.stack}`);
            }
        }
        if (!args[0]) return message.channel.send('Provide a question (*, /, +, -)');

        let data;

        try {
            data = await math.evaluate(args.join(" "));
        } catch (e) {
            return message.channel.send('You must enter a valid math question (*, /, +, -)')
        }

        const outputembed = new MessageEmbed()
            .setColor(0x808080)
            .setTitle('Calculate')
            .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
            .addField('Answer', `\`\`\`css\n${data}\`\`\``)

        message.channel.send(outputembed);*/
        if (!args[0]) {
            const noArgs = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a word to search for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} Crown Tech\``);

        return message.channel.send(noArgs);
        }

        let result;
        try {
            result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"));
        } catch (e) {
            return message.channel.send("**Enter Valid Calculation!**\n\n**List of Calculations** - \n1. **sqrt equation** - `sqrt(3^2 + 4^2) = 5`\n2. **Units to Units** - `2 inch to cm = 0.58`\n3. **Complex Expressions Like** - `cos(45 deg) = 0.7071067811865476`\n4. **Basic Maths Expressions** - `+, -, ^, /, decimals` = **2.5 - 2 = 0.5**");
        }

        let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`${bot.user.username} Calculator`, message.author.displayAvatarURL({ dynamic: true }))
            .addField("**Operation**", `\`\`\`Js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
            .addField("**Result**", `\`\`\`Js\n${result}\`\`\``)
            .setFooter(message.guild.name, message.guild.iconURL());
        message.channel.send(embed);
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
    name: "calculate",
    category: "Utilities",
    description: "Get the answer for a math problem",
    usage: `calculate <equation>`,
    aliases: ["math", "calc"],
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