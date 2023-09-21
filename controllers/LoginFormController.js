let baseURL = "http://localhost:8080/api/v1/user/";
// let token="9cfd6bf5b3d09bcc3fa918fcacf5e56405e1eac40d6fe4479775d80eb5ae8e2fc2b300081e038903ef6c677f04bf954c0a189e6cafdf2a013277851ea5c4e2b0"

// check login

$('#login').click(function (){
    let loginEmail= $("#loginEmail").val();
    let loginPsd= $("#loginPsd").val();
    // let formData = {
    //     loginEmail: $("#loginEmail").val(),
    //     loginPsd: $("#loginPsd").val(),
    // };
    $.ajax({
        url: baseURL + "search/"+loginPsd+"/"+loginEmail,
        method: "GET",
        dataType: "json",
        // contentType: "application/json",
        success: function (res) {
            if(res.data.email === $("#loginEmail").val() && res.data.password === $("#loginPsd").val()){
                localStorage.setItem("userID", JSON.stringify(res.data.userID));
                clearTextField();
                window.location.href="DashbordForm.html";
                return false;
            }
        },
        error: function (error) {
            var errorMessage = JSON.parse(error.responseText);
            alert(errorMessage.message);
        }
    });
})

// clear form text fields
function clearTextField(){
    $("#userID").val(""),
        $("#loginEmail").val(""),
        $("#loginPsd").val("")
}