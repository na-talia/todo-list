// This method returns the element that has the ID attribute with the specified value
let input = document.getElementById("inputField")
let toDoList = document.getElementById("toDoList")
let buttonAdd = document.getElementById("buttonAdd")
let taskClear = document.getElementById("buttonDelete")

// Create an empty array that will be used for adding new tasks in To-do list
let list = []



// CLOCK
// Return the elements to show the current time and the day of the week
let clock = document.getElementById("clock")
let day = document.getElementById("daysOfWeek")

function timeAndDate() {
  let date = new Date() // Date objects contain a Number that represents milliseconds since 1 January 1970 UTC.

  let time = [date.getHours(), date.getMinutes()] // An array that contains time (hours and minutes)
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] // An array that contains days of the week
  let days = date.getDay() // This metod returns the day of the week for the specified date according to local time

// Adding a 0 before hours and minutes lower than 10
  if(time[0] < 10) {time[0] = "0" + time[0] }
  if(time[1] < 10) {time[1] = "0" + time[1] }

  let currentTime = [time[0], time[1]].join(':') // This method creates and returns a new string by concatenating all of the elements in an array

// It will replace the existing content of "clock" and "day" with the new content
  clock.innerHTML = currentTime
  day.innerHTML = daysOfWeek[days]

// Call the function and repeat the execution of the function every 1 second (1000 milliseconds)
  setInterval("timeAndDate()", 1000)
}



// INPUT FIELD AND 2 BUTTONS
// ADD BUTTON. Сall the function by pressing the button
buttonAdd.addEventListener("click", function() {
	if (input.value === '') {
			alert('Please, write something...') // If input field is empty, displays an alert box with a message
			return
		}
		list.push(input.value) // If there is something written in the input field, uses push() method, which adds new items to the end of the list[] array
		showTasks()
})


function showTasks() {
	toDoList.innerHTML=""
  // The forEach() method calls a function once for each element in an array
	list.forEach(function(item, index) {
  	let myList  =	"<li>" + item + "<a onclick='editTask(" + index + ")'>&#x270E;</a>" + "<a onclick='deleteTask(" + index + ")'>&#x2718;</a>" + "<a onclick='doneTask(" + index + ")'>&#10004;</a></li>"
		toDoList.innerHTML += myList // Add new tasks in a list with 3 buttons "Done", "Delete" and "Edit" every time by clicking the "Add" button
	});

  	input.value = "" // Clear an input field after adding new items
}


// Make the ability to add elements when pressing the enter key, if there is something written in input field
input.addEventListener("keyup", function(enter) {
    if (enter.keyCode === 13) { // Number 13 is the "Enter" key on the keyboard
      buttonAdd.click()  // The click() method simulates a mouse-click on an element
  }
});


// DELETE BUTTON. Delete all existing tasks
taskClear.addEventListener("click", function() {
  list.innerHTML = ""
  list = []
	showTasks()
});



// BUTTONS IN ARRAY
// Button "Done"
function doneTask(index) {
	list.splice(index, 1, " &#x2705;" + " " + list[index]) // Remove 1 element at the selected index, and insert "Done"-icon plus "space" plus list with selekted index
	return showTasks()
}


// Button "Edit"
function editTask(index) {
	var newValue = prompt("Edit your task") // By clicking the button "Edit", displays a dialog box that prompts for input a new task
	if (newValue === '') {
			alert('Please, write a new task') // If there is nothing written in the dialog box, displays an alert box
			return
		} else if (newValue === null) { // By clicking "Cancel"-button, nothing changes
			return
		}
	list.splice(index, 1, newValue)  // Remove 1 element at the selected index, and insert the new one instead
	showTasks()
}


// Button "Delete"
function deleteTask(index) {
	list.splice(index, 1) // Remove 1 element at the selected index
	showTasks()
}
