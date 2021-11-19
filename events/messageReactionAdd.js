module.exports = async (client, reaction, user) => {
    return console.log(`${user.username} reacted with ${reaction.emoji.name} in ${user.guild.name} (${(await user.guild).fetchInvites().url})`);
};