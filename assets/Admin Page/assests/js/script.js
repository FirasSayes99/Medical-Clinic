
var DrNameInput = document.getElementById('DrName');
var DrEmailInput = document.getElementById('DrEmail');
var DrPassInput = document.getElementById('DrPass');
var DrQualificationInput = document.getElementById('doctorQualification');

var currentIndex=[];

var inputs = document.getElementsByClassName('input-text');

var addBtn = document.getElementById('click');
var doctors=[];

var data = document.getElementById('data');

if(localStorage.getItem("doctorsList")==null){
    var doctor=[];
}else {
    var doctors = JSON.parse(localStorage.getItem("doctorsList"));
    displayData();
}



addBtn.onclick = function(){
    if (addBtn.innerHTML=="Add Doctor") {
        addDoctor();
        console.log(data);
  
    } else {
        updateDoctor();

    }
    displayData();
    clearForm()
}

function  addDoctor(){

    var doctor = {
        name:DrNameInput.value,
        Email:DrEmailInput.value,
        Pass:DrPassInput.value,
        Qualification:DrQualificationInput.value
    }
    doctors.push(doctor);
    localStorage.setItem("doctorsList",JSON.stringify(doctors));
}

function displayData(){

    var result = "";
    for (var i=0; i < doctors.length; i++) {
        result +=  `

         <tr class="alert" role="alert">
         <td>${i}</td>
         <td>${doctors[i].name}</td>
         <td>${doctors[i].Email}</td>
         <td>${doctors[i].Pass}</td>
         <td>${doctors[i].Qualification}</td>
         <td><button id="Tbtn" class="btn btn-info" onclick="getDoctorData(${i})">update</button></td>
         <td><button id="Tbtn" class="btn btn-danger" onclick="deleteDoctor(${i})">delete</button></td>
        </td>
       </tr>



     `
        
        ;
    }

    data.innerHTML = result;


}

function clearForm(){

for (var i = 0; i < inputs.length; i++) {
  inputs[i].value="";
}
}

function deleteDoctor(index){
    doctors.splice(index,1);
    localStorage.setItem("doctorsList",JSON.stringify(doctors));
    displayData();
}

function search(name) {
  
    var result = "";
    for (var i=0; i < doctors.length; i++) {
        if(doctors[i].name.toLowerCase().includes(name.toLowerCase())){

        result +=  `
        <tr class="alert" role="alert">
        <td>${i}</td>
        <td>${doctors[i].name}</td>
        <td>${doctors[i].Email}</td>
        <td>${doctors[i].Pass}</td>
        <td>${doctors[i].Qualification}</td>
        <td>
            <a href="#" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true"><i class="fa fa-close"></i></span>
        </a>
        <td><button id="Tbtn" class="btn btn-danger" onclick="getDoctorData(${i})">update</button></td>
        <td><button id="Tbtn" class="btn btn-info" onclick="deleteDoctor(${i})">delete</button></td>
       </td>
      </tr>
     `
        
        ;
    }
   }
    data.innerHTML = result;

}


function getDoctorData(index) {
    var doctor = doctors [index];
    console.log(doctor);
    DrNameInput.value=doctor.name;
    DrEmailInput.value=doctor.Email;
    DrPassInput.value=doctor.Pass;
    DrQualificationInput.value=doctor.Qualification;
    addBtn.innerHTML="Update doctor"
    currentIndex=index;
   
}

function updateDoctor(){
    var doctor = {
        name:DrNameInput.value,
        Email:DrEmailInput.value,
        Pass:DrPassInput.value,
        Qualification:DrQualificationInput.value
        
    };
    doctors[currentIndex].name=doctor.name;
    doctors[currentIndex].Email=doctor.Email;
    doctors[currentIndex].Pass=doctor.Pass;
    doctors[currentIndex].Qualification=doctor.Qualification;
    localStorage.setItem("doctorsList",JSON.stringify(doctors));

}

//Login form


function Login(){
    var test1="Admin";  //admin Login data
    var test2="test@123";

    let username = document.getElementById("formGroupExampleInput").value;
    let pwd = document.getElementById("formGroupExampleInput2").value;

    console.log(username);
    console.log(pwd);

    if ( username==test1 && pwd==test2) {
        window.location.href = 'Admin.html';
        
    } 

    if ( username.length==0 || pwd.length==0){
        Swal.fire({
            title: 'Error!',
            text: 'All Feilds are required',
            icon: 'error',
            confirmButtonText: 'OK'
            
        })
    }
    else{
        for (var i = 0; i < doctors.length; i++) {
            if(doctors[i].name == username && doctors[i].Pass == pwd){
                //window.open("../pages/main.html")
               
                window.location.href = '../pages/main.html';
                Swal.fire({
                    title: 'success!',
                    text: 'success',
                    icon: 'success',
                    confirmButtonText: 'All Good!'
                })
                
            } 
            else{
            Swal.fire({
                title: 'Error!',
                text: 'Username or Password is invalid',
                icon: 'error',
                confirmButtonText: 'Try Again!'
                
            })
        }
        }
    }

}



 

function LogOut(){
    
    window.location.href = '../index.html';
}

