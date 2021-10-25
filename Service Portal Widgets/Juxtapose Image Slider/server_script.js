(function() {
	options.title = options.title || 'Image Slider';
	options.position = options.position || '50';
	options.after_image_label = options.after_image_label || '';
	options.after_image_credit = options.after_image_credit || '';
	options.before_image_label = options.before_image_label || '';
	options.before_image_credit = options.before_image_credit || '';

	if(JSUtil.nil(options.image_one)){
		data.image_one = "http://online.wsj.com/media/LIONDOOR_2A.jpg";
	}else{
		var grDbImage = new GlideRecord('db_image');
		if (grDbImage.get(options.image_one)) {
			data.image_one = grDbImage.getValue('name');
		}
	}

	if(JSUtil.nil(options.image_two)){
		data.image_two = "http://online.wsj.com/media/LIONDOORA.jpg";
	}else{
		var grDbImage2 = new GlideRecord('db_image');
		if (grDbImage2.get(options.image_two)) {
			data.image_two = grDbImage2.getValue('name');
		}
	}
})();