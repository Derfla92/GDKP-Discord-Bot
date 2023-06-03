const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) {
            // if(interaction.customId === "buyer")
            // {
            //     interaction.reply({content: "You clicked buyer!"})
            // } else if(interaction.customId === "semi")
            // {
            //     interaction.reply({content: "You clicked semi!"})
            // }else if(interaction.customId === "booster")
            // {
            //     interaction.reply({content: "You clicked booster!"})
            // }
            return;
        }

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
            } else {
                await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
            }
        }
    },
};