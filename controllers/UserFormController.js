let baseURL = "http://localhost:8080/api/v1/user/";
let resImg="";
// let generateID = [];
// let countID=[];
// let max=0;
// let tempID;
// let count;
getAllUsers();


// search user
$("#searchUserID").keydown(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();


        $.ajax({
            url: baseURL + "search/" +$("#searchUserID").val(),
            method: "GET",
            dataType: "json",
            success: function (res) {
                resImg=res.data.image;
                // alert(res.data.image); todo----> image ekata null ekk enne eka hadanna...
                $("#userID").val(res.data.userID);
                $("#name").val(res.data.name);
                $("#email").val(res.data.email);
                $("#password").val(res.data.password);
                // $("#userImg").val(res.data.image);
                // $("#userImg").attr("src", res.data.image);
                clearSearchTextField();
            },
            error: function (error) {
                var errorMessage = JSON.parse(error.responseText);
                alert(errorMessage.message);
            }
        });
    }
});

// update function work......

$("#btnUpdateTable").click(function (){
     let formData = {
        userID: $("#userID").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        image:resImg
        //  image:$("#userImg").val()
    };

    $.ajax({
        url: baseURL + "update-user",
        method: "put",
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
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



//delete function work...

$("#btnDeleteTable").click(function (){

    $.ajax({
        url: baseURL + "delete-user/" +$("#userID").val(),
        method: "delete",
        dataType: "json",
        success: function (res) {
            alert(res.message);
            clearTextField();
            getAllUsers();
            window.location.replace("../index.html");
            return false;
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
                // generateID.push(c.userID);
                // console.log(c.userID);
            }
            // generateUserID();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

//generate user id
// function generateUserID() {
//     let maxCount = 0;
//     for (let i = 0; i < generateID.length; i++) {
//         let userID = generateID[i];
//         let count = parseInt(userID.split("-")[1]);
//         if (count > maxCount) {
//             maxCount = count;
//         }
//     }
//     maxCount++;
//     let newUserID = "U00-" + maxCount;
//     $("#userID").val(newUserID);
// }


// clear form text fields
function clearTextField(){
    $("#userID").val(""),
        $("#name").val(""),
        $("#email").val(""),
        $("#password").val(""),
        $("#userImg").val("")
}

// clear search text field
function clearSearchTextField(){
    $("#searchUserID").val("");
}

// validation....
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
            console.log("Update..");
            alert(resp.message)
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });}

