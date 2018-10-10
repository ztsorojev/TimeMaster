import './scss/styles.scss';

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayModal(id) {
  $(id).toggle();
  //document.getElementById("taskForm").reset();
}
//Make the function global so that it's accesible using Webpack
window.displayModal = displayModal;


//Put default value of time to current time
var timeControl = $('input[type="time"]');
timeControl.value = '15:30';

// Array of day names
var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday",
              "Thursday","Friday","Saturday");

// Array of month Names
var monthNames = new Array("January","February","March","April","May","June","July",
              "August","September","October","November","December");

var now = new Date();
$('#todayDate').html(dayNames[now.getDay()] + ", " + monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear());  


/********************************************************************/

/**
 * Retrieves input data from a form and returns it as a JSON object.
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  
  //make sure the element is not empty
  if(element.name && element.value) {
    data[element.name] = element.value;
  }
  return data;

}, {});

const handleFormSubmit = event => {
  
  // Stop the form from submitting since we’re handling that with AJAX.
  event.preventDefault();
  
  const data = formToJSON(form.elements);

  form.reset();
  
  /*
  const dataContainer = document.getElementsByClassName('results__display')[0];
  const dataJSON = JSON.stringify(data, null, "  ");
  dataContainer.textContent = data.taskName; 
  */

  renderTask(data);
  
};


const form = document.getElementById('taskForm');
form.addEventListener('submit', handleFormSubmit);



const renderTask = data => {

  const itemID = Math.round(Math.random()*1000).toString();

  // Main wrapper div
  const itemUI = $("<div id="+ itemID +"/>");
  itemUI.addClass('itemTask');

  // Checkbox
  const checkB = $('<input type="checkbox">');
  checkB.css("margin", '8px');
  checkB.change(function() {
      checkTask(itemID);
  });
  itemUI.append(checkB);

  // Time
  const time = $("<p/>");
  time.html(data.start + " - " + data.end);
  itemUI.append(time);

  // Task title
  const taskNote = $("<p/>");
  taskNote.css('font-weight', '500');
  taskNote.addClass("col-md-4");
  taskNote.html(data.taskName);
  itemUI.append(taskNote);

  // Priority of the task
  const priority = $("<p/>");
  priority.addClass('priority-'+ data.priority);
  priority.html('Priority ' + data.priority);
  itemUI.append(priority);

  /* Wrapp edit and delete icons in a div */
  const wrapper = $("<div/>");
  wrapper.addClass('ml-auto');
  wrapper.css("padding", "0 !important");

    const editItem = $("<button onClick='editTask(" + itemID + ")'><i class='fa fa-pencil'></i></btn>");
    editItem.addClass('itemIcons');
    wrapper.append(editItem);

    const deleteItem = $("<button onClick='deleteTask(" + itemID + ")'><i class='fa fa-times'></i></btn>");
    deleteItem.addClass('itemIcons');
    wrapper.append(deleteItem);

  itemUI.append(wrapper);

  $('#taskList').append(itemUI);

}


const checkTask = divId => {
  if ($('#' + divId + ' > input').is(":checked")) {
    $('#' + divId + ' > p:nth-child(2)').css({"text-decoration": "line-through", "opacity": "0.3"});
    $('#' + divId + ' > p:nth-child(3)').css({"text-decoration": "line-through", "opacity": "0.3"});
    $('#' + divId + ' > p:nth-child(4)').css({"text-decoration": "line-through", "opacity": "0.3"});
  } else {
    $('#' + divId + ' > p:nth-child(2)').css({"text-decoration": "none", "opacity": "1"});
    $('#' + divId + ' > p:nth-child(3)').css({"text-decoration": "none", "opacity": "1"});
    $('#' + divId + ' > p:nth-child(4)').css({"text-decoration": "none", "opacity": "1"});
  }
}



/*
 * Edit task: show modal form and update task
 */
const editTask = divId => {

  /*$('#taskNameEdit').val($('#' + divId + ' > p:nth-child(3)').innerHTML);
  $('#start').val(data.start);
  $('#end').val(data.end);*/

  displayModal('#edit-task');

  const formEdit = document.getElementById('taskFormEdit');
  formEdit.addEventListener('submit', function(event) {
      event.preventDefault();
      const data = formToJSON(formEdit.elements);

      updateTask(data, divId);
  });
}

//Make the function global so that it's accesible using Webpack
window.editTask = editTask;


const updateTask = (data, divId) => {
  var taskElements = document.getElementById(divId).children;
  taskElements[1].innerHTML = data.start + " - " + data.end;
  taskElements[2].innerHTML = data.taskName;
  taskElements[3].innerHTML = 'Priority ' + data.priority;
  taskElements[3].className = "priority-"+ data.priority;

  /*
  $('#' + divId + ' > p:nth-child(2)').html(data.start + " - " + data.end);
  $('#' + divId + ' > p:nth-child(3)').html(data.taskName);
  $('#' + divId + ' > p:nth-child(4)').removeClass().addClass('priority-'+ data.priority).html('Priority ' + data.priority);
  */
}


const deleteTask = divId => {
  $('#' + divId).remove();
}

//Make the function global so that it's accesible using Webpack
window.deleteTask = deleteTask;
