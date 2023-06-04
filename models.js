const mongoose = require("mongoose")

const BuyerSchema = new mongoose.Schema({
    characterName: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    }
});

const SemiSchema = new mongoose.Schema({
    characterName: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    gearScore: {
        type: Number,
        required: true
    }
});

const BoosterSchema = new mongoose.Schema({
    characterName: {
        type: String,
        required: true
    },
    gearScore: {
        type: Number,
        required: true
    }
});

const Buyer = mongoose.model("Buyer", BuyerSchema);
const Semi = mongoose.model("Semi", SemiSchema);
const Booster = mongoose.model("Booster", BoosterSchema);

module.exports = {
    Buyer,
    Semi,
    Booster
}