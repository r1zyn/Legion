const { sendRules } = require('../../functions/rules');
const { sendVerify } = require('../../functions/sendVerify');
const { sendIntro } = require('../../functions/sendIntro');


module.exports.run = async (client, message, args) => {
    console.log(message.guild.id)
    console.log(message.channel.id)
    console.log(message.author.id)
    console.log(message.author.bot)
    console.log(message.channel.type)
    if (message.guild.id === '793300599855906837' && message.channel.id === '793310728269987891' && message.author.id === '760995822120468511' && !message.author.bot && message.channel.type === 'text') {
        await sendIntro(message)
            .then(async () => {
                sendRules();
            });

        //sendVerify(message);
    } else return;
};

module.exports.help = {
    name: "ascendus",
    category: "Private",
    description: "Do something...",
    usage: `ascendus`,
    aliases: ["sudncsa"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: true,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 0
}

/*module.exports.module = {
    exports: {
        module: {
            exports: {
                module: {
                    exports: {
                        module: {
                            exports: {
                                module: {
                                    exports: {
                                        module: {
                                            exports: {
                                                module: {
                                                    exports: {
                                                        module: {
                                                            exports: {
                                                                module: {
                                                                    exports: {
                                                                        module: {
                                                                            exports: {
                                                                                module: {
                                                                                    exports: {
                                                                                        module: {
                                                                                            exports: {
                                                                                                module: {
                                                                                                    exports: {
                                                                                                        module: {
                                                                                                            exports: {
                                                                                                                module: {
                                                                                                                    exports
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } 
        }
    }
}

module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports = {
    module: {
        exports: {
            module: {
                exports: {
                    module: {
                        exports: "module"
                    }
                }
            }
        }
    }
}

module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module.exports.module */