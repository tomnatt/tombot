function messageForMe(botId, message) {
  return message.type === 'message' // check it's a message
          && Boolean(message.text) // check message has some content
          && Boolean(message.user) // check there is a user set
          && message.user !== botId; // check message is not from this bot
}

function directMessage(message) {
  // check the channel is set as a string and starts with a D
  return typeof message.channel === 'string' && message.channel[0] === 'D'
}

module.exports = {
  messageForMe: messageForMe,
  directMessage: directMessage
};