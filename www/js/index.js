/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



// $(function(){
//     // Initialize Firebase
//     var config = {
//        apiKey: "AIzaSyASZCb_OgmtwpSyea4_j5hhKu5XYYvTzmU",
//        authDomain: "fir-e5e4e.firebaseapp.com",
//        databaseURL: "https://fir-e5e4e.firebaseio.com",
//        projectId: "fir-e5e4e",
//        storageBucket: "fir-e5e4e.appspot.com",
//        messagingSenderId: "489270372821"
//      };
//      firebase.initializeApp(config);
   
     
//      var storage = firebase.storage();
//      var storageRef = firebase.storage().ref();
    
    
    
    
    
    
    
// //        var timestamp = Number(new Date());
// //        var photoRef = storageRef.child("photos/" + timestamp + ".png");
// //        storageRef.putString(imageURI, 'base64').then(function(snapshot) {
// //         console.log('Uploaded a base64 string!');
// });
var ltd;
var lgt;  
$("#location").click(function(){        
  var onSuccess = function(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
            ltd = position.coords.latitude;
            lgt = position.coords.longitude;
  };

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
});   


 
var photoURL;
$(function(){

  var config = {
    apiKey: "AIzaSyASZCb_OgmtwpSyea4_j5hhKu5XYYvTzmU",
    authDomain: "fir-e5e4e.firebaseapp.com",
    databaseURL: "https://fir-e5e4e.firebaseio.com",
    projectId: "fir-e5e4e",
    storageBucket: "fir-e5e4e.appspot.com",
    messagingSenderId: "489270372821"
  };
  firebase.initializeApp(config);
  //---------------------------------------------------------------------
  
  

});



function cam() {

   
     
     var storage = firebase.storage();
     var storageRef = firebase.storage().ref();
    
    
     navigator.camera.getPicture(onSuccess, onFail, {
       quality: 50,
       destinationType: Camera.DestinationType.DATA_URL
     });
   
     function onSuccess(imageURI) {
       
       
//------------------------------------------------------------------------------------------------------------       
    
var base64str = imageURI;
var binary = atob(base64str.replace(/\s/g, ''));
var len = binary.length;
var buffer = new ArrayBuffer(len);
var view = new Uint8Array(buffer);
for (var i = 0; i < len; i++) {
view[i] = binary.charCodeAt(i);  
}         
var blob = new Blob( [view], { type: "image/jpeg" });

//-------------------------------------------------------------------------------------------------------------
var timestamp = Number(new Date());
var photoRef = storageRef.child("photos/"+ timestamp+ ".png");


      
      photoRef.put(blob).then(function (snapshot) {
      photoRef.getDownloadURL().then(function (url) {
      photoURL = url;
          alert(url);
      })
  });
}
     function onFail(message) {
       alert('Failed because: ' + message);
       
     }
   
}

  
//-------------------------------------------CAMERA----------------------------------------------

function add(){
  var description = document.getElementById('description').value;
  console.log(description);
  var db = firebase.firestore();
  db.collection("pins").add({
    photo: photoURL,
    description: description,
    lat: ltd,
    long: lgt
    
  })
alert(photoURL+"/n"+description+"/n"+ltd+"/n"+lgt);

}
   
  