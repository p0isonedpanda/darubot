var self = this;

exports.commands = ["setgame"];

exports.init = function(client, config, _) {}
exports["setgame"] = {
    process: function(bot, message, suffix) {
            bot.user.setPresence({ game: { name: suffix } });
            message.channel.send("Set game to " + suffix);
    }
}