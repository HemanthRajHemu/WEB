function FetchTOT(sch,bra,sem,callback){
    var rootRef = firebase.database().ref();
    var val6 ;
    rootRef.once("value")
        .then(function (snapshot) {
            val5 = snapshot.child(sch).child(bra).child(sem).child('Total').val();
            console.log("TOtal :",val5);
            val6 = val5;
            callback(val6);
        });
    console.log("VAL6:",val6);
}

function FetchDB(sch,bra,sem,itr){
    var rootRef = firebase.database().ref();
    rootRef.once("value")
        .then(function (snapshot) {
            val1 = snapshot.child(sch).child(bra).child(sem).child(itr).child('sub').val();
            val2 = snapshot.child(sch).child(bra).child(sem).child(itr).child('subcode').val();
            val3 = snapshot.child(sch).child(bra).child(sem).child(itr).child('cred').val();
            val4 = snapshot.child(sch).child(bra).child(sem).child(itr).child('max').val();
            console.log("Sub: ",val1," SubCode: ",val2," Credit: ",val3," Max Marks: ",val4);

        });
}


function showMarks() {
    Sch = document.getElementById("schemes").value;
    Sem = document.getElementById("sems").value;
    Bra = document.getElementById("branchs").value;
    stot = null;
    console.log("Scheme: ",Sch," Sem:",Sem," Branch:",Bra);
    FetchTOT(Sch,Bra,Sem,function(val6) {
        total = val6;
        stot = val6;
        console.log("TOtal 1 :",total);
        // Do some calculations
    });
    console.log("TOtal :",total);
    console.log("stot :",stot);

    FetchDB(Sch,Bra,Sem,'1');
    //alert(total);
    /*
    addInput('dynamicInput', total);
    document.getElementById("Step1").style.display = "none";
    document.getElementById("Step2").style.display = "block";
    var elmnt = document.getElementById("Step2");
    elmnt.scrollIntoView();*/
}