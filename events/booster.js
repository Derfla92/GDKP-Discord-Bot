const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === "booster") {

                const modal = new ModalBuilder()
                    .setCustomId("boosterModal")
                    .setTitle("Booster");

                const gearScore = new TextInputBuilder()
                    .setCustomId("gearscore")
                    .setLabel("What is your GearScore?")
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(3)
                    .setMaxLength(4)
                    .setPlaceholder("4500+")
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(gearScore);

                modal.addComponents(firstActionRow);

                await interaction.showModal(modal);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId !== "boosterModal") return;
            const gsResult = Number(interaction.fields.getTextInputValue("gearscore"))
            console.log(gsResult)
            await interaction.reply({ content: "Your selection has been registered!", ephemeral: true })
        }
    }
}