const { mongoDB } = require("./config.json");
const mongoose = require("mongoose")
const models = require("./models")


const connectDb = async () => {
    mongoose.connect(mongoDB);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", () => {
        console.log("Connected Successfully to DB!");
    });
}

const updateBuyer = async (id, characterName, budget) => {
    await models.Semi.deleteOne({ characterName: characterName });
    await models.Booster.deleteOne({ characterName: characterName });
    var buyer = await models.Buyer.findOne({ characterName: characterName });
    if (buyer) {
        buyer.budget = budget;
    }
    else {
        buyer = new models.Buyer({ id: id, characterName: characterName, budget: budget });
    }

    try {
        await buyer.save();
    } catch (error) {
        console.error(error);
    }
}
const updateSemi = async (id, characterName, budget, gearScore) => {
    console.log("Tolo")
    await models.Buyer.deleteOne({ characterName: characterName });
    await models.Booster.deleteOne({ characterName: characterName });
    var semi = await models.Semi.findOne({ characterName: characterName });
    if (semi) {
        semi.budget = budget;
        semi.gearScore = gearScore;
    }
    else {
        semi = new models.Semi({ id: id, characterName: characterName, budget: budget, gearScore: gearScore });
    }
    try {
        await semi.save();
    } catch (error) {
        console.error(error);
    }
}
const updateBooster = async (id, characterName, gearScore) => {
    await models.Buyer.deleteOne({ characterName: characterName });
    await models.Semi.deleteOne({ characterName: characterName });
    var booster = await models.Booster.findOne({ characterName: characterName });
    if (booster) {
        booster.gearScore = gearScore;
    }
    else {
        booster = new models.Booster({ id: id, characterName: characterName, gearScore: gearScore });
    }

    try {
        await booster.save();
    } catch (error) {
        console.error(error);
    }
}

const getCharactersFromId = async(id) => {
    var characters = await models.Buyer.find({id:id});
    characters.concat(await models.Semi.find({id:id}));
    characters.concat(await models.Booster.find({id:id}));
    return characters;
}

module.exports =
{
    connectDb,
    updateBuyer,
    updateSemi,
    updateBooster,
    getCharactersFromId
};