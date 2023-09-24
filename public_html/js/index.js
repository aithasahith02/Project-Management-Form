var connectionToken = "90931686|-31949325595370742|90961570";
var databaseName = "project";
var relationName = "proj-rel";
var baseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";

$('#projID').focus();

function clicked()
{
    alert("HEllo");
}

function saveRecNo(jsonObj) {
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", data.rec_no);
}

function getProjIDasJsonObj() {
    var projid = $('#projID').val();
    var jsonstr = {
        id: projid
    };
    return JSON.stringify(jsonstr);
}

function fillData(jsonObj) {
    saveRecNo(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $('#projID').val(data.projId);
    $('#projName').val(data.projName);
    $('#projAssi').val(data.projAssi);
    $('#assDate').val(data.assDate);
    $('#deadlineDate').val(data.deadlineDate);


}
function resetForm() {
    $("#projID").val("");
    $("#projName").val("");
    $("#projAssi").val("");
    $("#assDate").val("");
    $("#deadlineDate").val("");
    $('projID').prop('disabled', false);
    $('save').prop('disabled', false);
    $('change').prop('disabled', true);
    $('reset').prop('disabled', true);
    $("#projId").focus();
}

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


function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connectionToken,
        jsonStr, databaseName, relationName);
    alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        baseURL, jpdbIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $('#projID').focus();
}


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

function getProj() {
    var projIDJsonObj = getProjIDasJsonObj();
    var getRequest = createGET_BY_KEY_REQUEST(connectionToken, databaseName, relationName, projIDJsonObj);
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