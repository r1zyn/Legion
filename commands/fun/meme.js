const { MessageEmbed } = require('discord.js');
const got = require('got');

module.exports.run = async (client, message, args) => {

    try {
        got('https://www.reddit.com/r/memes/random/.json').then(async response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeurl = `https://www.reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeComments = content[0].data.children[0].data.num_comments;

            const loadingMeme = new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<a:discord_loading:796184140378144808> **Please wait while we fetch a random meme for you.**`);

            const memeEmbed = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`${client.user.username} - Random Meme Command`, message.author.displayAvatarURL({ dynamic: true }))
                .setTitle(memeTitle)
                .setURL(memeurl)
                .setImage(memeImage)
                .setDescription(`<:thumbs_up_white:796179483253538898> ${memeUpvotes}, <:thumbs_down_white:796178894809202719> ${memeDownvotes}, <:chat_white_icon:796178895119581224> ${memeComments}`)

            await message.channel.send(loadingMeme)
                .then(loadingMeme => {
                    setTimeout(async function () {
                        return loadingMeme.edit(memeEmbed);
                    }, 2000);
                });
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
    name: "meme",
    category: "Fun",
    description: "Generate a random meme",
    usage: "meme",
    aliases: ["memes"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 5
};