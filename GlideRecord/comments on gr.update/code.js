var now_GR = new GlideRecord('incident');
now_GR.get('99ebb4156fa831005be8883e6b3ee4b9');
now_GR.setValue('short_description', 'Update the short description');
now_GR.update();
gs.info(now_GR.getElement('short_description'));
