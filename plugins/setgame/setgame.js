var self = this;

exports.commands = ["setgame"];

exports.init = function(client, config, _) {}
exports["setgame"] = {
    process: function(bot, message, suffix) {
        if (suffix.length > 128) {
            message.channel.send("Sorry, that game title is just too damn long!");
        } else {
            bot.user.setPresence({ game: { name: suffix } });
            message.channel.send("Set game to " + suffix);
        }
    }
}