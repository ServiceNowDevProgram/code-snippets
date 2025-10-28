Instead of duplicating attachment by use of GlideSysAttachment.copy() simplest approach is to create a relationship from System Definition >> Relationship & then display it as a Related list on required set of Tables were attachments are to be shown.

So, for a case where attachments from REQ (sc_request) are to be on RITM (sc_req_item) table then a relationship as below would suffice.
