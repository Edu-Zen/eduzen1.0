// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');
const app = express();
const port = process.env.PORT || 3000;

// Load your Dialogflow credentials
const credentials = require('./path/to/your/dialogflow/credentials.json');

// Create a Dialogflow session client
const sessionClient = new dialogflow.SessionsClient({ credentials });

app.use(bodyParser.json());

app.post('/dialogflow', async (req, res) => {
    const { query } = req.body;
    const sessionPath = sessionClient.projectAgentSessionPath(credentials.project_id, 'unique-session-id');

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: 'en-US',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        res.json({ response: result.fulfillmentText });
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Error processing request');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
