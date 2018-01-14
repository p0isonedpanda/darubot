const Discord = require("discord.js");
const ud = require("relevant-urban");
const config = require("./config.json");
const bot = new Discord.Client();

// Object containing commands that can be called by users
var commands = {
    "ping": {
        process: function(bot, message, suffix) {
            message.channel.send("Pong!");
        }
    },

    "say": {
        process: function(bot, message, suffix) {
            message.channel.send(suffix);
        }
    },

    "ud": {
        process: function(bot, message, suffix) {
            ud(suffix).then((udDef) => {
                message.channel.send("", {
                    embed: {
                        title: udDef.word,
                        description: udDef.definition,
                        color: 0xE86121,
                        footer: {
                            text: "Definition provided by Urban Dictionary"
                        }
                    }
                });
            }, () => {
                message.channel.send("", {
                    embed: {
                        description: "**ERROR:** No definition found!",
                        color: 0xFF0000
                    }
                });
            });
        }
    },

    "roll": {
        process: function(bot, message, suffix) {
            message.channel.send("Bear with me for a moment...");

            // Input validation
            var input = suffix.split("d");
            if (input.length != 2)
                return message.channel.send("Invalid format! Make sure you use it like `" + config.prefix + "roll [#/dice]d[#/faces]`");

            numberRolled = suffix.split("d")[0];
            faceCount = suffix.split("d")[1];
            var result = "";

            for (i = 0; i < parseInt(numberRolled); i++) {
                result += "Roll " + (i + 1) + ": " +
                    ( 1 + Math.floor(Math.random() * Math.floor(faceCount))) + "\n";
            }
            if (result == "") result = "Sorry, looks like you're trying to make me roll something I can't";
            message.channel.send(result);
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
                var logMessage = _msg.author.username + " has executed command " + cmdTxt + " | " + new Date();
            } catch (e) {
                _msg.channel.send("Unknown command!");
                var logMessage = _msg.author.username + " has executed an unknown command | " + new Date();           
            }

            console.log(logMessage);
        }
}

bot.on("ready", () => console.log("Bot logged in"));
bot.on("message", message => CheckCommand(message));

bot.login(config.token);