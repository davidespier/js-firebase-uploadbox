var auth = firebase.auth();
var storageRef = firebase.storage().ref();
var userRef ;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userRef = showNameCorrect(user);
    user_name_info.innerHTML = "Hi, "+userRef;

    controlDashboard(userRef)
    } else {
      window.location.href = "index.html";
    }
});

            
function showNameCorrect(user){
  name = user.displayName;
  email = user.email;

  if(name == 'null'){
    return email;
    }
    else if(email == 'null'){
      return name;
    }
    else if(email!= 'null' && name != 'null'){
      return name;
    }
    else{
      return "Error"
    }
}

function controlDashboard(userRef) {

  documents();
  music();
  images();
  videos();

}

function documents(){
  
  var ref = firebase.database().ref('user/'+userRef+'/documents').on("value", function(snapshot) {

  count_image = snapshot.numChildren();

  number_documents.innerHTML = count_image;

  }, function (error) {
    var errorMessage=error.message;
  });
}
function music(){

  var ref = firebase.database().ref('user/'+userRef+'/music').on("value", function(snapshot) {

  count_image = snapshot.numChildren();

  number_music.innerHTML = count_image;

  }, function (error) {
    var errorMessage=error.message;
  });
}
function images(){

  var ref = firebase.database().ref('user/'+userRef+'/photos').on("value", function(snapshot) {

  count_image = snapshot.numChildren();

  number_images.innerHTML = count_image;

  }, function (error) {
    var errorMessage=error.message;
  });
}
function videos(){

  var ref = firebase.database().ref('user/'+userRef+'/videos').on("value", function(snapshot) {

  count_image = snapshot.numChildren();

  number_videos.innerHTML = count_image;

  }, function (error) {
    var errorMessage=error.message;
  });
}