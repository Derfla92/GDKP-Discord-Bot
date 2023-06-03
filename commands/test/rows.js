const {ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("row")
        .setDescription("Replies with rows"),
        async execute(interaction){
            const confirm = new ButtonBuilder()
                .setCustomId("confirm")
                .setLabel("Confirm!")
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(confirm);

            const response = await interaction.reply({
                content: "Do you want to confirm?",
                components: [row],
            });

            const collectorFilter = i => i.user.id === interaction.user.id;

            try {
                const confirmation = await response.awaitMessageComponent({filter: collectorFilter, time: 60000});
                if(confirmation.customId === "confirm")
                {
                    await interaction.editReply({content: 'bla bla success', components: []});
                }
            } catch(e)
            {
                await interaction.editReply({content: 'Confirmation not received within 1 minute, cancelling', components: []});
            }
        },
};