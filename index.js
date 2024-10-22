const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);

// Middleware untuk CORS
app.use(cors());

// Fungsi untuk LuminAI
async function rekaai(message, prompt) {
  try {
    const response = await axios.post('https://chat.reka.ai/', {
      messages: [
        { role: 'user', content: message }
      ]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Fungsi untuk chateverywhere
async function chateverywhere(message, prompt) {
  try {
    const response = await axios.post('https://chateverywhere.app/id', {
      messages: [
        { role: 'user', content: message }
      ]
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Fungsi untuk shana
async function shana(message) {
  try {
    const response = await axios.post('https://www.blackbox.ai/agent/shana02nFp7d', {
      messages: [{ role: 'user', content: message }],
      useRag: true,
      llm: 'gpt-4o',
      similarityMetric: 'cosine'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Fungsi untuk shana
async function remanhwa-flash(message) {
  try {
    const response = await axios.post('https://chat.remanhwa.online', {
      messages: [{ role: 'user', content: message }],
      useRag: true,
      llm: 'gemma2-9b-it',
      similarityMetric: 'cosine'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Fungsi untuk shana
async function shanapro(message) {
  try {
    const response = await axios.post('https://www.blackbox.ai/agent/shana02nFp7d', {
      messages: [{ role: 'user', content: message }],
      useRag: true,
      llm: 'Gemini-Pro',
      similarityMetric: 'cosine'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Fungsi untuk shana
async function shanabeta3.5(message) {
  try {
    const response = await axios.post('https://www.blackbox.ai/agent/shana02nFp7d', {
      messages: [{ role: 'user', content: message }],
      useRag: true,
      llm: 'Claude-Sonnet-3.5',
      similarityMetric: 'cosine'
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function blackboxAIChat(message) {
  try {
    const response = await axios.post('https://www.blackbox.ai/', {
      messages: [{ id: null, content: message, role: 'user' }],
      id: null,
      previewToken: null,
      userId: null,
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: false,
      githubToken: null
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// Endpoint untuk servis dokumen HTML
app.get('/v1', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint untuk LuminAI
app.get('/v1/api/chateverywhere', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await chateverywhere(message);
    res.status(200).json({
      status: 200,
      creator: "remanhwa",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/v1/api/rekaai', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await rekaai(message);
    res.status(200).json({
      status: 200,
      creator: "remanhwa",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint untuk shana
app.get('/v1/api/shana', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await shana(message);
    res.status(200).json({
      status: 200,
      creator: "Remanhwa",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk degreeGuru
app.get('/v1/api/remanhwa-flash', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await remanhwa-flash(message);
    res.status(200).json({
      status: 200,
      creator: "Remanhwa",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk shanapro
app.get('/v1/api/shanapro', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await shanapro(message);
    res.status(200).json({
      status: 200,
      creator: "shanachan",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk smartContract
app.get('/v1/api/shanabeta3.5', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await shanabeta3.5(message);
    res.status(200).json({
      status: 200,
      creator: "Remanhwa",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk blackboxAIChat
app.get('/v1/api/blackboxAIChat', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await blackboxAIChat(message);
    res.status(200).json({
      status: 200,
      creator: "Remanhwa",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle 404 error
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app
      
