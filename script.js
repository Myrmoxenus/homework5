//Sets variable DateTime for navigation by
var DateTime = luxon.DateTime
var year = DateTime.local().year.toString()
var month = DateTime.local().monthLong.toString()
var weekday = DateTime.local().weekdayLong.toString()
var day = DateTime.local().day.toString()
var hour = DateTime.local().hour.toString()

//Renders the today header
function renderToday (){
  message = "Today is " + weekday + ", " + month + " " + day + " " + year + "!"
  $('#todayHeader').append(message)
}

//Creates the head of the planner table
function createTableHead() {
  var planner = ""
  planner += '<table id="plannerTable">'
  planner +='<tr>'
  planner +='<th>Hour</th>'
  planner +='<th>Activity</th>'
  planner +='</tr>'

  $('#plannerContainer').append(planner)
}

// Takes an ID number and appends a single row onto the planner table with attributes corresponding to the inputted ID number
function createTableRow(IDnumber){
  var tableRow = ""
  tableRow += '<tr>'
  tableRow += '<td>'
  tableRow += IDnumber
  tableRow += '</td>'
  tableRow += '<td class="inputBoxCell">'
  tableRow += '<input type="text" class="activityInputBox" id="' + IDnumber + 'Input" value="">'
  tableRow += '</td>'
  tableRow += '<td>'
  tableRow += '<button type="button" class="submitActivityButton" correspondingInput="#' + IDnumber + 'Input" id="' + IDnumber + 'Submit">Set Activity!</button>'
  tableRow += '</td>'
 
  $('#plannerTable').append(tableRow)
}

// Calls the createTableHead function to create the table head, and then fills it with rows 0-23 to correspond to the 24 hour clock standard
function makeTable(){
createTableHead()
  for (i=0; i<24; i++) {
  createTableRow(i)
  }
}

//Stores the current day, month, year that user is using planner
function storeToday(){
currentDay = year + month + day
localStorage.setItem("dayOfMostRecentUse", currentDay)
}  

// Checks if the application was last opened earlier today or on a previous day
function isNewDay(){
currentDay = year + month + day

return currentDay != localStorage.getItem("dayOfMostRecentUse")

}

//Uses Jquery to find the IDs of input boxes with id #iInput with I being 0-23. 
function fillTable(){
  for (i=0; i<24; i++) {
    $("#"+ i + "Input").attr("value", localStorage.getItem("saved" + i + "Submit"))
  }
}

//Empties local storage of inputs
function emptyStorage(){
  for (i=0; i<24; i++){
  localStorage.setItem("saved" + i + "Submit", "")
  }
}

//Checks if user's last use of the planner was today, if it's a new day, it clears storage the table for the new day
function clearNewDay(){
  if (isNewDay() == true){
    emptyStorage()
  }
  fillTable()
}

//Tags all input boxes as either in the past, the present or future
function renderTemporal(){
  for (i=0; i<24; i++) {
    if (i<hour){
      $("#"+ i + "Input").attr("temporal", "past")
    }
    else if (i==hour){
      $("#"+ i + "Input").attr("temporal", "present")
    }
    else {
      $("#"+ i + "Input").attr("temporal", "future")
    }
  }
}

//Renders header and table on Start Up
makeTable()
clearNewDay()
storeToday() 
renderToday()
renderTemporal()


//Listens for the event of submit buttons being clicked, stores the current input into local storage along with the submit button ID to give saved values an index
$(".submitActivityButton").click(function(){
  storedValue = $($(this).attr("correspondingInput")).val()
  localStorage.setItem("saved" + $(this).attr("id"), storedValue)
})


