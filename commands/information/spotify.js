const { MessageEmbed, MessageAttachment } = require('discord.js');
const Canvacord = require('canvacord');

module.exports.run = async (client, message, args) => {
    //let user = message.mentions.users.first() || message.author;

    /*if (user.presence.activities !== null && user.presence.activities.type === 2 && user.presence.activities.name === 'Spotify' && user.presence.activities.assets !== null) {

        let trackIMG = `https://i.scdn.co/image/${user.presence.activities.assets.largeImage.slice(8)}`;
        let trackURL = `https://open.spotify.com/track/${user.presence.activities.syncID}`;
        let trackName = user.presence.activities.details;
        let trackAuthor = user.presence.activities.state;
        let trackAlbum = user.presence.activities.assets.largeText;

        const embed = new MessageEmbed()
            .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/653135129870336031.png?v=1')
            .setColor("GREEN")
            .setThumbnail(trackIMG)
            .addField('Song Name', trackName, true)
            .addField('Album', trackAlbum, true)
            .addField('Author', trackAuthor, false)
            .addField('Listen to Track', `${trackURL}`, false)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send(embed);*/
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

    if (!user.presence.activities.length) {
        const sembed = new MessageEmbed()
            .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
            .setColor("GREEN")
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .addField("**No Status**", 'This user does not have any custom status!')
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
        message.channel.send(sembed)
        return undefined;
    }

    user.presence.activities.forEach(async (activity) => {

        if (activity.type === 'CUSTOM_STATUS') {
            const embed = new MessageEmbed()
                .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                .setColor("GREEN")
                .addField("**Status**", `**Custom status** -\n${activity.emoji || "No Emoji"} | ${activity.state}`)
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp()
            message.channel.send(embed)
        }
        else if (activity.type === 'PLAYING') {
            let name1 = activity.name
            let details1 = activity.details
            let state1 = activity.state
            let image = user.user.displayAvatarURL({ dynamic: true })

            const sembed = new MessageEmbed()
                .setAuthor(`${user.user.username}'s Activity`)
                .setColor(0xFFFF00)
                .setThumbnail(image)
                .addField("**Type**", "Playing")
                .addField("**App**", `${name1}`)
                .addField("**Details**", `${details1 || "No Details"}`)
                .addField("**Working on**", `${state1 || "No Details"}`)
            message.channel.send(sembed);
        }
        else if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {


            let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
            let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

            let trackName = activity.details;
            let trackAuthor = activity.state;
            let trackAlbum = activity.assets.largeText;
            let trackImage = activity.assets.largeImage;

            trackAuthor = trackAuthor.replace(/;/g, ",")

            /*const card = new Canvacord.Spotify()
                .setStartTimestamp(activity.timestamps.start)
                .setEndTimestamp(activity.timestamps.end)
                .setAuthor(trackAuthor)
                .setAlbum(trackAlbum)
                .setImage(trackIMG)
                .setTitle(trackName)

            const img = await card.build();*/


            const embed = new MessageEmbed()
                .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                .setColor("GREEN")
                .setThumbnail(trackIMG)
                .addField('Song Name', trackName, true)
                .addField('Album', trackAlbum, true)
                .addField('Author', trackAuthor, false)
                .addField('Listen to Track', `${trackURL}`, false)
                .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed);

            //message.channel.send(new MessageAttachment(img, "spotify.png"))
        }
    })
}

module.exports.help = {
    name: "spotify",
    category: "Information",
    description: "View the song a user is listening to on Spotify",
    usage: `spotify [user]`,
    aliases: ["spotify"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 4
}