const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const openai = require("openai");

dotenv.config();

const app = express();
app.use(bodyParser.json());

openai.apiKey = process.env.OPENAI_API_KEY;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const ingredientSchema = new mongoose.Schema({
    name: String,
    quantity: String,
    category: String,
    expiry_date: Date,
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

const recipeSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    ingredients: [String],
    preparation_time: String,
    taste: String,
    reviews: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

app.post("/ingredients", async (req, res) => {
    try {
        const { name, quantity, category, expiry_date } = req.body;
        const newIngredient = new Ingredient({ name, quantity, category, expiry_date });
        await newIngredient.save();
        res.status(200).json(newIngredient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/ingredients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, expiry_date } = req.body;
        const updatedIngredient = await Ingredient.findByIdAndUpdate(id, { quantity, expiry_date }, { new: true });
        res.status(200).json(updatedIngredient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/recipes", async (req, res) => {
    try {
        const { name, cuisine, ingredients, preparation_time, taste, reviews } = req.body;
        const newRecipe = new Recipe({ name, cuisine, ingredients, preparation_time, taste, reviews });
        await newRecipe.save();
        res.status(200).json(newRecipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/suggest-recipe", async (req, res) => {
    try {
        const { ingredients } = req.body;
        const recipes = await Recipe.find({ ingredients: { $all: ingredients } });

        if (recipes.length > 0) {
            res.status(200).json(recipes);
        } else {
            res.status(404).json({ message: "No matching recipes found." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/chatbot", async (req, res) => {
    try {
        const { user_message } = req.body;

        const response = await openai.Completion.create({
            model: "text-davinci-003",  // Or gpt-3.5-turbo
            prompt: `The user says: "${user_message}". Suggest a recipe based on the available ingredients.`,
            max_tokens: 150,
        });

        res.status(200).json({ message: response.choices[0].text.trim() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

