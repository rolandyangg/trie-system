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

function menu() {

    console.log(`Trie Client (ver. ${version}) [${new Date().toUTCString()}]`);

    inquirer
    .prompt([{
        type: 'rawlist',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['Insert', 'Search', 'Delete', 'Clear', 'Autocomplete', 'View Trie', 'Exit']
    }])
    .then(answers => {
        var answer = answers.choice;
        switch(answer) {
            case 'Insert':
                insert();
                break;
            case 'Search':
                search();
                break;
            case 'Delete':
                remove();
                break;
            case 'Clear':
                clean();
                break;
            case 'Autocomplete':
                autocomplete();
                break;
            case 'View Trie':
                view();
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

function insert() {
    
}

function search() {

}

function remove() {

}

function clean() {

}

function autocomplete() {

}

function view() {
    fetch(url + "/view")
        .then(res => res.json())
        .then(data => console.log(data + "\n"));
    menu();
}

