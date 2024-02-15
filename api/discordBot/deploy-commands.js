import { fileURLToPath, pathToFileURL } from 'node:url';
import path, { dirname } from 'path';
import fs from 'fs';
import { REST, Routes } from 'discord.js';
import { getClientId, getGuildId, getToken } from '../../config/discord.config.js';

const token = getToken()
const clientId = getClientId()
const guildId = getGuildId()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const commands = [];

// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const importCommand = async (filePath) => {
    const commandUrl = pathToFileURL(filePath); // Convert the file path to a URL
    const commandModule = await import(commandUrl.href);
    return {
        data: commandModule.data,
        execute: commandModule.execute,
        cooldown: commandModule.coodown
    };
};

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        console.log("file:", file)
        const filePath = path.join(commandsPath, file);
        const command = await importCommand(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();