const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NOT_FOUND_STATUS,
} = require('./HTTP-status');
const { getTalker, setTalker } = require('./fs-utils');
const {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidNewTalkerName,
  isValidNewTalkerAge,
  isValidNewTalkerTalk,
  isValidNewTalkerWatchedAtLength,
  isValidNewTalkerWatchedAt,
  isValidNewTalkerRate,
} = require('./middlewares/validations');

const PORT = '3000';
const MESSAGE_NOT_FOUND_TALKER = {
  message: 'Pessoa palestrante não encontrada',
};

const tokenGenerator = () => {
  const tokenActualy = JSON.stringify(Math.floor(Math.random() * 10000000000000000));

  if (tokenActualy.length <= 15) {
    return tokenGenerator();
  }

  return tokenActualy;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const SPEAKERS = await getTalker();

  if (SPEAKERS.length <= 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }

  return res.status(HTTP_OK_STATUS).json(SPEAKERS);
});

app.get('/talker/:id', async (req, res) => {
  const SPEAKERS = await getTalker();
  const { id } = req.params;

  const speaker = SPEAKERS.find((e) => e.id === Number(id));

  if (!speaker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json(MESSAGE_NOT_FOUND_TALKER);
  }

  return res.status(HTTP_OK_STATUS).json(speaker);
});

app.post(
  '/login',
  isValidEmail,
  isValidPassword,
  (_req, res) => {
    const token = tokenGenerator();
    return res.status(HTTP_OK_STATUS).json({ token });
  },
);

app.post(
  '/talker',
  isValidToken,
  isValidNewTalkerName,
  isValidNewTalkerAge,
  isValidNewTalkerTalk,
  isValidNewTalkerWatchedAtLength,
  isValidNewTalkerWatchedAt,
  isValidNewTalkerRate,
  async (req, res) => {
    const currentTalker = req.body;
    const SPEAKERS = await getTalker();

    const newId = (SPEAKERS.reduce((acc, curr) => {
      if (curr.id > acc) return curr.id;
      return acc;
    }, 0)) + 1;

    const newTalker = { id: newId, ...currentTalker };

    SPEAKERS.push(newTalker);
    await setTalker(SPEAKERS);
  
    return res.status(HTTP_CREATED_STATUS).json(newTalker);
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
