#!/usr/bin/env node

/**
 * SETUP
 */
// Dependencies
const inquirer = require('inquirer');
const fetch = require('node-fetch');
const url = 'http://35.237.191.2';
const version = "1.0.0";

/**
 * MAIN
 */
console.clear();

menu();

/**
 * The main menu that the client refers to so the user can perform an action on the Trie
 */
function menu() {

    console.log(`Trie Client (ver. ${version}) [${new Date().toUTCString()}]`);

    // Give the user choices
    inquirer
        .prompt([{
            type: 'rawlist',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['Insert', 'Search', 'Delete', 'Clear', 'Autocomplete', 'View Trie', 'Exit']
        }])
        .then(answers => {
            var answer = answers.choice;
            console.clear();
            switch (answer) {
                case 'Insert':
                    requestWithInput('/insert', 'Enter the word you want to insert: ', 'POST');
                    break;
                case 'Search':
                    requestWithInput('/search', 'Enter the word you want to search for: ', 'GET');
                    break;
                case 'Delete':
                    requestWithInput('/delete', 'Enter the word you want to delete: ', 'POST');
                    break;
                case 'Clear':
                    request('/clear', 'POST');
                    break;
                case 'Autocomplete':
                    requestWithInput('/autocomplete', 'Enter the prefix you want to autocomplete: ', 'GET');
                    break;
                case 'View Trie':
                    request('/view', 'GET');
                    break;
                default:
                    console.clear();
                    process.exit();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Performs a fetch request to the server taking in a singular user input for the selected action
 * @param {String} action Trie method/request route
 * @param {String} prompt Question asked to the user for an input
 * @param {String} httpmethod GET or POST
 */
function requestWithInput(action, prompt, httpmethod) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'answer',
            message: prompt,
            mask: true
        }])
        .then(answers => {
            // Check to see if in the input is valid only containing letters
            if (!answers.answer.match(/^[a-zA-Z]+$/)) {
                console.log("Invalid input! You can only input letters\n");
                menu();
            } else {
                fetch(`${url}${action}/${answers.answer}`, {method: httpmethod})
                    .then(res => res.json())
                    .then(data => {
                        // Data is a boolean value, for autocomplete it's an Array
                        switch(action) {
                            case '/insert':
                                if (data)
                                    console.log(`Insert Successful: '${answers.answer}' was inserted into the Trie\n`);
                                else
                                    console.log(`Insert Failed: '${answers.answer}' already exists in the Trie\n`);
                                break;
                            case '/search':
                                if (data)
                                    console.log(`Search Successful: Found '${answers.answer}' in the Trie\n`);
                                else
                                    console.log(`Search Failed: Could not find '${answers.answer}' in the Trie\n`);
                                break;
                            case '/delete':
                                if (data)
                                    console.log(`Delete Successful: '${answers.answer}' was deleted\n`);
                                else
                                    console.log(`Delete Failed: Could not find '${answers.answer}' in the Trie\n`);
                                break;
                            case '/autocomplete':
                                console.log(`The prefix '${answers.answer}' may autocomplete to:\n${data}\n`);
                                break;
                            default:
                                console.log("Error!\n");
                        }
                        menu();
                    })
                    .catch(error => {
                        console.log(error) + "\n";
                        menu();
                    });
            }
        })
        .catch(error => {
            console.log(error) + "\n";
            menu();
        });
}

/**
 * Performs a fetch request to the server for the selected action
 * @param {String} action Trie method/request route
 * @param {String} httpmethod GET or POST
 */
function request(action, httpmethod) {
    fetch(`${url}${action}`, {method: httpmethod})
        .then(res => res.json())
        .then(data => {
            if (action === '/clear')
                console.log("The Trie has successfully been cleared!\n"); // Clear Trie
            else if (action === '/view')
                console.log(data + "\n"); // Show Trie Contents
            else
                console.log("Error!\n");
            menu();
        })
        .catch(error => {
            console.log(error) + "\n";
            menu();
        });
}