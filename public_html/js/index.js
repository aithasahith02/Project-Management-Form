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
    