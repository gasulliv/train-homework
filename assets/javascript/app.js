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

//setting the html variable n

 var n = 0;

//captures the button click
$("#add-train").on("click", function(event) {
    //this line preventst the default refresh
    event.preventDefault();

    // The values from the user
    var trainDest = $("#desInput").val().trim();
    var trainTime = $("#firstInput").val().trim();
    var trainFreq = $("#freqInput").val().trim();
    var firstTimeConverted = moment(trainTime, "hh:mm");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFreq;
    var MinutesTillTrain = trainFreq - tRemainder;
    var nextTrain = moment().add(MinutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");

    //creaitng new train object
    var newTrain = {
    destination: trainDest,
    firstTrainTime: trainTime,
    frequency: trainFreq,
    MinutesTillTrain : MinutesTillTrain,
    nextTrainFormatted : nextTrainFormatted
};

    // pushes to the database
    database.ref().push(newTrain);

    // Logs everything to console

    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);
    console.log(newTrain.MinutesTillTrain);
    console.log(newTrain.nextTrainFormatted);


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
    var tMin = childSnapshot.val().MinutesTillTrain;
    var tNext = childSnapshot.val().nextTrainFormatted;

    //console log the inputted train info

    console.log(des);
    console.log(trainFirst);
    console.log(trainFre);
    console.log(tMin);
    console.log(tNext);


    $("table tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>");

    // Add values to corresponding column
    var rowTds = $("table")
        .children()
        .eq(1)
        .children("tr")
        .eq(n)
        .children("td");
    var headings = [childSnapshot.val().destination, childSnapshot.val().firstTrainTime, childSnapshot.val().frequency, childSnapshot.val().nextTrainFormatted, childSnapshot.val().MinutesTillTrain];
    for (var i = 0; i < headings.length; i++) {
        rowTds.eq(i).text(headings[i]);
    }

    // Increase n to repeat above steps for next child
    n++;

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

