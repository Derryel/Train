
  var config = {
    apiKey: "AIzaSyB0R9fK8lMb2b6R5E14C0Fixgmk03ssdJE",
    authDomain: "train-91629.firebaseapp.com",
    databaseURL: "https://train-91629.firebaseio.com",
    storageBucket: "train-91629.appspot.com",
  };
  firebase.initializeApp(config);

var database = firebase.database();


// 2. Button for adding Employees
$("#addEmployeeBtn").on("click", function(){

	// Grabs user input
	var empName = $("#employeeNameInput").val().trim();
	var empRole = $("#roleInput").val().trim();
	var empStart = moment($("#startInput").val().trim(), "DD/MM/YY").format("X");
	var empRate = $("#rateInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newEmp = {
		name:  empName,
		role: empRole,
		start: empStart,
		rate: empRate
	}

	// Uploads employee data to the database
	database.ref().push(newEmp);

	// Logs everything to console
	console.log(newEmp.name);
	console.log(newEmp.role);
	console.log(newEmp.start);
	console.log(newEmp.rate)

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#employeeNameInput").val("");
	$("#roleInput").val("");
	$("#startInput").val("");
	$("#rateInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var empName = childSnapshot.val().name;
	var empRole = childSnapshot.val().role;
	var empStart = childSnapshot.val().start;
	var empRate = childSnapshot.val().rate;

	// Employee Info
	console.log(empName);
	console.log(empRole);
	console.log(empStart);
	console.log(empRate);

	// // Prettify the employee start
	// var empStartPretty = moment.unix(empStart).format("00:00");
	// // Calculate the months worked using hardconre math
	// // To calculate the months worked
	// var empMonths = moment().diff(moment.unix(empStart, ':00'), "minutes");
	// console.log(empMonths);

	// // Calculate the total billed rate
	// var empBilled = empMonths - empRate;
	// console.log(empBilled);

	// Add each train's data into the table
	$("#TrainTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole +"</td><td>" + empStart + "</td><td>" + empRate +  "</td></tr>");

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case


