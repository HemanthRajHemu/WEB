function test() {
    alert("Working");
}
var total;
var Acode = [];
var Alink = [];
function getTotal() {
    total = document.getElementById("total").value;
    addInput('dynamicInput', total);
    document.getElementById("Step1").style.display = "none";
    document.getElementById("Step2").style.display = "block";
    var elmnt = document.getElementById("Step2");
    elmnt.scrollIntoView();
}

function addInput(divName, counter) {
    for (i = 1; i <= counter; i++) {
        //var nid = id;
        var cid = `nam${i}`;
        var lid = `lik${i}`;
        var newdiv = document.createElement('div');
        newdiv.innerHTML = `<div class='row'><div class='col-25'><label> Code - ${i} </label></div><div class='col-75'> <input type='text' id='${cid}' > </div> </div>
        <div class='row'><div class='col-25'><label> Link - ${i} </label></div><div class='col-75'> <input type='text' id='${lid}' > </div> </div><hr/><br/>
        `;
        document.getElementById(divName).appendChild(newdiv);
        //console.log(i);
    }
}
function getValue() {
    var tempTotal = total;
    for (i = 1; i <= tempTotal; i++) {
        var codeid = document.getElementById(`nam${i}`).value;
        Acode.push(codeid);
        var linkid = document.getElementById(`lik${i}`).value;
        Alink.push(linkid);
    }
}
function UpdateDB(code,link){
    firebase.database().ref().child('Materials').child(code).update({
        Link : link,
    });
   // console.log(code);
    //console.log(link);
}
function writeData() {
    for (i = 0; i < total; i++) {
        UpdateDB(Acode[i],Alink[i]);

    }
}
function update() {
    getValue();
    writeData();

    document.getElementById("Step2").style.display = "none";
    document.getElementById("Step3").style.display = "block";
    var elmnt1 = document.getElementById("Step3");
    elmnt1.scrollIntoView();
}