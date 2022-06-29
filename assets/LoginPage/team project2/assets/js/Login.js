let format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
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
        console.log(username);
        console.log(pass);
        document.getElementById("formGroupExampleInput").value = "";
        document.getElementById("formGroupExampleInput2").value = "";
    }

}

console.log(localStorage.getItem());