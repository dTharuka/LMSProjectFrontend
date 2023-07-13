let baseURL = "http://localhost:8080/api/v1/user/";
let generateID = [];
getAllUsers();

$("#btnAddToTable").click(function () {

    let userID= $("#userID").val();
    let formData = {
        userID: $("#userID").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        // userImg: $("#userImg").val()
    };
    $.ajax({
        url: baseURL + "save-user",
        method: "post",
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json", // Add this line
        success: function (res) {
            // getAllAdmins();----> methana getAll eka call karanna....
            uploadRegisterImages(userID);
            alert(res.message);
            clearTextField();
            getAllUsers();
        },
        error: function (error) {
            var errorMessage = JSON.parse(error.responseText);
            alert(errorMessage.message);
        }
    });
});

// get all users
function getAllUsers() {
    $.ajax({
        url: baseURL + "get-all-users", success: function (res) {
            for (let c of res.data) {
                generateID.push(c.userID);
                // console.log(c.userID);
            }
            generateUserID();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

//generate user id
function generateUserID() {
    let maxCount = 0;
    for (let i = 0; i < generateID.length; i++) {
        let userID = generateID[i];
        let count = parseInt(userID.split("-")[1]);
        if (count > maxCount) {
            maxCount = count;
        }
    }
    maxCount++;
    let newUserID = "U00-" + maxCount;
    $("#userID").val(newUserID);
}


function clearTextField(){
    $("#userID").val(""),
        $("#name").val(""),
        $("#email").val(""),
        $("#password").val(""),
        $("#userImg").val("")
}

// validation .......
function AdmValidator(txtField, regXPattern, nextTxtField) {


    $(txtField).on('keyup', function (e) {

            if (regXPattern.test($(txtField).val())) {
                $(txtField).css('border', '3px solid green');


                if (e.key === "Enter" && txtField !== "#password") {
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
    '#name',
    /^[A-z]{3,30}$/,
    '#email'
)
AdmValidator(
    '#email',
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
    '#password'
)
AdmValidator(
    '#password',
    /^[A-z]{4,30}$/,
    '#userImg'
)

function uploadRegisterImages(userID) {

    let imageViewFile = $("#userImg")[0].files[0];

    let imageFileName = userID+"-image-"+$("#userImg")[0].files[0].name;

    var data = new FormData();
    data.append("image",imageViewFile,imageFileName);

    $.ajax({
        url: baseURL + "uploadImg/" + userID,
        method: "put",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            console.log("Uploaded");
            alert(resp.message)
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });}