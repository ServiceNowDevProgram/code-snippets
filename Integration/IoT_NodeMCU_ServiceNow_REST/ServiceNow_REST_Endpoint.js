(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var body = JSON.parse(request.body.data);

    var rec = new GlideRecord('x_iot_device_data');
    rec.initialize();
    rec.device_id = body.device_id;
    rec.status = body.status;
    rec.temperature = body.temperature;
    rec.humidity = body.humidity;
    rec.timestamp = new GlideDateTime();
    rec.insert();

    return { message: 'Data inserted successfully' };
})(request, response);
