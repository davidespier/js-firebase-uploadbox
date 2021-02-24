
function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var file = evt.target.files[0];

  var metadata = {
    'contentType': file.type
    };

                // Push to child path.
                // [START oncomplete]
                    id = makeid(16);
                    storageRef.child(userRef +'/'+directory+'/'+id+'/'+file.name).put(file, metadata).then(function (snapshot) {
                    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                    console.log('File metadata:', snapshot.metadata);
                    // Let's get a download URL for the file.
                    snapshot.ref.getDownloadURL().then(function (url) {
                    // [START_EXCLUDE]
                    saveLinkDatabase(url);
                    // [END_EXCLUDE]
                    window.location.reload(false);
                    });
                }).catch(function (error) {
                    // [START onfailure]
                    console.error('Upload failed:', error);
                    // [END onfailure]
                });
                // [END oncomplete]
}

window.onload = function () {
  document.getElementById('file').addEventListener('change', handleFileSelect, false);
}


function saveLinkDatabase(url){

  var firebaseRef = firebase.database().ref('user/'+userRef+'/'+directory);
  firebaseRef.push().set(url);

}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
