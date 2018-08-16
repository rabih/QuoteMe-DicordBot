var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });

logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 2) == '<@') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

	logger.info(cmd);
        args = args.splice(1);
        //var input = args.split(',')

        switch(cmd) {
            case '@!274028930212691979>':
                bot.sendMessage({
                    to: channelID,
                    message: '\"I\'m not doing crap then\" -Rabih Salamey 08/15/2018 4:28 pm\"'
                });
            break;
            case '@479441813682520074>':
                bot.sendMessage({
                    to: channelID,
                    message: 'Rabih created me.'
                });
            break;

            // Just add any case commands if you want to..
         }
     }
});
