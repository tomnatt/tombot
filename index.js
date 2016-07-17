var Bot = require('slackbots');
var utils = require('./lib/utils.js');
var incomingMessage = utils.incomingMessage;
var directMessage = utils.directMessage;
var channelMessageForMe = utils.channelMessageForMe;
var createDirectResponse = utils.createDirectResponse;
var createChannelResponse = utils.createChannelResponse;

// create a bot
var settings = {
  token: process.env.TOMBOT_API_KEY
}

var params = {
  as_user: true
}

var bot = new Bot(settings);

bot.on('start', function() {
  bot.postMessageToUser('tomnatt', 'hello bro!', params);
});

// will receive all messages in a subscribed channel
bot.on('message', function(message) {

  if (incomingMessage(bot.self.id, message)) {

    if (directMessage(message)) {

      var response = createDirectResponse(message);

      // get the user and respond
      bot.getUserById(message.user).then(function(user) {
        bot.postMessageToUser(user.name, response, params);
      });

    } else if (channelMessageForMe(bot.self.id, message)) {

      var response = createChannelResponse(message);

      // get the channel and respond
      bot.getChannelById(message.channel).then(function(channel) {
        bot.postMessageToChannel(channel.name, response, params);
      });

    }

    // else ignore message

  }

});
