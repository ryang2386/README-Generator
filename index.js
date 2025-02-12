// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs, { read } from 'fs';
import generateMarkdown from './utils/generateMarkdown.js';
// TODO: Create an array of questions for user input
let questions = ['What is the title of your project?', 'Describe your project.', 'What are the installation instructions?', 'What is the usage of this project?', 'What are your contribution guidelines?', 'What are the test instructions?'];
let name = ['title', 'description', 'installation', 'usage', 'contribution', 'tests'];

// TODO: Create a function to write README file
function writeToFile(fileName, data, markdown) {
    fs.writeFileSync(fileName, `# ${data.title}\n\n## Table of Contents\n`);
    for (let i = 2; i < markdown.length; i++) {
        fs.appendFileSync('README.md', `\n[${markdown[i]}](#${markdown[i]})\n`);
     }
     const readMeFile = fs.readFileSync('README.md', 'utf8');
     fs.writeFileSync('README.md', `${readMeFile}\n\n## Description\n${data.description}\n\n ## Installation\n${data.installation}\n\n ## Usage\n${data.usage}\n\n ## Contribution\n ${data.contribution}\n\n ## Tests\n ${data.tests}\n\n ## License\n ${data.license}\n\n Copyright © 2024 Ryan Gayle\n\n

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n ## Questions\n GitHub: ${data.github} - https://github.com/${data.github}\n\n Email: ${data.email}\n\n I've provided my GitHub and email for any questions regarding this project. From Monday through Friday, I am available to answer any questions between 11 AM and 6 PM. On weekends, please allow me 24 hours to respond. Thank you.`);
    }

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
    const license = await inquirer.prompt([
        {
            type: 'list',
            message: 'What license did you use?',
            name: 'license',
            choices: ['MIT', 'Apache', 'GPL', 'None'],
        },
    ])
    const github = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'github',
        },
    ]);
    const email = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is your email?',
            name: 'email',
        },
    ]);
        answers.license = license.license;
        answers.github = github.github;
        answers.email = email.email;

        const licenseBadge = generateMarkdown.renderLicenseBadge(license.license);
        let markdown = generateMarkdown.generateMarkdown(answers);

        markdown = markdown.split("#").join("");
        markdown = markdown.split("\n").join("");
        markdown = markdown.split(" ");

        writeToFile('README.md', answers, markdown);
        const readMe = fs.readFileSync('README.md', 'utf8');
        fs.writeFileSync('README.md', `${licenseBadge}\n${readMe}`);

        // const licenseLink = generateMarkdown.renderLicenseLink(license.license);
        // const licenseSection = generateMarkdown.renderLicenseSection(license.license);
        // console.log(licenseLink);
        // console.log(licenseSection);
}
// Function call to initialize app
init();
