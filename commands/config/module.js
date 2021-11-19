const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions/capitalizefirstletter');

module.exports.run = async (client, message, args) => {

    try {
        if (!args.length) {
            const noArgs = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a module and configuration option flag and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} levels disable\``);

            return message.channel.send(noArgs);
        } else if (args[0] && args[1]) {
            if (args[0] == "private") {
                return;
            } else if (args[0] == "configuration") {
                return message.channel.send(`**${message.author.username}, you can't disable the \`configuration\` module!**`)
            } else if (args[0] == "moderation" && args[1] == "--disable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: false,
                    disabled: true
                })
                client.moderationModule[message.guild.id] = {
                    enabled: false,
                    disabled: true
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${args[0]}\` module for **${message.guild.name}** has been successfully been ${args[1]}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "moderation" && args[1] == "--enable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: true,
                    disabled: false
                })
                client.moderationModule[message.guild.id] = {
                    enabled: true, 
                    disabled: false
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "information" && args[1] == "--disable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: false,
                    disabled: true
                })
                client.informationModule[message.guild.id] = {
                    enabled: false,
                    disabled: true
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "information" && args[1] == "--enable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: true,
                    disabled: false
                })
                client.informationModule[message.guild.id] = {
                    enabled: true,
                    disabled: false
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "utilities" && args[1] == "--enable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: true,
                    disabled: false
                })
                client.utilitiesModule[message.guild.id] = {
                    enabled: true,
                    disabled: false
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "utilities" && args[1] == "--disable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: false,
                    disabled: true
                })
                client.utilitiesModule[message.guild.id] = {
                    enabled: false,
                    disabled: true
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "search" && args[1] == "--disable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: false,
                    disabled: true
                })
                client.searchModule[message.guild.id] = {
                    enabled: false,
                    disabled: true
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "search" && args[1] == "--enable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: true,
                    disabled: false
                })
                client.searchModule[message.guild.id] = {
                    enabled: true,
                    disabled: false
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "levels" && args[1] == "--enable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: true,
                    disabled: false
                })
                client.levelsModule[message.guild.id] = {
                    enabled: true,
                    disabled: false
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "levels" && args[1] == "--disable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: false,
                    disabled: true
                })
                client.levelsModule[message.guild.id] = {
                    enabled: false,
                    disabled: true
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "fun" && args[1] == "--enable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: true,
                    disabled: false
                })
                client.funModule[message.guild.id] = {
                    enabled: true,
                    disabled: false
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else if (args[0] == "fun" && args[1] == "--disable") {
                await client.db.set(`${args[0]}Module-${message.guild.id}`,{
                    enabled: false,
                    disabled: true
                })
                client.funModule[message.guild.id] = {
                    enabled: false,
                    disabled: true
                }
                return message.channel.send(new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`Success! Module configuration was successful.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`The \`${capitalizeFirstLetter(args[0])}\` module for **${message.guild.name}** has been successfully been ${args[1].slice(2)}d by **${message.author.username}**. This module can be reconfigured by server staff by running \`${client.prefix[message.guild.id]}${this.help.usage}\``)
                );
            } else {
                const invalidArguments = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid module and configuration option flag and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} levels disable\``);

                return message.channel.send(invalidArguments);
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
    name: "module",
    category: "Configuration",
    description: "Enable/disable command modules in the server",
    usage: "module <module> <--enable | --disable>",
    aliases: ["modules"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: true,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 10
};