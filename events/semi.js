const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const mongoDb = require("./../mongoDB.js")

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === "semi") {

                const modal = new ModalBuilder()
                    .setCustomId("semiModal")
                    .setTitle("Semi");
                    
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

                const gearScore = new TextInputBuilder()
                    .setCustomId("gearscore")
                    .setLabel("What is your GearScore?")
                    .setStyle(TextInputStyle.Short)
                    .setMinLength(3)
                    .setMaxLength(4)
                    .setPlaceholder("4500+")
                    .setRequired(true);

                const firstActionRow = new ActionRowBuilder().addComponents(name);
                const secondActionRow = new ActionRowBuilder().addComponents(budget);
                const thirdActionRow = new ActionRowBuilder().addComponents(gearScore);

                modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

                await interaction.showModal(modal);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId !== "semiModal") return;
            const result = {
                name: String(interaction.fields.getTextInputValue("name")),
                budget: Number(interaction.fields.getTextInputValue("budget")),
                gs: Number(interaction.fields.getTextInputValue("gearscore"))
            }
            await mongoDb.updateSemi(result.name,result.budget,result.gs);
            await interaction.reply({ content: "Your selection has been registered!", ephemeral: true })
        }
    }
}