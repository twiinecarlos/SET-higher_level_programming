#!/usr/bin/node
const request = require('request');
const url = 'https://swapi-api.alx-tools.com/api/films/' + process.argv[2];

function printCharacter (urls, i) {
  if (i >= urls.length) {
    return;
  }
  request.get(urls[i], (err, response, body) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.parse(body).name);
    printCharacter(urls, i + 1);
  });
}

request.get(url, (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  printCharacter(JSON.parse(body).characters, 0);
});
