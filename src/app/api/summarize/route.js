import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fetch from 'isomorphic-unfetch';

const genAI = new GoogleGenerativeAI("");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(`Summarize the following content: ${prompt}`);
      const response = await fetch(result.response.text()); // Assuming text() returns a URL to fetch

      const text = await response.text();
      res.json({ text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
