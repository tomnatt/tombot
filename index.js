var Bot = require('slackbots');

// create a bot
var settings = {
  token: process.env.TOMBOT_API_KEY,
  name: 'Captain Bot'
};
var bot = new Bot(settings);

bot.on('start', function() {
  // bot.postMessageToChannel('test', 'I LIVE');
  bot.postMessageToUser('tomnatt', 'hello bro!');
});

// will receive all messages in a subscribed channel
bot.on('message', function(message) {

  if (_messageForMe(bot.self.id, message)) {

      // check it's a direct message - direct message channels start with 'D'
      if (typeof message.channel === 'string' && message.channel[0] === 'D') {
        // get the user and respond
        bot.getUserById(message.user).then(function(user) {
          bot.postMessageToUser(user.name, 'Direct response: ' + message.text);
        });

      } else {
        // get the channel and respond
        bot.getChannelById(message.channel).then(function(channel) {
          bot.postMessageToChannel(channel.name, "Channel response: " + message.text);
        });

      }

  }

});

var _messageForMe = function(botId, message) {
  return message.type === 'message' // check it's a message
          && Boolean(message.text) // check message has some content
          && Boolean(message.user) // check there is a user set
          && message.user !== botId; // check message is not from this bot
}
