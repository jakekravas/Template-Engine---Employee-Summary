const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

let team = [];
promptUser();

function promptUser(){
    inquirer.prompt([
        { 
            type: "list",
            message: "Role within the company: ",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
            name: "role" 
        }
    ]).then(answer => {
        let role = answer.role
        switch(role){
            case "Engineer":
                return handleEngineer();
            case "Intern":
                return handleIntern();
            case "Manager":
                return handleManager();
        }
    });
    function handleManager(){
        inquirer.prompt([
            {
                type: "input",
                message: "Name: ",
                name: "name"
            },
            {
                type: "input",
                message: "ID number: ",
                name: "id"
            },
            {
                type: "input",
                message: "Email address: ",
                name: "email"
            },
            {
                type: "input",
                message: "Office Number: ",
                name: "officenumber"
            }
        ]).then(answer => {
            team.push(new Manager(answer.name, answer.id, answer.email, answer.officenumber));
            console.log(team);
            promptUser();
        })
    };
    
    function handleEngineer(){
        inquirer.prompt([
            {
                type: "input",
                message: "Name: ",
                name: "name"
            },
            {
                type: "input",
                message: "ID number: ",
                name: "id"
            },
            {
                type: "input",
                message: "Email address: ",
                name: "email"
            },
            {
                type: "input",
                message: "GitHub username: ",
                name: "github"
            }
        ]).then(answer => {
            team.push(new Engineer(answer.name, answer.id, answer.email, answer.github));
            console.log(team);
            promptUser();
        })
    };
    function handleIntern(){
        inquirer.prompt([
            {
                type: "input",
                message: "Name: ",
                name: "name"
            },
            {
                type: "input",
                message: "ID number: ",
                name: "id"
            },
            {
                type: "input",
                message: "Email address: ",
                name: "email"
            },
            {
                type: "input",
                message: "School: ",
                name: "school"
            }
        ]).then(answer => {
            team.push(new Intern(answer.name, answer.id, answer.email, answer.school));
            console.log(team);
            promptUser();
        })
    };
}