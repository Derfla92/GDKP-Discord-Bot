const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const mongoDb = require("./../mongoDB.js")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === "booster") {

                const modal = new ModalBuilder()
                    .setCustomId("boosterModal")
                    .setTitle("Booster");

                const name = new TextInputBuilder()
                    .setCustomId("name")
                    .setLabel("What is your characters name?")
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

                const firstActionRow = new ActionRowBuilder().addComponents(name);

                const secondActionRow = new ActionRowBuilder().addComponents(gearScore);

                modal.addComponents(firstActionRow, secondActionRow);

                await interaction.showModal(modal);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId !== "boosterModal") return;
            const result = {
                name: String(interaction.fields.getTextInputValue("name")),
                gs: Number(interaction.fields.getTextInputValue("gearscore"))
            }
            await mongoDb.updateBooster(result.name,result.gs);
            await interaction.reply({ content: "Your selection has been registered!", ephemeral: true })
        }
    }
}