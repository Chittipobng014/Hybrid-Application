var ltd = 0;
var lgt = 0; 
var photoUrl = "https://html.com/wp-content/uploads/very-large-flamingo.jpg";
var db;

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
      photoUrl = url;
      
      
          $("#preview").attr("src", url);
      })
  });
  }
     function onFail(message) {
       ons.notification.alert('Failed because: ' + message);
       
     }
   
}

function check(){
  var user = firebase.auth().currentUser;
  if(user){
      // Updates the user attributes:
 user.updateProfile({
  displayName: user.email,
  photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2RZRW7ET_aWFSC6Za6Nk_QtaiSlVHYU6JSUf1PJMYA3SvKFTOpQ"
 }).then(function() {
  
  var displayName = user.displayName;
  
  var photoURL = user.photoURL;
  console.log(displayName+photoURL);
 }, function(error) {
  
 });
    }
}

$(document).ready(function (){
  $(function (){
  //   document.addEventListener('postchange', function(event) {
  //     var tab = event.index;
  //     console.log(tab);
  //     if(tab ==2){
  //       initMap();
  //  }
  //  });
  //   //-----------------------------------------------------------------------------
  //   var onSuccess = function(position) {
      
  //            ltd += position.coords.latitude;
  //            lgt += position.coords.longitude;
  //            console.log(ltd+"\n"+lgt);
             
             
  //  };
  
  //  // onError Callback receives a PositionError object 
  //  // 
  //  function onError(error) {
  //      ons.notification.alert('code: '    + error.code    + '\n' +
  //            'message: ' + error.message + '\n');
  //  }
  
  //  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  
    //---------------------------------------------------------------------------------------
    document.addEventListener('postchange', function(event) {
      var tab = event.index;
      console.log(tab);
      if(tab !=0 && tab !=2){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      console.log(user);
      document.getElementById('signin').hide();
      document.getElementById('signup').hide();
      console.log("Signed In");
      document.addEventListener("click", function(event){
        console.log(event.target.id);
       
      });    
      
      } else {
        
        var dialog = document.getElementById('signin');
        if (dialog) {
          dialog.show();
        }
        else {
          ons.createDialog('dialog.html')
            .then(function (dialog) {
              dialog.show();
              
                                    });
            }     
                     
              }
              
    });
  }
  });

  });
});

ons.ready(function() {
  //-----------------------------------------------------------------------------
   document.addEventListener('postchange', function(event) {
     var tab = event.index;
     console.log(tab);
     if(tab ==2){
       initMap();
  
   //-----------------------------------------------------------------------------
   function onSuccess(position) {
    
            ltd = position.coords.latitude;
            lgt = position.coords.longitude;
            initMap();
           
           
  }; 

  // onError Callback receives a PositionError object 
  // 
  function onError(error) {
      ons.notification.alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
 }
 });
 
  //-------------------------side menu---------------------------
  document.addEventListener("click", function(event){
    console.log(event.target.onclick);
    if(event.target.id=='side') { 
      firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        console.log(user);
        document.getElementById('signin').hide();
        console.log("Signed In");    
        
        }else{
          var dialog = document.getElementById('signin');
          if (dialog) {
            dialog.show();
          }
          else {
            ons.createDialog('dialog.html')
              .then(function (dialog) {
                dialog.show();
                
                                      });
              }
        }
      }); 
                      
    }
    
 });

  //------------sign up---------------------------
  document.addEventListener("click", function(event){
    console.log(event.target.value);
    var user = firebase.auth().currentUser;
    if(event.target.id=='signupBtn') { 
      if(user) {
        console.log(user);
        document.getElementById('signup').hide();
        console.log("Signed In");    
        ons.notification.alert("Sign Up Complete");
        }else{
          var dialog = document.getElementById('signup');
          if (dialog) {
            dialog.show();
          }
          else {
            ons.createDialog('dialog1.html')
              .then(function (dialog) {
                dialog.show();
                
                                      });
              }
        }
        
                      
    }
    
 });
 //---------------------sign in------------------------------
 //  document.addEventListener('postchange', function(event) {
 //     var tab = event.index;
 //     console.log(tab);
 //     if(tab==1){
 //       firebase.auth().onAuthStateChanged(function(user) {
 //         if (user) {
 //         console.log(user);
 //         document.getElementById('signin').hide();
 //         console.log("Signed In");
 //         document.addEventListener("click", function(event){
 //           console.log(event.target.id);
 //           var user = firebase.auth().currentUser;
 //           if(event.target.id=='up') {
 //             ons.notification.alert("Sign Up Complete");
 //           }
 //           if(event.target.id=='in'){
 //             ons.notification.alert("Sign In Complete");
 //           }
 //         });    
        
 //         } else {
          
 //           var dialog = document.getElementById('signin');
 //           if (dialog) {
 //             dialog.show();
 //           }
 //           else {
 //             ons.createDialog('dialog.html')
 //               .then(function (dialog) {
 //                 dialog.show();
                
 //                                       });
 //               }     
                       
 //                 }
                
 //       });
 //     }
    
 //     });
    
    
    
});

function hideDialog() {
  var dialog = document.getElementById('signup');
  dialog.hide();
  check();
  
};

  
function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

//device APIs are available


function onDeviceReady() {

  ons.notification.alert("Device Is Ready");

  // Now safe to use device APIs
  console.log("navigator.geolocation works well");
    
  
    // onSuccess Callback 
    // This method accepts a Position object, which contains the 
    // current GPS coordinates 
    // 
    var onSuccess = function(position) {
      
             ltd += position.coords.latitude;
             lgt += position.coords.longitude;
             console.log(ltd+"\n"+lgt);
             initMap();
             
   };
  
   // onError Callback receives a PositionError object 
   // 
   function onError(error) {
     ons.notification.alert('code: '    + error.code    + '\n' +
             'message: ' + error.message + '\n');
   }
  
   navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
function currentLocation() {
  
  function onSuccess(position) {
     
            ltd = position.coords.latitude;
            lgt = position.coords.longitude;
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


 



//-------------------------------------Location---------------------------------
function locate(){

  alert(ltd +"\n"+ lgt);//bug

}
  
//---------------------------------------Post----------------------------------------

function add(){
  var obj =new Object();
  if(photoUrl!=null){
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var hh = today.getHours();
    var MM = today.getMinutes();
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+yyyy+'/ '+hh+':'+MM;
    
  var description = document.getElementById('description').value;
  var timestamp = Number(new Date());
  var user = firebase.auth().currentUser;
  var db = firebase.firestore();
  if(user != null){
  db.collection("pins").doc("'"+timestamp+"'").set({
    id: timestamp,
    photo: photoUrl,
    description: description,
    poster: user.displayName,
    posterPhoto: user.photoURL,
    time: today,
    liker: {},
    like: 0,
    posterId: user.uid

  });

 }
 location.reload(); 

 }else{
  ons.notification.alert("Information Must Have")
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
 });  

 
 });

//---------------------------------------------Map--------------------------------------

function initMap() {
               
                var pos = {lat: ltd, lng: lgt};
                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 16,
                  center: pos
                });
                
                
                 infoWindow = new google.maps.InfoWindow;
                
                
                
                             if (navigator.geolocation) {
                             navigator.geolocation.getCurrentPosition(function(position) {
                             ltd= position.coords.latitude;
                             lgt= position.coords.longitude;
                             var pos = {
                             lat: position.coords.latitude,
                             lng: position.coords.longitude
                             };
                             var marker = new google.maps.Marker({
                             position: pos,
                             map: map
                             });
                            google.maps.event.addListener(marker, "Marker", function() {
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
  console.log("Signed Out");
  

}


function signUp(){
  var email = document.getElementById('username2').value;
  var password = document.getElementById('password2').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    if (errorCode === 'auth/wrong-password') {
      ons.notification.alert('Wrong password.');
    } else {
      ons.notification.alert(errorMessage);
    }
    console.log(error);
        
    
    
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      check();
    } else {
      // No user is signed in.
    }
  });  
}







//----------------------------------------------DeletePost-----------------------------------
function deletePost(id){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var compare = user.email;
      var db = firebase.firestore();   
      var firestoreRef = db.collection("pins").doc(id);
      firestoreRef.get().then(function(doc) {
      var posteruid = doc.data().posterId;
      if(posteruid == user.uid){
        console.log(id);
        var did = id;
        var db = firebase.firestore();  
      db.collection("pins").doc(did).delete().then(function() {
        ons.notification.alert("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
    location.reload();

      }else{
        ons.notification.alert("This is not your post!");
        console.log(posteruid);
      }


      });
 }else{
  ons.notification.alert("This is not your post!");
 }
  });
  }

function like(pid){
  console.log(pid);
  var object = {};
  
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var compare = user.email;
      var db = firebase.firestore();   
      var firestoreRef = db.collection("pins").doc(pid);
      firestoreRef.get().then(function(doc) {
      var indexofKey =null;    
            
            
            var array = doc.data().liker;
            var lastindex = array.length;
            
            object = doc.data().liker;
            var arrayLength = Object.keys(object).length;
            var timestamp = Number(new Date());
            
                       
            var found = Object.keys(object).some(function (k) {
              if (array[k] === compare) {
                
                indexofKey = k;
                  return true;
              }else{
                
                return false;
              }
          });
          if(indexofKey != null){
            console.log("found");//Delete
            delete object[indexofKey];
            firestoreRef.update({
              liker: object,
              like: arrayLength-1
            });
            location.reload();
          }else{
            object[timestamp] = compare;
            //Add
            // // var timestamp = Number(new Date());
            
            // // var lastindex = indexofKey+1;
            // // var update = new Object();
            // // update[timestamp]= compare;
            firestoreRef.update({
              liker: object,
              like: arrayLength+1
            });
            location.reload();
          }
            
                
          console.log(object);
            var array1 = doc.data().liker;
            
            console.log(indexofKey);
            console.log(Object.getOwnPropertyDescriptor(array1, 8));
            
        
      });
      document.getElementById('signin').hide();
      console.log("Signed In");
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

function reload(){
  location.reload();
}

function updateDisplayName(){
  var user = firebase.auth().currentUser;
  var name = document.getElementById('displayName').value;
  
  if(user){
      // Updates the user attributes:
 user.updateProfile({

  displayName: name  

 }).then(function() {
  
  var displayName = user.displayName;
  
    
  console.log(displayName);
  if(displayName == name){
    ons.notification.alert("Success");
  }
  
 }, function(error) {
  
 });
    }
}
var displayPhotoUpload;

function upload(){
  var photo = $("#photoUpload").prop("files")[0];
  var storage = firebase.storage();
  var storageRef = firebase.storage().ref();
  var timestamp = Number(new Date());
  var photoRef = storageRef.child("photos/"+ timestamp+ ".png");
      photoRef.put(photo).then(function (snapshot) {
      photoRef.getDownloadURL().then(function (url) {
      displayPhotoUpload = url
      $("#previewDisplay").attr("src", displayPhotoUpload);
      })
  });
  console.log(displayPhotoUpload);  
  }

function updatePhotoDisplay(){
  
  
  var user = firebase.auth().currentUser;
  
  
  

  if(user){
    // Updates the user attributes:
 user.updateProfile({
 
  photoURL: displayPhotoUpload

 }).then(function() {

  var photoURL = user.photoURL;

 console.log(photoURL);
 
 if(photoURL == displayPhotoUpload){
  ons.notification.alert("Success");
 }

 }, function(error) {

 });
  }
}
