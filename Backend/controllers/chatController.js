const OpenAI = require('openai');

// Initialize OpenAI client once per process
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function getSystemMessage(mode) {
  if (mode === 'error-rectifier') {
    return "You are an expert at debugging and fixing code errors. Analyze the error and provide a clear solution.";
  }
  if (mode === 'source-code') {
    return "You are an expert at analyzing and explaining source code. Provide detailed explanations and improvements.";
  }
  return "You are a helpful AI assistant.";
}

async function chatCompletion(req, res, next) {
  try {
    const { prompt, mode } = req.body || {};

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required and must be a string' });
    }

    const systemMessage = getSystemMessage(mode);

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return res.json({ response: completion.choices?.[0]?.message?.content || '' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  chatCompletion
};


