import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST endpoint for '/chatbot'
app.post('/chatbot', async (req, res) => {
    const { query } = req.body;
    console.log(query);
    console.log(process.env.OPENAI_API_KEY); // Check if OPENAI_API_KEY is correctly loaded from .env

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo-0125',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant.',
                    },
                    {
                        role: 'user',
                        content: 'Hello!',
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use process.env to access environment variables
                },
            }
        );

        // Assuming response structure is similar, log the completed message
        console.log(response.data.choices[0].message.content);

        res.status(200).json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error('ERROR:', error.response.data);
        res.status(500).json({ error: 'Error processing request' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
