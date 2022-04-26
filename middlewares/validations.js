const { HTTP_BAD_REEQUEST_STATUS, HTTP_UNAUTHORIZED_STATUS } = require('../HTTP-status');

const MESSAGE_VALIDATE_WATCHED = {
  message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
};
    
const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } 

  next();
};
    
const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length <= 5) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const isValidToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({
      message: 'Token inválido',
    });
  }

  next();
};

const isValidNewTalkerName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const isValidNewTalkerAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (age < 18) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }

  next();
};

const isValidNewTalkerTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  } 

  const { watchedAt, rate } = talk;

  if (!watchedAt || !rate) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const validateDay = (day) => {
  if (!day || Number.isNaN(day)) return true;
  if (day <= 0 || day >= 32) return true;

  return false;
};

const validateMonth = (month) => {
  if (!month || Number.isNaN(month)) return true;
  if (month <= 0 || month >= 13) return true;

  return false;
};

const validateYear = (year) => {
  if (!year || Number.isNaN(year)) return true;

  return false;
};

const isValidNewTalkerWatchedAtLength = (req, res, next) => {

  const { talk } = req.body;
  const { watchedAt } = talk;

  const date = watchedAt.split('/');

  if (
    date.length !== 3
    || date[0].length !== 2
    || date[1].length !== 2
    || date[2].length !== 4
  ) return res.status(HTTP_BAD_REEQUEST_STATUS).json(MESSAGE_VALIDATE_WATCHED);

  next();
};

const isValidNewTalkerWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;

  const date = watchedAt.split('/');
  const days = Number(date[0]);
  const months = Number(date[1]);
  const years = Number(date[2]);

  if (validateDay(days) || validateMonth(months) || validateYear(years)) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json(MESSAGE_VALIDATE_WATCHED);
  }

  next();
};

const isValidNewTalkerRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REEQUEST_STATUS).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidNewTalkerName,
  isValidNewTalkerAge,
  isValidNewTalkerTalk,
  isValidNewTalkerWatchedAtLength,
  isValidNewTalkerWatchedAt,
  isValidNewTalkerRate,
};