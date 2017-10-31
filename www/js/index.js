var ltd= 0;
var lgt= 0;  





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


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("navigator.geolocation works well");
}
 
$("#location").click(function(){        
  
});   


 
var photoURL = null;
var db;
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
  //---------------------------------------------------------------------
  
  



function cam() {

   
     
     var storage = firebase.storage();
     var storageRef = firebase.storage().ref();
    
    
     navigator.camera.getPicture(onSuccess, onFail, {
       quality: 50,
       destinationType: Camera.DestinationType.DATA_URL
     });
   
     function onSuccess(imageURI) {
       
       
    
    
var base64str = imageURI;
var binary = atob(base64str.replace(/\s/g, ''));
var len = binary.length;
var buffer = new ArrayBuffer(len);
var view = new Uint8Array(buffer);
for (var i = 0; i < len; i++) {
view[i] = binary.charCodeAt(i);  
}         
var blob = new Blob( [view], { type: "image/jpeg" });


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




function locate(){
  var onSuccess = function(position) {
    ltd=position.coords.latitude;
    lgt=position.coords.longitude;
    
    alert(ltd +"and"+lgt);
    
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);


}

function add(){

  var description = document.getElementById('description').value;
  var timestamp = Number(new Date());
  
  console.log(description);
  var db = firebase.firestore();
  db.collection("pins").doc("'"+timestamp+"'").set({
    id: timestamp,
    photo: photoURL,
    description: description,
    lat: ltd,
    long: lgt
    
  })
alert(photoURL+"/n"+description+"/n"+ltd+"/n"+lgt);

}
$(function(){

var db = firebase.firestore();   
var mus = $('#template').html();
var firestoreRef = db.collection("pins");
firestoreRef.orderBy("id", "desc").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc){
        console.log(doc.id, " => ", doc.data());
        db.collection("pins").doc(doc.id).update({
          id: doc.id
        })        
        var rendered = Mustache.render(mus, doc.data());
        $("#pins").append(rendered);
        
          

    });
})  
//-----------------------------------------Getlocation----------------------------------------------

navigator.geolocation.getCurrentPosition(onSuccess, onError);



});
function onSuccess(position) {
  ltd=position.coords.latitude;
  lgt=position.coords.longitude;

  alert(ltd +"and"+lgt);
  
};

// onError Callback receives a PositionError object
//
function onError(error) {
  alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}


var like = function(num) {
  if (document.getElementById("button-post-like-"+num).classList.contains("like")) {
    document.getElementById("button-post-like-"+num).classList.remove("ion-ios-heart","like");
    document.getElementById("button-post-like-"+num).classList.add("ion-ios-heart-outline");
  } else {
    document.getElementById("button-post-like-"+num).classList.remove("ion-ios-heart-outline");
    document.getElementById("button-post-like-"+num).classList.add("ion-ios-heart","like");
    document.getElementById("post-like-"+num).style.opacity = 1;

    setTimeout(function(){
      document.getElementById("post-like-"+num).style.opacity = 0;
    }, 600);
  }
}


              function initMap() {
               
                var uluru = {lat: 7.892804, lng: 98.351697};
                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 16,
                  center: uluru
                });
                
                
                infoWindow = new google.maps.InfoWindow;
                
                
                
                        // Try HTML5 geolocation.
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(function(position) {
                            var pos = {
                              lat: position.coords.latitude,
                              lng: position.coords.longitude
                            };
                            var marker = new google.maps.Marker({
                              position: pos,
                              map: map
                            });
                            google.maps.event.addListener(marker, 'click', function() {
                              infoWindow.open(map,marker);
                            });
                            infoWindow.open(map);
                            map.setCenter(pos);
                          }, function() {
                            handleLocationError(true, infoWindow, map.getCenter());
                          });
                        } else {
                          // Browser doesn't support Geolocation
                          handleLocationError(false, infoWindow, map.getCenter());
                        }
                        
                      }
                
                      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                        infoWindow.setPosition(pos);
                        infoWindow.setContent(browserHasGeolocation ?
                                              'Error: The Geolocation service failed.' :
                                              'Error: Your browser doesn\'t support geolocation.');
                        infoWindow.open(map);
                      }
              
            
