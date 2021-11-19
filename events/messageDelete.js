module.exports = (client, message) => {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        channel: message.channel,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });
}