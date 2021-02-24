function YahooLogin() {
    var provider = new firebase.auth.OAuthProvider('yahoo.com');

    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="dashboard.html";
    }).catch(function (error) {
        var errorMessage=error.message;
    });
}

function GithubLogin() {

    var provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="dashboard.html";
    }).catch(function (error) {
        var errorMessage=error.message;
    });
}

function TwitterLogin() {
    var provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="dashboard.html";
    }).catch(function (error) {
        var errorMessage=error.message;
    });
}

function FacebookLogin() {

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="dashboard.html";
    }).catch(function (error) {
        var errorMessage=error.message;
    });
}

function GoogleLogin() {
    var provider=new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function () {
        window.location="dashboard.html";
    }).catch(function (error) {
        var errorMessage=error.message;
        alert(errorMessage);
    });
}