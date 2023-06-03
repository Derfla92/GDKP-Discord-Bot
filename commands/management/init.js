const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("init")
        .setDescription("Initializes the bot"),
    async execute(interaction) {
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
            .addComponents(buyer,semi, booster);

        interaction.reply({
            content: "What do you want to play as?",
            components: [row],
        });

        const confirmation = await response.awaitMessageComponent();
        if (confirmation.customId === "buyer") {
            
            const buyerModal = require("../../modals/buyer.js")
            buyerModal.execute(interaction);
        }
        // else if (confirmation.customId === "semi") {
        //     await interaction.editReply({ content: 'You clicked Semi', components: [] });
        // }
        // else if (confirmation.customId === "booster") {
        //     await interaction.editReply({ content: 'You clicked Booster', components: [] });
        // }
    },
};