var PersonFinder = require('./personfinder');

var pf = new PersonFinder();

function incomingMessage(botId, message) {
  return message.type === 'message' // check it's a message
          && Boolean(message.text) // check message has some content
          && Boolean(message.user) // check there is a user set
          && message.user !== botId; // check message is not from this bot
}

function directMessage(message) {
  // check it's a direct message - direct message channels start with 'D'
  return typeof message.channel === 'string' && message.channel[0] === 'D';
}

function channelMessageForMe(botId, message) {
  return typeof message.channel === 'string' // check it's a string
          && message.channel[0] === 'C' // channel messages start with 'C'
          && message.text.startsWith('<@' + botId + '>:'); // check it's for me
}

function createChannelResponse(message) {
  return createResponse(message) || 'Channel response: ' + message.text;
}

function createDirectResponse(message) {
  return createResponse(message) || 'Direct response: ' + message.text;
}

function createResponse(message) {
  if (message.text.startsWith('person')) {
    return pf.getUserByUsername(message.text.substring(7));
  } else {
    return false;
  }
}

module.exports = {
  incomingMessage: incomingMessage,
  directMessage: directMessage,
  channelMessageForMe: channelMessageForMe,
  createChannelResponse: createChannelResponse,
  createDirectResponse: createDirectResponse
};
