javascript:
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=300,height=300,left=100,top=100`;
let loginWin = window.open("http://" + window.location.hostname + "/login", "login", params);
setInterval(()=>{
  if(!loginWin.location.pathname.includes("login")){
    loginWin.close();
    window.location.reload();
  };},500);
