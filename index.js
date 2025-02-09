// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
import generateMarkdown from './utils/generateMarkdown.js';
// TODO: Create an array of questions for user input
let questions = ['What is the title of your project?', 'Describe your project.', 'What are the installation instructions?', 'What is the usage of this project?', 'What are your contribution guidelines?', 'What are the test instructions?'];
let name = ['title', 'description', 'installation', 'usage', 'contributing', 'tests'];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, `# ${data.title}\n\n## Description\n${data.description}\n\n ## Installation\n${data.installation}\n\n ## Usage\n${data.usage}\n\n ## Contribution\n ${data.contributing}\n\n ## Tests\n ${data.tests}\n`);
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
    writeToFile('README.md', answers);
    const license = await inquirer.prompt([
            {
                type: 'list',
                message: 'What license did you use?',
                name: 'license',
                choices: ['MIT', 'Apache', 'GPL'],
            },
        ])
        .then((response) => {
            fs.appendFileSync('README.md', `\n ## License\n ${response.license}\n`);
        });
        console.log(license);
        console.log(generateMarkdown.renderLicenseBadge(license));
}
// Function call to initialize app
init();
