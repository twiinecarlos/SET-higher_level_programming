#!/usr/bin/node

const { dict } = require('./101-data');

const sorted = {};

for (const userId in dict) {
  const occurrences = dict[userId];

  if (!sorted[occurrences]) {
    sorted[occurrences] = [];
  }

  sorted[occurrences].push(userId);
}

console.log(sorted);
