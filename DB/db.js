
function getUID() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            //console.log(uid);
            return uid;
        } else {
            // No user is signed in.
        }
    });
}
function writeUserDataMail(userId, name, email, veri) {
    firebase.database().ref('Users/' + userId).child("UserInformation").update({
        userEmail: email,
        displayName: name,
        VerifiedBy: veri
    });
}
function writeUserDataPhone(userId, phno, veri) {
    firebase.database().ref('Users/' + userId).child("UserInformation").update({
        userPhone: phno,
        VerifiedBy: veri
    });
}
function WriteUserFormPhone(userId, name, usn, mail, dob, cs, gndr, cn) {
    var d = new Date();
    var year = d.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var realmonth = months[d.getMonth()];
    var date1 = d.getDate();
    var ymd = year + ':' + realmonth + ':' + date1;
    firebase.database().ref('Users/' + userId).child("UserInformation").update({
        userName: name,
        userUSN: usn,
        userEmail: mail,
        userDOB: dob,
        userGender: gndr,
        userCollge: cn,
    });
    firebase.database().ref('Users/' + userId).child("UserInformation").child("UpdateOn").update({
        CurrentTime: ymd,
        UserSem: cs
    });
    firebase.database().ref('Users/' + userId).child("Status").update({
        Flag: '1010',
    });
}
function WriteUserFormMail(userId, name, usn, phno, dob, cs, gndr, cn) {
    var d = new Date();
    var year = d.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var realmonth = months[d.getMonth()];
    var date1 = d.getDate();
    var ymd = year + ':' + realmonth + ':' + date1;
    firebase.database().ref('Users/' + userId).child("UserInformation").update({
        userName: name,
        userUSN: usn,
        userPhone: phno,
        userDOB: dob,
        userGender: gndr,
        userCollge: cn,
    });
    firebase.database().ref('Users/' + userId).child("UserInformation").child("UpdateOn").update({
        CurrentTime: ymd,
        UserSem: cs
    });
    firebase.database().ref('Users/' + userId).child("Status").update({
        Flag: '1100',
    });
}
function Blank(divName, typeName) {
    var element = document.getElementById(divName);
    element.innerHTML = "Can't have a Empty " + typeName;
}
function Clear(divName) {
    var element = document.getElementById(divName);
    element.innerHTML = "";
}

function test() {
    var d = new Date();
    alert(d);
    //alert("Function Working");
}
var seconds = 20;
function countdown() {
    seconds = seconds - 1;
    if (seconds < 0) {
        // Chnage your redirection link here
        window.location = "https://hemanthrajhemu.github.io/";
    } else {
        // Update remaining seconds
        document.getElementById("countdown").innerHTML = seconds;
        // Count down using javascript
        window.setTimeout("countdown()", 1000);
    }
}		
function logout(){
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        // before count down type this text .
        //<h3>Redirecting to Home Page in <span id="countdown">10</span> seconds</h3>
        countdown();
    }).catch(function (error) {
        // An error happened.
    });
    
}
var redseconds = 10;
function RedCount(url) {
    redseconds = redseconds - 1;
    if (redseconds < 0) {
        // Chnage your redirection link here
        window.location = url;
    } else {
        // Update remaining seconds
        document.getElementById("reddown").innerHTML = redseconds;
        // Count down using javascript
        window.setTimeout("RedCount(url)", 1000);
    }
}