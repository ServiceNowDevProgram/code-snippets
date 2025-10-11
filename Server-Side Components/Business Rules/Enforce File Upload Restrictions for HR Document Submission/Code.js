var hrTask = new GlideRecord('sn_hr_core_task');

if (hrTask.get(current.table_sys_id) && 
    hrTask.hr_Task_type == 'upload_documents' && 
    hrTask.short_description == 'submit photo identification') {

    var fileName = current.file_name.toString();
    var fileSize = current.size_bytes.toString();
    var fileType = fileName.split('.').pop().toLowerCase();

    // Check file size (must not exceed 2MB)
    if (parseInt(fileSize) > 2000000) { // 2MB in bytes
        gs.addErrorMessage('Maximum file size is 2 MB');
        current.setAbortAction(true); // Abort if file size exceeds 2 MB
        return;
    }

    // Check file type (must be JPG or JPEG)
    if (fileType !== 'jpg' && fileType !== 'jpeg') {
        gs.addErrorMessage('File must be in JPG or JPEG format');
        current.setAbortAction(true); // Abort if not JPG or JPEG
        return;
    }
        }
