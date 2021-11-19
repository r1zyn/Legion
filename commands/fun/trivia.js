const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    const trivias = [
        {
            title: `Who is the creator of ${client.user.username}?`,
            options: ['Yi_Minq#6945', 'Crown Tech#2586', 'Archreus#4200', 'Lucaslah#9297', 'Archroneus#4450', 'io Films#8149'],
            correct: 3
        },
        {
            title: 'What\'s the most used programming language?',
            options: ['Ruby', 'C++', 'JavaScript', 'Lua', 'Python', 'HTML'],
            correct: 5
        },
        {
            title: 'From what song are these lyrics? "Is this the real life? Is this just fantasy? Caught in a landslide, No escape from reality."',
            options: ['Shape of You', 'Bohemian Rhapsody', 'We Wish You a Merry Christmas', 'Dance Monkey', 'Witch Doctor', 'Symbolism'],
            correct: 2
        },
        {
            title: 'What\'s the most popular game in history?',
            options: ['Minecraft', 'Among us', 'Fortnite', 'League of Legends', 'ROBLOX', 'Clash of Clans'],
            correct: 4
        },
        {
            title: 'Who made this trivia?',
            options: ['Mystic#1134', 'Crown Tech#2586', 'Archreus#4200', 'Lucaslah#9297', 'Lazer#0556', `${client.user.tag}`],
            correct: 1
        },
        {
            title: 'How tall is Mount Everest?',
            options: ['10,239m', '7,214m', '9,375m', '6,125m', '8,412m', '8,849m'],
            correct: 6
        },
        {
            title: 'How many bones does an adult human have?',
            options: ['206', '225', '198', '215', '324', '184'],
            correct: 1
        },
        {
            title: 'Who\'s the richest person in the world?',
            options: ['Elon Musk', 'Jeff Bezos', 'Bill Gates', 'Mark Zuckerberg', 'Donald Trump', 'Tony Stark'],
            correct: 1
        },
        {
            title: 'Which African country was formerly known as Abyssinia?',
            options: ['Kenya', 'Niger', 'South Africa', 'Ethiopia', 'Republic of the Congo', 'South Sudan'],
            correct: 4
        },
        {
            title: 'Which was the first crewed spacecraft to leave the lower part of Earth\'s orbit?',
            options: ['Apollo 12', 'Apollo 13', 'Apollo 6', 'Apollo 9', 'Apollo 26', 'Apollo 8'],
            correct: 6,
        },
        {
            title: 'Which country consumes the most chocolate per capita?',
            options: ['France', 'China', 'Switzerland', 'UK', 'Italy', 'Belgium'],
            correct: 3,
        },
        {
            title: 'What is the loudest animal on Earth?',
            options: ['Seal', 'Dolphin', 'Cricket', 'Monkey', 'Sperm Whale', 'Penguin'],
            correct: 5,
        },
        {
            title: 'What was the first toy to be advertised on TV?',
            options: ['Barbie', 'Mr.Potato Head', 'Buzz Lightyear', 'Hatchimals', 'Buzzy Bee', 'Rubix Cube'],
            correct: 2,
        },
        {
            title: 'What is the tiny piece at the end of a shoelace called?',
            options: ['Toplace', 'Downlace', 'Aglet', 'Shoelace head'],
            correct: 3,
        },
        {
            title: 'Outside which New York building was Jhon Lennon killed?',
            options: ['One World Trade Center', 'Empire State', 'The New York Times', 'Dakota Building', '432 Park Avenue', '40 Wall Street'],
            correct: 4,
        },
        {
            title: 'What is the softest mineral in the world?',
            options: ['Gold', 'Cotton', 'Diamond', 'Polyester', 'Calcite', 'Talc'],
            correct: 6,
        },
        {
            title: 'What is the world\'s biggest island?',
            options: ['Greenland', 'New Guinea', 'Hawaii', 'Madagascar', 'Singapore', 'Stewart Island'],
            correct: 1,
        },
        {
            title: 'What\'s the answer to this math equation? (10.23523 x ³√325.12/π)^0 = a',
            options: ['a = 4.4673 (4 decimals places)', 'a = 0.345624323636', 'a = 1', '0 = a', 'a = 111.111', 'a = π'],
            correct: 3,
        },
        {
            title: 'What does COVID-19 stand for?',
            options: ['CoronaVirusDecember-19', 'CoronaVintageDEC-2019', 'CoronaVintageDecember-2019', 'CoronaVirusDisease-2019', '2019-nCoV', 'CoronaVentedDeath-2019'],
            correct: 4,
        },
        {
            title: 'What is the smallest ocean in the world?',
            options: ['Indian', 'Dead Sea', 'Pacific', 'Atlantic', 'The Arctic', 'Southern China'],
            correct: 5,
        },
        {
            title: 'Which planet is the hottest on the solar system?',
            options: ['Venus', 'Jupiter', 'Mars', 'Earth', 'Mercury', 'The Sun'],
            correct: 1,
        },
        {
            title: 'Which country producess the most coffee in the world?',
            options: ['Belgium', 'U.S.', 'Switzerland', 'France', 'Italy', 'Brazil'],
            correct: 6,
        },
        {
            title: 'What does BMW stand for? (English)',
            options: ['Bolivian Motor Ways', 'Better Motor Ways ', 'Belgium Motor Works', 'Bangladesh Motor Way', 'Bavarian Motor Works', 'Big Motor Works'],
            correct: 5,
        },
        {
            title: 'Which is the smallest city in the world?',
            options: ['Lausanne', 'Vatican City', 'Hum', 'London', 'Paris', 'Reno'],
            correct: 3,
        },
        {
            title: 'Who is the co-founder of Discord?',
            options: ['Jeff Bezos', 'Mark Zuckerberg', 'Unknown', 'Hammer & Chisel', 'Stan Vishnevskiy', 'Jason Citron'],
            correct: 6,
        },
        {
            title: 'In a 2019 interview, what did Boris Johnson say he did to relax?',
            options: ['Breakdancing', 'Make model buses', 'Skydiving', 'Food fight', 'Midnight Gaming', 'Eating exotic animals'],
            correct: 2
        }
    ];

    let _trivia = trivias[Math.floor(Math.random() * (trivias.length))];
    let content = 0;

    const qembed = new Discord.MessageEmbed()
        .setDescription(`**Question: ${_trivia.title}**`)
        .setColor('2f3136')
        .setAuthor(`General Knowledge - Trivia Invoked By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`Answer with 1, 2, 3, 4, 5 or 6. You have 20 seconds remaining`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

    _trivia.options.forEach(opt => {
        content++;
        qembed.addField(`Answer #${content}`, `\`${opt}\``, true);
    });

    message.channel.send(qembed);

    try {
        let _messages = await message.channel.awaitMessages(auth => auth.author.id === message.author.id, { time: 20000, max: 1, errors: ['time'] })
        if (parseInt(_messages.first().content) === _trivia.correct) {
            if (isNaN(_messages.first().content)) return;
            const coins = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
            const earned = coins[Math.floor(Math.random() * (coins.length))];

            client.qdb.add(`money_${message.guild.id}_${message.author.id}`, earned);

            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<:white_check:795827549213163533> **${message.author.username}, you answered correctly! You have earned <:legion:798572165758189609>\`${earned.toString()}\` Legions.**`));
        } else {
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<:thumbs_down_white:796178894809202719> **${message.author.username}, you answered wrong. Have another go to earn more Legions.**`));
        }
    } catch (e) {
        console.log(e.stack);
        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`<:time:795827549044473956> **${message.author.username}, you ran out of time. Have another go to earn more Legions.**`));
    }

}

module.exports.help = {
    name: "trivia",
    category: "Fun",
    description: "Get a nice trivia to answer",
    usage: `prefix trivia`,
    aliases: ["trivia", "questions", "rivia", "quiz", "quizzes", "test", "tests"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 10
}