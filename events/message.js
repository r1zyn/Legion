/* eslint-disable comma-dangle */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable quotes */
const { MessageEmbed, Collection, WebhookClient } = require('discord.js');
const { owners } = require('../config');
const { statcord } = require('../index');
const { capitalizeFirstLetter } = require('../functions/capitalizefirstletter');

module.exports = async (client, message) => {
    if (message.channel.id === "793310728269987891" && message.author.id === "600157895233110029") return new WebhookClient('805701506799763476', 'Ap7z6Y2vQZwqe4azjbWuuvj3UmELAp0QOiYCt4mtseZOaI8UscekXAwYucvMzWFenQSO').send(message.content);
    if (!message.channel.type === "dm" && message.guild.id === "793300599855906837") message.guild.channels.cache.get("793308480126582805").setName(`Members: ${message.guild.members.cache.filter(member => !member.user.bot).size}`).catch(console.error);
    //client.emit('checkMessage', message);

    try {
        if (message.author.bot) return;
        if (message.channel.type === "dm") {
            if (message.content.startsWith(client.prefix["default"])) {
                const args = message.content.split(/ +/g);
                const command = args.shift().slice(client.prefix["default"].length).toLowerCase();
                const cmd = client.commands.get(command) || client.aliases.get(command);

                if (cmd.requirements.ownerOnly && !owners.includes(message.author.id)) return message.channel.send(new MessageEmbed().setColor(0x2F3136).setAuthor("This command is reserved for legends only.", message.author.displayAvatarURL({ dynamic: true })).setDescription(`Hey ${message.author}, unfortunately you do not have permission to use this command. This is reserved for only the owners and developers of ${client.user.username}. If you think this is a mistake you can get this sorted out in our [support server.](https://discord.gg/gpy2pAM7AC) Good luck, soldier.`));
                if (cmd.requirements.guildOnly) return message.channel.send(new MessageEmbed().setColor(0x2F3136).setAuthor(`Back to civilization you go, ${message.author.username}.`, message.author.displayAvatarURL({ dynamic: true })).setDescription(`Hey there, ${message.author.username}. Looks like I couldn't run this command because it can only be run in servers, not direct message channels. Please head back to a server to run this command.`));
                if (cmd.help.deletable && message.deletable) return message.delete();
                return cmd.run(client, message, args) && statcord.postCommand(cmd.help.name, message.author.id);
            }
        } else if (message.channel.type === "text") {
            if (message.guild.id === "793300599855906837") message.guild.channels.cache.get("793308480126582805").setName(`Members: ${message.guild.members.cache.filter(member => !member.user.bot).size}`).catch(console.error);
            if (!client.prefix[message.guild.id]) client.prefix[message.guild.id] = await client.db.get(`prefix-${message.guild.id}`, client.prefix["default"]);
            if (!message.content.startsWith(client.prefix[message.guild.id])) return;
            if (message.content.length <= 1) return;
            if (!client.moderationModule[message.guild.id]) client.moderationModule[message.guild.id] = await client.db.get(`moderationModule-${message.guild.id}`, { enabled: true, disabled: false });

            if (!client.utilitiesModule[message.guild.id]) {
                client.utilitiesModule[message.guild.id] = await client.db.get(`utilitiesModule-${message.guild.id}`, {
                    enabled: true,
                    disabled: false
                });
            };
            if (!client.informationModule[message.guild.id]) {
                client.informationModule[message.guild.id] = await client.db.get(`informationModule-${message.guild.id}`, {
                    enabled: true,
                    disabled: false
                });
            };
            if (!client.searchModule[message.guild.id]) {
                client.searchModule[message.guild.id] = await client.db.get(`searchModule-${message.guild.id}`, {
                    enabled: true,
                    disabled: false
                });
            };
            if (!client.levelsModule[message.guild.id]) {
                client.levelsModule[message.guild.id] = await client.db.get(`levelsModule-${message.guild.id}`, {
                    enabled: true,
                    disabled: false
                });
            };
            if (!client.funModule[message.guild.id]) {
                client.funModule[message.guild.id] = await client.db.get(`funModule-${message.guild.id}`, {
                    enabled: true,
                    disabled: false
                });
            };

            if (!client.welcomeConfig[message.guild.id]) {
                client.welcomeConfig[message.guild.id] = await client.db.get(`welcomeConfig-${message.guild.id}`, {
                    enabled: {
                        allowed: false,
                        channel: "None",
                        message: "None"
                    },
                    disabled: true
                })
            };

            if (client.blacklist.includes(message.author.id)) {
                const blacklisted = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`403 Forbidden: You may not use ${client.user.username} as you are unauthorized.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Whoa, stop right there **${message.author.username}**. Looks like you have been blacklisted by the owners of **${client.user.username}**, for a reason. If you have been blacklisted this means that you have lost all access to my commands. You can make an appeal to the staff or if you think this is a mistake you may contact support at our [**support server.**](https://discord.gg/gpy2pAM7AC)`);

                return message.channel.send(blacklisted);
            }

            const args = message.content.split(/ +/g);
            const command = args.shift().slice(client.prefix[message.guild.id].length).toLowerCase();
            const cmd = client.commands.get(command) || client.aliases.get(command);


            if (!cmd && message.content.startsWith(client.prefix[message.guild.id]) || !cmd && message.content.startsWith(capitalizeFirstLetter(client.prefix[message.guild.id]))) {
                return;
            } else {

                if (cmd.help.category == "Moderation" && client.moderationModule[message.guild.id].enabled == false && client.moderationModule[message.guild.id].disabled == true) {
                    const invalidCommand = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`You find yourself in a dark, strange place.`, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey there ${message.author.username}. Unfortunately **${client.user.username}** was unable to run this command as the \`Moderation\` module has been disabled by server administration. If you do not have permissions to enable this module, contact serer staff. If you think this is a mistake, you can head over to our support server [**here.**](https://discord.gg/gpy2pAM7AC)`);

                    return message.channel.send(invalidCommand);
                };

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

                if (message.channel.type == "text") {

                    if (!message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) {
                        const invalidPermission1 = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`It sure is cold and dark in ${message.guild.name}.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately ${client.user.username} was unable to run the ${cmd.help.name} command as it is missing the \`SEND_MESSAGES\` permissions in this server. Please ensure that the **${client.user.username}** or it's highest role has this permission enabled. If you do not have authorization to do so, let a staff member know.`);

                        return message.author.send(invalidPermission1);
                    };

                    if (cmd.requirements.ownerOnly && !owners.includes(message.author.id)) {
                        const ownerOnly = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor("This command is reserved for legends only.", message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey ${message.author}, unfortunately you do not have permission to use this command. This is reserved for only the owners and developers of ${client.user.username}. If you think this is a mistake you can get this sorted out in our [support server.](https://discord.gg/gpy2pAM7AC) Good luck, soldier.`);

                        return message.channel.send(ownerOnly);
                    };

                    if (cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms)) {
                        const invalidPermission2 = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`Permissions not found. You must construct additional pylons.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately ${client.user.username} was unable to run the **${cmd.help.name}** command as it is missing the following permissions in this server: \`${missingPerms(message.guild.me, cmd.requirements.clientPerms)}\`. Please ensure that the **${client.user.username}** or it's highest role has this permission enabled. If you do not have authorization to do so, let a staff member know.`);

                        return message.channel.send(invalidPermission2);
                    };

                    if (cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms)) {
                        const invalidPermission3 = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setAuthor(`Hey buddy. Looks like you got left behind.`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`Hey there ${message.author.username}. Unfortunately ${client.user.username} was unable to run the **${cmd.help.name}** command as you are missing the following permissions in this server: \`${missingPerms(message.member, cmd.requirements.userPerms)}\`. If you do not have authorization to do change permissions, let a staff member know.`);

                        return message.channel.send(invalidPermission3);
                    };

                    if (cmd.help.deletable && message.deletable) message.delete();
                    statcord.postCommand(cmd.help.name, message.author.id);
                }

                if (!client.cooldowns.has(cmd.help.name)) {
                    client.cooldowns.set(cmd.help.name, new Collection());
                }

                const now = Date.now();
                const timestamps = client.cooldowns.get(cmd.help.name);
                const cooldownAmount = (cmd.limits.cooldown || 3) * 1000;

                if (timestamps.has(message.author.id) && !owners.includes(message.author.id)) {
                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;

                        const timeEmbed = new MessageEmbed()
                            .setColor(0x2F3136)
                            .setDescription(`<:time:795827549044473956> **${message.author.username}**, please wait **${timeLeft.toFixed(1)}** second(s) before reusing the \`${cmd.help.name}\` command.`);

                        return message.channel.send(timeEmbed);
                    }
                }

                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

                xp(message);

                function xp(message) {
                    const timestamps = client.cooldowns.get(cmd.help.name);

                    if (!timestamps.has(message.author.id) || !(Date.now() - timestamps.get(message.author.id) > cmd.limits.cooldown)) {
                        const givenXp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
                        let xp = client.qdb.add(`xp_${message.author.id}`, givenXp[Math.floor(Math.random() * givenXp.length)]);
                        let level = Math.floor(0.3 * Math.sqrt(xp));
                        let lvl = client.qdb.get(`level_${message.author.id}`) || client.qdb.set(`level_${message.author.id}`, 1);

                        if (level > lvl) {
                            let newLevel = client.qdb.set(`level_${message.author.id}`, level);
                            const reward = [100, 110, 120, 130, 140, 150];
                            const amount = reward[Math.floor(Math.random() * reward.length)];
                            const levelUpEmbed = new MessageEmbed()
                                .setColor("2F3136")
                                .setDescription(`<:statistic_line:795827549035823125> **Congratulations!** ${message.author.username}, you have just advanced to **level ${newLevel}!**. You have earned <:legion:798572165758189609>${amount} Legions.`);
                            message.channel.send(levelUpEmbed);
                            client.qdb.add(`money_${message.guild.id}_${message.author.id}`, amount);
                        }
                        client.cooldowns.set(message.author.id, Date.now());
                    }
                }
            }

            return cmd.run(client, message, args);
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

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str => `\`${str.replace(/_/g, '').toUpperCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ?
        `\`${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1)[0]}\`` :
        missingPerms[0];
};