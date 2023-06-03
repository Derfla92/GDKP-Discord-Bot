const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === "semi") {

                const modal = new ModalBuilder()
                    .setCustomId("semiModal")
                    .setTitle("Semi");

                const budget = new TextInputBuilder()
                    .setCustomId("budget")
                    .setLabel("What is your Budget?")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const gearScore = new TextInputBuilder()
                    .setCustomId("gearscore")
                    .setLabel("What is your GearScore?")
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(3)
                    .setMaxLength(4)
                    .setPlaceholder("4500+")
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(budget);
                const secondActionRow = new ActionRowBuilder().addComponents(gearScore);

                modal.addComponents(firstActionRow,secondActionRow);

                await interaction.showModal(modal);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId !== "semiModal") return;
            const budgetResult = Number(interaction.fields.getTextInputValue("budget"))
            console.log(budgetResult)
            const gsResult = Number(interaction.fields.getTextInputValue("gearscore"))
            console.log(gsResult)
            await interaction.reply({ content: "Your selection has been registered!", ephemeral: true })
        }
    }
}