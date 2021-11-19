const { verifyHuman } = require('../functions/verifyHuman');

module.exports = async (client, member) => {
    if (member.guild.id === "793300599855906837") {
        verifyHuman(member);
    } else return;
}