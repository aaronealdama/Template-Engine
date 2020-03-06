// global variables
let emptyArr = [];

// packages
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

// classes
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// functions
const loopNum = () => {
  return inquirer.prompt({
    type: "input",
    name: "loop",
    message: "How many members do you want to add?",
    // greater: function(num) {
    //   const number = parseInt(num);
    //   if (number === 0) {
    //     return "Must be number greater than 0"
    //   }
    //   return true;
    // },
    validate: function(num) {
      if (/[1-9]/.test(num) === false) {
        return "Must be a number";
      }
      return true;
    }
  });
  // returns obj with number we will use in the for loop
};

const prompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is their name?",
      validate: function(input) {
        if (/[0-9]/.test(input) === true) {
          return "Cannot include numbers in name";
        }
        return true;
      }
    },
    {
      type: "input",
      name: "id",
      message: "What is their id number?",
      validate: function(input) {
        if (/[a-zA-z]/.test(input) === true) {
          return "Cannot include letters in id";
        }
        return true;
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is their email?",
      validate: function(input) {
        if (/[@]/.test(input) === false) {
          return "Must include an email";
        }
        return true;
      }
    },
    {
      type: "list",
      name: "title",
      message: "What is their job title?",
      choices: ["Manager", "Engineer", "Intern"]
    }
  ]); // prompt returns an object used as parameters for class generation
};

const special = obj => {
  if (obj.title === "Manager") {
    return inquirer.prompt({
      type: "input",
      name: "officeNum",
      message: "What is their office number?",
      validate: function(input) {
        if (/[a-zA-z]/.test(input) === true) {
          return "Cannot include letters in office number";
        }
        return true;
      }
    });
  } else if (obj.title === "Engineer") {
    return inquirer.prompt({
      type: "input",
      name: "github",
      message: "What is their github username?",
      validate: function(input) {
        if (/[0-9]/.test(input) === true) {
          return "Cannot include numbers in name";
        }
        return true;
      }
    });
  } else if (obj.title === "Intern") {
    return inquirer.prompt({
      type: "input",
      name: "school",
      message: "What school are they going to?",
      validate: function(input) {
        if (/[0-9]/.test(input) === true) {
          return "Cannot include numbers in school name";
        }
        return true;
      }
    });
  } // returns another obj containing the special property
};

const html = (obj, loop) => {
  // function uses string concatenation to concatenate template literals together
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
  <nav>
    <div class="nav-wrapper">
      <div class = "header center">
      <h2>Team Portfolio</h2>
      </div>
    </div>
  </nav>
  <br><br>
    <div class="container">
      <div class="row">
    `;
  for (let i = 0; i < loop.loop; i++) {
    // for loop checks for obj title and adds html to emptyStr
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
  </div>
</div>`;
    } else if (obj[i].title === "Intern") {
      emptyStr += `<div class="col s12 m4">
      <div class="card red lighten-1">
      <div class="card-content white-text">
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
    </div>
    </div>
    `;
    }
  }
  emptyStr += `
  </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  </body>
</html>`;
  return emptyStr; // emptyStr is then returned as a single template literal
};

async function initiation() {
  emptyArr = [];
  const numObj = await loopNum(); // numObj contains the value user inputs in loopNum prompt

  for (let i = 1; i <= numObj.loop; i++) {
    // for loop loops until numObj.loop value is reached
    console.log(`This is member ${i}`);
    // alerts user the member number
    const userObj = await prompt();
    // userObj is an obj of user input values
    const specialObj = await special(userObj);
    // specialObj is an obj taking userObj and prompting user a specific question
    // depending on the title
    if (userObj.title === "Manager") {
      const manager = new Manager(
        userObj.name,
        userObj.id,
        userObj.email,
        specialObj.officeNum
      );
      // new class generated
      emptyArr.push(manager);
      // class object is pushed into an array
    } else if (userObj.title === "Engineer") {
      const engineer = new Engineer(
        userObj.name,
        userObj.id,
        userObj.email,
        specialObj.github
      );
      emptyArr.push(engineer);
    } else if (userObj.title === "Intern") {
      const intern = new Intern(
        userObj.name,
        userObj.id,
        userObj.email,
        specialObj.school
      );
      emptyArr.push(intern);
    }
  }

  const htmlContent = await html(emptyArr, numObj);
  // returns string with all the html content generated from the content within the emptyArr

  const outputPath = path.resolve(__dirname, "output", "team.html");

  fs.writeFile(outputPath, htmlContent, err => {
    if (err) {
      throw err;
    }
    console.log("Team HTML is successfully generated!");
  }); // team.html is generated with the string from html content
}

initiation(); // initiation function is invoked
