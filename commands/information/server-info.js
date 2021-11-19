const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions/capitalizefirstletter');

module.exports.run = async (client, message, args) => {

    try {

        const region = capitalizeFirstLetter(message.guild.region);

        const serverInfo = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`${message.guild.name} - Server Information Profile`, message.guild.iconURL())
            .setThumbnail(message.guild.iconURL())

        const server = message.guild;

        if (server.region == "sydney") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: Sydney\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "brazil") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: Brazil\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "europe") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: Europe\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "india") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: India\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "japan") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: Japan\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "russia") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: Russia\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "singapore") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: Singapore\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "south-africa") {
            serverInfo.addField(`<:file:795827719714635796>> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: South Africa\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "us-central") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: US Central\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "us-north") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: US North\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "us-east") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: US East\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "us-south") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: US South\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "us-west") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: US West\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        } else if (server.region == "hong-kong") {
            serverInfo.addField(`<:file:795827719714635796> General Information`, `\`\`\`apache\nName: ${message.guild.name}\nID: ${message.guild.id}\nRegion: Hong Kong\nBoosts: ${message.guild.premiumSubscriptionCount}\nIcon URL: ${message.guild.iconURL({ format: "png" })}\nCreated At: ${message.guild.createdAt}\`\`\``)
        }

        serverInfo.addField(`<:statistic_line:795827549035823125> Server Statistics`, `\`\`\`apache\nMembers: ${message.guild.members.cache.size}\nChannels: ${message.guild.channels.cache.size}\nRoles: ${message.guild.roles.cache.size}\nEmojis: ${message.guild.emojis.cache.size}\nHighest Role: @${message.guild.roles.highest.name}\nVoice Connections: ${message.guild.voiceStates.cache.size}\`\`\``);
        serverInfo.addField("<:external_link:795827549157589052> Server Invite", `\`\`\`apache\n${(await message.guild.fetchInvites()).random()}\`\`\``);

        return message.channel.send(serverInfo);
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
    name: "server-info",
    category: "Information",
    description: "Get information on the current server",
    usage: `information`,
    aliases: ["guild", "server", "guild-info", "guild-information", "guildinfo", "information-guild", "info-guild", "informationguild", "infoguild", "server-info", "server-information", "serverinfo", "serverinformation", "info-server", "information-server", "infoserver", "informationserver"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES", , "CREATE_INSTANT_INVITE", "MANAGE_GUILD"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 4
}