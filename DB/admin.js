function test() {
    alert("Working");
}
var total;
var Sch;
var Sem;
var Bra;
var Asubcod = [];
var Asubnam = [];
var Amax = [];
var ACred = [];
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
        var subid = `sub${i}`;
        var subcod = `subcod${i}`;
        var credid = `cred${i}`;
        var totid = `tot${i}`;
        var newdiv = document.createElement('div');
        newdiv.innerHTML = `<div class='row'><div class='col-25'><label> Subject Name - ${i} </label></div><div class='col-75'> <input type='text' id='${subid}' required > </div> </div>
        <div class='row'><div class='col-25'><label> Subject Code - ${i} </label></div><div class='col-75'> <input type='text' id='${subcod}' > </div> </div>
        <div class='row'><div class='col-25'><label> Credit - ${i} </label></div><div class='col-75'> <input type='text' id='${credid}' > </div> </div>
        <div class='row'><div class='col-25'><label> Max Marks - ${i} </label></div><div class='col-75'> <input type='text' id='${totid}' > </div> </div><hr/><br/>
        `;
        document.getElementById(divName).appendChild(newdiv);
        //console.log(i);
    }
}
function getValue() {
    var tempTotal = total;
    Sch = document.getElementById("schemes").value;
    Sem = document.getElementById("sems").value;
    Bra = document.getElementById("branchs").value;
    for (i = 1; i <= tempTotal; i++) {
        var subid = document.getElementById(`sub${i}`).value;
        Asubnam.push(subid);
        var subcod = document.getElementById(`subcod${i}`).value;
        Asubcod.push(subcod);
        var credid = document.getElementById(`cred${i}`).value;
        ACred.push(credid);
        var totid = document.getElementById(`tot${i}`).value;
        Amax.push(totid);
    }
}
function UpdateTot(sch,bra,sem,ele)
{
    firebase.database().ref().child(sch).child(bra).child(sem).update({
            Total : ele,
        });
}
function UpdateDB(sch,bra,sem,subname,subco,credsco,maxmaks,val){
    //console.log(vsub);
    //console.log("Scheme ",sch,"Branch: ",bra,"Sem: ",sem," ",vsub,"-",subname," ",vcred,"-",credsco," ",vmax,"-",maxmaks,"Val : ",val);
    
    firebase.database().ref().child(sch).child(bra).child(sem).child(val).update({
    //firebase.database().ref().child('Materials').child(code).update({
    //firebase.database().ref('Materials/').set({
        //Link : link,
        sub : subname,
        subcode: subco,
        cred : credsco,
        max : maxmaks,
    });
   // console.log(code);
    //console.log(link);
}
function writeData() {
    UpdateTot(Sch,Bra,Sem,total);
    for (i = 0; i < total; i++) {
        UpdateDB(Sch,Bra,Sem,Asubnam[i],Asubcod[i],ACred[i],Amax[i],i);

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