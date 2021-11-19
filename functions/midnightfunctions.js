const { MessageEmbed, MessageAttachment, WebhookClient } = require('discord.js');

module.exports = {
    async rules(message) {
        // https://discord.com/api/webhooks/810980100513333288/Lzbl9_SgBxmLC2n7SXBIPWK-1MzTMhBapyg8jQDoPP7GcDdkNoOKiC759ZK8k6i-ounT
        const rulesWebhook = new WebhookClient('810980100513333288', 'Lzbl9_SgBxmLC2n7SXBIPWK-1MzTMhBapyg8jQDoPP7GcDdkNoOKiC759ZK8k6i-ounT');
        const rulesImage = new MessageAttachment('https://i.ibb.co/zhc9ws0/Untitled-design-2.png', 'midnight_development_rules.png');
        await rulesWebhook.send(rulesImage)
            .then(() => {
                rulesWebhook.send(new MessageEmbed()
                    .setColor("#eeff41")
                    .setAuthor(`${message.guild.name} - Server Rules and Guidelines`, message.guild.iconURL())
                    .setDescription(`Hey there, welcome to **${message.guild.name}**! Please take a moment to read the rules before getting started. Once you have read all of it, please react with :white_check_mark: to let us know you have read the rules and verified.`)
                );
            })
            .then(async () => {
                rulesWebhook.send(new MessageEmbed()
                    .setColor("#eeff41")
                    .setDescription('```md\n[Rule #1]: Follow Discord\'s ToS\n```\n- https://discordapp.com/terms\n\n- https://support.discordapp.com/hc/en-us/articles/360024871991-Discord-Partnership-Code-of-Conduct\n\n```md\n[Rule #2]: Keep everything FAMILY FRIENDLY\n```\n- No excessive swearing.\n\n- Keep ALL usernames, photos (including avatars), and other visible content FAMILY FRIENDLY.\n\n- Any kind of adult content will result in a permanent ban from the server.\n\n```md\n[Rule #3]: Pings\n```\n- Pinging any staff member above the ADMIN role will result in a temporary mute.\n\n- ALL names should be easily pingable by staff (No special characters or emojis in you name) If this happens, staff members may change your in server nickname.\n\n```md\n[Rule #4]: Channel Usage\n```\n- ALL content posted in the server should be posted in the correct channels.\n\n- More information about what you can post can be found in the channel descriptions.\n\n```md\n[Rule #5]: Spam (Repetition of the same word, phrase, or emoji.)\n```\n- Intentionally flooding the chat will result in a temporary mute.\n\n- Using Block/Code text or "Spoilers" will only be allowed in certain channels. (This information can be found in the channel description.)\n\n```md\n[Rule #6]: Respect Others\n```\n- Do not bring up conversation themes which may be deemed controversial with people\'s beliefs or backgrounds. (Depression, Self-Harm, Suicidal Jokes & References, Politics, Sexuality, Religion, etc.)\n\n```md\n[Rule #7]: Evading Moderation\n```\n- Attempting to evade moderation by saying words differently or owning alt accounts will not be tolerated.\n\n```md\n# Not all rules are listed here.\n\n> Any other actions that may cause problems will be dealt with accordingly.\n\n> We judge each situation individually and take action based on the severity of the offence.\n```')
                );
            });
    },
    async verification(message) {
        // https://discord.com/api/webhooks/810993612476252171/RJlU_Ie1tZrgZblo0EuN6lDl4AEpuErRhCc1lzA9DTg9jRu0JR4ZKAtQCGy_fDOIW1-W
        const verificationWebhook = new WebhookClient('810993612476252171', 'RJlU_Ie1tZrgZblo0EuN6lDl4AEpuErRhCc1lzA9DTg9jRu0JR4ZKAtQCGy_fDOIW1-W');
        const verificationImage = new MessageAttachment('https://i.ibb.co/C29FBZ4/Untitled-design-3.png', 'midnight_development_verification.png');
        const onegbRole = message.guild.roles.cache.get("810989551162097696");
        await verificationWebhook.send(verificationImage)
            .then(async () => {
                await verificationWebhook.send(new MessageEmbed()
                    .setColor(0xeeff41)
                    .setAuthor(`${message.guild.name} - Getting Verified | Verification Proccess`, message.guild.iconURL())
                    .setDescription(`Hey there, welcome to **${message.guild.name}**! You may be wondering where all the channels there usually are in other servers are, or where your cool new role is. Our server has a verification process to protect everyone against bots.`)
                ).then(() => {
                    verificationWebhook.send(new MessageEmbed()
                        .setColor(0xeeff41)
                        .setDescription(`In order to gain full access to the server, you will be required to read through the rules (${message.guild.channels.cache.get("762354736338567198")}). Once you have done so, react with the :white_check_mark: emoji. You will then automatically receive your role. **Please remember that if you react you are agreeing to follow the rules. If found breaching them you will be punished accordingly to your actions.**`)
                    );
                }).then(() => {
                    verificationWebhook.send(new MessageEmbed()
                        .setColor(0xeeff41)
                        .setAuthor(`Getting Verified | Frequently Asked Questions`, 'https://cdn.discordapp.com/emojis/807793673081192489.png?v=1')
                        .setDescription(`**Question:** Why do I need to do this?\n**Answer:** This is mainly to protect our community and maintain security within the server.`)
                    );
                }).then(() => {
                    verificationWebhook.send(new MessageEmbed()
                        .setColor(0xeeff41)
                        .setDescription(`**Question:** Will the staff have any information related to me if I verify?\n**Answer:** **No.** Reacting simply results in you being assigned the starting member role (${onegbRole}). No data is collected.\n\n**If you have any complaints or queries don’t hesitate to contact an assistant, moderator or administrator.**`)
                    );
                })
            });
    },
    async information(message) {
        // https://discord.com/api/webhooks/811001218503016478/WfvNwdNEevs95ASpAFITGfNSvH2rwqmadCgFZAZ5UbnkGVwLjq9qe0l_tY-whLAKZFCO
        const informationWebhook = new WebhookClient('811001218503016478', 'WfvNwdNEevs95ASpAFITGfNSvH2rwqmadCgFZAZ5UbnkGVwLjq9qe0l_tY-whLAKZFCO');
        const informationImage = new MessageAttachment('https://i.ibb.co/PmYT5nz/Untitled-design-4.png', 'midnight_development_information.png');
        await informationWebhook.send(informationImage)
            .then(async () => {
                informationWebhook.send(new MessageEmbed()
                    .setColor(0xeeff41)
                    .setAuthor(`Welcome to ${message.guild.name} | Information (Roles, Applications/Links, Navigation, Partnerships and Boosting)`, message.guild.iconURL())
                    .setDescription(`**Hello ${message.guild.roles.cache.get('810990979913351179')} and welcome to ${message.guild.name}!** ${message.guild.name} is a Coding/Technology server that strives to help others with their coding/tech problems, getting others ready for the future of development and making the community of developers better. At ${message.guild.name}, we have several coders ready to help any and all members with their code. If you are having trouble learning or getting something right in your code let us help.`)
                );
            })
    }
}