// get elements from html.

const dropArea = document.querySelector(".drop-area")
const fileInput = document.getElementById("fileInput");

const error = document.querySelector(".error");
const fname = document.getElementById("name");
const email = document.getElementById("email");
const username = document.getElementById("username");
const generate = document.querySelector(".generate");

let avatar = document.querySelector(".avatar");
const drag = document.querySelector(".drag");
const main = document.querySelector(".main");
const warner = document.getElementById("warner");
const wraped = document.getElementById("wraped");
const info = document.getElementById("info");

// Calling the three functions.

fileInput.addEventListener("dragenter", photoUploader);
fileInput.addEventListener("change", photoUploader);
generate.addEventListener("click", submit);

// A Function for uploading Photo.

function photoUploader() {
     const myFile = fileInput.files[0];     // getting the first element of the file by index zero because "fileInput" is an array.
     const sizeInBytes = 512000;
     
     // Checking if the selected image is greater than 500KB or not. And showing error message
     if (myFile.size > sizeInBytes) {
          error.textContent = "File too large. Please upload a photo under 500KB";
          error.style.color = "var(--Orange-700)";
          info.src = "assets/images/icon-info-red.svg";
          fileInput.value = "";
     } 
     else {
          error.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
          error.style.color = "white";
          info.src = "assets/images/icon-info.svg";
          const newDiv = document.createElement("div"); 
          newDiv.innerHTML = fileInput.innerHTML; 
          fileInput.parentNode.replaceChild(newDiv, fileInput);
          
          // Getting the url of the user selected image to be displayed.
          let imageLink = URL.createObjectURL(fileInput.files[0]);
          avatar.style.backgroundImage = `url(${imageLink})`;
          avatar.style.border= "1px solid white";

          drag.textContent = "";
     
          // Creating the container of  "Remove image" and "Change image buttons" 
          const buttons = document.createElement('div');
          buttons.className = "btns";
          dropArea.appendChild(buttons);

          // Creating "Remove image" button
          const removeImage = document.createElement('buttton');
          removeImage.className = "btn";
          removeImage.textContent = "Remove Image"
          buttons.appendChild(removeImage);
          
          // A function to remove image.
          removeImage.addEventListener("click", () => {
               avatar.style.backgroundImage = "url('assets/images/icon-upload.svg')";
               avatar.style.border= "none";
          });

          // Creating "Change image" button
          const changeImage = document.createElement('buttton');
          changeImage.className = "btn";
          changeImage.textContent = "Change Image"
          buttons.appendChild(changeImage);

          // A function to change image.
          changeImage.addEventListener("click", () => {
               const input = document.createElement('input');
               input.type = 'file';
               input.accept = 'image/*'
               input.style.display = 'none'; 
               dropArea.appendChild(input); 
               input.click(); 
               

               input.addEventListener("change", function () {
                    const file = input.files[0]; 
                    const sizeInBytes = 512000;
                    if (file.size > sizeInBytes) {
                         error.textContent = "File too large. Please upload a photo under 500KB";
                         error.style.color = "var(--Orange-700)";
                         info.src = "assets/images/icon-info-red.svg";
                         input.value = "";
                    }
                    else {
                         error.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
                         error.style.color = "white";
                         info.src = "assets/images/icon-info.svg";
                         let Link = URL.createObjectURL(input.files[0]);
                         avatar.style.backgroundImage = `url(${Link})`;
                         avatar.style.border = "1px solid white";        
                    }
     
               });
               dropArea.removeChild(input);
          });
     };

     // A Code for sending image to ticket page.
     let inputPic = fileInput.files[0];    // selecting the image.

     const fr = new FileReader();      // read new file reader
     fr.readAsDataURL(inputPic);      // reading the selected image url using "readAsDataURL()" function.
     
     //  A Function to retrieve and store the image url on local storage
     fr.addEventListener("load", () => {
          const url = fr.result
          localStorage.setItem('photo', url)
     });

};

// A Function to chck if the submitted emial is valid or not.
function validate(mail) {
     const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
     return regex.test(mail)
};

// A Function for submitting the form.
function submit() {

     let nameData = fname.value;
     let emailData = email.value;
     let userData = username.value;
     let inputt = fileInput.files[0];

     // Checking if all input fields are filled.
     if (nameData == "" || emailData == "" || userData == "" || !inputt ) {
          alert("Please fill out the required fileds!!!");
     }
     else {
          // Checking if the email is valid or not.
          if (!validate(email.value)) {
               warner.style.display = "block";
               email.style.border = "1px solid hsl(7, 71%, 60%)";
               return;
          }
          else {
               email.style.border = "1px solid white";
               warner.style.display = "none";

               // Storing the submitted datas on local storage
               localStorage.setItem("full-name", nameData);
               localStorage.setItem("email", emailData);
               localStorage.setItem("git-name", userData);

               // Redirecting to ticket page but replacing the index page.
               window.location.assign("ticket.html");
          }

     }

};
// Functions of  Drag And Drop

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropArea.addEventListener('dragenter', () => {
  dropArea.classList.add('active');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active');
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('active');

  const file = e.dataTransfer.files[0];
  fileInput.files = e.dataTransfer.files; 
  photoUploader(); 
});

