var self = this;

const fs = require("fs"),
      path = require("path");

var pluginDir = "./plugins";
var pluginList = null;

self.client = null;
self.commands = null;
self.config = null;
self.plugins = [];

function getDirectories (srcPath) {
    return fs.readdirSync(srcPath).filter(f => {
        return fs.statSync(path.join(srcPath, f)).isDirectory();
    });
}

exports.init = function(commands, client, config, package) {
    self.client = client;
    self.commands = commands;
    self.config = config;

    if (!fs.existsSync(pluginDir)) {
        console.log("No plugins directory found");
    } else {
        pluginList = getDirectories(pluginDir);
    }

    for (var i = 0; i < pluginList.length; i++) {
        var plugin;
        try {
            plugin = require(pluginDir + "/" + pluginList[i]);
        } catch (e) {
            console.log("Failed to load plugin " + pluginList[i] + ": " + e);
        }

        if (plugin) {
            self.plugins.push({name: pluginList[i], plugin: plugin});

            plugin.init(client, config, package);
            console.log("Now loading plugin " + pluginList[i]);
            if ("commands" in plugin) {
                for (var j = 0; j < plugin.commands.length; j++) {
                    if (plugin.commands[j] in plugin) {
                        commands[plugin.commands[j]] = plugin[plugin.commands[j]];
                        console.log("Loaded command " + plugin.commands[j]);
                    }
                }
            }
        }
    }
}