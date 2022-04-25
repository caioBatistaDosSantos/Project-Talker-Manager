const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';
const SPEAKERS = [
  {
    name: 'Henrique Albuquerque',
    age: 62,
    id: 1,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  },
  {
    name: 'Heloísa Albuquerque',
    age: 67,
    id: 2,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  },
  {
    name: 'Ricardo Xavier Filho',
    age: 33,
    id: 3,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  },
  {
    name: 'Marcos Costa',
    age: 24,
    id: 4,
    talk: { watchedAt: '23/10/2020', rate: 5 },
  },
];
const MESSAGE_NOT_FOUND = {
  message: 'Pessoa palestrante não encontrada',
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  if (SPEAKERS.length <= 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }

  return res.status(HTTP_OK_STATUS).json(SPEAKERS);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const speaker = SPEAKERS.find((e) => e.id === Number(id));

  if (!speaker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json(MESSAGE_NOT_FOUND);
  }

  return res.status(HTTP_OK_STATUS).json(speaker);
});

app.listen(PORT, () => {
  console.log('Online');
});
