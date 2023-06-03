const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === "buyer") {

                const modal = new ModalBuilder()
                    .setCustomId("buyerModal")
                    .setTitle("Buyer");

                const budget = new TextInputBuilder()
                    .setCustomId("budget")
                    .setLabel("What is your Budget?")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(budget);

                modal.addComponents(firstActionRow);

                await interaction.showModal(modal);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId !== "buyerModal") return;
            const budgetResult = Number(interaction.fields.getTextInputValue("budget"))
            console.log(budgetResult)
            await interaction.reply({ content: "Your selection has been registered!", ephemeral: true })
        }
    }
}