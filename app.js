// global variables
let emptyArr = [];
let newArr = [];

// packages
const fs = require("fs");
const inquirer = require("inquirer");

// classes
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// functions
const loopNum = () => {
  return inquirer.prompt({
    type: "input",
    name: "loop",
    message: "How many members do you want to add?"
  });
};

const prompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is their name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is their id number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is their email?"
    },
    {
      type: "list",
      name: "title",
      message: "What is their job title?",
      choices: ["Manager", "Engineer", "Intern"]
    }
  ]);
};

const special = obj => {
  if (obj.title === "Manager") {
    return inquirer
      .prompt({
        type: "input",
        name: "officeNum",
        message: "What is their office number?"
      })
      .then(function(response) {
        newArr.push(response);
      });
  } else if (obj.title === "Engineer") {
    return inquirer
      .prompt({
        type: "input",
        name: "github",
        message: "What is their github username?"
      })
      .then(function(response) {
        newArr.push(response);
      });
  } else if (obj.title === "Intern") {
    return inquirer
      .prompt({
        type: "input",
        name: "school",
        message: "What school are they going to?"
      })
      .then(function(response) {
        newArr.push(response);
      });
  }
};

const html = (obj, loop) => {
  let emptyStr = ``;
  emptyStr += `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Team Portfolio</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container">
      <div class="row">
    `;
  for (let i = 0; i < loop.loop; i++) {
    if (obj[i][0].title === "Manager") {
      emptyStr += `<div class="col s12 m4">
  <div class="card red lighten-1">
    <div class="card-content white-text">
      <span class="card-title">${obj[i][0].name}</span>
      <br>
      <i class="medium material-icons">cloud_circle</i>
      <br>
      <span class="card-title">${obj[i][0].title}</span>
      <div class="information">
        <div class="info">
          <p>ID: ${obj[i][0].id}</p>
        </div>
        <div class="info">
          <p>Email: ${obj[i][0].email}</p>
        </div>
        <div class="info">
          <p>Office Number: ${obj[i][1].officeNum}</p>
        </div>
      </div>
    </div>
    <div class="card-action"></div>
  </div>
</div>`;
    } else if (obj[i][0].title === "Engineer") {
      emptyStr += `<div class="col s12 m4">
  <div class="card red lighten-1">
    <div class="card-content white-text">
      <span class="card-title">${obj[i][0].name}</span>
      <br>
      <i class="medium material-icons">desktop_windows</i>
      <br>
      <span class="card-title">${obj[i][0].title}</span>
      <div class="information">
        <div class="info">
          <p>ID: ${obj[i][0].id}</p>
        </div>
        <div class="info">
          <p>Email: ${obj[i][0].email}</p>
        </div>
        <div class="info">
          <p>Github: ${obj[i][1].github}</p>
        </div>
      </div>
    </div>
    <div class="card-action"></div>
  </div>
</div>`;
    } else if (obj[i][0].title === "Intern") {
      emptyStr += ` <div class="card-content white-text">
      <span class="card-title">${obj[i][0].name}</span>
      <br>
      <i class="medium material-icons">child_care</i>
      <br>
      <span class="card-title"> ${obj[i][0].title}</span>
      <div class="information">
        <div class="info">
          <p>ID: ${obj[i][0].id}</p>
        </div>
        <div class="info">
          <p>Email: ${obj[i][0].email}</p>
        </div>
        <div class="info">
          <p>School: ${obj[i][1].school}</p>
        </div>
      </div>
    </div>
    <div class="card-action"></div>
  </div>
</div>`;
    }
  }
  emptyStr += `
  </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  </body>
</html>`;
  return emptyStr;
};

async function initiation() {
  const numObj = await loopNum();
  for (let i = 0; i < numObj.loop; i++) {
    newArr = [];
    const userObj = await prompt();
    newArr.push(userObj);
    await special(userObj);
    emptyArr.push(newArr);
  }
  const htmlContent = await html(emptyArr, numObj);
  fs.writeFile("team.html", htmlContent, err => {
    if (err) {
      throw err;
    }
  });
  console.log(emptyArr);
}

initiation();
