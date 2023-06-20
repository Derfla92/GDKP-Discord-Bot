const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const mongoDb = require("./../mongoDB.js")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === "buyer") {

                const modal = new ModalBuilder()
                    .setCustomId("buyerModal")
                    .setTitle("Buyer");

                const name = new TextInputBuilder()
                    .setCustomId("name")
                    .setLabel("What is your characters name?")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const budget = new TextInputBuilder()
                    .setCustomId("budget")
                    .setLabel("What is your Budget?")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                    const firstActionRow = new ActionRowBuilder().addComponents(name)
                    const secondActionRow = new ActionRowBuilder().addComponents(budget);
                modal.addComponents(firstActionRow,secondActionRow);

                await interaction.showModal(modal);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId !== "buyerModal") return;
            const result = {
                name : String(interaction.fields.getTextInputValue("name")),
                budget : Number(interaction.fields.getTextInputValue("budget"))
            }
            await mongoDb.updateBuyer(interaction.user.id,result.name,result.budget);
            await interaction.reply({ content: "Your selection has been registered!", ephemeral: true })
        }
    }
}