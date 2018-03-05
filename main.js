var db = firebase.firestore();
var userInfo = {
  displayName:"",
  photoURL:"",
  email:"",
  uid:""
}


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
    userInfo.photoURL = userImg;
    document.querySelector(".circle").src = userImg;
    document.querySelector(".name").innerHTML = userName;
    document.querySelector(".email").innerHTML = userEmail;
   
    db.collection("users").doc(user.uid).set(userInfo).then(function() {
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