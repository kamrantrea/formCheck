/**
 * @file form.js
 *
 * @author Kamran Trea - 100658007
 * @date 2018-02-23
 *
 * @version 1.0
 * @copyright Copyright © 2018 DC. All rights reserved.
 *
 * @description Assignment 01 - Registration Form
 * Purpose: The purpose of this assignment is to register a new user and 
log all the console errors throughout the process
if the user makes a mistake while entering their various information. 
 */

(function() {
	var userDB = [];
  
	function searchUser(id) {
	  // Search the user in the DB
	  var userFound = null;
	  for (var i = 0; i < userDB.length; i++) {
		var user = userDB[i];
		if (user.get("id") === id) {
		  userFound = user;
		}
	  }
	  return userFound;
	}
  
	function User(id, password, joinedDate, email) {
	  var startsWithLetter = /[a-zA-Z]/; // Regex to check if id starts with letter
	  var hasConsecutiveLetters = /[a-z]{3}/; // Regex to check if the password has 3 consecutive letters
	  var has2Digits = /[0-9]{2,}/ // Regex to check if has 2 digits
	  var emailPattern = /\S+@\S+\.\S+/; // Regex for email pattern
	  var passwordLength = /^.{6,}$/ //Regex for password length
	  if (searchUser(id) !== null) {
		//user id already exits
		throw new Error("User is already in Database");
	  }
	  console.log("ID is available");
	  if (!startsWithLetter.test(id)) {
		// if the ID does not start with a letter we throw a new Error
		throw new Error("ID must start with a letter");
	  }
	  console.log("Password starts with a letter");
	  if (!hasConsecutiveLetters.test(password)) {
		// if the password does not have consecutive letters
		throw new Error("password must have 3 consecutive letters");
	  }
	  console.log("Password has consecutive letters");
	  if (!has2Digits.test(password)) {
		// if the password does not have consecutive letters
		throw new Error("password must have at least 2 digits");
	  }
	  console.log("Password has at least 2 digits");
	  if (!emailPattern.test(email)) {
		// If email is not correct
		console.log('email', email)
		throw new Error("Registration error." + "\n" +
		  "email  address does not have the right format.")
	  }
	  console.log("EMAIL HAS CORRECT FORMAT");
	  if (!passwordLength.test(password)) {
		// If the password is to short
		throw new Error("password is not 8 char long")
	  }
	  console.log("Password length is good");
	  this.id = id;
	  this.password = password;
	  this.date = joinedDate
	  this.email = email;
	}
	User.prototype.get = function(prop) {
	  // This is a getter function
	  // it returns a property
	  return this[prop]
	};
	User.prototype.toString = function() {
	  // to String returns a human friendly string with all the properties of the user
	  return "ID = " + this.id + " * PASSWORD = " + this.password +
		" * JOINED = " + this.date + " * EMAIL = " + this.email;
	};
  
	function createCaptcha() {
	  var captchaCanvas = document.getElementById('captcha') // the HTML element for the captcha
	  var ctx = captchaCanvas.getContext('2d'); // we create a canvas context so we can write to the canvas element
	  ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height); // Everytime we create a captcha, we delete the previous one.
	  var captchaValue = ""; // Initial Captcha String
		var base = [95, 65]
	  for (var i = 0; i < 8; i++) {
		//note to self dont forget to add numbers as well as ascii
		// We create a string of 8 characters for the captcha
		charBase = base[Math.floor(Math.random() * 2)]; // choose from uppercase or lowercase char
		captchaValue += String.fromCharCode(charBase + (Math.random() * 25) + 1)
	  }
	  ctx.font = "30px Verdana"; // Sets the font and size of the text in the canvas
	  ctx.fillText(captchaValue, 50, 50); // adds the text to the canvas, with a pair of coordinates
	  window.captchaValue = captchaValue // set the captcha value as a global value so we can access it later
	}
  
	function registerUser(id, password, date, email) {
	  try {
		console.log("REGISTRATION STARTED")
		console.log("REGISTRATION : info entered ID = " + id + " PASSWORD = " +
		  password + " EMAIL = " + email + "CAPTCHA = " + captcha);
		var newUser = new User(id, password, new Date(), email);
		updateRoster(newUser);
		resetRegisterForm()
		console.log("REGISTRATION ENDED")
		showLogin();
	  } catch (error) {
		console.error(error);
		alert(error)
		return false;
	  }
	}
  
	function resetRegisterForm() {
	  document.getElementById("idJoin").value = "";
	  document.getElementById("passwordJoin").value = "";
	  document.getElementById("emailJoin").value = "";
	  document.getElementById("captchaJoin").value = "";
	  createCaptcha();
	}
  
	function resetSigninForm() {
	  document.getElementById("idSignin").value = "";
	  document.getElementById("passwordSignin").value = "";
	}
  
	function loginUser() {
	  try {
		var id = document.getElementById("idSignin").value
		var password = document.getElementById("passwordSignin").value
		console.log("SIGN IN : info entered ID = " + id + " PASSWORD = " +
		  password);
		var userFound = searchUser(id)
		if (userFound === null) {
		  throw new Error("User not Found",
			"The user is not found in the Databse")
		}
		//Using Error Method to track the process, show that the password was not entered correctly 
		else if (userFound.get('password') !== password) {
		  throw new Error("Incorrect Password", "The Password is incorrect")
		}
		console.log("User signed in successfully");
		resetSigninForm();
		alert("USER " + userFound.get("id") + " SUCESSFULLY SIGNED IN")
	  } catch (error) {
		console.error(error)
		alert(error)
	  }
	  if (!userFound) {
		throw new Error("ID provided does not exist")
	  }
	  return userFound;
	}
  
	function updateRoster(user) {
	  // Insert the user to the Database
	  userDB.push(user);
	  console.log("User " + user.get("id") + " was added to the database");
	  //Creates html elements to show in the roster info section
	  var newEntry = document.createElement("p"); // create a new P element
	  var userInfo = document.createTextNode(user.toString()); // Creates a text node
	  newEntry.appendChild(userInfo); // append the text to the P
	  document.getElementById("roster").appendChild(newEntry); // append the P to the main element
	}
	window.onload = function() {
	  // this function executes when the page loads
	  // we create 3 users first
	  createCaptcha();
	  // Initialize the program and create 3 users
	  registerUser("Joe", "Test1234", new Date(), 'joe@test.com')
	  registerUser("Alice", "alice1234", new Date(), 'alice@test.com')
	  registerUser("Bobby", "bobby1234", new Date(), 'bobby@test.com')
	}
  
	function showLogin() {
	  // hide register form and show login
	  document.getElementById("signin").style.display = "block";
	  document.getElementById("join").style.display = "none";
	  resetSigninForm(); // reset inputs in form
	}
  
	function showRegister() {
	  //hide login and show register form
	  document.getElementById("signin").style.display = "none";
	  document.getElementById("join").style.display = "block";
	  resetRegisterForm(); // reset inputs in form
	}
	// EVENT HANDLERS
	// Click events on buttons
	document.getElementById("signinBtn").addEventListener("click", loginUser) // on login button click, execute loginUser function
	// on join button click, get the values to create the user, and verify if the captcha is correct
	document.getElementById("joinBtn").addEventListener("click", function() {
	  // try to create the user, if it fails it is because it did not pass all validations
	  // Catch will grab the error
	  try {
		var id = document.getElementById("idJoin").value
		if (id === "") {
		  alert("Please Enter an ID");
		}
		var password = document.getElementById("passwordJoin").value
		if (password === "") {
		  alert("Please Enter an password");
		}
		var email = document.getElementById("emailJoin").value
		if (email === "") {
		  alert("Please Enter an email");
		}
		var captcha = document.getElementById("captchaJoin").value
		if (captcha !== window.captchaValue) {
		  throw new Error("Captcha is incorrect");
		}
		console.log("Captcha is correct");
		if (registerUser(id, password, new Date(), email) === false) {
		  throw ("user_error");
		}
		alert("NEW USER SUCESSFULLY REGISTERED: " + "\n" + "\n" + "ID = " +
		  id + "\n" + " PASSWORD = " + password + "\n" + "JOINED = " +
		  new Date() + "\n" + "EMAIL = " + email)
	  } catch (error) {
		if (error == "user_error") return;
		alert(error);
		console.error(error)
	  } finally {}
	})
	document.getElementById("registerBtn").addEventListener("click",
	  showRegister)
	document.getElementById("cancelBtn").addEventListener("click", showLogin)
  })();