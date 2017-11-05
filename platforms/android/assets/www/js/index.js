
function hideDialog(id) {
  document.getElementById(id).hide;
  
};
ons.ready(function() {
  document.addEventListener("show", function(event){
    console.log(event.target.id);
    if(event.target.id=='myPage') { 
          // Clear your scope variables here or whatever                 
    }
});
 
 document.addEventListener('postchange', function(event) {
    var tab = event.index;
    console.log(tab);
    if(tab==1){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        console.log(user);
        document.getElementById('signin').hide();
     
        
        } else {
          
          var dialog = document.getElementById('signin');
          if (dialog) {
            dialog.show();
          }
          else {
            ons.createDialog('dialog.html')
              .then(function (dialog) {
                dialog.show();
                console.log(document.getElementById('signin'));
                                      });
              }     
                       
                }
                
      });
    }
  
    });

  });
  
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//

function onDeviceReady() {
  // Now safe to use device APIs
  console.log("navigator.geolocation works well");
    
  
    // onSuccess Callback 
    // This method accepts a Position object, which contains the 
    // current GPS coordinates 
    // 
    var onSuccess = function(position) {
     
            ltd = position.coords.latitude;
            lgt = position.coords.altitude;
            ons.notification.alert("Success!!");
  };

  // onError Callback receives a PositionError object 
  // 
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}


var ltd = 0;
var lgt = 0;  


var photoURL = null;
var db;
var imgCheck;
var config = {
    apiKey: "AIzaSyASZCb_OgmtwpSyea4_j5hhKu5XYYvTzmU",
    authDomain: "fir-e5e4e.firebaseapp.com",
    databaseURL: "https://fir-e5e4e.firebaseio.com",
    projectId: "fir-e5e4e",
    storageBucket: "fir-e5e4e.appspot.com",
    messagingSenderId: "489270372821"
 };
  firebase.initializeApp(config);

  //--------------------------------CAMERA-------------------------------------

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
      imgCheck = true;
      ons.notification.alert(url);
          $("#preview").attr("src", url);
      })
  });
  }
     function onFail(message) {
       ons.notification.alert('Failed because: ' + message);
       
     }
   
}
//-------------------------------------Location---------------------------------
function locate(){

  alert(ltd +"\n"+ lgt);//bug

}
  
//---------------------------------------Post----------------------------------------

function add(){
  if(imgCheck===true){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+yyyy;
    
  var description = document.getElementById('description').value;
  var timestamp = Number(new Date());
  var user = firebase.auth().currentUser;
  console.log(description);
  var db = firebase.firestore();
  if(user != null){
  db.collection("pins").doc("'"+timestamp+"'").set({
    id: timestamp,
    photo: photoURL,
    description: description,
    lat: ltd,
    long: lgt,
    poster: name = user.email,
    time: today
  })
 }
  location.reload();

 }else{
  ons.notification.alert("Photo must have")
}
} 
//---------------------------------------------Timeline----------------------------------
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


});

//---------------------------------------------Map--------------------------------------

function initMap() {
               
                var uluru = {lat: 0, lng: 0};
                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 16,
                  center: uluru
                });
                
                
  //                infoWindow = new google.maps.InfoWindow;
                
                
                
  //                            if (navigator.geolocation) {
  //                            navigator.geolocation.getCurrentPosition(function(position) {
  //                            ltd= position.coords.latitude;
  //                            lgt= position.coords.longitude;
  //                            var pos = {
  //                            lat: position.coords.latitude,
  //                            lng: position.coords.longitude
  //                            };
  //                            var marker = new google.maps.Marker({
  //                            position: pos,
  //                            map: map
  //                            });
  //                           google.maps.event.addListener(marker, "Marker", function() {
  //                            infoWindow.open(map,marker);
  //                            });
  //                            infoWindow.open(map);
  //                            map.setCenter(pos);
  //                            }, function() {
  //                            handleLocationError(true, infoWindow, map.getCenter());
  //                            });
  //                            } else {
  //                            // Browser doesn't support Geolocation
  //                            handleLocationError(false, infoWindow, map.getCenter());
  //                            }
                        
  //               }
                
  //                        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //                          infoWindow.setPosition(pos);
  //                          infoWindow.setContent(browserHasGeolocation ?
  //                                                'Error: The Geolocation service failed.' :
  //                                                'Error: Your browser doesn\'t support geolocation.');
  //                          infoWindow.open(map);
  }
              
            
//-----------------------------------------------------------------------Authentication--------------------------------------------------------------------------------

function signinWithEmail(){
  var email = document.getElementById('username1').value;
  var password = document.getElementById('password1').value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    
    // [END_EXCLUDE]
  });
  // [END authwithemail]
}


function signout(){

  firebase.auth().signOut();
  

}


function signUp(){
  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  
}







//----------------------------------------------DeletePost-----------------------------------
function deletePost(id){
  console.log(id);
  var did = id;
  var db = firebase.firestore();
  
  db.collection("pins").doc(did).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });

}

var x = document.getElementById('xxx');
console.log(x);


