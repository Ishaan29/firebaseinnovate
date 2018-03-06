{
  var db = firebase.firestore();
var userInfo = {
  displayName:"",
  photoURL:"",
  email:"",
  uid:""
}

var userDetails = {
  firstName: null,
  laseName: null,
  regNo: null,
  branch: null,
  Cono: null,
  nameofclg: null,
  year: null,
  noOfTeamMembers: null,
  participation: null,
  gender: null,
  evntId: null
}

// var evt = document.querySelector(".events").style.display = "none";

firebase.auth().onAuthStateChanged(function(user) {
if(user) {
  //user is loged in
 

  document.querySelector(".userLogin").style.display  = "none";
  document.querySelector(".userInfo").style.display = "block";

  var user = firebase.auth().currentUser;
  if(user != null ){
    var userImg = user.photoURL;
    userInfo.displayName = user.displayName;
    var userName = user.displayName;
    var userEmail = user.email;
    userInfo.email = user.email;
    var userUid = user.uid;
    userInfo.uid = user.uid;
    userInfo.photoURL = user.photoURL;
    document.querySelector(".circle").src = userImg;
    document.querySelector(".name").innerHTML = userName;
    document.querySelector(".email").innerHTML = userEmail;
   
    db.collection("users").doc(user.uid).update(userInfo).then(function() {
      console.log("Document successfully written!");
  });
  
  }
}else {
  //user is not loged in
  document.querySelector(".userLogin").style.display = "block";
  document.querySelector(".userInfo").style.display = "none";  

}
})
var provider = new firebase.auth.GoogleAuthProvider();
function loginWithGoogle() {
 
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

function pushUserDetails() {
  userDetails.firstName = document.querySelector("#first_name").value;
  userDetails.laseName = document.querySelector("#last_name").value;
  userDetails.regNo = document.querySelector("#Registration").value;
  userDetails.branch = document.querySelector("#Branch").value;
  
  userDetails.Cono = document.querySelector("#Contact").value;
  userDetails.nameofclg = document.querySelector("#NameCollege").value;

  var sel = document.querySelector("#year");
  userDetails.year = sel.options[sel.selectedIndex].text;
  
  var te = document.querySelector("#team");
  userDetails.noOfTeamMembers = te.options[te.selectedIndex].text;

  var pr = document.querySelector('#pr');
  userDetails.participation = pr.options[pr.selectedIndex].text;

  userDetails.evtId = evntId();
  console.log(userDetails.evntId);
  db.collection("users").doc(userInfo.uid).update(userDetails).then(function() {
    if(userDetails != null ){
      console.log("Document updated sussfully!");
    }
  })
}

function showEvents(){
  var evt = document.querySelector(".events").style.display = "block";
  var details = document.querySelector(".links").style.display = "none";
}
function showDetails() {
  var det = document.querySelector(".container").style.display = "block"; 
  var evt = document.querySelector(".events").style.display = "none ";
 
  
  }
function showCalander() {

}

function evntId() {
  return "Ino_" + Math.random().toString(36).substr(2, 8);
}
}

