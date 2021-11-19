const { MessageEmbed, MessageAttachment, WebhookClient } = require('discord.js');

module.exports = {
    async sendVerify(message) {
        // https://discord.com/api/webhooks/794005588433960990/SEb-kkKMJ6mTcDFK-ntti7napUyf4DfecsZKXQCIVnPVpC1awgWCUCS83Mea5K9x7JoS
        const verificationWebhook = new WebhookClient('794005588433960990', 'SEb-kkKMJ6mTcDFK-ntti7napUyf4DfecsZKXQCIVnPVpC1awgWCUCS83Mea5K9x7JoS');
        const attachment = new MessageAttachment('https://i.ibb.co/18Bxpn9/Untitled-design-69.png', 'ascendus_development_verification_protocol.png');
        await verificationWebhook.send(attachment)
            .then(() => {
                verificationWebhook.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`${message.guild.name} | Server Member Verification Protocol`, message.guild.iconURL())
                    .setDescription(`**Hey there!** Welcome to **${message.guild.name}** and thanks for joining our official Discord server. You may probably be reading this message and wondering, what is this? Where are all the public discussion channels? Well, you're probably reading this because you haven't **verified yourself**.`)
                );
                verificationWebhook.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setDescription(`Our server has a system to protect the community against attacks, so we have a captcha system in place. Our bot, **Legion**, will have sent you a message by now. Follow the instructions sent. If not, just send out a help call in the verification support channel and our staff will come over and assist you. **Good luck!**`)
                );
            });
    }
}