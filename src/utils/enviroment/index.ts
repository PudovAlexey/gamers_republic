import { EEnviroment } from './types';

function getEnviroment(): EEnviroment {
  const href = window.location.href;
  const isDev = /(localhost:)|(127.0.0.1:)/.test(href);
  if (isDev) {
    return EEnviroment.Develop;
  } else {
    return EEnviroment.Production;
  }
}

function envByUrl() {
  const env = getEnviroment();
  switch (env) {
    case EEnviroment.Develop:
      return '';
    case EEnviroment.Production:
      return '/gamers_republic/';
  }
}

export { getEnviroment, envByUrl };
