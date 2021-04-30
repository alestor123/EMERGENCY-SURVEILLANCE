module.exports = (res,req,loggerjs) => {
res.status(401).send('Auth Error')
loggerjs.error(':' + req.ip + ' Auth Error 401')
}