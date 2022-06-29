var doctorNameInput = document.getElementById('doctorName');
var doctorPasswordInput = document.getElementById('doctorPassword');
var doctorQualificationInput = document.getElementById('doctorQualification');
var doctorDepartmentInput = document.getElementById('doctorDepartment');
var doctorAgeInput = document.getElementById('doctorAge');
var addBtn = document.getElementById('click');
var deletBtn = document.getElementById('deletBtn');
var data = document.getElementById('data');
var nameAlert = document.getElementById('nameAlert');
var passwordAlert = document.getElementById('passwordAlert');
var ageAlert = document.getElementById('ageAlert');
var currentIndex = 0;
var inputs = document.getElementsByClassName('inputs');
var doctors = [];

if (localStorage.getItem("doctorList") == null) {
    var doctors = [];
} else {
    var doctors = JSON.parse(localStorage.getItem("doctorList"));
    displayData();
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == "Add new doctor") {
        addDoctor();
    }
    else {
        dataUpdate();
    }
    displayData();
    clearform();
}


function addDoctor() {
    var doctor = {
        name: doctorNameInput.value,
        Password: doctorPasswordInput.value,
        age: doctorAgeInput.value,
        Department: doctorDepartmentInput.value,
        Qualification: doctorQualificationInput.value

    }
    doctors.push(doctor);
    localStorage.setItem("doctorList", JSON.stringify(doctors));
    doctorName.classList.remove('is-valid');
    doctorAge.classList.remove('is-valid');
    doctorPassword.classList.remove('is-valid');
}

function displayData() {
    var result = "";
    for (var i = 0; i < doctors.length; i++) {
        result += ` <tr>
        <td>${i}</td>
        <td>${doctors[i].name}</td>
        <td>${doctors[i].Password}</td>
        <td>${doctors[i].age}</td>
        <td>${doctors[i].Department}</td>
        <td>${doctors[i].Qualification}</td>
        <td><button class="btn btn-outline-secondary" onclick="getdoctorData(${i})">update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deletedoctor(${i})">Delete</button></td>
        </tr>`
    }
    data.innerHTML = result;
}

function clearform() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    addBtn.innerHTML = "Add new doctor";
}
function deletedoctor(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            doctors.splice(index, 1);
            localStorage.setItem("doctorList", JSON.stringify(doctors));
            displayData();
            Swal.fire(

                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}
deletBtn.onclick = async function () {
    const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    if (password === "1234") {
        localStorage.removeItem("doctorList");
        doctors = [];
        data.innerHTML = "";
    }


}
function search(searchText) {
    var result = "";
    for (var i = 0; i < doctors.length; i++) {
        if (doctors[i].name.toLowerCase().includes(searchText.toLowerCase())) {
            result += ` <tr>
        <td>${i}</td>
        <td>${doctors[i].name}</td>
        <td>${doctors[i].Password}</td>
        <td>${doctors[i].age}</td>
        <td>${doctors[i].Department}</td>
        <td>${doctors[i].Qualification}</td>
        <td><button class="btn btn-danger" onclick="getdoctorData(${i})">update</button></td>
        <td><button class="btn btn-primary" onclick="deletedoctor(${i})">Delete</button></td>
        </tr>
        `;
        }
    }
    data.innerHTML = result;

}
function getdoctorData(index) {
    var doctor = doctors[index];
    doctorNameInput.value = doctor.name;
    doctorPasswordInput.value = doctor.Password;
    doctorDepartmentInput.value = doctor.Department;
    doctorQualificationInput.value = doctor.Qualification;
    doctorAgeInput.value = doctor.age;
    addBtn.innerHTML = "update doctor";
    currentIndex = index;

}

function dataUpdate() {
    var doctor = {
        name: doctorNameInput.value,
        Password: doctorPasswordInput.value,
        age: doctorAgeInput.value,
        Department: doctorDepartmentInput.value,
        Qualification: doctorQualificationInput.value
    }
    doctors[currentIndex].name = doctor.name;
    doctors[currentIndex].Password = doctor.Password;
    doctors[currentIndex].age = doctor.age;
    doctors[currentIndex].Department = doctor.Department;
    doctors[currentIndex].Qualification = doctor.Qualification;
    localStorage.setItem("doctorList", JSON.stringify(doctors));
}

let checkAll = function () {
    var namePattern = /^[A-Z][a-z]{2,10} [A-Z][a-z]{2,10} [A-Z][a-z]{2,10}$/;
    if (namePattern.test(doctorName.value)) {
        doctorName.classList.add('is-valid');
        doctorName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    } else {
        addBtn.setAttribute("disabled", "true");
        doctorName.classList.add('is-invalid');
        doctorName.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
    }
    var passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    if (passwordPattern.test(doctorPassword.value)) {
        doctorPassword.classList.add('is-valid');
        doctorPassword.classList.remove('is-invalid');
        passwordAlert.classList.add('d-none');
    } else {
        addBtn.setAttribute("disabled", "true");
        doctorPassword.classList.add('is-invalid');
        doctorPassword.classList.remove('is-valid');
        passwordAlert.classList.remove('d-none');
    }
    if (doctorAge.value >= 24 && doctorAge.value <= 113) {
        doctorAge.classList.add('is-valid');
        doctorAge.classList.remove('is-invalid');
        ageAlert.classList.add('d-none');

    } else {
        addBtn.setAttribute("disabled", "true");
        doctorAge.classList.add('is-invalid');
        doctorAge.classList.remove('is-valid');
        ageAlert.classList.remove('d-none');
    }
    if (namePattern.test(doctorName.value) && (doctorAge.value >= 24 && doctorAge.value <= 113) && passwordPattern.test(doctorPassword.value)) {
        addBtn.removeAttribute("disabled");
    }

}

doctorName.onkeyup = function () {
    checkAll();
}
doctorPassword.onkeyup = function () {
    checkAll();
}
doctorAge.onkeyup = function () {
    checkAll();
}


//Login form
function Login(){
    let username = document.getElementById("formGroupExampleInput").value;
    let pass = document.getElementById("formGroupExampleInput2").value;

    if ( username.length==0 || pass.length==0){
        Swal.fire({
            title: 'Error!',
            text: 'All Feilds are required',
            icon: 'error',
            confirmButtonText: 'OK'
            
        })
    }
    else{
        for (var i = 0; i < doctors.length; i++) {
            if(doctors[i].name == username && doctors[i].Password == pass){
                window.open("../pages/main.html")
                
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