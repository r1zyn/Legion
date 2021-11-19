/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
const { MessageEmbed, Webhook } = require("discord.js");

module.exports = {
    sendWelcome: (message) => {
        const webhook = new Webhook("839775194410254336", "s02aNkVo23CH3cCoAalxrSW3jyU4KQQU_tqbWi5AXw6Q_kRunGfN4wfJxHG_g6vK8Me1");
        return webhook.send(new MessageEmbed()
            .setColor(0x2f3136)
            .setAuthor(`Welcome to the server | Official BDSC DIT Community Server`, message.guild.iconURL())
            .setThumbnail(message.guild.iconURL())
            .setDescription(`Welcome to the official BDSC DIT Community Discord server, created by <@433846401072496640> for all Botany Downs Secondary College students partaking in the Digital Technologies (DIT) classes to converse, discuss and collaborate with homework and assignments, or just to hang out and chill in general. Here in this server we have may perks to offer, ranging from programming support to awesome games for you to participate in. We expect all members to comply with our server guidelines (<#839013277559554089>), otherwise, enjoy your stay in the server.`)
        );        
    },
    sendKoruVerification: (message) => {
        // https://discord.com/api/webhooks/841949433616531486/bPoubhRj21WwZu1ANFgYjPyypdzpuCcVZZ8DvGEXYaQSwjEbTSgZy4LJ6odOHuQ-S2oX
        const webhook = new Webhook("841949433616531486", "bPoubhRj21WwZu1ANFgYjPyypdzpuCcVZZ8DvGEXYaQSwjEbTSgZy4LJ6odOHuQ-S2oX");
        return webhook.send(new MessageEmbed()
            .setColor(0x2f3136)
            .setAuthor(`Koru Whanau Discord Server | Server Verification Information`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`Welcome to the Koru Whanau Discord server. Before gaining full access to the server you must verify yourself as a human. To verify yourself type \`s!verify\` in <#841814738593906748>. A bot will send instructions, you simply need to follow them. If you have any issues, you can get help in <#841814782549426187>.`)
        );
    }
};