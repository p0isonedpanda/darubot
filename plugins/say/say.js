var self = this;

exports.commands = ["say"];

exports.init = function(client, config, _) {}
exports["say"] = {
    process: function(bot, message, suffix) {
            message.channel.send(suffix);
    }
}