const Discord = require('discord.js');
const Captcha = require("@haileybot/captcha-generator");

module.exports = {
    async verifyHuman(member) {
        const unverifiedRole = await member.guild.roles.cache.get('793318083242098748');
        member.roles.add(unverifiedRole);
        let captcha = new Captcha();
        await member.user.createDM().then(async dm => {
            let retryCollector = dm.createMessageCollector(m => m.author.id === member.user.id);
            const verifiedRole = await member.guild.roles.cache.get('793306935709007893');
            dm.send(
                "**Welcome to Ascendus Development. Enter the text shown in the image below in order to be verified.**",
                new Discord.MessageAttachment(captcha.PNGStream, "captcha.png")
            );
            let collector = dm.createMessageCollector(m => m.author.id === member.user.id);
            collector.on("collect", m => {
                if (m.content.toUpperCase() === captcha.value) dm.send(new Discord.MessageEmbed().setColor(0x2F3136).setDescription(`**<:white_check:795827549213163533> ${member.user.username}, you have successfully verified yourself.**`)) && member.roles.add(verifiedRole) && member.roles.remove(unverifiedRole) && retryCollector.stop();
                else dm.send(new Discord.MessageEmbed().setColor(0x2F3136).setDescription(`**<:thumbs_down_white:796178894809202719> ${member.user.username}, you have unsuccessfully verified yourself. Please try again by typing \`retry\`.**`));
                collector.stop();
            });


            retryCollector.on("collect", m => {
                if (m.content.toLowerCase() === 'retry') {
                    dm.send(
                        "**Please enter the text shown in the image below in order to be verified.**",
                        new Discord.MessageAttachment(captcha.PNGStream, "captcha.png")
                    );
                    let collector = dm.createMessageCollector(m => m.author.id === member.user.id);
                    collector.on("collect", m => {
                        if (m.content.toUpperCase() === captcha.value) dm.send(new Discord.MessageEmbed().setColor(0x2F3136).setDescription(`**<:white_check:795827549213163533> ${member.user.username}, you have successfully verified yourself.**`)) && member.roles.add(verifiedRole) && member.roles.remove(unverifiedRole) && retryCollector.stop();
                        else dm.send(new Discord.MessageEmbed().setColor(0x2F3136).setDescription(`**<:thumbs_down_white:796178894809202719> ${member.user.username}, you have unsuccessfully verified yourself. Please try again by typing \`retry\`.**`));
                        collector.stop();
                    });
                }
            })
        })
    }
}