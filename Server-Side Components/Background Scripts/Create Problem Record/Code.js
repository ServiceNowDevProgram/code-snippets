var prb = new GlideRecord('problem');
prb.initialize();
prb.category = 'software';
prb.short_description = "creating problem record from background script";
prb.description = "creating problem record from background script";
prb.insert();
