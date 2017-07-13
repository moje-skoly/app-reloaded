// require('babel-polyfill');

const title = 'Moje školy';
const description =
  'Moje školy je otevřená databáze mateřských, základních a středních škol na území České republiky.';

module.exports = {
  isProduction: (process.env.NODE_ENV || 'production') === 'production',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 80,
  apiHost: '127.0.0.1:6002', //process.env.APIHOST || 'www.mojeskoly.cz/api',
  apiVersion: 'v1',
  apiPort: process.env.APIPORT || 80,
  app: {
    title: title,
    description: description,
    meta: {
      charSet: 'utf-8',
      properties: {
        'og:site_name': title,
        'og:image': 'theme/images/favicon.png',
        'og:locale': 'cs_CZ',
        'og:title': title,
        'og:description': description,
        'twitter:card': 'summary',
        'twitter:title': title,
        'twitter:description': description,
        'twitter:image': 'theme/images/favicon.png',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
};
