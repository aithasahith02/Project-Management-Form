function resetForm() {
    $("#projID").val("");
    $("#projName").val("");
    $("#projAssi").val("");
    $("#assDate").val("");
    $("#deadlineDate").val("");
    $('projID').prop('disabled', false);
    $('save').prop('disabled', true);
    $('change').prop('disabled', true);
    $('reset').prop('disabled', true);
    $("#projId").focus();
}


function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90931686|-31949325595370742|90961570",
        jsonStr, "project", "proj-rel");
    alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
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
        deadlineDate : deadlineDateVar
    };
    return JSON.stringify(jsonStrObj);
}