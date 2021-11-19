const { MessageAttachment, MessageEmbed } = require('discord.js');
const canvacord = require('canvacord');
const Canvas = require('canvas');
const { abbrev } = require('../../functions/abbrev');

module.exports.run = async (client, message, args) => {

    try {
        const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.includes(args[0])) || message.member;
        const level = client.qdb.get(`level_${member.user.id}`) || 0;
        const exp = client.qdb.get(`xp_${member.user.id}`) || 0;
        const neededXP = Math.floor(Math.pow(level / 0.1, 2));

        const every = client.qdb.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
        const rank = every.map(x => x.ID).indexOf(`xp_${member.user.id}`) + 1;

        const userLvl = client.qdb.get(`level_${message.author.id}`) || 0;
        const userExp = client.qdb.get(`xp_${message.author.id}`) || 0;
        const userNeededXP = Math.floor(Math.pow(userLvl / 0.1, 2));


        const shorten = (text, len) => {
            if (typeof text !== "string") return "";
            if (text.length <= len) return text;
            return text.substr(0, len).trim() + "...";
        }

        const renderEmoji = (ctx, msg, x, y) => {
            return renderEmoji(ctx, msg, x, y);
        }

        const toAbbrev = (num) => {
            return abbrev(num);
        }

        const assets = require("@canvacord/assets");

        const registerFonts = (fontArray = []) => {
            if (!fontArray.length) {
                setTimeout(() => {
                    // default fonts
                    Canvas.registerFont(assets("FONT").MANROPE_BOLD, {
                        family: "Manrope",
                        weight: "bold",
                        style: "normal"
                    });

                    Canvas.registerFont(assets("FONT").MANROPE_REGULAR, {
                        family: "Manrope",
                        weight: "regular",
                        style: "normal"
                    });
                }, 250);
            } else {
                fontArray.forEach(font => {
                    Canvas.registerFont(font.path, font.face);
                });
            }

            return this;
        }

        this.data = {
            width: 934,
            height: 282,
            background: {
                type: "color", //"image",
                image: "#23272A" //"https://ancestron.weebly.com/uploads/1/2/7/7/127703923/untitled-design-51_orig.png"
            },
            progressBar: {
                rounded: true,
                x: 275.5,
                y: 183.75,
                height: 37.5,
                width: 596.5,
                track: {
                    color: "#484b4E"
                },
                bar: {
                    type: "color",
                    color: "#FFFFFF"
                }
            },
            overlay: {
                display: false,
                level: 0.5,
                color: "#333640"
            },
            avatar: {
                source: member.user.displayAvatarURL({ format: "png", size: 1024 }),
                x: 70,
                y: 50,
                height: 180,
                width: 180
            },
            status: {
                width: 5,
                type: member.user.presence.status,
                color: "#43B581",
                circle: true
            },
            rank: {
                display: true,
                data: rank,
                textColor: "#FFFFFF",
                color: "#F3F3F3",
                displayText: "RANK"
            },
            level: {
                display: true,
                data: level,
                textColor: "#FFFFFF",
                color: "#F3F3F3",
                displayText: "LEVEL"
            },
            currentXP: {
                data: exp,
                color: "#FFFFFF"
            },
            requiredXP: {
                data: neededXP,
                color: "#FFFFFF"
            },
            discriminator: {
                discrim: member.user.discriminator,
                color: "rgba(255, 255, 255, 0.4)"
            },
            username: {
                name: member.user.username,
                color: "#FFFFFF"
            },
            renderEmojis: false
        };

        registerFonts();

        if (member.user.presence.status === "online") {
            this.data.status.type = "online";
            this.data.status.color = "#43B581";
        } else if (member.user.presence.status === "idle") {
            this.data.status.type = "idle";
            this.data.status.color = "#FAA61A";
        } else if (member.user.presence.status === "dnd") {
            this.data.status.type = "dnd";
            this.data.status.color = "#F04747";
        } else if (member.user.presence.status === "offline") {
            this.data.status.type = "offline";
            this.data.status.color = "#747F8E";
        } else if (member.user.presence.staus === "streaming") {
            this.data.status.type = "streaming";
            this.data.status.color = "#593595";
        }

        let bg = null;
        //if (this.data.background.type === "image") bg = await Canvas.loadImage(this.data.background.image);
        let avatar = await Canvas.loadImage(this.data.avatar.source);

        // create canvas instance
        const canvas = Canvas.createCanvas(this.data.width, this.data.height);
        const ctx = canvas.getContext("2d");

        // create background
        if (!!bg) {
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = this.data.background.image;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // add overlay
        if (!!this.data.overlay.display) {
            ctx.globalAlpha = this.data.overlay.level || 1;
            ctx.fillStyle = this.data.overlay.color;
            ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
        }

        // reset transparency
        ctx.globalAlpha = 1;

        // draw username
        ctx.font = `bold 36px Manrope`;
        ctx.fillStyle = this.data.username.color;
        ctx.textAlign = "start";
        const name = shorten(this.data.username.name, 10);

        // apply username
        !this.data.renderEmojis ? ctx.fillText(`${name}`, 257 + 18.5, 164) : await renderEmoji(ctx, name, 275.5, 164);

        // draw discriminator
        const discrim = `${this.data.discriminator.discrim}`;
        if (discrim) {
            ctx.font = `36px Manrope`;
            ctx.fillStyle = this.data.discriminator.color;
            ctx.textAlign = "center";
            ctx.fillText(`#${discrim.substr(0, 4)}`, ctx.measureText(name).width + 20 + 335, 164);
        }

        // fill level
        if (this.data.level.display && !isNaN(this.data.level.data)) {
            ctx.font = `bold 36px Manrope`;
            ctx.fillStyle = this.data.level.textColor;
            ctx.fillText(this.data.level.displayText, 800 - ctx.measureText(toAbbrev(parseInt(this.data.level.data))).width, 82);

            ctx.font = `bold 32px Manrope`;
            ctx.fillStyle = this.data.level.color;
            ctx.textAlign = "end";
            ctx.fillText(toAbbrev(parseInt(this.data.level.data)), 860, 82);
        }

        // fill rank
        if (this.data.rank.display && !isNaN(this.data.rank.data)) {
            ctx.font = `bold 36px Manrope`;
            ctx.fillStyle = this.data.rank.textColor;
            ctx.fillText(`${this.data.rank.displayText}`, 800 - ctx.measureText(toAbbrev(parseInt(this.data.level.data)) || "-").width - 7 - ctx.measureText(this.data.level.displayText).width - 7 - ctx.measureText(toAbbrev(parseInt(this.data.rank.data)) || "-").width, 82);

            ctx.font = `bold 32px Manrope`;
            ctx.fillStyle = this.data.rank.color;
            ctx.textAlign = "end";
            ctx.fillText(`#${toAbbrev(parseInt(this.data.rank.data))}`, 810 - ctx.measureText(toAbbrev(parseInt(this.data.level.data)) || "-").width - 7 - ctx.measureText(this.data.level.displayText).width, 82);
        }

        // show progress
        ctx.font = `bold 30px Manrope`;
        ctx.fillStyle = this.data.requiredXP.color;
        ctx.textAlign = "start";
        ctx.fillText("/ " + toAbbrev(this.data.requiredXP.data), 670 + ctx.measureText(toAbbrev(this.data.currentXP.data)).width + 15, 164);

        ctx.fillStyle = this.data.currentXP.color;
        ctx.fillText(toAbbrev(this.data.currentXP.data), 670, 164);

        const cx = this.data.currentXP.data;
        const rx = this.data.requiredXP.data;

        if (rx < 0) return this.data.progressBar.width = 0;
        if (cx > rx) return this.data.progressBar.width;

        let width = (this.data.currentXP.data * 615) / this.data.requiredXP.data;

        if (width > this.data.progressBar.width) width = this.data.progressBar.width;

        // draw progressbar
        ctx.beginPath();
        if (!!this.data.progressBar.rounded) {
            // bg
            ctx.fillStyle = this.data.progressBar.track.color;
            ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
            ctx.fill();
            ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
            ctx.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
            ctx.fill();

            ctx.beginPath();
            // apply color
            if (this.data.progressBar.bar.type === "gradient") {
                let gradientContext = ctx.createRadialGradient(width, 0, 500, 0);
                this.data.progressBar.bar.color.forEach((color, index) => {
                    gradientContext.addColorStop(index, color);
                });
                ctx.fillStyle = gradientContext;
            } else {
                ctx.fillStyle = this.data.progressBar.bar.color;
            }

            // progress bar
            ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
            ctx.fill();
            ctx.fillRect(257 + 18.5, 147.5 + 36.25, width, 37.5);
            ctx.arc(257 + 18.5 + width, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
            ctx.fill();
        } else {

            // progress bar
            ctx.fillStyle = this.data.progressBar.bar.color;
            ctx.fillRect(this.data.progressBar.x, this.data.progressBar.y, width, this.data.progressBar.height);

            // outline
            ctx.beginPath();
            ctx.strokeStyle = this.data.progressBar.track.color;
            ctx.lineWidth = 7;
            ctx.strokeRect(this.data.progressBar.x, this.data.progressBar.y, this.data.progressBar.width, this.data.progressBar.height);
        }

        ctx.save();

        // circle
        ctx.beginPath();
        ctx.arc(125 + 10, 125 + 20, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // draw avatar
        ctx.drawImage(avatar, 35, 45, this.data.avatar.width + 20, this.data.avatar.height + 20);
        ctx.restore();

        // draw status
        if (!!this.data.status.circle) {
            ctx.beginPath();
            ctx.fillStyle = this.data.status.color;
            ctx.arc(215, 205, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        } else if (!this.data.status.circle && this.data.status.width !== false) {
            ctx.beginPath();
            ctx.arc(135, 145, 100, 0, Math.PI * 2, true);
            ctx.strokeStyle = this.data.status.color;
            ctx.lineWidth = this.data.status.width;
            ctx.stroke();
        }

        if (member.user.bot) return;

        if (!exp) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(0x2F3136)
                    .setThumbnail(member.user.avatarURL())
                    .setAuthor(`No data was found for this user.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Hey there, **${message.author.username}**. No data was found for **${member.user.tag}**. This means this user does not have a level and exp, and has not been active enough to have gained exp. \n\n**Your Level:** \`${userLvl}\`\n**Your Exp:** \`${userExp}/${userNeededXP}\``)
            );
        } else {
            return message.channel.send(`Rank card for **${member.user.tag}**`, new MessageAttachment(canvas.toBuffer(), `rank-${message.author.id}-${message.channel.id}-${message.guild.id}.png`));
        }

    } catch (err) {
        const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.includes(args[0])) || message.member;

        const level = client.qdb.get(`level_${member.user.id}`) || 0;
        const exp = client.qdb.get(`xp_${member.user.id}`) || 0;
        const neededXP = Math.floor(Math.pow(level / 0.1, 2));

        const every = client.qdb.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
        const rank = every.map(x => x.ID).indexOf(`xp_${member.user.id}`) + 1;

        const userLvl = client.qdb.get(`level_${message.author.id}`) || 0;
        const userExp = client.qdb.get(`xp_${message.author.id}`) || 0;
        const userNeededXP = Math.floor(Math.pow(userLvl / 0.1, 2));

        const card = new canvacord.Rank()
            .setUsername(member.user.username)
            .setDiscriminator(member.user.discriminator)
            .setRank(rank)
            .setLevel(level)
            .setCurrentXP(exp)
            .setRequiredXP(neededXP)
            .setStatus(member.presence.status, false, 7)
            .setAvatar(member.user.displayAvatarURL({ format: "png", size: 1024 }))
            .renderEmojis(true)
            //.setProgressBar("#f44336", "COLOR", true)
            //.setBackground("IMAGE", 'https://ancestron.weebly.com/uploads/1/2/7/7/127703923/untitled-design-51_orig.png')
            //.setOverlay("#333640", 0.9)

        const img = await card.build();

        if (!exp) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(0x2F3136)
                    .setThumbnail(member.user.avatarURL())
                    .setAuthor(`No data was found for this user.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`${message.author}, no data was found for ${member}. This means this user does not have a level and exp, and has not been active enough to have gained exp. \n\n**Your Level:** \`${userLvl}\`\n**Your Exp** \`${userExp}/${userNeededXP}\``)
                    .setFooter("Error 404: User Exp Information Not Found")
                    .setTimestamp(new Date())
            );
        } else {
            message.channel.send(`Rank card for **${member.user.tag}**`, new MessageAttachment(img, `rank-${message.author.id}-${message.channel.id}-${message.guild.id}.png`));
        }
        return console.log(`[ ${client.user.username} ] ${err.stack}`);
    }
};

module.exports.help = {
    name: "rank",
    category: "Levels",
    description: "Get the rank of a user",
    usage: `rank [user]`,
    aliases: ["level"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 6
};