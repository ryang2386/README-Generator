// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
import { type } from 'os';
// TODO: Create an array of questions for user input
const questions = [];

inquirer
    .prompt([
questions = [
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Describe your project.',
        name: 'description',
    },
    {
        type: 'input',
        message: 'What are the installation instructions?',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'What is the usage of this project?',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'What are you contribution guidelines?',
        name: 'contributing',
    },
    {
        type: 'input',
        message: 'What are the test instructions?',
        name: 'tests',
    },
] 
])

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
