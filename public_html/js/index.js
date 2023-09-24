//Variables to be used to make API calls
var connectionToken = "90931686|-31949325595370742|90961570";
var baseURL = "http://api.login2explore.com:5577";
var relationName = "proj-rel";
var databaseName = "project";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";

$('#projID').focus();

//Save record in local Storage
function saveRecNo(jsonObj) {
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", data.rec_no);
}


//Convert input ID into JSON object
function getProjIDasJsonObj() {
    var projid = $('#projID').val();
    var jsonstr = {
        projID: projid
    };
    return JSON.stringify(jsonstr);
}


//Fiil Data 
function fillData(jsonObj) {
    saveRecNo(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $('#projID').val(data.projID);
    $('#projName').val(data.projName);
    $('#projAssi').val(data.projAssi);
    $('#assDate').val(data.assDate);
    $('#deadlineDate').val(data.deadlineDate);
}

//Method to reset the form
function resetForm() {
    $("#projID").val("");
    $("#projName").val("");
    $("#projAssi").val("");
    $("#assDate").val("");
    $("#deadlineDate").val("");
    $('#projID').prop('disabled', false);
    $('#save').prop('disabled', false);
    $('#change').prop('disabled', true);
    $('#reset').prop('disabled', true);
    $("#projID").focus();
}


//Method to validate inputs received from the user
function validateAndGetFormData() {
    var projIDVar = $("#projID").val();
    if (projIDVar === "") {
        alert("Project ID is required");
        $("#projID").focus();
        return "";
    }

    var projNameVar = $("#projName").val();
    if (projNameVar === "") {
        alert("Project Name is required");
        $("#projName").focus();
        return "";
    }

    var projAssiVar = $("#projAssi").val();
    if (projAssiVar === "") {
        alert("Project Assignee name is required");
        $("#projAssi").focus();
        return "";
    }

    var assDateVar = $("#assDate").val();
    if (assDateVar === "") {
        alert("Choose the Project assignment Date");
        $("#assDate").focus();
        return "";
    }

    var deadlineDateVar = $("#deadlineDate").val();
    if (deadlineDateVar === "") {
        alert("Choose the Project Deadline");
        $("#deadlineDate").focus();
        return "";
    }

    var jsonStrObj = {
        projID: projIDVar,
        projName: projNameVar,
        projAssi: projAssiVar,
        assDate: assDateVar,
        deadlineDate: deadlineDateVar
    };
    return JSON.stringify(jsonStrObj);
}

//Method to make API call to add record to JPDB
function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connectionToken,
        jsonStr, databaseName, relationName);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        baseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $('#projID').focus();
}


//Method to make API call to update record to JPDB
function changeData() {
    $("#change").prop('disabled', true);
    jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connectionToken,
        jsonChg, databaseName, relationName, localStorage.getItem("recno"));
    alert(updateRequest);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest,
        baseURL, jpdbIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $('#projID').focus();
}


//Method to make API call to retreive record from JPDB
function getProj() {
    var projIDJsonObj = getProjIDasJsonObj();
    var getRequest = createGET_BY_KEYRequest(connectionToken, databaseName, relationName, projIDJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(getRequest, baseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    if (resultObj.status === 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#projName').focus();
    } else if (resultObj.status === 200) {
        $('#projID').prop('disabled', true);
        fillData(resultObj);
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#projName').focus();
    }
}