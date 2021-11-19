const { WebhookClient, MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    async sendRules() {
        const rule1 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**1.** Be cool, kind, and civil. Treat all members with respect and express your thoughts in a constructive manner.`);

        const rule2 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**2.** Use English in English channels only. Communicate in English, but be considerate of all languages which may be used in the international channels.`);

        const rule3 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**3.** Use an appropriate name and avatar. Avoid special characters, emoji, obscenities and impersonation.`);

        const rule4 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**4.** Do not spam unless in the spam channel. Avoid excessive messages, images, formatting, emoji and commands unless in appropriate channels.`);

        const rule5 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**5.** Do not @mention or direct message any staff unless necessary. Support staff however may be mentioned whenever needed.`);

        const rule6 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**6.** No self-promotion or advertisements. This includes unsolicited references and links to other social media, servers, communities, and services in chat or direct messages. If needed, direct message server administration for permission to put your advertisement up in the advertisement channel.`);

        const rule7 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**7.** Do not post personal information unless you feel comfortable with it. Protect your privacy and the privacy of others.`);

        const rule8 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**8.** Do not promote or encourage the use of exploits and unintended behavior. This may be harmful to other Discord users, and by breaching this rule will result in an immediate ban.`);

        const rule9 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**9.** Absolutely no coarse and derogatory language is tolerated here. Doing so may result in an immediate warn or mute, potentially even a ban or kick if necessary. No racial slurs or shaming of others.`);

        const rule10 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**10.** Rules are subject to common sense. These rules are not comprehensive and use of loopholes to violate the spirit of these rules is subject to enforcement. Other excessive rules may not be listed. Any actions breaching excessive rules will be dealt with immediately.`);

        const rule11 = new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**11.** Discord Terms of Service and Community Guidelines apply. You must be at least 13 years old to use Discord, and abide by all other terms and guidelines.`);

        const img = new MessageAttachment('https://i.ibb.co/ZVGNSLk/Untitled-design-68.png', 'ascendus_development_rules.png');
        // https://discord.com/api/webhooks/801911102689640500/oe_qRP213dMwn5EL472kXWKlbUkIQEtV8PSVEPvV2JOi7Jt2wWybCnDgGRjBPS-qzvjK
        const webhook = new WebhookClient('801911102689640500', 'oe_qRP213dMwn5EL472kXWKlbUkIQEtV8PSVEPvV2JOi7Jt2wWybCnDgGRjBPS-qzvjK');
        await webhook.send(img).then(() => {
            webhook.send(rule1);
            webhook.send(rule2);
            webhook.send(rule3);
            webhook.send(rule4);
            webhook.send(rule5);
            webhook.send(rule6);
            webhook.send(rule7);
            webhook.send(rule8);
            webhook.send(rule9);
            webhook.send(rule10);
            webhook.send(rule11);
        });
    }
}