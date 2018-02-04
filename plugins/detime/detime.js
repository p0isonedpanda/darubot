var self = this;

exports.commands = ["detime"];

exports.init = function(client, config, _) {}
exports["detime"] = {
    process: function(bot, message, suffix) {
        var link = suffix.split("t=");
        message.channel.send(link[0].substring(0, link[0].length - 1));
    }
}