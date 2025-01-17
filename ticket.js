// get elements from html.

const fName = document.getElementById("big-name");
const myEmail = document.getElementById("my-email");
const git = document.getElementById("git");
const smallName = document.getElementById("small-name");
const day = document.getElementById("day");
const picture = document.getElementById("picture");
const ticketNum = document.getElementById("ticket-num");

// Recieve datas of a person from app.js and store it in variables.

const fullName = localStorage.getItem("full-name");
const email = localStorage.getItem("email");
const gitName = localStorage.getItem("git-name");
const myPicUrl = localStorage.getItem("photo");

// Assigning the recived datas to be displayed on this page(ticket page).

fName.textContent = fullName;
myEmail.textContent = email;
git.textContent = gitName;
smallName.textContent = fullName;
picture.src = myPicUrl;  // In here we get the images url not the image it self so we assign it to the "src" property.


// A Funcion to generate a ticket numbers

const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
function ticket() {
     let hexNums = ""
     for (let i = 0; i < 5; i++){
          hexNums += nums[getRandomNumber()];
     };
     ticketNum.textContent = hexNums;
};

//  function to genrate a random number to ticket() function.
function getRandomNumber() {
     return Math.floor(Math.random() * nums.length);
};

ticket();
