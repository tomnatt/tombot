var Bot = require('slackbots');
var utils = require('./lib/utils.js');
var messageForMe = utils.messageForMe;

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

  if (messageForMe(bot.self.id, message)) {

      // check it's a direct message - direct message channels start with 'D'
      if (typeof message.channel === 'string' && message.channel[0] === 'D') {
        // get the user and respond
        bot.getUserById(message.user).then(function(user) {
          bot.postMessageToUser(user.name, 'Direct response: ' + message.text, params);
        });

      } else {
        // get the channel and respond
        bot.getChannelById(message.channel).then(function(channel) {
          bot.postMessageToChannel(channel.name, "Channel response: " + message.text, params);
        });

      }

  }

});
