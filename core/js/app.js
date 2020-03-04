var images = [];
var modal_login_popup = document.getElementById("modal_login_popup");
var modal_upload_popup = document.getElementById("modal_upload_popup");

var btn_login = document.getElementById("login_popup");
var btn_upload = document.getElementById("upload_popup");

var close1 = document.getElementsByClassName("close1")[0];
var close2 = document.getElementsByClassName("close2")[0];
var close3 = document.getElementsByClassName("close3")[0];

const successinfo = document.getElementById('success');
successinfo.style.display = 'none';

btn_login.onclick = function() {
  modal_login_popup.style.display = "block";
}
close1.onclick = function() {
   modal_login_popup.style.display = "none";
}


btn_upload.onclick = function() {
  modal_upload_popup.style.display = "block";
}
close3.onclick = function() {
  modal_upload_popup.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal_login_popup) {
    modal_login_popup.style.display = "none";
  }else if (event.target == modal_upload_popup) {
    modal_upload_popup.style.display = "none";
  }
}

var firebaseConfig = {
    apiKey: "*************",
    authDomain: "*************",
    databaseURL: "*************",
    projectId: "*************",
    storageBucket: "*************",
    messagingSenderId: "*************",
    appId: "*************"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(handleAuthState);

function handleAuthState(user) {
  if (user) {
    showPrivateInfo(user)
    return console.log('Hay usuario');
  }

  showLoginForm()
  return console.log('No hay usuario');
}


function showPrivateInfo(user) {
  const login_popup = document.getElementById('login_popup');
  const upload_popup = document.getElementById('upload_popup');
  const btnLogout = document.getElementById('btnLogout');
  const user_name_info = document.getElementById('user_name_info');
  const my_library = document.getElementById('my_library');
  const index = document.getElementById('index');

  var name_correct = showNameCorrect(user);

  login_popup.style.display = 'none';
  upload_popup.style.display = 'block';
  user_name_info.style.display = 'block';
  user_name_info.innerHTML = name_correct;
  btnLogout.style.display = 'block';
  my_library.style.display = 'block';
  index.style.display = 'none';

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
            new_item.setAttribute("class", "col-md-4 show_img");
            new_item.innerHTML = '<a target="_blank" href="'+images[i]+'"><img id="img_url" src="'+images[i]+'"></a><div class="row text-center"><div class="col-md-12 text-center"><a class="linktoshare" id="a_url" href="'+images[i]+'" target="_blank">link to share</a><a onclick="delete_photo()" href="#"><img class="img_quit" src="core/img/quit.png" width="15" height="15"></a></div></div>';
            document.getElementById("photo_library").appendChild(new_item);

        }, function (error) {
          var errorMessage=error.message;
        });
    }
}

function showLoginForm() {
  const loginForm = document.getElementById('login_popup');
  const uploadForm = document.getElementById('upload_popup');
  const btnLogout = document.getElementById('btnLogout');
  const user_name_info = document.getElementById('user_name_info');
  const my_library = document.getElementById('my_library');
  const index = document.getElementById('index');

  user_name_info.style.display = 'none';
  btnLogout.style.display = 'none';
  loginForm.style.display = 'block';
  uploadForm.style.display = 'none';
  my_library.style.display = 'none';
  index.style.display = 'block';

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
          document.getElementById("progress-bar").style.backgroundColor = "green";
          document.getElementById('success').style.display = 'block';
          document.getElementById("progress-bar").style.display = "none";
          document.getElementById("success_date").innerHTML = "The image has been uploaded correctly.";
          document.getElementById("my_library").style.display="none";
          setTimeout("location.reload(true);", 1000);
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

