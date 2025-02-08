// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
// TODO: Create an array of questions for user input
let questions = [];
let name = ['title', 'description', 'installation', 'usage', 'contributing', 'tests'];

questions = ['What is the title of your project?', 'Describe your project.', 'What are the installation instructions?', 'What is the usage of this project?', 'What are your contribution guidelines?', 'What are the test instructions?'];

// console.log(questions);

// inquirer
//     .prompt([
// {
//     type: 'input',
//     message: questions[0],
//     name: 'title',
// },
// {
//     type: 'input',
//     message: questions[1],
//     name: 'description',
// },
// {
//     type: 'input',
//     message: questions[2],
//     name: 'installation',
// },
// {
//     type: 'input',
//     message: questions[3],
//     name: 'usage',
// },
// {
//     type: 'input',
//     message: questions[4],
//     name: 'contributing',
// },
// {
//     type: 'input',
//     message: questions[5],
//     name: 'tests',
// },
//     ])
// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
async function init() {
    const answers = {};
    for (let i = 0; i < questions.length; i++) {
        const answer = await inquirer.prompt([
                {
                    type: 'input',
                    message: questions[i],
                    name: name[i],
                },
            ]);
            answers[name[i]] = answer[name[i]];
    };
}

// Function call to initialize app
init();
