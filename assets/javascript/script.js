
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxgBUO_WcLNM8Qmba3JhOfcFpXsufO1xc",
    authDomain: "train-scheduler-42e31.firebaseapp.com",
    databaseURL: "https://train-scheduler-42e31.firebaseio.com",
    projectId: "train-scheduler-42e31",
    storageBucket: "train-scheduler-42e31.appspot.com",
    messagingSenderId: "10323975683"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  // Initialize variables
    var train_name = "";
    var frequency = 0;
    var first_train_time = 0;
    var destination = "";

    $("#addTrain").on("click",function(){
        event.preventDefault();
        var getTrainName = $("#TrainName").val();
        var getFreq = $("#freq").val();
        var getFirstTrainTime = $("#firstTrainTime").val();
        var getDest = $("#destination").val();
       
        database.ref().push({
            Train_Name : getTrainName,
            Frequency : getFreq,
            First_Train_Time :getFirstTrainTime,
            Destination : getDest
        })


    });
    database.ref().on("child_added",function(childSnapshot){
            var getChildRef = childSnapshot.val();
        
            console.log(getChildRef.Train_Name);
            console.log(getChildRef.Frequency);
            console.log(getChildRef.First_Train_Time);
            console.log(getChildRef.Destination);
            var addRow = $("<tr>");
            var addData = $("<td>");
       
//            addData.text(getChildRef.Train_Name);
//            addRow.append(addData);
//            addData.text(getChildRef.Destination);
//            addRow.append(addData);
//            addData.text(getChildRef.Frequency);
//            addRow.append(addData);
//            //addData.text(getChildRef.Train_Name);
//            addRow.append(addData);
            $("#userData").append(addRow);
            //Calculate next arrival
        // fetch freq & firsttime from DB
            var getDbFreq = getChildRef.Frequency;
            var getDbFirstTime = getChildRef.First_Train_Time;
        // convert first time
            var convertFirstTime = moment(getDbFirstTime,"HH:mm").subtract(1,"years");
            console.log("convertFirstTime", convertFirstTime);
        // get current time and format to hh:mm
            var getCurrTime = moment();
            console.log("getCurrTime" ,
            moment(getCurrTime).format("hh:mm"));
        // calculate difference between first time and curr time
            var timeDiff = moment().diff(moment(convertFirstTime),"minutes");
            console.log("timeDiff",timeDiff);
            
        // calculate time remaining
           var timeRemaining = timeDiff % getDbFreq;
            console.log(timeRemaining);
        // calculate wait time for next train
           var waitTime = getDbFreq - timeRemaining;
            console.log(waitTime);
            
        // Next train arrival time
           var nextTrainArrival = moment().add(waitTime,"minutes");
        
            console.log("Next Train arrival:",nextTrainArrival)
            
           addRow.append("<td>"+getChildRef.Train_Name + "</td><td>" + getChildRef.Destination + "</td><td>" + getChildRef.Frequency +"</td><td>" + moment(nextTrainArrival).format("hh:mm") + "</td><td>" + waitTime + "</td>");
           
            
            
            
        
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    