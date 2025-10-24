function onChange(control, oldValue, newValue) {
    if (newValue == 'Yes') {
        spModal.open({
            title: "Reward Type",
            message: "Please select the category of Reward",
            buttons: [{
                    label: "Star Performer",
                    value: "Star Performer"
                },
                {
                    label: "Emerging Player",
                    value: "Emerging Player"
                },
                {
                    label: "High Five Award",
                    value: "High Five Award"
                },
                {
                    label: "Rising Star",
                    value: "Rising Star"
                }
            ]
        }).then(function(choice) {
            if (choice && choice.value) {
				g_form.addInfoMessage('Selected Reward: '+ choice.label);
                g_form.setValue('reward_selected', choice.value);
            }
        });
    } else {
        g_form.clearValue('reward_selected');
    }
}
