const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { capitalizeFirstLetter } = require('../../functions/capitalizefirstletter');

module.exports.run = async (client, message) => {
    const args = message.content.split(" ").slice(1).join(" ");
    const query = encodeURIComponent(args);

    const package = await fetch(`http://registry.npmjs.com/${query}`).then(async response => response.json());

    const npmEmbed = new MessageEmbed()
        .setColor("#CC3C34")
        .setAuthor(`npm package information for ${package.name}`, "https://images-ext-1.discordapp.net/external/-fb8lvk8A22NkRLzcirU0lDvqW0b1MRgKSXsRoecR74/https/logodix.com/logo/1974429.png")
        .setThumbnail("https://images-ext-2.discordapp.net/external/D78j7H4M5YZ19Z_vy6N2lKIoS85EIfHY5jGJNmGHx_Q/https/upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/500px-Npm-logo.svg.png")
        .addFields(
            { name: "Name", value: `[\`${package.name}\`](https://www.npmjs.com/package/${query})`, inline: true },
            { name: "Version", value: `\`${package}\``, inline: true },
            { name: "License", value: `\`${capitalizeFirstLetter(package.license)}\``, inline: true },
            { name: "Description", value: `\`\`\`md\n> ${package.description}\`\`\`` },
            { name: "Author Information", value: `\`\`\`md\n# Author of ${package.name}\n> Name: ${package.author.name}\n> Email: ${package.author.email}\`\`\`` },
            { name: "Maintainers", value: `\`\`\`md\n# Author of ${package.name}\n> Name: ${package.author.name}\n> Email: ${package.author.email}\`\`\`` },
            /*{ name: "Home Page", value: `[\`Home Page\`](${package.links.homepage})`, inline: true },
            { name: "Repository", value: `[\`Repository\`](${package.links.repository})`, inline: true },
            { name: "Bugs", value: `[\`Bugs/Issues\`](${package.links.bugs})`, inline: true },
            { name: "Date Last Updated", value: package.date, inline: true },*/
            { name: `Keywords (${package.keywords.length})`, value: `\`\`\`md\n> ${package.keywords.join(", ")}\`\`\``, inline: true }
        )
        .setImage(`https://nodei.co/npm/${query}.png?downloads=true&stars=true`)
    return message.channel.send(npmEmbed);
}

module.exports.help = {
    name: "npm",
    category: "Search",
    description: "Search for a package in the npmjs registry (For developers)",
    usage: `npm <query>`,
    aliases: ["npmjs"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 4
}