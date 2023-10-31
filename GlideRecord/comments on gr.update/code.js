var now_GR = new GlideRecord('incident');
now_GR.get('99ebb4156fa831005be8883e6b3ee4b9');
now_GR.setValue('short_description', 'Update the short description');
now_GR.update("updated from BR" ); // This comment gets added to the activity log of incident for audit purposes.
