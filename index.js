const { token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const mongoDb = require("./mongoDB.js")



const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const init = async () => {

    await mongoDb.connectDb();
    await client.login(token);

    await sleep(1000);
    const channels = client.channels.cache
    for (const channel of channels) {
        if (channel[1].name === "general") {
            const messages = await channel[1].messages.fetch({ limit: 100 })
            if (isInitiated(messages)) {
                return;
            }

            const buyer = new ButtonBuilder()
                .setCustomId("buyer")
                .setLabel("Buyer")
                .setStyle(ButtonStyle.Primary);

            const semi = new ButtonBuilder()
                .setCustomId("semi")
                .setLabel("Semi")
                .setStyle(ButtonStyle.Primary);

            const booster = new ButtonBuilder()
                .setCustomId("booster")
                .setLabel("Booster")
                .setStyle(ButtonStyle.Primary);



            const row = new ActionRowBuilder()
                .addComponents(buyer, semi, booster);

            channel[1].send({
                content: "What do you want to play as?",
                components: [row],
            });
            break;
        }
    }
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const isInitiated = (messages) => {
    for (const [key, value] of messages) {
        if (value.author.bot && value.author.username === "GDKP Manager") {
            return true;
        }
    }
    return false;
}

init()

