//The below code followed by "javascript:", inside 'Value' field for the List type Reviewers field's Style record will do the condition check.
var answer = false;
var arr=[];
arr = current.reviewers.split(',');
for(i=0; i<arr.length; i++){
  var gr = new GlideRecord('sys_user');
  gr.addQuery('sys_id',arr[i]);
  gr.query();
  if(gr.next()){
    if(gr.active == false){
      answer = true;
    }
  }
}
answer;

//The Style field then must be populated with the style we want to apply. I have applied "background-color: blue;" "text-decoration:line-through;"
background-color: blue;
text-decoration:line-through;
