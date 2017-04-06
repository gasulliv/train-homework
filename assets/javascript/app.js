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
    $("#train-destination").html(childSnapshot.destination);
    $("#train-time").html(childSnapshot.firstTrainTime);
    $("#train-frequency").html(childSnapshot.frequency);
    $("#next-train").html(childSnapshot.nextTrainFormatted);
    $("#minutes-away").html(childSnapshot.MinutesTillTrain);

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// $("body").on("click", ".remove-train", function(){
//                $(this).closest ('tr').remove();
//                getKey = $(this).parent().parent().attr('id');
//                dataRef.child(getKey).remove();
//           });
