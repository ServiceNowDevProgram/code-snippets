(function() {
    if (input) {
			
        var arrfields = [];
        arrfields.push({
            "label_field": "Field A",
            "internal_name": "field_a"
        }, {
            "label_field": "Field B",
            "internal_name": "field_b"
        }, {
            "label_field": "Field C",
            "internal_name": "field_c"
        }, {
            "label_field": "Field D",
            "internal_name": "field_d"
        }, {
            "label_field": "Field E",
            "internal_name": "field_e"
        }, {
            "label_field": "Field F",
            "internal_name": "field_f"
        }, {
            "label_field": "Field G",
            "internal_name": "field_g"
        });

        data.arrfields = arrfields;
        var arr_fields = [];

        arr_fields = [];
			
        arr_fields.push({
            "label": "Field1",
            "name": "field_1"
        }, {
            "label": "Field2",
            "name": "field_2"
        }, {
            "label": "Field3",
            "name": "field_3"
        }, {
            "label": "Field4",
            "name": "field_4"
        }, {
            "label": "Field5",
            "name": "field_5"
        });

        var tasks = [];
        var arrs = [];
        var i;
        var h;
        arrs[0] = "todo";
			
        for (i = 0; i < arr_fields.length; i++) {
            tasks.push({
                "id": i,
                "name": arr_fields[i].name,
                "title": arr_fields[i].label,
                "state": arrs
            });
        }
			
        data.tasks = tasks;
    }
})();
