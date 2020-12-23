function test() {
    alert("Working");
}
var total;
var SGPA;
var Asco = [];
var Acre = [];
var Atot = [];
var Aper = [];
var Agrd = [];
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
        var sid = `sub${i}`;
        var tid = `tot${i}`;
        var cid = `cre${i}`;
        var newdiv = document.createElement('div');
        newdiv.innerHTML = `<div class='row'><div class='col-25'><label> Marks Obtained - ${i} </label></div><div class='col-75'> <input type='text' id='${sid}' > </div> </div>
        <div class='row'><div class='col-25'><label> Total Marks - ${i} </label></div><div class='col-75'> <input type='text' id='${tid}' > </div> </div>
        <div class='row'><div class='col-25'><label> Credit Score - ${i} </label></div><div class='col-75'> <input type='text' id='${cid}' > </div> </div><hr/>`;
        document.getElementById(divName).appendChild(newdiv);
        //console.log(i);
    }
}
function getValue() {
    var tempTotal = total;
    for (i = 1; i <= tempTotal; i++) {
        var scoreid = document.getElementById(`sub${i}`).value;
        Asco.push(scoreid);
        var totalid = document.getElementById(`tot${i}`).value;
        Atot.push(totalid);
        var credtid = document.getElementById(`cre${i}`).value;
        Acre.push(credtid);


        //console.log("Test");
        //console.log(i);
        //console.log("Score ID: " + scoreid);
        //console.log("Total ID: " + totalid);
        //console.log("Credit ID: " + credtid);

        //console.log("Array");
        //console.log(Asco);
        //console.log(Atot);
        //console.log(Acre);
    }
}
function CalPer() {
    for (i = 0; i < total; i++) {
        var per = (Asco[i] / Atot[i]) * 100
        //console.log(per);
        //Aper.push(per);
        Aper[i] = per;
    }
}
function CalGradCase(val) {
    //console.log("Val in CalGradeCase: " + val);
    switch (true) {
        case (val >= 90):
            return 10;
            break;
        case (val < 90 && val >= 80):
            return 9;
            break;
        case (val < 80 && val >= 70):
            return 8;
            break;
        case (val < 70 && val >= 60):
            return 7;
            break;
        case (val < 60 && val >= 50):
            return 6;
            break;
        case (val < 50 && val >= 45):
            return 5;
            break;
        case (val < 45 && val >= 40):
            return 4;
            break;
        case (val < 40):
            return 0;
            break;
        default:
            return 0;
    }
}
function CalGrad() {
    //console.log("Total in CalGrad: " + total);
    for (i = 0; i < total; i++) {
        var grade = CalGradCase(Aper[i]);
        //console.log("Grade: " + grade);
        Agrd[i] = grade;
    }
}
function CalTotalCred() {
    var totalCred = 0;
    for (i = 0; i < total; i++) {
        totalCred = totalCred + parseInt(Acre[i]);
    }
    //console.log("Total Cred: " + totalCred);
    return totalCred;
}
function CalSubSol() {
    var SSTotal = 0;
    var temp = 0;
    for (i = 0; i < total; i++) {
        temp = Agrd[i] * Acre[i];
        SSTotal = SSTotal + temp;
        ASol[i] = temp;
    }
    return SSTotal;
}
function DisSGPA(i) {
    var newdiv = document.createElement('div');
    newdiv.innerHTML = `Your SGPA is <big>${i}</big> `;
    document.getElementById("SGPAResult").appendChild(newdiv);
}
function TotalScore() {
    var totalSco = 0;
    for (i = 0; i < total; i++) {
        totalSco = parseInt(Asco[i]) + totalSco;
    }
    return totalSco;
}
function GradeToLetter(G) {
    switch (G) {
        case 10:
            return 'O';
            break;
        case 9:
            return 'S';
            break;
        case 8:
            return 'A';
            break;
        case 7:
            return 'B';
            break;
        case 6:
            return 'C';
            break;
        case 5:
            return 'D';
            break;
        case 4:
            return 'E';
            break;
        case 0:
            return 'F';
            break;
        default:
            return 'Error';

    }
}
function DisTable(i) {
    var temp = i + 1;
    var table = document.getElementById("SGPATable");
    var row = table.insertRow(temp);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    cell1.innerHTML = "Subject " + temp;
    cell2.innerHTML = Asco[i];
    cell3.innerHTML = (Aper[i]).toFixed(4) + " %";
    cell4.innerHTML = Acre[i];
    cell5.innerHTML = Agrd[i];
    cell6.innerHTML = GradeToLetter(Agrd[i]);
    cell7.innerHTML = ASol[i];
}
function TotalPer() {
    var Totper = 0;
    var Totper1 = 0;
    var temp = total;
    for (i = 0; i < temp; i++) {
        Totper = Totper + Aper[i];
    }
    Totper1 = Totper / temp;
    return Totper1;
}
function TotalGrad() {
    var TtlGrad = 0;
    for (i = 0; i < total; i++) {
        TtlGrad = TtlGrad + Agrd[i];
    }
    return TtlGrad;
}
function DisTabTotal(i) {
    temp = parseInt(i);
    var table = document.getElementById("SGPATable");
    var row = table.insertRow(temp);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    cell1.innerHTML = "Total";
    cell2.innerHTML = TotalScore();
    cell3.innerHTML = (TotalPer()).toFixed(4) + " %";
    cell4.innerHTML = CalTotalCred();
    cell5.innerHTML = TotalGrad();
    cell6.innerHTML = "-";
    cell7.innerHTML = CalSubSol();
}
function DisSGPATotal() {
    var newdiv = document.createElement('div');
    newdiv.innerHTML = `Thus, SGPA = ${CalSubSol()} / ${CalTotalCred()} =  ${SGPA}`;
    document.getElementById("FinalSGPA").appendChild(newdiv);
}
function calculate() {
    getValue();
    CalPer();
    //console.log(Aper);
    CalGrad();
    //console.log(Agrd);
    var TCred = CalTotalCred();
    //console.log("Total Cred in Calculate: " + TCred);
    var TSS = CalSubSol();
    //console.log("Array of Sub Sol: " + ASol);
    //console.log("CalSubSol Return: " + TSS);
    SGPA = (TSS / TCred).toFixed(4);
    //console.log("SGPA: " + SGPA);
    DisSGPA(SGPA);
    for (i = 0; i < total; i++) {
        DisTable(i);
    }
    var final1 = parseInt(total) + 1;
    //console.log("Total in Calculate: " + final1);
    DisTabTotal(final1);
    DisSGPATotal();
    document.getElementById("Step2").style.display = "none";
    document.getElementById("Step3").style.display = "block";
    var elmnt = document.getElementById("Step3");
    elmnt.scrollIntoView();
}
function WhatsappShare() {
    var url = window.location.href;
    var api = "https://api.whatsapp.com/send?text=Hi,%20Buddy%20I%20found%20this%20Usefull%20Website%20named%20Future%20Vision%20BIE,%20One%20Stop%20Study%20Repository%20for%20VTU%20Students%0D%0ALink:"
    var both = api + url;
    //console.log(both);
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
