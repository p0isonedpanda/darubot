var self = this;

exports.commands = ["ping"];

exports.init = function(client, config, _) {}
exports["ping"] = {
    process: function(bot, message, suffix) {
        message.channel.send("Pong!");
    }
}