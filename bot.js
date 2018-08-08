var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const sqlite3 = require('sqlite3');

var database = getData();
var words = [ 'voltez', 'does', 'no', 'not', 'thinks', 'dev', 'sir', 'pls',
       'jiosim', 'rom', 'bro', 'carbin', 'kernal', 'voLte', 'broke',
       'work', 'good', 'bad', 'neeed', 'it', 'its', 'other',
       'legend rom', 'linage', 'rr', 'pocketmode', 'oxygen oos camera'];

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
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        //var input = args.split(',')

        switch(cmd) {
            case 'xda':
                bot.sendMessage({
                    to: channelID,
                    message: getMessage(args)
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});

function getMessage(message) {

   saveLocally("('" + message.join("'), ('") + "')");
   //database = [];
   //database = getData(); //refresh data

   var response = [];
   var length = database.length;

   for(var i = 0; i < length; i++) {	//random number of words
      var rand = Math.floor(1+ Math.random() * length);
      logger.info(database + ' - ' + rand);
      response.push(database[rand]); //to be randomly selected
   }
   for(var i = 0; i < Math.floor(Math.random() * words.length); i++)
      response.push(words[Math.floor(Math.random()*words.length)]); //to be randomly selected 

   return shuffle(response);
};

//Fisher-Yates Shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array.join(' ');
}

function saveLocally(word) {
    // open the database
    let db = new sqlite3.Database('database.sqlite');
    let sql = 'INSERT INTO givenValues VALUES ' + word;
 
    db.each(sql, (err, row) => {
      if (err) {
        throw err;
      }
      data.push(row.word);
    });
 
    // close the database connection
    db.close();
}

function getData() {
    // open the database
    var data = [];
    let db = new sqlite3.Database('database.sqlite');
    let sql = 'SELECT DISTINCT word FROM givenValues';
 
    db.each(sql, (err, row) => {
      if (err) {
        throw err;
      }
      data.push(row.word);
      logger.info("row: " + row.word);
    });
 
    // close the database connection
    db.close();
    logger.info("data: " + data);
    return data;
}

