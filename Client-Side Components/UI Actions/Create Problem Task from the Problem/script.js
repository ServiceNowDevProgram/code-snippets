//UI Action - Create a Problem task from a Problem. Problem Task Type is General

var gr = new GlideRecord('problem_task');
gr.initialize();
gr.short_description = "Problem Task Created for problem " + current.number;
gr.description = current.short_description;
gr.problem = current.sys_id;
gr.problem_task_type = 'general';
gr.insert();
