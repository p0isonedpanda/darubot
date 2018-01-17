var self = this;

exports.commands = ["roll"];

exports.init = function(client, config, _) {}
exports["roll"] = {
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