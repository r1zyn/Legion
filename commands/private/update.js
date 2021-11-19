const { MessageEmbed, WebhookClient } = require('discord.js');
const { version } = require('../../config');
const { sendWelcome, sendKoruVerification } = require("../../functions/bdscdit");

module.exports.run = async (client, message, args) => {
    sendKoruVerification(message);
    /*// https://discord.com/api/webhooks/800133112796282911/BWTKJclgC9I8oiv1Yl74cXhIEq03T6PoKduzCUScjK_SgHRGt1v20pWnWy3JLUjJUqpJ
    const webhook = new WebhookClient('800133112796282911', 'BWTKJclgC9I8oiv1Yl74cXhIEq03T6PoKduzCUScjK_SgHRGt1v20pWnWy3JLUjJUqpJ');
    let clientVersion = version;

    const array = clientVersion.split(".");

    let v = parseInt(array[2]);
    v++;
    const vNumberString = v.toString();
    clientVersion = `${clientVersion.substring(0, clientVersion.length - 1)}${vNumberString}`

    const updateEmbed = new MessageEmbed()
        .setColor("#7289da")
        .setAuthor(`${client.user.username} - Official Updates | Change Log`, client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription(message.content.split(" ").slice(1).join(" "))
        .addField(`**Latest Version**`, `v${clientVersion}`, true)
        .addField(`**Updated By**`, `${message.author.tag}`, true)
        .addField(`**Date Of Update**`, `${new Date().toLocaleString("en-NZ", { month: "long" })} ${new Date().getDate()} ${new Date().getFullYear()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, true);

    webhook.send(updateEmbed);

    return message.delete();*/
}

module.exports.help = {
    name: "update",
    category: "Private",
    description: "Send a update to the update channel",
    usage: `update <message>`,
    aliases: ["updates"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: true,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 0
}