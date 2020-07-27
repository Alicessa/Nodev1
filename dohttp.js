//加载数据库的数据
// var template = require('art-template');

var fs = require('fs');
var formidable = require('formidable');
var superdb = require('./superdb');
var url = require('url');
var querystring = require('querystring');//这个模块是请求丶数据转换为字符串形式
// var db=require('./db');
const { data, Callbacks } = require('jquery');
// template.defaults.root = './';
//利用回调函数，获取db得到的数据
// db.getdata(function(newdata){
//     //使用模板引擎遍历解析数据
//     //讲解析好的数据导出
//     // console.log(newdata);
//     module.exports.data=template('./userlist.html',{data:newdata});
// })


//db
// db.select(function(newdata){
//   var htmlsj= template('./userlist.html',{data:newdata});
// })

//superdb
module.exports = {
    login_get(req,res){
        res.render('./userlogin.html', {})
    },
    login_post(req,res){
        var f = new formidable.IncomingForm();
        f.parse(req,(err,fields)=>{
            //将用户信息写入session
            //以供后面判断
          if(fields.username=='admin'&& fields.password=='sa'){
            req.session.se_da=fields;   
            //做页面跳转
            var back = "<script>alert('登录成功');window.location.href='/'</script>"
            res.setHeader('Content-type', 'text/html;charset=utf-8');
            res.end(back);
            return;
          }
        })
      
    },
    getall: function (req, res) {
        //判断是否登录
       if(!req.session.se_da) {
           //跳转
        var back = "<script>alert('请登录成功');window.location.href='/login'</script>"
        res.setHeader('Content-type', 'text/html;charset=utf-8');
        res.end(back);
        return;
       }
        superdb.select(function (newdata) {
            // var htmlsj = template('./userlist.html', { data: newdata });
            // res.end(htmlsj);
            res.render('./userlist.html', { data: newdata })
        });
    },
    usall: function (req, res) {
        var urlobj = url.parse(req.url, true);
        superdb.where('id=' + urlobj.query.id).select(function (data) {
            // var sdata = template('./userinfo.html', { data: data })
            // res.end(sdata);
            res.render('./userinfo.html', { data: data })
        })


    },
    usdelete: function (req, res) {
        var urlobj = url.parse(req.url, true);
        superdb.where('id=' + urlobj.query.id).delete(function (data) {
            if (data >= 1) {
                var back = "<script>alert('删除成功');window.location.href='/'</script>"
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                res.end(back);
            }
        });
    },
    updataget: function (req, res) {
        var urlobj = url.parse(req.url, true);
        superdb.where('id=' + urlobj.query.id).select(function (data) {
            // var html_data = template('./updata.html', { data: data })
            // res.end(html_data);
            res.render('./updata.html', { data: data })
        });


    },
    updatapost(req, res) {
         var urlobj = url.parse(req.url, true);
         //获取formidable用于文件上传及表单解析
        var form = new formidable.IncomingForm();
        //实现文件上传，获取表单数据并解析对象
        //通过回调函数的形式，将文件上传后的路径等信息及表单数据返回
        //fiels为表单内容
        form.parse(req, (err, fields, files) => {
            var file__path = '/img/' + files.img.name
            var readStream = fs.createReadStream(files.img.path);
            //将上传的文件移动到指定目录，并且重命名
            var writeStream = fs.createWriteStream("./public/img/" + files.img.name, (err) => {
                console.log(err);
            });
            readStream.pipe(writeStream);
            readStream.on('end', function () {
                fs.unlinkSync(files.img.path);
            })
            //将文件路径写入到对象中
            fields.img = file__path;
            //链接数据库，将组装好的数据库写入数据库里
            superdb.where('id=' + urlobj.query.id).updata(fields, (data) => {
                if (data >= 1) {
                    var back = "<script>alert('修改成功');window.location.href='/'</script>"
                    res.setHeader('Content-type', 'text/html;charset=utf-8');
                    res.end(back);
                }
            })



        });

    },
    addus_get(req, res) {
        res.render('./adduser.html', {})
    },
    addus_post(req, res) {
        var urlobj = url.parse(req.url, true);
        //获取formidable用于文件上传及表单解析
       var form = new formidable.IncomingForm();
       //实现文件上传，获取表单数据并解析对象
       //通过回调函数的形式，将文件上传后的路径等信息及表单数据返回
       //fiels为表单内容
       form.parse(req, (err, fields, files) => {
           var file__path = '/img/' + files.img.name
           var readStream = fs.createReadStream(files.img.path);
           //将上传的文件移动到指定目录，并且重命名
           var writeStream = fs.createWriteStream("./public/img/" + files.img.name, (err) => {
               console.log(err);
           });
           readStream.pipe(writeStream);
           readStream.on('end', function () {
               fs.unlinkSync(files.img.path);
           })
           //将文件路径写入到对象中
           fields.img = file__path;
           //链接数据库，将组装好的数据库写入数据库里
           superdb.insert(fields, (data) => {
               if (data >= 1) {
                   var back = "<script>alert('添加成功');window.location.href='/'</script>"
                   res.setHeader('Content-type', 'text/html;charset=utf-8');
                   res.end(back);
               }
           })



       });

   },

    // updatapost: function (req, res) {
    //     var data_post = '';
    //     //设置监听事件（数据传输事件tcp传输协议）
    //     req.on('data', function (chesql) {
    //         data_post += chesql;

    //     });
    //     //绑定结束传输完数据事件
    //     req.on('end', function () {
    //         var urlobj = url.parse(req.url, true);
    //         var data_obj = querystring.parse(data_post);//转义16进制的编码
    //            console.log(data_obj);
    //         superdb.where('id=' + urlobj.query.id).updata(data_obj, function (data) {

    //             //   res.end(data.toString());
    //             if (data >= 1) {
    //                 var back = "<script>alert('修改成功');window.location.href='/'</script>"
    //                 res.setHeader('Content-type', 'text/html;charset=utf-8');
    //                 res.end(back);
    //             }
    //         });

    //     })
    // }
}




//db
//导出getone方法
//获取单用户信息
// module.exports.getone = function (id, call) {
//     db.getone(id, function (data) {
//         // console.log(data);
//         //调用模板引擎遍历解析
//         call(template('./userinfo.html', { data: data }))

//     })
// }



