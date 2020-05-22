const {createProxyMiddleware}=require('http-proxy-middleware');
module.exports=function (app){
    app.use(
        ['/daily','/add'],
        createProxyMiddleware({
            target:'http://localhost:4000',
        })
    )
}