//--- PASTE YOUR CONFIG FIREBASE

const firebaseConfig = {
  apiKey: "AIzaSyDWqiofB8OMzrXj8dhSlmTgjmt8u0LEbHY",
  authDomain: "project-linebox.firebaseapp.com",
  databaseURL: "https://project-linebox.firebaseio.com",
  projectId: "project-linebox",
  storageBucket: "project-linebox.appspot.com",
  messagingSenderId: "548448283987",
  appId: "1:548448283987:web:f549d079ecc37f0c4ac5a6"
};

//-------------------------

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(handleAuthState);

var images = [];

document.getElementById('success').style.display = 'none';

function handleAuthState(user) {
  if (user) {
    showPrivateInfo(user)
    return console.log('Hay usuario');
  }

  showLoginForm()
  return console.log('No hay usuario');
}


function showPrivateInfo(user) {

  var btnLogout = document.getElementById('btnLogout');
  var user_name_info = document.getElementById('user_name_info');
  var index = document.getElementById('index');
  var content = document.getElementById('content');
  var name_correct = showNameCorrect(user);

  index.style.display = 'none';
  content.style.display = 'block';
  user_name_info.style.display = 'block';
  btnLogout.style.display = 'block';

  user_name_info.innerHTML = name_correct;


  var count_image;
  var ref = firebase.database().ref('user/'+name_correct).on("value", function(snapshot) {

  count_image = snapshot.numChildren();

  show_user_image(count_image,name_correct);

  }, function (error) {
    var errorMessage=error.message;
  });

}

function show_user_image(count_image,name_correct){

    for (var i = 0; i < count_image; i++) {
        var ref = firebase.database().ref('user/'+name_correct).on("value", function(snapshot) {
        var count_image = snapshot.numChildren();

            var key = Object.keys(snapshot.val())[i];
            var url = snapshot.child(key).val();
            images[i] = url.toString();
            var new_item = document.createElement("div");
            new_item.setAttribute("class", "col-md-4 img-content");
            new_item.innerHTML = '<a target="_blank" href="'+images[i]+'" ><img src="'+images[i]+'" alt="preview1" height="285"></a>';
            document.getElementById("photo_library").appendChild(new_item);

        }, function (error) {
          var errorMessage=error.message;
        });
    }
}

function showLoginForm() {

  var btnLogout = document.getElementById('btnLogout');
  var user_name_info = document.getElementById('user_name_info');
  var index = document.getElementById('index');
  var content = document.getElementById('content');

  index.style.display = 'block';
  content.style.display = 'none';
  user_name_info.style.display = 'none';
  btnLogout.style.display = 'none';

}

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

function YahooLogin() {
    var provider = new firebase.auth.OAuthProvider('yahoo.com');

    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="index.html";
    }).catch(function (error) {
        var errorMessage=error.message;
    });
}

function GithubLogin() {

    var provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="index.html";
    }).catch(function (error) {
        var errorMessage=error.message;
    });
}

function TwitterLogin() {
    var provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="index.html";
    }).catch(function (error) {
        var errorMessage=error.message;
    });
}

function FacebookLogin() {

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="index.html";
    }).catch(function (error) {
        var errorMessage=error.message;
    });
}

function GoogleLogin() {
    var provider=new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="index.html";
    }).catch(function (error) {
        var errorMessage=error.message;
        alert(errorMessage);
    });
}


function signoutUser() {
  firebase.auth().signOut();
}

function upload() {

    var image=document.getElementById("image").files[0];
    var imageName=makeid(8);
    var user = firebase.auth().currentUser;
    var name_correct = showNameCorrect(user);
    var storageRef=firebase.storage().ref('images/'+name_correct+"/"+imageName);
    var uploadTask=storageRef.put(image);
    const my_library = document.getElementById('my_library');

    uploadTask.on('state_changed',function (snapshot) {

        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;


        document.getElementById("progress-bar").style.width = progress+"%";
        document.getElementById("progress-bar").innerHTML = progress+"%";

        if(progress==100){
   
          document.getElementById("success_date").innerHTML = "The image has been uploaded correctly.";
          document.getElementById("success").style.display="block";
          document.getElementById("success").style.display="block";
          document.getElementById("buttonUpload").style.display="none";
          setTimeout(function(){ window.location.href = 'index.html'; }, 1000);
        }else{
          document.getElementById("progress-bar").style.backgroundColor = "#4c69ba";
        }

    },function (error) {
      var errorMessage=error.message;
    },function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
          saveLinkDatabase(downlaodURL);
        });
    });
}


document.getElementById("image").onchange = function () {
    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("img").src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
};


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function saveLinkDatabase(downlaodURL){
  var user = firebase.auth().currentUser;
  var name_correct = showNameCorrect(user);
  var firebaseRef = firebase.database().ref('user/'+name_correct);

  firebaseRef.push().set(downlaodURL);
}

