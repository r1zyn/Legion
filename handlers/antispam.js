"use-strict"

const { MessageEmbed } = require("discord.js");


module.exports = (client, options) => {

    /*Options*/
    const limitUntilWarn = (options && options.limitUntilWarn) || 3;
    const limitUntilMuted = (options && options.limitUntilMuted) || 5;
    const interval = (options && options.interval) || 2000;
    const warningMessage = (options && options.warningMessage) || "please stop spamming, or you will be automatically be muted.";
    const muteMessage = (options && options.muteMessage) || "was muted for spamming.";
    const maxDuplicatesWarning = (options && options.maxDuplicatesWarning || 7);
    const maxDuplicatesMute = (options && options.maxDuplicatesMute || 3);
    const ignoredRoles = (options && options.ignoredRoles) || [];
    const ignoredMembers = (options && options.ignoredMembers) || [];
    const mutedRole = (options && options.mutedRole) || "Muted";
    const timeMuted = (options && options.timeMuted) || 1000 * 600;
    const logChannel = (options && options.logChannel) || "server-log";

    /*Option Check*/
    if (isNaN(limitUntilWarn)) throw new Error("[ SpamCord ] ERROR: <limitUntilWarn> option is not set up right! Please check it again to be a number in settings.");
    if (isNaN(limitUntilMuted)) throw new Error("[ SpamCord ] ERROR: <limitUntilMuted> option is not set up right! Please add a number in settings.");
    if (isNaN(interval)) throw new Error("[ SpamCord ] ERROR: <interval> option is not set up right! Please add a number in settings.");
    if (!isNaN(warningMessage) || warningMessage.length < 5) throw new Error("[ SpamCord ] ERROR: <warningMessage> option must be a string and have at least 5 characters long (Including space).");
    if (!isNaN(muteMessage) || muteMessage.length < 5) throw new Error("[ SpamCord ] ERROR: <muteMessage> option must be a string and have at least 5 characters long (Including space).");
    if (isNaN(maxDuplicatesWarning)) throw new Error("[ SpamCord ] ERROR: <maxDuplicatesWarning> option is not set up right! Please check it again to be a number in settings.")
    if (isNaN(maxDuplicatesMute)) throw new Error("[ SpamCord ] ERROR: <maxDuplicatesMute> option is not set up right! Please check it again to be a number in settings.");
    if (isNaN(timeMuted)) throw new Error("[ SpamCord ] ERROR: <timeMuted> option is not set up right! Please check it again to be a number in settings.");
    if (ignoredRoles.constructor !== Array) throw new Error("[ SpamCord ] ERROR: <ignoredRoles> option is not set up right! Please check it again to be an array in settings.");
    if (ignoredMembers.constructor !== Array) throw new Error("[ SpamCord ] ERROR: <ignoredMembers> option is not set up right! Please check it again to be an array in settings.");


    client.on("checkMessage", async (message) => {

        if (message.channel.id === '793309101308117012') return;

        /*Time Variables*/
        let date = new Date();
        const ss = String(date.getSeconds()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const hrs = String(date.getHours()).padStart(1, '0');
        date = hrs + ':' + min + ':' + ss;

        let date2 = new Date();
        const weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekday = weekdayArray[date2.getDay()];
        const dd = String(date2.getDate()).padStart(2, '0');
        const mon = String(date2.getMonth() + 1);
        const year = String(date2.getFullYear()).padStart(4, '00');
        date2 = weekday + ", " + mon + '/' + dd + '/' + year;

        let amORpm;
        if (hrs >= 0 && hrs <= 12) {
            amORpm = "AM"
        } else {
            amORpm = "PM"
        };


        /*Mute Function*/
        const muteMember = async (message, muteMessage) => {

            /*Message amount for each user*/
            for (var i = 0; i < client.messageLog.length; i++) {
                if (client.messageLog[i].author == message.author.id) {
                    client.messageLog.splice(i);
                }
            }

            client.punishedList.push(message.author.id);
            client.db.set("punishedList", client.punishedList);

            let user = message.guild.members.cache.get(message.author.id);
            const reportCh = message.guild.channels.cache.find(ch => ch.name === logChannel);
            let reportChannel = message.guild.channels.cache.get(reportCh.id)

            /*Logging Channel*/
            if (!reportChannel) {
                try {
                    reportChannel = await message.guild.channels.create('server-log', {
                        type: 'text',
                        permissionOverwrites: [{
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL']
                        }]
                    })
                        .then(ch => ch.send(new MessageEmbed().setColor(0x2F3136).setAuthor(`New server logging channel for moderation actions created`, message.guild.iconURL()).setDescription(`A new channel, **${reportChannel}**, was created in this server as none was specified. This channel is where all mute and warn moderation actions by **${client.user.username}** in result of members spamming or advertising are recorded and logged. Be sure to regularly check this channel.\n\n**Created at ${ch.createdAt}**`)))
                        .catch(err => {
                            return console.error(`[ SpamCord ] ${err.stack}`);
                        });
                } catch (e) {
                    return console.error(`[ SpamCord ] ${e.stack}`);
                }
            };

            let role = message.guild.roles.cache.find(role => role.name === mutedRole);

            if (!role) {
                try {
                    role = await message.guild.roles.create({
                        data: {
                            name: "Muted",
                            color: "#000000",
                            permissions: []
                        },
                        reason: `The muted role wasn't found in this server.`
                    });
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.updateOverwrite(role, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SEND_TTS_MESSAGES: false,
                            ATTACH_FILES: false,
                            SPEAK: false,
                            VIEW_CHANNEL: false
                        });
                    });
                    reportChannel.send(new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`New muted role was created`, message.guild.iconURL())
                        .setDescription(`A new role, **${role}**, was created in this server as none was specified. This role is assigned to members in result of them spamming or advertising. Be sure to regularly check this channel.\n\n**Created at ${ch.createdAt}**`));
                } catch (err) {
                    return console.error(`[ SpamCord ] ${err.stack}`);
                }
            };

            if (user) {
                /*const roleArray = [];
                for (const role of user.roles.cache.values()) {
                    roleArray.push(role.id)
                };*/
                user.roles.remove(user.roles.cache);
                user.roles.add(role).then(() => {
                    const mutedEmbed = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`${user.user.tag} - ${user.guild.name} Server Member Mute`, user.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`**${user.user.tag} ${muteMessage}** This temporary mute will last for ${timeMuted} seconds. After this period ${user.user.tag} will be unmuted. Staff, you will need to keep an eye on this user to ensure this action does not occur again.`)
                        .addField("Responsible Moderator", `${client.user} Moderation`, true)
                        .addField("Reason For Mute", "*Repetitive Spamming*", true)
                        .addField("Duration Of Mute", `${timeMuted} seconds`, true)
                        .setFooter("Moderation at " + date2 + " at " + date + " " + amORpm + ` by ${client.user.username} Moderation`)
                    message.channel.send(mutedEmbed)
                        .then(mutedEmbed => {
                            setTimeout(function () {
                                mutedEmbed.delete();
                            }, 20000)
                        });
                    reportChannel.send(mutedEmbed);
                    setTimeout(() => {
                        user.roles.remove(role);
                        const unmutedEmbed = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`${user.user.tag} - ${user.guild.name} Server Member Unmute`, user.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`**${user.user.tag} has now been automatically unmuted. This temporary mute has lasted for ${timeMuted} seconds. Staff, you will need to keep an eye on this user to ensure this action does not occur again.`)
                        .addField("Responsible Moderator", `${client.user} Moderation`, true)
                        .addField("Reason For Mute", "*Spamming*", true)
                        .addField("Duration Of Mute", `${timeMuted} seconds`, true)
                        .setFooter("Moderation at " + date2 + " at " + date + " " + amORpm + ` by ${client.user.username} Moderation`)
                        reportChannel.send(unmutedEmbed)
                    }, timeMuted);
                    return true;
                }).catch((e) => {
                    m.channel.send(`Oops, seems like i don't have sufficient permissions to mute <@!${message.author.id}>!\n It can be that or another type of error happened! Tell me on github: https://github.com/MirageZoe/ \n Everything happened on ${TheDate} at ${clock} ${amORpm} with message:\n\n\`${e.message}\`\n\n *P.S: If this is the first time getting something like this, most likely because it was not set up good the log channel at beginning and didn't know where to send the reports. Do not panic, next time it will work since he created the channel where to send the reports!*`);
                    return false;
                });
            }
        }

        /*Warn Function*/
        const warnMember = async (m, reply) => {
            client.warned.push(m.author.id);
            client.db.set("warned", client.warned);
            m.channel.send(reply);
        }


        if (message.author.bot) return;
        if (message.channel.type !== "text" || !message.member || !message.guild || !message.channel.guild) return;

        if (message.member.roles.cache.some(r => ignoredRoles.includes(r.name)) || ignoredMembers.includes(message.author.tag)) return;

        if (message.author.id !== client.user.id) {
            let currentTime = Math.floor(Date.now());

            client.authors.push({
                "time": currentTime,
                "author": message.author.id
            });
            client.db.set("authors", client.authors);

            client.messageLog.push({
                "message": message.content,
                "author": message.author.id
            });
            client.db.set("messageLog", client.messageLog);

            let msgMatch = 0;
            for (var i = 0; i < client.messageLog.length; i++) {
                if (client.messageLog[i].message == message.content && (client.messageLog[i].author == message.author.id) && (message.author.id !== client.user.id)) {
                    msgMatch++;
                }
            }

            if (msgMatch == maxDuplicatesWarning && !client.warned.includes(message.author.id)) {
                warnMember(message, new MessageEmbed().setColor(0x2F3136).setDescription(`<:time:795827549044473956> **${message.author.tag}, please stop spamming or you will automatically be muted.**`));
            }

            if (msgMatch == maxDuplicatesMute && !client.punishedList.includes(message.author.id)) {
                muteMember(message, muteMessage);
            }

            var matched = 0;

            for (var i = 0; i < client.authors.length; i++) {
                if (client.authors[i].time > currentTime - interval) {
                    matched++;
                    if (matched == limitUntilWarn && !client.warned.includes(message.author.id)) {
                        warnMember(message, new MessageEmbed().setColor(0x2F3136).setDescription(`<:time:795827549044473956> **${message.author.tag}, please stop spamming or you will automatically be muted.**`));
                    } else if (matched == limitUntilMuted) {
                        if (!client.punishedList.includes(message.author.id)) {
                            muteMember(message, muteMessage);
                        }
                    }
                } else if (client.authors[i].time < currentTime - interval) {
                    client.authors.splice(i);
                    client.warned.splice(client.warned.indexOf(client.authors[i]));
                    client.punishedList.splice(client.warned.indexOf(client.authors[i]));
                }

                if (client.messageLog.length >= 200) {
                    client.messageLog.shift();
                }
            }
        }
    })
}