if (quicksearch_assigned != '')
    response.sendRedirect("sn_hr_ef_employee_document_list.do?sysparm_force_row_count=100&sysparm_view=hr_employee_files&sysparm_query=employee=" + quicksearch_assigned);

else if (quicksearch_doc != '')
    response.sendRedirect("sn_hr_ef_employee_document_list.do?sysparm_force_row_count=100&sysparm_view=hr_employee_files&sysparm_query=document_type=" + quicksearch_doc);
else if (quicksearch_case != '')
    response.sendRedirect("sn_hr_ef_employee_document_list.do?sysparm_force_row_count=100&sysparm_view=hr_employee_files&sysparm_query=hr_case=" + quicksearch_case);
else if (quicksearch_emp != '')
	response.sendRedirect("sn_hr_ef_employee_document_list.do?sysparm_query=employee.u_worker_id=" + quicksearch_emp + "^ORhr_profile.employee_number=" + quicksearch_emp);
