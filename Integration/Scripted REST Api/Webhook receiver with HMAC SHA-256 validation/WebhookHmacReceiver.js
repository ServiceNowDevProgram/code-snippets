// Scripted REST API Resource Script: Webhook receiver with HMAC validation
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
  var SHARED_SECRET = gs.getProperty('x_acme.webhook.secret', '');
  var TARGET_TABLE = 'x_acme_inbound_webhook'; // replace with your table

  try {
    var body = request.body && request.body.data ? request.body.data : '';
    var signature = request.getHeader('X-Signature') || ''; // hex HMAC hash

    if (!SHARED_SECRET) {
      response.setStatus(500);
      response.setBody({ error: 'Server not configured' });
      return;
    }
    if (!signature || !body) {
      response.setStatus(400);
      response.setBody({ error: 'Missing signature or body' });
      return;
    }

    var util = new HmacUtils();
    var expected = util.hmacSha256Hex(SHARED_SECRET, body);

    if (!util.constantTimeEquals(expected, signature)) {
      response.setStatus(401);
      response.setBody({ error: 'Invalid signature' });
      return;
    }

    // Valid payload: insert a record for processing
    var rec = new GlideRecord(TARGET_TABLE);
    rec.initialize();
    rec.payload = body;
    rec.signature = signature;
    rec.insert();

    response.setStatus(200);
    response.setBody({ ok: true });
  } catch (e) {
    response.setStatus(500);
    response.setBody({ error: String(e) });
  }
})(request, response);
