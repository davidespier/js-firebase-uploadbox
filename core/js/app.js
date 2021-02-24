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

  DirectoryControl(count_image,userRef);

  }, function (error) {
    var errorMessage=error.message;
  });

}

function DirectoryControl(count_image,userRef){

  if(directory == 'photos'){
        for (var i = 0; i < count_image; i++) {
            var ref = firebase.database().ref('user/'+userRef+'/'+directory).on("value", function(snapshot) {
            var count_image = snapshot.numChildren();
            var key = Object.keys(snapshot.val())[i];
            var url = snapshot.child(key).val();
            images[i] = url.toString();
            var url_link = images[i];
            var name_object = extractNameFirebaseLink(url_link);

            var new_item = document.createElement("div");
            new_item.setAttribute("class", "col-md-4 img-content");

            new_item.innerHTML = '<a target="_blank" href="'+images[i]+'" ><img src="'+images[i]+'" alt="preview1" height="250"><p class="title_download_object">'+name_object+'</p></a>';
            document.getElementById("collection").appendChild(new_item);

        }, function (error) {
          var errorMessage=error.message;
        });
    }
  }else if(directory == 'music'){
        for (var i = 0; i < count_image; i++) {
            var ref = firebase.database().ref('user/'+userRef+'/'+directory).on("value", function(snapshot) {
            var count_image = snapshot.numChildren();
            var key = Object.keys(snapshot.val())[i];
            var url = snapshot.child(key).val();
            images[i] = url.toString();
            var url_link = images[i];
            var name_object = extractNameFirebaseLink(url_link);

            var new_item = document.createElement("div");
            new_item.setAttribute("class", "col-md-2 img-content");


            new_item.innerHTML = '<a target="_blank" href="'+images[i]+'" ><img src="core/img/ico/file-music-single.png" alt="preview1" height="128" width="128"><p class="title_download_object">'+name_object+'</p></a>';
            document.getElementById("collection").appendChild(new_item);

        }, function (error) {
          var errorMessage=error.message;
        });
    }

  }else if(directory == 'videos'){
        for (var i = 0; i < count_image; i++) {
            var ref = firebase.database().ref('user/'+userRef+'/'+directory).on("value", function(snapshot) {
            var count_image = snapshot.numChildren();
            var key = Object.keys(snapshot.val())[i];
            var url = snapshot.child(key).val();
            images[i] = url.toString();
            var url_link = images[i];
            var name_object = extractNameFirebaseLink(url_link);

            var new_item = document.createElement("div");
            new_item.setAttribute("class", "col-md-4 img-content");


            new_item.innerHTML = '<a target="_blank" href="'+images[i]+'" ><video class="video" src="'+images[i]+'" height="256" width="256" controls>Your browser does not support the video tag.</video><p class="title_download_object">'+name_object+'</p></a>';
            document.getElementById("collection").appendChild(new_item);

        }, function (error) {
          var errorMessage=error.message;
        });
    }
  }else if(directory == 'documents'){
        for (var i = 0; i < count_image; i++) {
            var ref = firebase.database().ref('user/'+userRef+'/'+directory).on("value", function(snapshot) {
            var count_image = snapshot.numChildren();
            var key = Object.keys(snapshot.val())[i];
            var url = snapshot.child(key).val();
            images[i] = url.toString();
            var url_link = images[i];
            var name_object = extractNameFirebaseLink(url_link);

            var new_item = document.createElement("div");
            new_item.setAttribute("class", "col-md-2 img-content");


            new_item.innerHTML = '<a target="_blank" href="'+images[i]+'" ><img src="core/img/ico/file-documents.png" alt="preview1" height="128" width="128"><p class="title_download_object">'+name_object+'</p></a>';
            document.getElementById("collection").appendChild(new_item);

        }, function (error) {
          var errorMessage=error.message;
        });
    }
  }

}

function extractNameFirebaseLink(url_link){
            var str = url_link;
            var res = str.split("%2F",5);
            var aux = res[3].split("?",2);
            return aux[0].replace(/%20/gi, " ");
}