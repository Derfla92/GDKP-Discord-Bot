const { SlashCommandBuilder } = require("discord.js");
const mongoDB = require("../../mongoDB")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("characters")
        .setDescription("Shows your characters."),
    async execute(interaction) {
        const characters = await mongoDB.getCharactersFromId(interaction.user.id);

        var replyString = ">>> ";
        for (var character of characters) {
            replyString += "### "
                + character.characterName;
            if(character.gearScore && character.budget)
                replyString += " [SEMI]";
            else if(character.gearScore)
                replyString += " [BOOSTER]";
            else if(character.budget)
                replyString += " [BUYER]";
            replyString += ": "
                + "\n";
            if (character.gearScore) {
                replyString += "\tGearScore: "
                    + character.gearScore
                    + "\n"
            }
            if (character.budget) {
                replyString += "\tBudget: "
                    + character.budget
                    + "\n";
            }
        }
        await interaction.reply(replyString);
    },
};