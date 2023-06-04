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

const updateBuyer = async (characterName, budget) => {
    const buyer = new models.Buyer({ characterName: characterName, budget: budget });

    try {
        await buyer.save();
    } catch (error) {
        console.error(error);
    }
}
const updateSemi = async (characterName, budget, gearScore) => {
    const semi = new models.Semi({ characterName: characterName, budget: budget, gearScore:gearScore });

    try {
        await semi.save();
    } catch (error) {
        console.error(error);
    }
}
const updateBooster = async (characterName, gearScore) => {
    const booster = new models.Booster({ characterName: characterName, gearScore:gearScore });

    try {
        await booster.save();
    } catch (error) {
        console.error(error);
    }
}

module.exports =
{
    connectDb,
    updateBuyer,
    updateSemi,
    updateBooster
};