var express = require('express');
var dohttp = require('./dohttp');
var router = express.Router();
//使用链式操作

router
    // .get('/', (req, res) => {
    //     dohttp.getall(req, res);
    // })
    // .get('/usall', (req, res) => {
    //     dohttp.usall(req, res);
    // });

    //再次简写
    
    .get('/', dohttp.getall)//res,req参数一样
    .get('/usall', dohttp.usall)
    .get('/updata', dohttp.updataget)
    .post('/updata', dohttp.updatapost)
    .get('/delete', dohttp.usdelete)
    .get('/login',dohttp.login_get)
    .post('/userlogin',dohttp.login_post)
   
    .get('/addus',dohttp.addus_get)
    .post('/addus',dohttp.addus_post)
module.exports = router;

