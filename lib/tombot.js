var Bot = require('slackbots');

// create a bot
var settings = {
  token: process.env.TOMBOT_API_KEY,
  name: 'tombot'
};
var bot = new Bot(settings);

bot.on('start', function() {
  // bot.postMessageToChannel('test', 'I LIVE');
  bot.postMessageToUser('tomnatt', 'hello bro!');
});

// Will receive all messages in a subscribed channel
bot.on('message', function(message) {
  // console.log(data);

  if (message.type === 'message' && Boolean(message.text)) {
    console.log(message.text);
  }

});
