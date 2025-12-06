#!/usr/bin/env python3
"""
Simple Number Guessing Game (CLI)
Run: python number_guess.py
"""

import random

MIN = 1
MAX = 100

def get_int(prompt):
    while True:
        try:
            return int(input(prompt).strip())
        except ValueError:
            print("Please enter a valid integer.")

def play(rounds_allowed=None):
    target = random.randint(MIN, MAX)
    attempts = 0
    print(f"I'm thinking of a number between {MIN} and {MAX}.")
    if rounds_allowed:
        print(f"You have {rounds_allowed} attempts. Good luck!")

    while True:
        if rounds_allowed and attempts >= rounds_allowed:
            print(f"You ran out of attempts. The number was {target}.")
            return False, attempts

        guess = get_int("Your guess: ")
        attempts += 1

        if guess == target:
            print(f"Correct! You guessed it in {attempts} attempts.")
            return True, attempts
        elif guess < target:
            print("Too low.")
        else:
            print("Too high.")

def main():
    print("Number Guessing Game — Python")
    while True:
        mode = input("Choose mode: (1) Unlimited attempts (2) Limited attempts: ").strip()
        if mode == "1":
            play(rounds_allowed=None)
            break
        elif mode == "2":
            tries = get_int("How many attempts would you like? ")
            play(rounds_allowed=max(1, tries))
            break
        else:
            print("Enter 1 or 2.")

    while input("Play again? (y/N): ").strip().lower() == "y":
        main()
        break

if __name__ == "__main__":
    main()