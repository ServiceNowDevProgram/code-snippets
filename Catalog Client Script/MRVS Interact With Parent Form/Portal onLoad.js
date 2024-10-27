//Using this Catalog Client Script that Applies to the Catalog Item will enable g_form methods like setValue and clearValue which affect Catalog Item variables from a Catalog Client Script that applies to the multi-row variable set
function onLoad() {
	if (this) {//we only need to do this for Service Portal
		//We need to make the g_form object for the parent item available from the MRVS window
		this.cat_g_form = g_form;
	}
}
