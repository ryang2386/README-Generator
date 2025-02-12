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
     let readMeFile = fs.readFileSync('README.md', 'utf8');
     fs.writeFileSync('README.md', `${readMeFile}\n\n## Description\n${data.description}\n\n ## Installation\n${data.installation}\n\n ## Usage\n${data.usage}\n\n ## Contribution\n ${data.contribution}\n\n ## Tests\n ${data.tests}\n\n`); 
     if (data.license === 'MIT') {
        fs.appendFileSync('README.md', `## License\n ${data.license}\n\n Copyright © 2024 Ryan Gayle\n\n

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`);
      } else if (data.license === 'Apache') {
        fs.appendFileSync('README.md', `## License\n ${data.license}\n\n Copyright © 2024 Ryan Gayle\n\n

        Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.`);
      } else if (data.license === 'GPL') {
        fs.appendFileSync('README.md', `## License\n ${data.license}\n\n Copyright © 2024 Ryan Gayle\n\n

        This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

        This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

        You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.`);
      } else {
        fs.appendFileSync('README.md', `## License\n None.`);
      }
      readMeFile = fs.readFileSync('README.md', 'utf8');
      fs.writeFileSync('README.md', `${readMeFile}\n\n ## Questions\n GitHub: ${data.github} - https://github.com/${data.github}\n\n Email: ${data.email}\n\n ${data.contact}`);
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
    const contact = await inquirer.prompt([
        {
            type: 'input',
            message: 'How would you like to be contacted?',
            name: 'contact',
        },
    ]);
        answers.license = license.license;
        answers.github = github.github;
        answers.email = email.email;
        answers.contact = contact.contact;

        const licenseBadge = generateMarkdown.renderLicenseBadge(license.license);
        const licenseLink = generateMarkdown.renderLicenseLink(license.license);
        let markdown = generateMarkdown.generateMarkdown(answers);

        markdown = markdown.split("#").join("");
        markdown = markdown.split("\n").join("");
        markdown = markdown.split(" ");

        writeToFile('README.md', answers, markdown);
        const readMe = fs.readFileSync('README.md', 'utf8');
        fs.writeFileSync('README.md', `[${licenseBadge}]${licenseLink}\n${readMe}`);

        // const licenseSection = generateMarkdown.renderLicenseSection(license.license);
        // console.log(licenseLink);
        // console.log(licenseSection);
}
// Function call to initialize app
init();
