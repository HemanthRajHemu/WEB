var myVar;

function myFunction1() {
  myVar = setTimeout(showPage, 300);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
  document.getElementById("NOTEID3").innerHTML = "WAS THE CONTENT USEFUL, FOLLOW US ON INSTAGRAM @FUTUREVISIONBIE , DM & Let us Know your Experience";

  //Get the button
  var mybuttonVARTOP = document.getElementById("myBtnTOP");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
      mybuttonVARTOP.style.display = "block";
    } else {
      mybuttonVARTOP.style.display = "none";
    }
  }

}
function showPage1() {
  document.getElementById("main").style.display = "block";
  document.getElementById("NOTEID3").innerHTML = "WAS THE CONTENT USEFUL, FOLLOW US ON INSTAGRAM @FUTUREVISIONBIE , DM & Let us Know your Experience";

  //Get the button
  var mybuttonVARTOP = document.getElementById("myBtnTOP");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
      mybuttonVARTOP.style.display = "block";
    } else {
      mybuttonVARTOP.style.display = "none";
    }
  }

}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function openNav() {
  document.getElementById("mySidebar").style.width = "260px";
  document.getElementById("main").style.marginLeft = "260px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function show(id) {
  var show = document.getElementById(id);
  var x1 = document.getElementById("ANScript1");
  var x2 = document.getElementById("ANScript2");
  var x3 = document.getElementById("ANScript3");
  var x4 = document.getElementById("ANScript4");
  var x5 = document.getElementById("ANScript5");

  x1.style.display = "none";
  x2.style.display = "none";
  x3.style.display = "none";
  x4.style.display = "none";
  x5.style.display = "none";
  if (show.style.display === "none") {
    show.style.display = "block";
  }
}

document.oncontextmenu = new Function("return false;");
//DONE TILL HERE
function WhatsappShare() {
  var url = window.location.href;
  var api = "https://api.whatsapp.com/send?text=Hi,%0D%0ABuddy%20I%20found%20this%20Usefull%20Website%20named%20Future%20Vision%20BIE,%20One%20Stop%20Study%20Repository%20for%20VTU%20Students.%20Home%20Link:%20https://hemanthrajhemu.github.io/%0A%0A%0AShared%20Page%20Link:"
  var both = api + url;
  //console.log(both);
  window.open(both, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
}


function NavClose1() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function download(url) {
  var url1 = url;
  var res = url1.split("/");
  var len = res.length;
  var filename = res[len-1];
  fetch(url).then(function(t) {
      return t.blob().then((b)=>{
          var a = document.createElement("a");
          a.href = URL.createObjectURL(b);
          a.setAttribute("download", filename);
          a.click();
      }
      );
  });
  }

var redseconds = 10;
function RedCountNW(url) {
  redseconds = redseconds - 1;
  if (redseconds < 0) {
    //console.log(url);
    var url1 = url;
    download(url1);
    var newdiv = document.createElement('div');
      newdiv.innerHTML = `<div class="lii"><a href=${url1} download>If Download didn't Start Automatically Click Here</a>`;
      document.getElementById('DBtn').appendChild(newdiv);
      //downCounter
      document.getElementById("downCounter").style.display = "none";
      document.getElementById("Dinfo").style.display = "block";
    //console.log("DOne");
  } else {
    // Update remaining seconds
    document.getElementById("reddown").innerHTML = redseconds;
    // Count down using javascript
    window.setTimeout("RedCountNW(url)", 1000);
  }
}

function PDF(code) {
  var rootRef = firebase.database().ref('Materials');
  rootRef.once("value")
    .then(function (snapshot) {
      var GView = "https://docs.google.com/viewer?url=";
      var Em = "&embedded=true";
      Value = snapshot.child(code).child('Link').val();
      var full = GView + Value + Em;
      var newdiv = document.createElement('div');
      newdiv.innerHTML = `<iframe src=${full} style="width:100%; height:500px;" frameborder="10px"> </iframe>`;
      document.getElementById('PDFViewer').appendChild(newdiv);
      DownloadButton(code);

      //console.log(full);
    });
}
function DownloadButton(code) {
  var code1 = '/DOWNLOAD/?CODE=' + code;
  var newdiv1 = document.createElement('div');
      newdiv1.innerHTML = `<div class="lii"><a href=${code1}>Click Here To <strong>Download</strong></a></div> <br/>`;
      document.getElementById('PDFDownload').appendChild(newdiv1);
}
function DownloadRedirect(code) {
  var rootRef = firebase.database().ref('Materials');
  rootRef.once("value")
    .then(function (snapshot) {
      Value = snapshot.child(code).child('Link').val();
      
      url = Value;
      RedCountNW(url);
/*
      var newdiv = document.createElement('div');
      newdiv.innerHTML = `<iframe src=${full} style="width:100%; height:1000px;" frameborder="10px"> </iframe>`;
      document.getElementById('DownloadID').appendChild(newdiv);
      
*/      
    });
}