var mysql = require('mysql');
const { data } = require('jquery');
//设置链接信息
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'alicezat'


});
//打开链接
 con.connect();
// //发送sql语句
// var sql = 'select * from aliceuser ';
// con.query(sql, function (err, res, filed) {
//     //回调获取sql返回的数据
//     // console.log(err);
//     // console.log('--------')
//     // console.log(res);
//     // console.log('--------')
//     // console.log(filed);
//     module.exports.data=data;
//    //结束链接 
// con.end();//放里面防止回调函数丢失data
// })
///////////////////////////////////////////////////////
////////////////////////////////////////////////////////
   

///解决方案二
//将整个方法导出

module.exports.getdata=function(callback){
    var sql = 'select * from aliceuser ';
con.query(sql, function (err,data) {//设置回调函数防止数据丢失
  //调用回调函数返回，将数据当做实参进行函数的回调
   callback(data);
   //关闭链接

})
}
module.exports.getone=function(id,calls){
    var sql='select * from aliceuser where id='+id;
    con.query(sql, function (err,data) {//设置回调函数防止数据丢失
        //调用回调函数返回，将数据当做实参进行函数的回调
         calls(data);
         //关闭链接
      
    })

}
