function signoutUser() {
  firebase.auth().signOut();
  window.location="index.html";
}