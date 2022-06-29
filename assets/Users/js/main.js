var patientname=document.getElementById("patientname");
var patientname2=document.getElementById("patientname2");
var patientnumber=document.getElementById("patientnumber");
var pdate=document.getElementById("pdate");
var ptime=document.getElementById("ptime");
var bookbtn=document.getElementById("click");


bookbtn.onclick=function(){
    duplication();
    displaypatient();
}

bookbtn.addEventListener("click",addpatient);

var patients=[];
function addpatient(){
    var patient={
        name1:patientname.value,
        name2:patientname2.value,
        number:patientnumber.value,
        date:pdate.value,
        time:ptime.value
    }
    patients.push(patient);
    localStorage.setItem("appointmentlist",JSON.stringify(patients));
    alert("Successfully Booked");
    cleardata();
    removevalid();
}

function cleardata(){
    for(var i=0; i<inputs.length; i++){
        inputs[i].value="";
    }
}

function removevalid(){
    patientname.classList.remove('is-valid');
    patientname2.classList.remove('is-valid');
    patientnumber.classList.remove('is-valid');
    pdate.classList.remove('is-valid');
    ptime.classList.remove('is-valid');
}


var namepattern=/^[a-zA-Z]{3,10}$/;
var numberpattern=/^[0][5][0269][0-9]{7,7}$/;
var datepattern=/[0-9][0-9][0-9][0-9]\-[01][0-9]\-[0-9][0-9]/;
var timepattern=/[0-9][0-9]\:[0-9][0-9]/;

patientname.onkeyup=function(){
    if(namepattern.test(patientname.value)){
        patientname.classList.add('is-valid');
        patientname.classList.remove('is-invalid');

    }else{
        patientname.classList.add('is-invalid');
        patientname.classList.remove('is-valid');
    }
    enabeldbtn();
}

patientname2.onkeyup=function(){
    if(namepattern.test(patientname2.value)){
        patientname2.classList.add('is-valid');
        patientname2.classList.remove('is-invalid');

    }else{
        patientname2.classList.add('is-invalid');
        patientname2.classList.remove('is-valid');
    }
    enabeldbtn();
}
patientnumber.onkeyup=function(){
    if(numberpattern.test(patientnumber.value)){
        patientnumber.classList.add('is-valid');
        patientnumber.classList.remove('is-invalid');
    }else{
        patientnumber.classList.add('is-invalid');
        patientnumber.classList.remove('is-valid');
    }
    enabeldbtn();
}
pdate.onclick=function(){
    if(datepattern.test(pdate.value)){
        pdate.classList.add('is-valid');
        pdate.classList.remove('is-invalid');
    }else{
        pdate.classList.add('is-invalid');
        pdate.classList.remove('is-valid');
    }
    enabeldbtn();
    duplication();
}
ptime.onclick=function(){
    if(timepattern.test(ptime.value)){
        ptime.classList.add('is-valid');
        ptime.classList.remove('is-invalid');
    }else{
        ptime.classList.add('is-invalid');
        ptime.classList.remove('is-valid');
    }
    enabeldbtn();
    duplication();
}

function enabeldbtn(){
    if(namepattern.test(patientname.value) && namepattern.test(patientname2.value) && numberpattern.test(patientnumber.value) && datepattern.test(pdate.value) && timepattern.test(ptime.value)){
        bookbtn.removeAttribute("disabled");
    }else{
        bookbtn.disabled="true";
    }
}

function duplication(){
 for(var i=0; i<patients.length; i++){
     if(pdate.value==patients[i].date && ptime.value==patients[i].time){
         alert("choose another date or time");
         bookbtn.disabled="true";
         
     } 
 }

}