$(document).ready(function() {
  
    // test flag
    const test = false;
  
    // get times from moment.js
    const now = moment().format('MMMM Do YYYY');
  
    // commented out for test in non-standard hours
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
  
    // set times for tesitng after hours
    if (test) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
  
    let $dateHeading = $('#currentDay');
    $dateHeading.text(now);
  
    // Parsing the JSON string to an object
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    if (test) { console.log(storedPlans); }
  
    // If plans were stored in local storage, update to array
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      // helpfully remind user that lunch is important
      planTextArr = new Array(9);
      planTextArr[4] = "Don't forget to eat!";
    }
  
    if (test) { console.log("full array of plned text",planTextArr); }
  
    // set variable referencing plannerContainer
    let $plannerDiv = $('#plannerContainer');
    // clear existing elements
    $plannerDiv.empty();
  
    if (test) { console.log("current time",nowHour12); }
  
  
    // Build calendar by row for fix set of hours
    for (let hour = 9; hour <= 17; hour++) {
      // index for array use offset from hour
      let index = hour - 9;
      
      // Build grid-row elements
      let $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      // Timeblock portion of row
      let $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2');
    
      // TimeBlock element (contains time)
      const $timeBoxSpn = $('<span>');
      // Use to get value
      $timeBoxSpn.attr('class','timeBlock');
      
      // Format hours
      let displayHour = 0;
      let ampm = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      // Gives time to element Timeblock
      $timeBoxSpn.text(`${displayHour} ${ampm}`);
  
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);
  
      let $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
  
      // access index from data array for hour 
      $dailyPlanSpn.val( planTextArr[index] );
      
      // Create column with Grid
      let $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      // Adjusting row and column
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
  
      // SaveIcon
      let $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      
      // Add saveicon
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
  
      // Give row color based on time
      updateRowColor($rowDiv, hour);
      
      // Add row to plannercontainer
      $plannerDiv.append($rowDiv);
    };
  
    // function to update row color
    function updateRowColor ($hourRow,hour) { 
  
      if (test) { console.log("rowColor ",nowHour24, hour); }
  
      if ( hour < nowHour24) {
        if (test) { console.log("lessThan"); }
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        if (test) { console.log("greaterthan"); }
        $hourRow.css("background-color","lightgreen")
      } else {
        if (test) { console.log("eqaul"); }
        $hourRow.css("background-color","tomato")
      }
    };
  
    // saves to local storage
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      if (test) { console.log('click pta before '+ planTextArr); }
  
      let $index = $(this).attr('save-id');
  
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
  
      planTextArr[$index] = $value;
  
  
      if (test) { console.log('value ', $value); }
      if (test) { console.log('index ', $index); }
      if (test) { console.log('click pta after '+ planTextArr); }
  
      // remove shawdow pulse class
      $(`#saveid-${$index}`).removeClass('shadowPulse');
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // function to color save button on change of input
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      if (test) { console.log('onChange'); }
      if (test) { console.log('id', $(this).attr('hour-index')); }
  
      // neeed to check for saveicon
  
      let i = $(this).attr('hour-index');
  
      // add shawdow pulse class
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });