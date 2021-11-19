const { MessageEmbed, MessageAttachment, WebhookClient } = require('discord.js');

module.exports = {
    async sendIntro(message) {
        // https://discord.com/api/webhooks/801911102689640500/oe_qRP213dMwn5EL472kXWKlbUkIQEtV8PSVEPvV2JOi7Jt2wWybCnDgGRjBPS-qzvjK
        const webhook = new WebhookClient('801911102689640500', 'oe_qRP213dMwn5EL472kXWKlbUkIQEtV8PSVEPvV2JOi7Jt2wWybCnDgGRjBPS-qzvjK');
        const attachment = new MessageAttachment('https://i.ibb.co/dJ0fw1Y/Untitled-design-70.png', 'ascendus_development_introduction.png');

        await webhook.send(attachment)
            .then(() => {
                webhook.send(new MessageEmbed()
                    .setColor(0x2f3136)
                    .setAuthor(`${message.guild.name} | Official Discord Server`, message.guild.iconURL())
                    .setThumbnail(message.guild.iconURL())
                    .setDescription(`Welcome to the official Discord community server for **${message.guild.name}**. We are a programming-based all inclusive interactive community based on Discord who work together to provide free programming tutorials on YouTube, and are hoping to go even further.`)
                );
            })
            .then(() => {
                webhook.send(new MessageEmbed()
                    .setColor(0x2f3136)
                    .setDescription(`This server is for programmers to collaborate and interact with one another as well for support with your big projects, whether you're planning to kick MEE6 out of the Discord bot market or planning you're personal website, our support team has got you covered.`)
                );
            })
            .then(() => {
                webhook.send(new MessageEmbed()
                    .setColor(0x2f3136)
                    .setDescription(`You may be wondering what these messages are all about (if you haven't read the channel name or description). This channel is basically a server guideline on what you can do, what you can't, how to behave and how the server works. All the important information you need to know are right here. Alright, get reading!`))
                    ;
            })
            .then(async () => {
                await webhook.send(new MessageAttachment('https://i.ibb.co/18Bxpn9/Untitled-design-69.png', 'ascendus_development_verification_protocol.png'))
                    .then(() => {
                        webhook.send(new MessageEmbed()
                            .setColor(0x2F3136)
                            .setDescription(`You may probably be reading this message and wondering, what is this? Where are all the public discussion channels? Well, you're probably reading this because you haven't verified yourself. You can learn how to verify yourself in <#793308980730003456>.`)
                        );
                        webhook.send(new MessageEmbed()
                            .setColor(0x2F3136)
                            .setDescription(`Our server has a system to protect the community against attacks, so we have a captcha system in place. Our bot, **Legion**, will have sent you a message by now. Follow the instructions sent. If not, just send out a help call in the verification support channel and our staff will come over and assist you.`)
                        );
                    });
            })
    }
}