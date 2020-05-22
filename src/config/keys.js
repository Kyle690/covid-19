// PROD KEYS - production keys
if(process.env.NODE_ENV==='production'){
    // we are in productions return prod set of keys
    module.exports =require('./prod');
}else{
    // we are in development only return dev keys
    module.exports=require('./dev');
}