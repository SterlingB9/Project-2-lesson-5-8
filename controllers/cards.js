const fs = require('fs');
const path = require('path');

const cardsFilePath = path.join(__dirname, '../cards.json');

const getAllCards = (req, res, next) => {
    fs.readFile(cardsFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read cards file' });
        }
        // Parse the JSON data from the file
        const cards = JSON.parse(data);

        // Extract names of all cards
        const allNames = Object.values(cards[0]).map(card => `${card.name}`);

        // Send the list of names as a JSON response
        res.json(allNames);
    });
};

const getCardByName = (req, res, next) => {
    const { name } = req.params;

    fs.readFile(cardsFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading cards file' });
        }
        const cards = JSON.parse(data);

        // Loop through the cards and find the one that matches the name
        const card = Object.values(cards[0]).find(c => c.name === name);

        if (card) {
            res.json(card);
        } else {
            res.status(404).json({ message: 'Card not found' });
        }
    });
};

const createCard = (req, res) => {
    const { card_id, name, mana_cost, converted_mana } = req.body;

    if (!card_id || !name || !mana_cost || !converted_mana ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Read the current cards data from the JSON file
    fs.readFile(cardsFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read cards file' });
        }

        // Parse the cards JSON data
        const cards = JSON.parse(data);
        const cardsObj = cards[0]; // Assuming cards is an array with one object

        // Find the next available card key (e.g., 'card4')
        const nextcardKey = `card${Object.keys(cardsObj).length + 1}`;

        // Create the new card object
        const newCard = {
            card_id,
            name,
            mana_cost,
            converted_mana
        };

        // Add the new card to the cards list
        cardsObj[nextcardKey] = newCard;

        // Write the updated cards data back to the JSON file
        fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Unable to save new card' });
            }

            // Return the new card's key (ID) in the response
            return res.status(201).json({ id: nextCardKey });
        });
    });
};

const updateCard = (req, res) => {
    const { id } = req.params; // Extract card ID from URL (e.g., 'card1')
    const { card_id, name, mana_cost, converted_mana, birthday } = req.body; // Get updated fields from request body

    // Read the current cards data from the JSON file
    fs.readFile(cardsFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read cards file' });
        }

        // Parse the cards JSON data
        const cards = JSON.parse(data);
        const cardsObj = cards[0]; // Assuming cards is an array with one object

        // Check if the card with the given ID exists
        if (!cardsObj[id]) {
            return res.status(404).json({ error: `card with ID ${id} not found` });
        }

        // Update the card fields if they are provided in the request body
        if (card_id) cardsObj[id].card_id = card_id;
        if (name) cardsObj[id].name = name;
        if (mana_cost) cardsObj[id].mana_cost = mana_cost;
        if (converted_mana) cardsObj[id].converted_mana = converted_mana;
        if (birthday) cardsObj[id].birthday = birthday;

        // Write the updated cards data back to the JSON file
        fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Unable to update card' });
            }

            // Return success response with status 200 (OK)
            return res.status(200).json({ message: `card ${id} updated successfully` });
        });
    });
};

const deleteCard = (req, res) => {
    const { id } = req.params;

    // Read the current cards from the file
    fs.readFile(cardsFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading cards file' });
        }

        const cards = JSON.parse(data);

        // Check if the card with the given ID exists
        if (!cards[0][id]) {
            return res.status(404).json({ message: 'card not found' });
        }

        // Delete the card with the given ID
        delete cards[0][id];

        // Write the updated cards back to the file
        fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing to cards file' });
            }

            // Return a success response
            res.status(200).json({ message: `card ${id} deleted successfully` });
        });
    });
};

module.exports = { getAllCards, getCardByName, createCard, updateCard, deleteCard };
