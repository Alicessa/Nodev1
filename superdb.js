var mysql = require('mysql');
const { data } = require('jquery');
//设置链接信息
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'alicezat'


});
con.connect();
module.exports={
    wh:undefined,
    where:function(wh){
        
        this.wh=wh;
        return this;
    },
  
    select:function(call){
   if(this.wh==undefined){
       var sql = 'select * from aliceuser';
      }
      else {
          var sql="select * from aliceuser where "+this.wh
      }
     
        con.query(sql, function (err,data) {//设置回调函数防止数据丢失
            //调用回调函数返回，将数据当做实参进行函数的回调
             call(data);
             //关闭链接
            
          
        })
        this.wh=undefined;
     
    },
    delete:function(cade){
        if(this.wh==undefined){
            console.log('请加where条件');
            return;
        }else{
            var sql="delete from aliceuser where "+this.wh;
            con.query(sql,function(err,datas){
          
                //返回收影响的行数
            //   caup(datas.changedRows);
             cade(datas.affectedRows);
            })

        }
        this.wh=undefined;
    },
    updata:function(data,caup){
        if(this.wh==undefined){
            console.log('请加where条件');
            return;
        }else{
             var set='';
        for(i in data){
        set+= i+"='"+ data[i]+"',";
        }
       //截取末尾的，防止sql语句错误
     var set= set.slice(0,set.length-1);
        var sql=" update aliceuser set  "+set + 'where '+this.wh;

        
        con.query(sql,function(err,datas){
           
            //返回收影响的行数
        //   caup(datas.changedRows);
           caup(datas.changedRows);
        })
        }
         this.wh=undefined;
    },
    insert:function(data,caup){
        var values='';
        for(i in data){
        // values+=data[i]+","  ;
           values+="'"+data[i]+"'"+","  ;
        
        }
        var values= values.slice(0,values.length-1);
            var sql="insert into aliceuser (username,password,em,img) values "+'('+ values+')';
           
            con.query(sql,function(err,datas){
           
                //返回收影响的行数
            //   caup(datas.changedRows);
          caup(datas.affectedRows);
            })

        
     
    }
  
}