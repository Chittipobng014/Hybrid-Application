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

});


   

function cam() {

   
     
     var storage = firebase.storage();
     var storageRef = firebase.storage().ref();
    
    
     navigator.camera.getPicture(onSuccess, onFail, {
       quality: 50,
       destinationType: Camera.DestinationType.DATA_URL
     });
   
     function onSuccess(imageURI) {
       console.log(imageURI);
       var timestamp = Number(new Date());
       var photoRef = storageRef.child("photos/"+ timestamp+ ".png");
       //var message = 'data:text/plain;base64,'+imageURI;
       

       //--------------------------------------------------------------------
       // base64 string
var base64str = imageURI;

// decode base64 string, remove space for IE compatibility
var binary = atob(base64str.replace(/\s/g, ''));

// get binary length
var len = binary.length;

// create ArrayBuffer with binary length
var buffer = new ArrayBuffer(len);

// create 8-bit Array
var view = new Uint8Array(buffer);

// save unicode of binary data into 8-bit Array
for (var i = 0; i < len; i++) {
view[i] = binary.charCodeAt(i);
}

// create the blob object with content-type "application/pdf"               
var blob = new Blob( [view], { type: "application/pdf" });
       //--------------------------------------------------------------------
      
      
      photoRef.put(blob);
      //photoRef.putString(message, 'base64');
       
       alert(blob);
     }
   
     function onFail(message) {
       alert('Failed because: ' + message);
       
     }
   
   }

   function put(){

  
    
    var imageURI = document.getElementById("file").value;


    var storage = firebase.storage();
    var storageRef = firebase.storage().ref();

    var timestamp = Number(new Date());
    var photoRef = storageRef.child("photos/test.png");
    var message = 'data:text/plain;base64,'+imageURI;
    console.log(imageURI);
    
 
    //var message = 'data:text/plain;base64,'+imageURI;
    photoRef.put(imageURI);
    


   }
   $(function () {
    
        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();
    
        // Points to the root reference
        var storageRef = firebase.storage().ref();
        
    
        $("#upload").click(function () {
    
            var photofile = $("#file").prop("files")[0];
            var timestamp = Number(new Date());
            var photoRef = storageRef.child("photos/" + timestamp + ".png");
            console.log(photofile); 
            photoRef.put(photofile);
               
            
        });
    
    });

    