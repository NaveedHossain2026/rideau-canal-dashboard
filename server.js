require('dotenv').config();
const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Cosmos DB Setup
const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const database = client.database("RideauCanalDB");
const container = database.container("SensorAggregations");

app.use(express.static('public'));

// Endpoint 1: Get latest status for cards
app.get('/api/status', async (req, res) => {
    try {
        // We use _ts (Azure's internal timestamp) to ensure we get the absolute newest records
        const querySpec = {
            query: "SELECT TOP 3 * FROM c ORDER BY c._ts DESC"
        };
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint 2: Get last hour of data for charts
app.get('/api/history', async (req, res) => {
    try {
        // 1. Changed 'c.timestamp' to 'c.windowEnd'
        // 2. Sorting by _ts to ensure chronological order
        const querySpec = {
            query: "SELECT TOP 30 * FROM c ORDER BY c._ts DESC"
        };
        const { resources: items } = await container.items.query(querySpec).fetchAll();
        
        // We reverse them so the chart draws from past to present (left to right)
        res.json(items.reverse());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(port, () => console.log(`Dashboard live at http://localhost:${port}`));