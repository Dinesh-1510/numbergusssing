#!/usr/bin/env node
// Simple Number Guessing Game (Node.js CLI)
// Run: node index.js

const readline = require('readline');

const MIN = 1;
const MAX = 100;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(q) {
  return new Promise(resolve => rl.question(q, ans => resolve(ans)));
}

async function play(roundsAllowed = null) {
  const target = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  let attempts = 0;
  console.log(`I'm thinking of a number between ${MIN} and ${MAX}.`);
  if (roundsAllowed) console.log(`You have ${roundsAllowed} attempts.`);

  while (true) {
    if (roundsAllowed && attempts >= roundsAllowed) {
      console.log(`Out of attempts. The number was ${target}.`);
      return {won: false, attempts};
    }

    const ans = await ask('Your guess: ');
    const guess = parseInt(ans, 10);
    if (Number.isNaN(guess)) {
      console.log('Please enter a valid integer.');
      continue;
    }
    attempts++;

    if (guess === target) {
      console.log(`Correct! You guessed it in ${attempts} attempts.`);
      return {won: true, attempts};
    } else if (guess < target) {
      console.log('Too low.');
    } else {
      console.log('Too high.');
    }
  }
}

async function main() {
  console.log('Number Guessing Game — Node.js');
  while (true) {
    const mode = (await ask('Choose mode: (1) Unlimited (2) Limited: ')).trim();
    if (mode === '1') {
      await play(null);
      break;
    } else if (mode === '2') {
      const tries = parseInt(await ask('How many attempts? '), 10) || 3;
      await play(Math.max(1, tries));
      break;
    }
    console.log('Enter 1 or 2.');
  }

  const again = (await ask('Play again? (y/N): ')).trim().toLowerCase();
  if (again === 'y') {
    await main();
  } else {
    rl.close();
  }
}

main();