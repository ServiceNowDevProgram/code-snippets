module.exports.isTimeUp_ = (start) => {  
  const cutoff = 5*60*1000; // in miliseconds (5 minutes)
  const now = new Date();
  return cutoff < (now.getTime() - start.getTime()); 
}
