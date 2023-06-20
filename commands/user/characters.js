const {SlashCommandBuilder} = require("discord.js");
const mongoDB = require("../../mongoDB")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("characters")
        .setDescription("Shows your characters."),
        async execute(interaction){
            const characters = await mongoDB.getCharactersFromId(interaction.user.id);
            
            var replyString = "";
            for(var character of characters)
            {   
                replyString += character.characterName;

            }
            await interaction.reply(characters);
        },
};