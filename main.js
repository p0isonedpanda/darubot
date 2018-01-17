const Discord = require("discord.js"),
      config = require("./config.json"),
      package = require("./package.json")
      plugins = require("./plugins.js"),
      bot = new Discord.Client();

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

bot.on("ready", () => {
    console.log("Bot logged in");
    bot.user.setPresence({ game: {name: "hacking SERN" } });
});
bot.on("message", message => CheckCommand(message));

bot.login(config.token);
var commands = {};
plugins.init(commands, bot, config, package);