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
  // check it's a message
  if (message.type === 'message' && Boolean(message.text)) {

    console.log(message.user);

    // check it's not from this bot
    if (message.user !== bot.self.id) {

      // check it's a direct message - direct message channels start with 'D'
      if (typeof message.channel === 'string' && message.channel[0] === 'D') {
        console.log('Direct message:');
        console.log(message.text);

        bot.postMessageToChannel(bot.getChannelById(message.channel), message.text);

      } else {
        console.log('Channel message:');
        console.log(message.text);
      }

    } else {
      console.log("It'sa me");
    }

  }

});
