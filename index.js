var Bot = require('slackbots');
var utils = require('./lib/utils.js');
var incomingMessage = utils.incomingMessage;
var directMessage = utils.directMessage;
var channelMessageForMe = utils.channelMessageForMe;
var createResponse = utils.createResponse;

// create a bot
var settings = {
  token: process.env.TOMBOT_API_KEY
}

var params = {
  as_user: true
}

var bot = new Bot(settings);

bot.on('start', () => {
  bot.postMessageToUser('tomnatt', 'hello bro!', params);
});

// will receive all messages in a subscribed channel
bot.on('message', (message) => {

  if (incomingMessage(bot.self.id, message)) {

    if (directMessage(message)) {

      // TODO: maybe use a promise here?
      createResponse(message, (response) => {
        // get the user and respond
        bot.getUserById(message.user).then((user) => {
          bot.postMessageToUser(user.name, response, params);
        });
      });

    } else if (channelMessageForMe(bot.self.id, message)) {

      // TODO: maybe use a promise here?
      createResponse(message, (response) => {
        // get the channel and respond
        bot.getChannelById(message.channel).then((channel) => {
          bot.postMessageToChannel(channel.name, response, params);
        });
      });

    }

    // else ignore message

  }

});
