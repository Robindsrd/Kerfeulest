/*
This is the javascript that validates the booking page fields and also calculates the total price of the stay.
*/
const oneRoom = 25;
const twoRoom = 50;
const studioRoom = 100;
const breakF = 10;

//This function calculates the total cost of all the options
//that are available on the form. 
function updateCost() {
	var subTotal = 0;
	var breakCost = 0;
	var roomType = document.forms["form1"]["RoomType"].value;
	var NumOfRoom = document.forms["form1"]["NumOfRoom"].value;
	var breakfast = document.getElementById("breakfast").checked;
	var numAdult = parseInt(document.forms["form1"]["NumOfAdults"].value);
	var numChild = parseInt(document.forms["form1"]["NumOfChildren"].value);
	
	var numStay = numAdult + numChild;
	var Rtype = 0;
	if(roomType == "1BDU"){
		subTotal = oneRoom * NumOfRoom;
		Rtype = 25;
	}
	else if(roomType == "2BDU"){
		subTotal = twoRoom * NumOfRoom;
		Rtype = 50;
	}
	else if(roomType == "Studio"){
		subTotal = studioRoom * NumOfRoom;
		Rtype = 100;
	}
	
	var SDate = document.getElementById('SDate').value;
	var EDate = document.getElementById('EDate').value;
	var diffDays;
	if(DateCheck(SDate,EDate)){
	var SParsed = Date.parse(SDate)
	var EParsed = Date.parse(EDate)
	const diffTime = Math.abs(SParsed-EParsed);
	diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	subTotal = subTotal + (diffDays * Rtype);
	}
	if(breakfast){
		breakCost = (breakF * numStay) * diffDays;
		subTotal = subTotal + breakCost;
		
	}
	document.getElementById("subT").value = "$" + subTotal;
	
}
//This function validates the First name field by ensuring it isn't left blank.
function validateFname() {
		var fname = document.forms["form1"]["fname"].value;
		if (fname == "" ) {			
				var msg = "Field can't be left blank"
				displayError(document.form1.fname, msg);
				return false;
		}
		else{
			removeDisplayError();
			
		}
}
//This function validates the Last name field by ensuring it isn't left blank.
function validateLname() {
		var lname = document.forms["form1"]["lname"].value;
		if (lname == "" ) {
			var msg = "Field can't be left blank"
			displayError(document.form1.lname, msg);
			return false;
		}
		else{
			removeDisplayError();
			
		}
}
//This function checks the start and end date to ensure it complies with a number of checks, such as if the start or end date is before todays' date
//or if it has been left blank.
function DateCheck(SDate,EDate){
	var today = new Date();
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
	
	if(date < 10){
		date = '0' + date;
	}
	if(month < 10){
		month = '0' + month;
	}
	
	today = year + '-' + month + '-' + date;
	if(!SDate == "" && !EDate == "" && SDate > today && SDate < EDate && EDate != SDate && EDate != today){
		return true;
	}
	else{
		return false;
	}	
}
//The time unhide function incorporates the ValidDate Function to determine whether the time should be made visable.
//It does this by passing the start and end date values and - depending on if the function returns 'true' - makes the time
//visible to the user. Also calls the updateCost() function if valid start and end date is entered
function TimeUnhide(){
	var SDate = document.getElementById('SDate').value;
	var EDate = document.getElementById('EDate').value;
	var ValidDate = DateCheck(SDate,EDate);
	if(ValidDate){
	document.getElementById('ATime').classList.remove('hidden');
	document.getElementById('STime').classList.remove('hidden');	
	document.getElementById('STime').classList.add('input');	
	removeDisplayError(document.form1.SDate);
	removeDisplayError(document.form1.EDate);
	updateCost();
	}
	else if(!ValidDate){
	document.getElementById('ATime').classList.add('hidden');
	document.getElementById("STime").classList.add("hidden");
	document.getElementById("STime").classList.remove("input");	
	var msg = "Please check Start and End date"
	displayError(document.form1.EDate, msg);
	displayError(document.form1.SDate, msg);
	}
}
//This function uses regex expressions to test if the user entered a valid email. It also displays a message 
//as soon as the user starts typing as per assignment request.
function validEmail(){
	var email_regexp = /^\w+@[a-z]+(\.[a-z]+)+$/;
	var email = document.forms["form1"]["email"];
	var valid = email_regexp.test(email);
	if (!valid)
	{
		displayError(email, "Email must be correct as it will be used to send booking confirmation");
		return false;
	} 
	else {
		removeDisplayError();
		return true;
	}
}
//This function just removes any error message with the tag 'error', which solves the duplicate
//message problem.
function removeDisplayError(){
		$("#error").remove();
}
//This function produces an error message and highlights the relevent field border red.
function displayError(element, msg){
		$("#error").remove();
		var msgElement=document.createElement("span");
		msgElement.setAttribute("id","error");
		msgElement.textContent=msg;
		if(element != document.forms["form1"]["email"]){
			element.style.border="solid 1px red";
		}
		msgElement.style.color="red";
		msgElement.style.float="right";
		element.parentNode.insertBefore(msgElement, element.nextSibling);	
}
