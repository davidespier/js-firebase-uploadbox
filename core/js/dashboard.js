var auth = firebase.auth();
var storageRef = firebase.storage().ref();
var userRef ;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userRef = showNameCorrect(user);
    user_name_info.innerHTML = "Hi, "+userRef;

    showPrivateInfo(userRef)
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

var images = [];



function showPrivateInfo(userRef) {


  var count_image;
  var ref = firebase.database().ref('user/'+userRef+'/'+directory).on("value", function(snapshot) {

  count_image = snapshot.numChildren();

  show_user_image(count_image,userRef);

  }, function (error) {
    var errorMessage=error.message;
  });

}

function show_user_image(count_image,userRef){

    for (var i = 0; i < count_image; i++) {
        var ref = firebase.database().ref('user/'+userRef+'/'+directory).on("value", function(snapshot) {
        var count_image = snapshot.numChildren();

            var key = Object.keys(snapshot.val())[i];
            var url = snapshot.child(key).val();
            images[i] = url.toString();
            var new_item = document.createElement("div");
            new_item.setAttribute("class", "col-md-4 img-content");
            new_item.innerHTML = '<a target="_blank" href="'+images[i]+'" ><img src="'+images[i]+'" alt="preview1" height="250"></a>';
            document.getElementById("collection").appendChild(new_item);

        }, function (error) {
          var errorMessage=error.message;
        });
    }
}