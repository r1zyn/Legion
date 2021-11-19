"use-strict"

const { Client, Collection, WebhookClient, MessageEmbed } = require('discord.js');
const { VultrexDB } = require('vultrex.db');
const { token, prefix, hostedBy, everyoneMention, statsKey } = require('./config');
const Statcord = require('statcord.js');
const quickdb = require('quick.db');
const { GiveawaysManager } = require('discord-giveaways');
const youtube_notifier = require('youtube-notifier');

const client = new Client({
    disableEveryone: true,
    fetchAllMembers: true,
    presence: {
        status: "idle"
    },
    ws: {
        properties: {
            $browser: "discord.js"
        }
    }
});

exports.statcord = new Statcord.Client({
    client: client,
    key: statsKey,
    postCpuStatistics: true,
    postMemStatistics: true,
    postNetworkStatistics: true
});

const db = new VultrexDB({
    provider: "sqlite",
    table: "main",
    fileName: "main"
});

client.on("error", (error) => {
    return console.log(`${error.name}: ${error.message}\n ${error.stack}`);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

/*const Notifier = new youtube_notifier({
    channels: ['A channel ID', 'Another channel ID'],
    checkInterval: 50
});

Notifier.on('video', video => {
    // https://discord.com/api/webhooks/801911102689640500/oe_qRP213dMwn5EL472kXWKlbUkIQEtV8PSVEPvV2JOi7Jt2wWybCnDgGRjBPS-qzvjK
    const webhook = new WebhookClient('801911102689640500', 'oe_qRP213dMwn5EL472kXWKlbUkIQEtV8PSVEPvV2JOi7Jt2wWybCnDgGRjBPS-qzvjK');
    return webhook.send(new MessageEmbed()
        .setColor("#FF0000")
        .setAuthor(`Ascendus Development | New video uploaded YouTube`, "https://i.ibb.co/163TvZZ/Untitled-presentation-2.png")
        .setThumbnail("https://i.ibb.co/163TvZZ/Untitled-presentation-2.png")
        .setDescription(``)
        .addField(`**Video Name**`, `[${video.title}](${video.url})`)
    );
    
    video = {
        channelName,
        title,
        publishDate,
        url,
        id
    };
    
});*/

db.connect().then(async () => {
    client.commands = new Collection();
    client.aliases = new Collection();
    client.cooldowns = new Collection();
    client.snipes = new Map();
    client.prefix = new Object();
    client.prefix["default"] = prefix;
    client.db = db;
    client.qdb = quickdb;
    client.giveawaysManager = new GiveawaysManager(client, {
        storage: "./giveaways.json",
        updateCountdownEvery: 5000,
        default: {
            botsCanWin: false,
            exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
            embedColor: "#2F3136",
            reaction: "🎉"
        }
    });
    client.hostedBy = hostedBy;
    client.everyoneMention = everyoneMention;
    client.blacklist = await db.get("blacklist", []);
    client.authors = await db.get("authors", []);
    client.warned = await db.get("warned", []);
    client.punishedList = await db.get("punishedList", []);
    client.messageLog = await db.get("messageLog", []);
    client.moderationModule = new Map();
    client.informationModule = new Map();
    client.utilitiesModule = new Map();
    client.searchModule = new Map();
    client.levelsModule = new Map();
    client.funModule = new Map();
    client.welcomeConfig = new Map();

    const commands = require('./handlers/commands');
    commands.run(client);

    const events = require('./handlers/events');
    events.run(client);

    client.login(token);

    return console.log(`[ Vultrex Database ] Connected to vultrex.db`);
});

/*client.on("guildMemberAdd", member => {
    await member.createDM()
})*/