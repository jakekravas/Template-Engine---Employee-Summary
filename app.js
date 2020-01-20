const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

let team = { engineers: [], interns: [], managers: [] }
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
        switch(answer.role){
            case "Engineer":
                return handleEngineer();
            case "Intern":
                return handleIntern();
            case "Manager":
                return handleManager();
        }
    });
}

function handleEngineer(){
    inquirer.prompt([
        {
            type: "input",
            message: "Name: ",
            name: "name"
        },
        {
            type: "number",
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
        team.engineers.push(new Engineer(answer.name, answer.id, answer.email, answer.github));
        askIfMoreEmployees();
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
            type: "number",
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
        team.interns.push(new Intern(answer.name, answer.id, answer.email, answer.school));
        askIfMoreEmployees();
    })
};
function handleManager(){
    inquirer.prompt([
        {
            type: "input",
            message: "Name: ",
            name: "name"
        },
        {
            type: "number",
            message: "ID number: ",
            name: "id"
        },
        {
            type: "input",
            message: "Email address: ",
            name: "email"
        },
        {
            type: "number",
            message: "Office Number: ",
            name: "officenumber"
        }
    ]).then(answer => {
        team.managers.push(new Manager(answer.name, answer.id, answer.email, answer.officenumber));
        askIfMoreEmployees();
    })
};

function askIfMoreEmployees(){
    inquirer.prompt([
        {
            type: "list",
            message: "Add more employees?",
            choices: [
                "Yes",
                "No"
            ],
            name: "moreEmployees"
        }
    ]).then(answer => {
        answer.moreEmployees === "Yes" ? promptUser() : createHTML();
    })
}

function createHTML(){
    let mainHTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="stylesheet" href="../css/bootstrap.css"><title>My Team</title><style>#main-header{background-color: crimson;color: #f6f6f6;}</style></head><body><h1 class="text-center py-5 mb-4" id="main-header">My Team</h1><div class="container"><div class="row d-flex justify-content-center">`;

    for (let i = 0; i < team.engineers.length; i++){
        mainHTML += `<div class="col-4 mb-3">
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h3>${team.engineers[i].getName()}</h3>
                <h5>Engineer</h5>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${team.engineers[i].getId()}</li>
                    <li class="list-group-item">Email: ${team.engineers[i].getEmail()}</li>
                    <li class="list-group-item">GitHub: <a href="https://github.com/${team.engineers[i].getGithub()}" target="_blank">${team.engineers[i].getGithub()}</a>
                    </li>
                </ul>
            </div>
            </div>
        </div>`
    }
    for (let i = 0; i < team.interns.length; i++){
        mainHTML += `<div class="col-4 mb-3">
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h3>${team.interns[i].getName()}</h3>
                <h5>Engineer</h5>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${team.interns[i].getId()}</li>
                    <li class="list-group-item">Email: ${team.interns[i].getEmail()}</li>
                    <li class="list-group-item">GitHub: ${team.interns[i].getSchool()}</li>
                </ul>
            </div>
            </div>
        </div>`
    }
    for (let i = 0; i < team.managers.length; i++){
        mainHTML += `<div class="col-4 mb-3">
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h3>${team.managers[i].getName()}</h3>
                <h5>Engineer</h5>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${team.managers[i].getId()}</li>
                    <li class="list-group-item">Email: ${team.managers[i].getEmail()}</li>
                    <li class="list-group-item">GitHub: ${team.managers[i].getOfficeNumber()}</li>
                </ul>
            </div>
            </div>
        </div>`
    }

    mainHTML += `</div></body></html>`;

    fs.writeFile(__dirname + "/output/team.html", mainHTML, (err) => {
        if (err) throw err;
        console.log("File saved");
    });
};