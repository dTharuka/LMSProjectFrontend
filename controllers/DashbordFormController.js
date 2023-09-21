let baseURL = "http://localhost:8080/api/v1/user/";

$('#get_profile').click(function (){
    //----remove value
    // localStorage.removeItem('userID');

    //----get value
    // const storedValue = localStorage.getItem('userID');
    // alert(storedValue);
    window.location.href="UserForm.html";
    return false;
})

$('#select_course').click(function (){
    window.location.href="SignInForm.html";
    return false;
})

$("#logout").click(function (){
    alert("helloo")
    window.location.replace("../index.html");
    return false;
});

// search user
function setData() {
    let storedValue = localStorage.getItem('userID').split('"').join('');
    $.ajax({
        url: baseURL + "search/" + storedValue,
        method: "GET",
        dataType: "json",
        success: function (res) {
            $("#boss").append(`<img src="../assets/upload/${res.data.image}">`);
            $("#profileLog > #userId").append(`<h1>${res.data.userID}<h1/>`);
            $("#profileLog > #userName").append(`<h1>${res.data.name}<h1/>`);
            $("#profileLog > #userEmail").append(`<h1>${res.data.email}<h1/>`);
            $("#profileLog > #userCode").append(`<h1>${res.data.password}<h1/>`);
        },
        error: function (error) {
            var errorMessage = JSON.parse(error.responseText);
            alert(errorMessage.message);
        }
    });
}
$(document).ready(function () {
    setData();
});






