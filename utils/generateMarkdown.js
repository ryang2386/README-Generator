import fs from 'fs';
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license === 'MIT') {
    return '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
  } else if (license === 'Apache') {
    return '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
  } else if (license === 'GPL') {
    return '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)';
  } else {
    return '';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license === 'MIT') {
    return '![License: MIT](https://opensource.org/license/MIT)';
  } else if (license === 'Apache') {
    return '![License](https://opensource.org/licenses/Apache-2.0)';
  } else if (license === 'GPL') {
    return '![License: GPL v3](https://www.gnu.org/licenses/gpl-3.0)';
  } else {
    return '';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
    if (license === 'MIT' || license === 'Apache' || license === 'GPL') {
        const readME = fs.readFileSync('README.md', 'utf8');
        const licenseSection = readME.match(/## License\n(.*)/s);
        return licenseSection[0];
      } else {
        return '';
      }
    }

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  // iterate through data and generate markdown for each section in README
  let markdown = '';
  for (const key in data) {
    if (key === 'title') {
      const capitalize = key;
      markdown += `# ${capitalize.charAt(0).toUpperCase() + capitalize.slice(1)}\n`;
    } else if (key === 'github') {
      markdown += `## Questions\n`;
    } else if (key === 'email') {
      markdown += '';
    } else {
      const capitalize = key;
      markdown += `## ${capitalize.charAt(0).toUpperCase() + capitalize.slice(1)}\n`;
    }
    }
    return markdown;
}

export default { generateMarkdown, renderLicenseBadge, renderLicenseLink, renderLicenseSection };
