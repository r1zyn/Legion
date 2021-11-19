const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions/capitalizefirstletter');

module.exports.run = async (client, message, args) => {

    try {
        var phrases = [
            "I\it is certain.",
            "it is decidedly so.",
            "without a doubt.",
            "yes – definitely!",
            "you may rely on it...",
            "as I see it.",
            "yes.",
            "most Likely.",
            "outlook good!",
            "yes",
            "signs point to yes",
            "it is certain",
            "it is decidedly so...",
            'without a doubt.',
            'yes, definitely!',
            'you may rely on it.',
            'as I see it, yes.',
            'most likely.',
            'outlook good!',
            'signs point to yes.',
            'reply hazy try again.',
            'ask again later.',
            'better not tell you now!',
            'cannot predict now.',
            'concentrate and ask again.',
            'don\'t count on it...',
            'my reply is no.',
            'my sources say no.',
            'outlook not so good!',
            'very doubtful. ',
            'signs point to yes.',
        ];

        const ballrr = phrases[Math.floor(Math.random() * phrases.length)];

        if (!args[0]) {
            const noArgs = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a question for the 8ball to answer and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} Is Wumpus real?\``);

            return message.channel.send(noArgs);
        };

        const invalidArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (args.join(" ").includes(invalidArray)) {
            const invalidArguments = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid question and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} #2f3136\``);

            return message.channel.send(invalidArguments);
        };

        const ballr = new MessageEmbed()
            //.setAuthor('8ball', `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/8-Ball_Pool.svg/1024px-8-Ball_Pool.svg.png`)
            .setColor(0x2F3136)
            .setDescription(`:8ball: **Question:** ${capitalizeFirstLetter(args.join(" "))} **|** **Answer:** ${capitalizeFirstLetter(ballrr)}`);

        return message.channel.send(ballr);
    } catch (err) {
        const errorEmbed = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`Whoops! Looks like something has gone wrong.`, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey there, **${message.author.username}**. Unfortunately it looks like something went wrong and **${client.user.username}** was unable to run this command. Please try again later. Good luck, soldier. \n\n> **Did you know you can join ${client.user.username}'s support server? Join us [here!](https://discord.gg/gpy2pAM7AC)**`)

        message.channel.send(errorEmbed);
        return console.log(`[ ${client.user.username} ] ${err.stack}`);
    }
};

module.exports.help = {
    name: "8ball",
    category: "Fun",
    description: "Get the almighty 8ball to answer a question.",
    usage: `8ball <question>`,
    aliases: ["question", "should i"],
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