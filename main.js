const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();

// Object containing commands that can be called by users
var commands = {
    "ping": {
        process: function(bot, message, suffix)
        {
            message.channel.send("Pong!");
        }
    },

    "say": {
        process: function(bot, message, suffix)
        {
            message.channel.send(suffix);
        }
    }
}

// Check the message is indeed a command
function CheckCommand(_msg) {
    if (_msg.author.id != bot.user.id && (_msg.content.startsWith(config.prefix))) {
            var cmdTxt = _msg.content.split(" ")[0].substring(config.prefix.length);
            var suffix = _msg.content.substring(cmdTxt.length + config.prefix.length + 1);
            var cmd = commands[cmdTxt];

            if (cmd) {
                if (_msg.author == bot.user) return;
            }
            
            try {
                cmd.process(bot, _msg, suffix);
                console.log(_msg.author.username + " has executed command " + cmdTxt + " | " + new Date());
            } catch (e) {
                _msg.channel.send("Unknown command!");
                console.log(_msg.author.username + " has executed an unknown command | " + new Date());                
            }
        }
}

bot.on("ready", () => console.log("Bot logged in"));
bot.on("message", message => CheckCommand(message));

bot.login(config.token);