import { TError } from '../../types/index';
import { EValidators, TCheck } from './types';

function checkEmail(value: string): true | TError {
  const validate = /[^@]+@[a-z]+\.[a-z]+/.test(value) && !value.includes(" ");
  return (
    validate || {
      type: 'error',
      message: 'incorrect email address',
    }
  );
}

function checkName(value: string, type: string): true | TError {
  const validate = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-']+[a-zA-Zа-яА-Я']?$/u.test(value) && value.length >= 2

  return (
    validate || {
      type: 'error',
      message: `Incorrect ${type}`,
    }
  );
}

function checkUserName(value): true | TError {
  const validate = value.length >= 2 && !value.includes(" ")

  return (
    validate || {
      type: 'error',
      message: 'Incorrect UserName',
    }
  );
}

function checkPassword(value: string): true | TError {
  const validate =
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
      value
    );

  return (
    validate || {
      type: 'error',
      message:
        'password must has at least 6 of more symbols' +
        '1 UpperCase latter, 1 number and 1 speciphic symbol',
    }
  );
}

function validators(value: string, type: EValidators): true | TError {
  const __data = {
    [EValidators.Email]: () => checkEmail(value),
    [EValidators.Name]: () => checkName(value, 'name'),
    [EValidators.SurName]: () => checkName(value, 'surname'),
    [EValidators.UserName]: () => checkUserName(value),
    [EValidators.Password]: () => checkPassword(value),
  };
  return __data[type]();
}

function checkAll(check: TCheck[]): true | TError[] {
  return check.reduce((check: true | TError[], { value, type }) => {
    const checkItem = validators(value, type);
    if (typeof checkItem !== 'boolean') {
      if (typeof check === 'boolean') check = [];
      check.push(checkItem);
    }
    return check;
  }, true);
}

export { validators, checkAll };
