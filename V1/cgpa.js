function test() {
    alert("Working");
}
var total;
var CGPA;
var totCre;
var totSubsol;
var Acre = [];
var ASGPA = [];
var ASol = [];
function showMarks() {
    total = document.getElementById("total").value;
    //alert(total);
    addInput('dynamicInput', total);
    document.getElementById("Step1").style.display = "none";
    document.getElementById("Step2").style.display = "block";
    var elmnt = document.getElementById("Step2");
    elmnt.scrollIntoView();
}
function addInput(divName, counter) {
    for (i = 1; i <= counter; i++) {
        //var nid = id;
        var cid = `cre${i}`;
        var sid = `sgp${i}`;
        var newdiv = document.createElement('div');
        newdiv.innerHTML = `<div class='row'><div class='col-25'><label> Credit of Sem - ${i} </label></div><div class='col-75'> <input type='text' id='${cid}' > </div> </div>
        <div class='row'><div class='col-25'><label> SGPA of Sem - ${i} </label></div><div class='col-75'> <input type='text' id='${sid}' > </div> </div>
        <hr/>`;
        document.getElementById(divName).appendChild(newdiv);
        ////console.log(i);
    }
}
function getValue() {
    var tempTotal = total;
    for (i = 1; i <= tempTotal; i++) {
        var credid = document.getElementById(`cre${i}`).value;
        Acre.push(credid);
        var sgpaid = document.getElementById(`sgp${i}`).value;
        ASGPA.push(sgpaid);


        //console.log("Test");
        //console.log(i);
        //console.log("SGPA ID: " + sgpaid);
        //console.log("Credit ID: " + credid);

        //console.log("Array");
        //console.log(Acre);
        //console.log(ASGPA);

    }
}
function CalSubsol() {
    for (i = 0; i < total; i++) {
        ASol[i] = parseFloat(Acre[i]) * parseFloat(ASGPA[i]);
    }
    //console.log("CalSubsol :" + ASol);
}
function CalTotCre() {
    var temtotcre = 0;
    for (i = 0; i < total; i++) {
        temtotcre = temtotcre + parseFloat(Acre[i]);
    }
    //console.log("In CalTotCre Total Credit: " + temtotcre);
    return temtotcre;
}
function CalTotSubsol() {
    var temptotsubsol = 0;
    for (i = 0; i < total; i++) {
        temptotsubsol = temptotsubsol + parseFloat(ASol[i]);
    }
    return temptotsubsol;
    //console.log("In CalTotSubsol Addition of subsol: " + temptotsubsol);
}
function DisCGPA(i) {
    var newdiv = document.createElement('div');
    newdiv.innerHTML = `Your CGPA is <big>${i}</big> `;
    document.getElementById("CGPAResult").appendChild(newdiv);
}
function DisTable(i) {
    var temp = i + 1;
    var table = document.getElementById("CGPATable");
    var row = table.insertRow(temp);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "Sem " + temp;
    cell2.innerHTML = ASGPA[i];
    cell3.innerHTML = Acre[i];
    cell4.innerHTML = ASol[i];
}
function CalTotSGPA() {
    var temptotSGPA = 0;
    for (i = 0; i < total; i++) {
        temptotSGPA = temptotSGPA + parseFloat(ASGPA[i]);
    }
    //console.log("In CalTOtSGPA total SGPA is: " + temptotSGPA);
    return temptotSGPA;
}
function DisTabTotal(i) {
    temp = parseInt(i) + 1;
    var table = document.getElementById("CGPATable");
    var row = table.insertRow(temp);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "Total";
    cell2.innerHTML = CalTotSGPA();
    cell3.innerHTML = totCre;
    cell4.innerHTML = totSubsol;
}
function DisSGPATotal() {
    var newdiv = document.createElement('div');
    newdiv.innerHTML = `Thus, CGPA = ${totSubsol} / ${totCre} =  ${CGPA}`;
    document.getElementById("FinalCGPA").appendChild(newdiv);
}
function calculate() {
    getValue();
    CalSubsol();
    totCre = CalTotCre();
    totSubsol = CalTotSubsol();
    CGPA = (totSubsol / totCre).toFixed(4);
    //console.log("CGPA is :" + CGPA);
    DisCGPA(CGPA);
    for (i = 0; i < total; i++) {
        DisTable(i);
    }
    DisTabTotal(total);
    DisSGPATotal()
    document.getElementById("Step2").style.display = "none";
    document.getElementById("Step3").style.display = "block";
    var elmnt = document.getElementById("Step3");
    elmnt.scrollIntoView();
}
function WhatsappShare() {
    var url = window.location.href;
    var api = "https://api.whatsapp.com/send?text=Hi,%20Buddy%20I%20found%20this%20Usefull%20Website%20named%20Future%20Vision%20BIE,%20One%20Stop%20Study%20Repository%20for%20VTU%20Students%0D%0ALink:"
    var both = api + url;
    ////console.log(both);
    window.open(both, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
}
function ClearData() {
    var okToRefresh = confirm("Do you really want to Clear the data?");
    if (okToRefresh) {
        setTimeout("location.reload(true);", 150);
        var elmnt = document.getElementById("Step1");
        elmnt.scrollIntoView();
    }
}