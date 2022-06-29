var appointmentdata=document.getElementById("appointmentdata");
var savebtn=document.getElementById("savebtn");
var currentindex=0;

if(localStorage.getItem("appointmentlist")==null){
    var patients=[];
}else{
    patients=JSON.parse(localStorage.getItem("appointmentlist"));
    displaypatient();
}

savebtn.onclick=function(){
    savechanges();
}

function displaypatient(){
    result="";
    for(var i=0;i<patients.length;i++){
        result+=`<tr>
        <td>${i}</td> 
        <td>${patients[i].name1}</td> 
        <td>${patients[i].name2}</td> 
        <td>${patients[i].number}</td> 
        <td>${patients[i].date}</td>
        <td>${patients[i].time}</td>
        <td> <button class="btn btn-primary" onclick="editappointment(${i})"> <i class="fa fa-pen"></i> </button></td>
        <td> <button class="btn btn-warning" onclick="deleteappointment(${i})"> <i class="fa-solid fa-trash text-white"></i> </button></td>
        </tr>`;
    }
    appointmentdata.innerHTML=result;
}

function deleteappointment(i){
    patients.splice(i,1);
    localStorage.setItem("appointmentlist",JSON.stringify(patients));    
    displaypatient();
}
function search(SearchnNumber){
     var result="";
     for(var i=0; i<patients.length; i++){
         if(patients[i].number.includes(SearchnNumber)){
            result+=`<tr>
            <td>${i}</td> 
            <td>${patients[i].name1}</td> 
            <td>${patients[i].name2}</td> 
            <td>${patients[i].number}</td> 
            <td>${patients[i].date}</td>
            <td>${patients[i].time}</td>
            <td> <button class="btn btn-primary"> <i class="fa fa-pen"></i> </button></td>
            <td> <button class="btn btn-warning" > <i class="fa-solid fa-trash text-white"></i> </button></td>
            </tr>`;
         }
     }
     appointmentdata.innerHTML=result;

}

function editappointment(i){
    patientname.value=patients[i].name1;
    patientname2.value=patients[i].name2;
    patientnumber.value=patients[i].number;
    pdate.value=patients[i].date;
    ptime.value=patients[i].time;
    currentindex=i;
}

function savechanges(){
    var patient={
        name1:patientname.value,
        name2:patientname2.value,
        number:patientnumber.value,
        date:pdate.value,
        time:ptime.value
    };

    patients[currentindex].name1=patient.name1;
    patients[currentindex].name2=patient.name2;
    patients[currentindex].number=patient.number;
    patients[currentindex].date=patient.date;
    patients[currentindex].time=patient.time;

    localStorage.setItem("appointmentlist",JSON.stringify(patients));
    displaypatient();
} 