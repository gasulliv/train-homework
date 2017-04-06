    // Initialize Firebase
var config = {
    apiKey: "AIzaSyATxWas3SMngpYaVOk6GSrltzqgOlwsa-k",
    authDomain: "train-train-707ec.firebaseapp.com",
    databaseURL: "https://train-train-707ec.firebaseio.com",
    projectId: "train-train-707ec",
    storageBucket: "train-train-707ec.appspot.com",
    messagingSenderId: "508948354656"
};

firebase.initializeApp(config);

// This variable references the database
var database = firebase.database();

//captures the button click
$("#add-train").on("click", function(event) {
    //this line preventst the default refresh
    event.preventDefault();

    // The values from the user
    var trainDest = $("#desInput").val().trim();
    var trainTime = $("#firstInput").val().trim();
    var trainFreq = $("#freqInput").val().trim();

    //creaitng new train object
    var newTrain = {
    destination: trainDest,
    firstTrainTime: trainTime,
    frequency: trainFreq
};

    // pushes to the database
    database.ref().push(newTrain);

    // Logs everything to console

    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    //alert if new train add was successful
    alert("new train added!");

    // clear all the text boxes so they can be loaded again

    $("#desInput").val("");
    $("#firstInput").val("");
    $("#freqInput").val("");

    return false;

});


// Firebase event creator that adds a train to the database and a line to the html when an entry is added
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    //console log the database ref
    console.log(childSnapshot.val());

    // storing the snapshot.val() in a variable for convenience
    var des = childSnapshot.val().trainDest;
    var trainFirst = childSnapshot.val().trainTime;
    var trainFre = childSnapshot.val().trainFreq;

    //console log the inputted train info

    console.log(des);
    console.log(trainFirst);
    console.log(trainFre);

      // To calculate the next train...

      // First Time
    var firstTimeConverted = moment(trainFirst, "hh:mm");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFre;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFre - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // // Getting an array of each key In the snapshot object
    // var svArr = Object.keys(sv);

    // // Finding the last user's key
    // var lastIndex = svArr.length - 1;

    // var lastKey = svArr[lastIndex];

    // // Using the last user's key to access the last added user object
    // var lastObj = sv[lastKey];

    // // Console.loging the last user's data
    // console.log(lastObj.name);
    // console.log(lastObj.email);
    // console.log(lastObj.age);
    // console.log(lastObj.comment);

    // Change the HTML to reflect
    $("#train-destination").html(newTrain.destination);
    $("#train-time").html(newTrain.firstTrainTime);
    $("#train-frequency").html(newTrain.frequency);
    $("#next-train").html(tMinutesTillTrain);
    $("#minutes-away").html(nextTrain);

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
