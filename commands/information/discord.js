const { MessageEmbed } = require('discord.js');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const { capitalizeFirstLetter } = require('../../functions/capitalizefirstletter');

module.exports.run = async (client, message, args) => {
    try {
        await message.channel.send(new MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`<a:discord_loading:796184140378144808> **Fetching recent data from the Discord status page, please wait.**`)
        ).then(async loader => {
            const puppeteer = require('puppeteer');
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto('https://discordstatus.com/');

                await page.waitForSelector('#custom-metrics-container');
                const element = await page.$('#custom-metrics-container');
                const screenshot = await element.screenshot({ path: "discord-api-response.png" });
                await browser.close();
            })();
        });
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
    name: "discord",
    category: "Information",
    description: "View the status and response time of the Discord API",
    usage: "discord",
    aliases: ["discordstatus", "discord-status"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    guildOnly: false,
    ownerOnly: false
};

module.exports.limits = {
    cooldown: 5
}