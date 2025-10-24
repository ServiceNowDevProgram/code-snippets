var tablesList = ['customer_account','cmn_location','customer_contact','sn_install_base_sold_product','cmdb_model','sn_install_base_item','sn_install_base_m2m_contract_sold_product','sn_install_base_sold_product_related_party','business_unit','contract_rel_contact','cmdb_contract_product_model','cmdb_contract_model_lifecycle','cmn_department','cmdb_service_product_model','sn_install_base_m2m_installed_product','cmdb_ci_service_discovered','cmdb_ci','cmdb_rel_ci','cmdb_rel_team','cmdb_ci_service','service_offering','cab_agenda_item','cab_attendee','cab_meeting','kb_article_template','kb_article_template_definition','kb_category','kb_feedback','kb_feedback_task','kb_knowledge','kb_knowledge_base','kb_knowledge_summary','kb_template_m2m_knowledge_base','kb_uc_cannot_contribute_mtom','kb_uc_cannot_read_mtom','kb_uc_can_contribute_mtom','kb_uc_can_read_mtom','kb_use','kb_version','m2m_kb_feedback_likes','m2m_kb_task','ts_query_kb','u_kb_template_askim_article_template','u_kb_template_askit_article_template','u_kb_template_msc_known_error_databases_template','u_msc_known_error_data_migration','v_st_kb_category','v_st_kb_most_viewed','user_criteria','live_message','m2m_sp_portal_knowledge_base','sys_data_source','sys_import_set','sys_import_set_run','sysevent_register','sys_user_group_type','sys_user_group','core_company','sn_customerservice_contact_relationship','pc_product_cat_item','sc_cat_item_content','sc_cat_item_guide','sc_cat_item_producer','sc_cat_item_service','sc_cat_item_wizard','sc_category_list','sc_cat_item_list','kb_quality_checklist','dl_u_priority','sys_user_group','sys_group_has_role','sys_user','sys_user_role','sys_user_grmember','sys_user_group_type','sys_user_group','sys_group_has_role','sysapproval_group','sysapproval_approver','sc_cat_item_content','sc_cat_item_guide','sc_cat_item_producer','sc_cat_item_service','sc_cat_item_wizard','chg_model','sn_customerservice_catalog_item_per_change_category_per_offer','std_change_record_producer'];
gs.print('| Table | \t Records ');
tablesList.forEach(function(table){
	getTotalRecords(table);
});
//Print total count of table Records
function getTotalRecords(table){
	try { 
		var records = new GlideAggregate(table);
		records.addAggregate('COUNT');
		records.addEncodedQuery("sys_updated_on<=javascript:gs.dateGenerate('2024-09-30','23:59:59')")
		records.query();
	
		if (records.next()){
		  gs.print( '| ' +table + ' | \t ' + records.getAggregate('COUNT') + ' records');

		}
	  } catch (err) {
		  gs.print("We've got an error for table: " + table);
	  }
}
