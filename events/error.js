const { MessageEmbed } = require('discord.js');

module.exports = async (client, err) => {

    const channel = client.channels.cache.get('778504923402338304');
    console.log(err);

    channel.send(new MessageEmbed()
        .setColor(0x2F3136)
        .setDescription(`[ ${client.user.username} ] ${err}`)
    );

    const errorEmbed = new MessageEmbed()
        .setColor(0x2F3136)
        .setAuthor(`Error 500 - An internal server error occured. That's all we know.`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`It seems that something has gone wrong! Sadly there isn't much you and I can do. We do our best to maintain ${client.user.username} to service your needs, otherwise it wouldn't be your go-to Discord bot! Please be patient and don't panic, just take a quick trip to our [support server](https://discord.gg/gpy2pAM7AC) and contact staff from there. Good luck soldier.`)
        .setFooter("ERROR 500 - AN INERNAL SERVER ERROR OCCURED")
        .setTimestamp(new Date());

    return message.channel.send(errorEmbed);    
};