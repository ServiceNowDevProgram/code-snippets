(function() {

    var img = new GlideRecord('db_image');
    img.addQuery('sys_id', options.image);
    img.query();
    if (img.next()) {
        data.image = img.getValue('name');
    }
    data.title = options.title || 'Card Title';
    data.link  = options.link  || '?id=sc_category';
    data.image = data.image || 'now-image-placeholder.jpg';

})();