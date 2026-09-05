#!/usr/bin/node

const size = Number(process.argv[2]);

if (Number.isNaN(size)) {
  console.log('Missing size');
} else {
  let row = 0;

  while (row < size) {
    let line = '';
    let column = 0;

    while (column < size) {
      line += 'X';
      column++;
    }

    console.log(line);
    row++;
  }
}
