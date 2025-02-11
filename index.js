// TODO: Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
import generateMarkdown from './utils/generateMarkdown.js';
// TODO: Create an array of questions for user input
let questions = ['What is the title of your project?', 'Describe your project.', 'What are the installation instructions?', 'What is the usage of this project?', 'What are your contribution guidelines?', 'What are the test instructions?'];
let name = ['title', 'description', 'installation', 'usage', 'contribution', 'tests'];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, `# ${data.title}\n\n## Description\n${data.description}\n\n ## Installation\n${data.installation}\n\n ## Usage\n${data.usage}\n\n ## Contribution\n ${data.contribution}\n\n ## Tests\n ${data.tests}\n\n ## License\n ${data.license}\n\n ## Questions\n GitHub: ${data.github} - https://github.com/${data.github}\n\n Email: ${data.email}`);
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
        // answers.email = email.email;
        // console.log(answers);
        writeToFile('README.md', answers);
        const licenseBadge = generateMarkdown.renderLicenseBadge(license.license);
        // const markdown = generateMarkdown.generateMarkdown(answers);
        // console.log(markdown);
        const readMe = fs.readFileSync('README.md', 'utf8');
        fs.writeFileSync('README.md', `${licenseBadge}\n${readMe}`);
        // const licenseLink = generateMarkdown.renderLicenseLink(license.license);
        // const licenseSection = generateMarkdown.renderLicenseSection(license.license);
        // console.log(licenseLink);
        // console.log(licenseSection);
}
// Function call to initialize app
init();
