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

  // check it's a message and the message has some content
  if (message.type === 'message' && Boolean(message.text)) {

    // check there is a user set and the message is not from this bot
    if (Boolean(message.user) && message.user !== bot.self.id) {

      // check it's a direct message - direct message channels start with 'D'
      if (typeof message.channel === 'string' && message.channel[0] === 'D') {

        // get the user and respond
        bot.getUserById(message.user).then(function(user) {
          bot.postMessageToUser(user.name, 'Direct response: ' + message.text);
        });

      } else {
        console.log('Channel message:');
        console.log(message.text);

        bot.getChannelById(message.channel).then(function(channel) {
          bot.postMessageToChannel(channel.name, "Channel response: " + message.text);
        });

      }

    }

  }

});
