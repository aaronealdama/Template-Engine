// global variables
let emptyArr = [];


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
      
  } else if (obj.title === "Engineer") {
    return inquirer
      .prompt({
        type: "input",
        name: "github",
        message: "What is their github username?"
      })
      
  } else if (obj.title === "Intern") {
    return inquirer
      .prompt({
        type: "input",
        name: "school",
        message: "What school are they going to?"
      })
      
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
    if (obj[i].title === "Manager") {
      emptyStr += `<div class="col s12 m4">
  <div class="card red lighten-1">
    <div class="card-content white-text">
      <span class="card-title">${obj[i].name}</span>
      <br>
      <i class="medium material-icons">cloud_circle</i>
      <br>
      <span class="card-title">${obj[i].title}</span>
      <div class="information">
        <div class="info">
          <p>ID: ${obj[i].id}</p>
        </div>
        <div class="info">
          <p>Email: ${obj[i].email}</p>
        </div>
        <div class="info">
          <p>Office Number: ${obj[i].officeNum}</p>
        </div>
      </div>
    </div>
    <div class="card-action"></div>
  </div>
</div>`;
    } else if (obj[i].title === "Engineer") {
      emptyStr += `<div class="col s12 m4">
  <div class="card red lighten-1">
    <div class="card-content white-text">
      <span class="card-title">${obj[i].name}</span>
      <br>
      <i class="medium material-icons">desktop_windows</i>
      <br>
      <span class="card-title">${obj[i].title}</span>
      <div class="information">
        <div class="info">
          <p>ID: ${obj[i].id}</p>
        </div>
        <div class="info">
          <p>Email: ${obj[i].email}</p>
        </div>
        <div class="info">
          <p>Github: ${obj[i].github}</p>
        </div>
      </div>
    </div>
    <div class="card-action"></div>
  </div>
</div>`;
    } else if (obj[i].title === "Intern") {
      emptyStr += ` <div class="card-content white-text">
      <span class="card-title">${obj[i].name}</span>
      <br>
      <i class="medium material-icons">child_care</i>
      <br>
      <span class="card-title"> ${obj[i].title}</span>
      <div class="information">
        <div class="info">
          <p>ID: ${obj[i].id}</p>
        </div>
        <div class="info">
          <p>Email: ${obj[i].email}</p>
        </div>
        <div class="info">
          <p>School: ${obj[i].school}</p>
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
  for (let i = 1; i <= numObj.loop; i++) {
    console.log(`This is member ${i}`);
    const userObj = await prompt(numObj);
    const specialObj = await special(userObj);
    if (userObj.title === "Manager") {
      const manager = new Manager(userObj.name, userObj.id, userObj.email, specialObj.officeNum);
      emptyArr.push(manager);
    } else if (userObj.title === "Engineer") {
      const engineer = new Engineer(userObj.name, userObj.id, userObj.email, specialObj.github);
      emptyArr.push(engineer);
    } else if (userObj.title === "Intern") {
      const intern = new Intern(userObj.name, userObj.id, userObj.email, specialObj.school);
      emptyArr.push(intern);
    }
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
