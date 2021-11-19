const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions/capitalizefirstletter');

module.exports.run = (client, message, args) => {
    try {
        if (!args[0]) {
            const helpEmbed = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`${client.user.username} - Module Help Centre Documentation`, client.user.displayAvatarURL({ dynamic: true }))
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Welcome to the module/command help centre documentation for **${client.user.username}**, where you can view the full directory of modules and commands. You can join the <:legion:798572165758189609> **${client.user.username} Community** [**here.**](https://discord.gg/gpy2pAM7AC)`);

            if (client.moderationModule[message.guild.id].enabled == true && client.moderationModule[message.guild.id].disabled == false) {
                helpEmbed.addField(`**<:white_check:795827549213163533> Moderation Module | ${client.prefix[message.guild.id]}help moderation**`, `Control your server with a wide variety of moderation commands for you and your server staff to enforce the rules.`);
            }
            if (client.informationModule[message.guild.id].enabled == true && client.informationModule[message.guild.id].disabled == false) {
                helpEmbed.addField(`**<:file:795827719714635796> Information Module | ${client.prefix[message.guild.id]}help information**`, `Tired of having to head over to server settings to view information? **No problem.** We provide simple information commands with all the data and statistics you need.`);
            }
            if (client.utilitiesModule[message.guild.id].enabled == true && client.utilitiesModule[message.guild.id].disabled == false) {
                helpEmbed.addField(`**<:external_link:795827549157589052> Utilties Module | ${client.prefix[message.guild.id]}help utilities**`, `Need an extra boost? **${client.user.username}** provides additional unique powerful features such a weather forecast and customizable prefix system to suit your needs.`);
            }
            if (client.searchModule[message.guild.id].enabled == true && client.searchModule[message.guild.id].disabled == false) {
                helpEmbed.addField(`**<:globe:795827719707033621> Search Module | ${client.prefix[message.guild.id]}help search**`, `Surfing the web has never been easier. With **${client.user.username}** you can search things up on popular websites such as the Urban dictionary or YouTube, or for developers the discord.js documentation.`);
            }
            if (client.levelsModule[message.guild.id].enabled == true && client.levelsModule[message.guild.id].disabled == false) {
                helpEmbed.addField(`**<:statistic_line:795827549035823125> Levels Module | ${client.prefix[message.guild.id]}help levels**`, `Server members not interacting enough? Bring on a challenge with our leveling system for members to grind exp and view their progress with unique server rank cards.`);
            }
            if (client.funModule[message.guild.id].enabled == true && client.funModule[message.guild.id].disabled == false) {
                helpEmbed.addField(`**<:star_white:796178895124430859> Fun Module | ${client.prefix[message.guild.id]}help fun**`, `Spice up your server and have a laugh with our interactive **fun commands**. Features include images and video commands as well as an exclusive **economy system.**`);
            }

            helpEmbed.addField(`**<:config_white_icon:796178894927298611> Configuration Module | ${client.prefix[message.guild.id]}help configuration**`, `Want to customize **${client.user.username}**? Sure, go ahead with the configuration module to suit your needs.`);

            return message.channel.send(helpEmbed);
        } else if (args[0]) {
            if ([...new Set(client.commands.map((c) => c.help.category.toLowerCase()))].includes(args[0])) {
                if (args[0] == "moderation" && client.moderationModule[message.guild.id].enabled == false && client.moderationModule[message.guild.id].disabled == true) {
                    const invalidCommand = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Moderation\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                    return message.channel.send(invalidCommand);
                }

                if (args[0] == "information" && client.informationModule[message.guild.id].enabled == false && client.informationModule[message.guild.id].disabled == true && cmd.help.name !== "help") {
                    const invalidCommand = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Information\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                    return message.channel.send(invalidCommand);
                }

                if (args[0] == "utilities" && client.utilitiesModule[message.guild.id].enabled == false && client.utilitiesModule[message.guild.id].disabled == true) {
                    const invalidCommand = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Utilities\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                    return message.channel.send(invalidCommand);
                }

                if (args[0] == "search" && client.searchModule[message.guild.id].enabled == false && client.searchModule[message.guild.id].disabled == true) {
                    const invalidCommand = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Search\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                    return message.channel.send(invalidCommand);
                }

                if (args[0] == "levels" && client.levelsModule[message.guild.id].enabled == false && client.levelsModule[message.guild.id].disabled == true) {
                    const invalidCommand = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Levels\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                    return message.channel.send(invalidCommand);
                }

                if ((args[0] == "fun") && client.funModule[message.guild.id].enabled == false && client.funModule[message.guild.id].disabled == true) {
                    const invalidCommand = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Fun\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                    return message.channel.send(invalidCommand);
                }

                [...new Set(client.commands.map((c) => c.help.category.toLowerCase()))].includes(args[0]) ? message.channel.send(new MessageEmbed().setColor(0x2F3136).setAuthor(`${client.user.username} Module Help Centre | ${capitalizeFirstLetter(args[0])} Module (${client.commands.filter(cmd => cmd.help.category.includes(args[0][0].toUpperCase() + args[0].slice(1))).size})`, client.user.displayAvatarURL({ dynamic: true })).setThumbnail(client.user.displayAvatarURL({ dynamic: true })).setDescription(`**<:file:795827719714635796> Run \`${client.prefix[message.guild.id]}help <command>\` to get help on a command.**\n\n${client.commands.filter((c) => c.help.category.toLowerCase() === args[0].toLowerCase()).map((c) => `\`${c.help.name}\``).join(", ")}`)) : message.channel.send(new MessageEmbed().setColor(0x2F3136).setAuthor(`This help module was not found in the directory.`, message.author.displayAvatarURL({ dynamic: true })).setDescription(`${message.author}, the module you are looking for was not found in the directory. To view the list of modules, use the \`${client.prefix[message.guild.id]}help\` command without any arguments. To view the list of commands for each module, use \`${client.prefix[message.guild.id]}help <module>\`.\n\n**Usage:** \`${client.prefix[message.guild.id]}help [module | command]\`\n**Example:** \`${client.prefix[message.guild.id]}help information\``));
            } else if (![...new Set(client.commands.map((c) => c.help.category.toLowerCase()))].includes(args[0])) {
                let cmd = client.commands.get(args[0].toLowerCase());
                if (!cmd) cmd = client.aliases.get(args[0].toLowerCase());

                if (!cmd && ![...new Set(client.commands.map((c) => c.help.category.toLowerCase()))].includes(args[0])) {
                    return message.channel.send(new MessageEmbed().setColor(0x2F3136).setAuthor(`This help command was not found in the directory.`, message.author.displayAvatarURL({ dynamic: true })).setDescription(`${message.author}, the command you are looking for was not found in the directory. To view the list of commands, use the \`${client.prefix[message.guild.id]}help\` command without any arguments. To view the list of commands for each module, use \`${client.prefix[message.guild.id]}help <module>\`.\n\n**Usage:** \`${client.prefix[message.guild.id]}help [module | command]\`\n**Example:** \`${client.prefix[message.guild.id]}help information\``));
                } else if (cmd && ![...new Set(client.commands.map((c) => c.help.category.toLowerCase()))].includes(args[0].toLowerCase())) {
                    if (cmd.help.category == "Moderation" && client.moderationModule[message.guild.id].enabled == false && client.moderationModule[message.guild.id].disabled == true) {
                        const invalidCommand = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Moderation\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                        return message.channel.send(invalidCommand);
                    }

                    if (cmd.help.category == "Information" && client.informationModule[message.guild.id].enabled == false && client.informationModule[message.guild.id].disabled == true && cmd.help.name !== "help") {
                        const invalidCommand = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Information\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                        return message.channel.send(invalidCommand);
                    }

                    if (cmd.help.category == "Utilities" && client.utilitiesModule[message.guild.id].enabled == false && client.utilitiesModule[message.guild.id].disabled == true) {
                        const invalidCommand = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Utilities\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                        return message.channel.send(invalidCommand);
                    }

                    if (cmd.help.category == "Search" && client.searchModule[message.guild.id].enabled == false && client.searchModule[message.guild.id].disabled == true) {
                        const invalidCommand = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Search\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                        return message.channel.send(invalidCommand);
                    }

                    if (cmd.help.category == "Levels" && client.levelsModule[message.guild.id].enabled == false && client.levelsModule[message.guild.id].disabled == true) {
                        const invalidCommand = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Levels\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                        return message.channel.send(invalidCommand);
                    }

                    if (cmd.help.category == "Fun" && client.funModule[message.guild.id].enabled == false && client.funModule[message.guild.id].disabled == true) {
                        const invalidCommand = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Fun\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                        return message.channel.send(invalidCommand);
                    }

                    const commandHelpEmbed = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`${client.user.username} Command Help Centre | ${capitalizeFirstLetter(cmd.help.name)} Command`, client.user.displayAvatarURL({ dynamic: true }))
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`**Name:** \`${cmd.help.name}\`\n**Description:** \`${cmd.help.description}\`\n**Module:** \`${cmd.help.category}\` | **Usage:** \`${client.prefix[message.guild.id]}${cmd.help.usage}\` | **Cooldown:** \`${cmd.limits.cooldown}\`\n**Command Aliases:** ${cmd.help.aliases.length ? cmd.help.aliases.map(name => `\`${name}\``).join(", ") : "`None`"}\n**User Permissions:** ${cmd.requirements.userPerms.map(req => `\`${req}\``).join(", ")}\n**Bot Permissions:** ${cmd.requirements.clientPerms.map(creq => `\`${creq}\``).join(", ")}`)
                        .setFooter(`[] = Optional Arguments | <> = Compulsory Arguments`)

                    return message.channel.send(commandHelpEmbed);
                }
            }
        }
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
    name: "help",
    category: "Information",
    description: "View all the help modules and commands for ${client.user.username}",
    usage: "help [module | command]",
    aliases: ["help", "hlep", "hepl"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 10
};