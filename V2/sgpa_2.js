function test() {
    alert("Working");
}
var total;
var GSCH;
var GSEM;
var GBRA;
var SGPA;
var Asco = []; //Marks Obtained
var Acre = []; //cred
var Atot = []; //max marks
var Asub = []; //Subject Name
var Ascod = []; //Subject Code
var Aper = []; //percentage
var Agrd = []; //Grade Point
var ASol = []; //calculated 

function FetchTOT(sch, bra, sem) {
    var rootRef = firebase.database().ref();
    var val6;
    rootRef.once("value")
        .then(function (snapshot) {
            val5 = snapshot.child(sch).child(bra).child(sem).child('Total').val();
            console.log("TOtal :", val5);
            if (val5 != null) {
                var newdiv = document.createElement('div');
                newdiv.innerHTML = `<input type="hidden" id="TotalId" name="TotalId" value="${val5}">`;
                document.getElementById('dynamicInput').appendChild(newdiv);
                for (i = 0; i < val5; i++) {
                    FetchDB(Sch, Bra, Sem, i);
                }
            } else {
                console.log("NO DATA");
                document.getElementById("Load").style.display = "none";
                document.getElementById("NoLoad").style.display = "block";
            }
        });
}

function FetchDB(sch, bra, sem, itr) {
    var rootRef = firebase.database().ref();
    rootRef.once("value")
        .then(function (snapshot) {
            val1 = snapshot.child(sch).child(bra).child(sem).child(itr).child('sub').val();
            val2 = snapshot.child(sch).child(bra).child(sem).child(itr).child('subcode').val();
            val3 = snapshot.child(sch).child(bra).child(sem).child(itr).child('cred').val();
            val4 = snapshot.child(sch).child(bra).child(sem).child(itr).child('max').val();
            console.log(itr, "Sub:-", val1, "-SubCode:-", val2, "-Credit:-", val3, "-Max Marks:-", val4, "-");
            addInput('dynamicInput', val1, val2, val3, val4, itr);
            document.getElementById("Load").style.display = "none";
            document.getElementById("Step2").style.display = "block";
            var elmnt = document.getElementById("Step2");
            elmnt.scrollIntoView();
        });
}

function addInput(divName, asub, ascode, acred, amax, i) {
    //var nid = id;
    var sid = `sub${i}`;
    var tid = `tot${i}`;
    var cid = `cre${i}`;
    var snid = `subnm${i}`;
    var scdid = `subcd${i}`;
    var newdiv = document.createElement('div');
    newdiv.innerHTML = `<div class='row'><div class='col-25'><label> Subject Name </label></div><div class='col-75'> <input type='text' id='${snid}' value='${asub}' readonly> </div> </div>
    <div class='row'><div class='col-25'><label> Subject Code </label></div><div class='col-75'> <input type='text' id='${scdid}' value='${ascode}' readonly> </div> </div>
    <div class='row'><div class='col-25'><label> Credit score </label></div><div class='col-75'> <input type='text' id='${cid}' value='${acred}' readonly> </div> </div>
    <div class='row'><div class='col-25'><label> Max Marks </label></div><div class='col-75'> <input type='text' id='${tid}' value='${amax}' readonly> </div> </div>
    <div class='row'><div class='col-25'><label> Marks Scored </label></div><div class='col-75'> <input type='text' id='${sid}' > </div> </div><hr/>`;
    document.getElementById(divName).appendChild(newdiv);
    //console.log(i);
}

function showMarks() {
    Sch = document.getElementById("schemes").value;
    Sem = document.getElementById("sems").value;
    Bra = document.getElementById("branchs").value;
    GSCH = Sch;
    GSEM = Sem;
    GBRA = Bra;
    console.log("Scheme: ", Sch, " Sem:", Sem, " Branch:", Bra);
    document.getElementById("Step1").style.display = "none";
    document.getElementById("Load").style.display = "block";
    FetchTOT(Sch, Bra, Sem);

}

function getValue() {
    var tempTotal = document.getElementById("TotalId").value;
    total = tempTotal;
    for (i = 0; i < tempTotal; i++) {
        var scoreid = document.getElementById(`sub${i}`).value;
        Asco.push(scoreid);
        var totalid = document.getElementById(`tot${i}`).value;
        Atot.push(totalid);
        var credtid = document.getElementById(`cre${i}`).value;
        Acre.push(credtid);
        var subid = document.getElementById(`subnm${i}`).value;
        Asub.push(subid);
        var scdid = document.getElementById(`subcd${i}`).value;
        Ascod.push(scdid);

        //console.log("Test");
        //console.log(i);
        //console.log("Score ID: " + scoreid);
        //console.log("Total ID: " + totalid);
        //console.log("Credit ID: " + credtid);

        //console.log("Array");
        //console.log(Asco);
        //console.log(Atot);
        //console.log(Acre);
        //console.log(Asub);
        //console.log(Ascod);
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
    newdiv.innerHTML = `<p class='center'>Your SGPA is <big>${i}</big> </p>`;
    document.getElementById("SGPAResult").appendChild(newdiv);
}
function Disinfo() {
    var newdiv = document.createElement('div');
    var schlen = GSCH.length;
    var semlen = GSEM.length;
    var csch = GSCH.slice(0, schlen-1);
    var csem = GSEM.slice(0, semlen-3);
    newdiv.innerHTML = `<p class='center'>Scheme: ${csch} <br/>Branch: ${GBRA}<br/>Semester: ${csem}</p>`;
    document.getElementById("infoSGPA").appendChild(newdiv);
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
    var cell8 = row.insertCell(7);
    cell1.innerHTML = Ascod[i];
    cell2.innerHTML = Asub[i];
    cell3.innerHTML = Asco[i];
    cell4.innerHTML = (Aper[i]).toFixed(4) + " %";
    cell5.innerHTML = Acre[i];
    cell6.innerHTML = Agrd[i];
    cell7.innerHTML = GradeToLetter(Agrd[i]);
    cell8.innerHTML = ASol[i];
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
    var cell8 = row.insertCell(7);
    cell1.innerHTML = "-";
    cell2.innerHTML = "Total";
    cell3.innerHTML = TotalScore();
    cell4.innerHTML = (TotalPer()).toFixed(4) + " %";
    cell5.innerHTML = CalTotalCred();
    cell6.innerHTML = TotalGrad();
    cell7.innerHTML = "-";
    cell8.innerHTML = CalSubSol();
}
function DisSGPATotal() {
    var newdiv = document.createElement('div');
    newdiv.innerHTML = `Thus, SGPA = ${CalSubSol()} / ${CalTotalCred()} =  ${SGPA}`;
    document.getElementById("FinalSGPA").appendChild(newdiv);
}
function calculate() {
    getValue();
    /*
        console.log("Array");
        console.log(Asco);
        console.log(Atot);
        console.log(Acre);
        console.log(Asub);
        console.log(Ascod);
    */
    
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
    Disinfo();
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
