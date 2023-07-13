let baseURL = "http://localhost:8080/api/v1/register/";
let generateID = [];
getAllCourse();

//Add registration..
$("#btnAddCourse").click(function (){

    let formData = {
        registerID: $("#registerID").val(),
        courseID: $("#courseID").val(),
        userID: $("#userID").val(),
        name: $("#name").val(),
        email: $("#email").val()
    };
    $.ajax({
        url: baseURL + "save-register",
        method: "post",
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            // getAllAdmins();----> methana getAll eka call karanna....
            alert(res.message);
            clearTextField();
            getAllCourse();
        },
        error: function (error) {
            var errorMessage = JSON.parse(error.responseText);
            alert(errorMessage.message);
        }
    });
});

// search registration...
$("#searchRegistrationID").keydown(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();


        $.ajax({
            url: baseURL + "search/" +$("#searchRegistrationID").val(),
            method: "GET",
            dataType: "json",
            success: function (res) {

                $("#registerID").val(res.data.registerID);
                $("#courseID").val(res.data.courseID);
                $("#userID").val(res.data.userID);
                $("#name").val(res.data.name);
                $("#email").val(res.data.email);
                clearSearchTextField();
            },
            error: function (error) {
                var errorMessage = JSON.parse(error.responseText);
                alert(errorMessage.message);
            }
        });
    }
});


// update registration...
$("#btnUpdateCourse").click(function (){

    let formData = {
        registerID: $("#registerID").val(),
        courseID: $("#courseID").val(),
        userID: $("#userID").val(),
        name: $("#name").val(),
        email: $("#email").val()
    };

    $.ajax({
        url: baseURL + "update-register",
        method: "put",
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            alert(res.message);
            // getAllAdmins();----> methana getAll eka call karanna....
            clearTextField();
            getAllCourse();
        },
        error: function (error) {
            var errorMessage = JSON.parse(error.responseText);
            alert(errorMessage.message);
        }
    });
});

$("#btnDeleteCourse").click(function (){
    $.ajax({
        url: baseURL + "delete-register/" +$("#registerID").val(),
        method: "delete",
        dataType: "json",
        success: function (res) {
            alert(res.message);
            clearTextField();
            getAllCourse();
        },
        error: function (error) {
            var errorMessage = JSON.parse(error.responseText);
            alert(errorMessage.message);

        }
    });
});

// get all course
function getAllCourse() {
    $.ajax({
        url: baseURL + "get-all-registers", success: function (res) {
            for (let c of res.data) {
                generateID.push(c.registerID);

            }
            generateRegisterID();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

//generate register id
function generateRegisterID() {
    let maxCount = 0;
    for (let i = 0; i < generateID.length; i++) {
        let courseID = generateID[i];
        let count = parseInt(courseID.split("-")[1]);
        if (count > maxCount) {
            maxCount = count;
        }
    }
    maxCount++;
    let newUserID = "R00-" + maxCount;
    $("#registerID").val(newUserID);
}

// clear form text fields
function clearTextField(){
    $("#registerID").val(""),
        $("#courseID").val(""),
        $("#userID").val(""),
        $("#name").val(""),
        $("#email").val("")
}

// clear search text field
function clearSearchTextField(){
    $("#searchRegistrationID").val("");
}

// validation....
function AdmValidator(txtField, regXPattern, nextTxtField) {


    $(txtField).on('keyup', function (e) {

            if (regXPattern.test($(txtField).val())) {
                $(txtField).css('border', '3px solid green');


                if (e.key === "Enter" && txtField !== "#email") {
                    $(nextTxtField).focus();

                } else {
                    return false;
                }

            } else {
                $(txtField).css('border', '3px solid red');
            }
        }
    )
}

AdmValidator(
    '#courseID',
    /^C00[0-9]{1,30}$/,
    '#userID'
)
AdmValidator(
    '#userID',
    /^U00[0-9]{1,30}$/,
    '#name'
)
AdmValidator(
    '#name',
    /^[A-z]{3,30}$/,
    '#email'
)
AdmValidator(
    '#email',
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
    '#courseID'
)