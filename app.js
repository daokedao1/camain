
const { app, pool, Result } =require('./connect')
var http = require('http');
var request = require('request');
app.post('/login', (req, res) => {
    let opt = {
           url: "http://119.90.248.34:51029/login",
           method: "POST",
           json: true,
           headers:req.headers,
           body: req.body,
           json:true,
    }
     request(opt, function(error, response, body) {
              console.log(response.statusCode,body) // 请求成功的处理逻辑
          if (!error && response.statusCode == 200) {
              console.log('-----') // 请求成功的处理逻辑
              res.json(body)
          }
      });

})
app.post('/wTimeData/**', (req, res) => {
    let opt = {
           url: "http://119.90.248.34:51029"+req.originalUrl,
           method: "POST",
           json: true,
           headers:req.headers,
           body: req.body,
           json:true,
    }
     request(opt, function(error, response, body) {
              console.log(response.statusCode,body) // 请求成功的处理逻辑
          if (!error && response.statusCode == 200) {
              console.log('-----') // 请求成功的处理逻辑
              res.json(body)
          }
      });

})
app.post('/wHistoryData/**', (req, res) => {
    let opt = {
           url: "http://119.90.248.34:51029"+req.originalUrl,
           method: "POST",
           json: true,
           headers:req.headers,
           body: req.body,
           json:true,
    }
     request(opt, function(error, response, body) {
              console.log(response.statusCode,body) // 请求成功的处理逻辑
          if (!error && response.statusCode == 200) {
              console.log('-----') // 请求成功的处理逻辑
              res.json(body)
          }
      });

})
app.post('/wInfo/**', (req, res) => {
    let opt = {
           url: "http://119.90.248.34:51029"+req.originalUrl,
           method: "POST",
           json: true,
           headers:req.headers,
           body: req.body,
           json:true,
    }
     request(opt, function(error, response, body) {
              console.log(response.statusCode,body) // 请求成功的处理逻辑
          if (!error && response.statusCode == 200) {
              console.log('-----') // 请求成功的处理逻辑
              res.json(body)
          }
      });

})
//alarmsetting
app.get('/api/alarmsetting/list', (req, res) => {
      console.log(req.query);
  pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM setting", (e, r) => {
            if(!e){
                res.json(new Result({ data: r }))
            }else{
              res.json(new Result({ code:'-1',msg:e,data: r }))
            }

        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })

})
app.get('/api/alarmsetting/add', (req, res) => {
    if(!e){
        res.json(new Result({ data: r }))
    }else{
      res.json(new Result({ code:'-1',msg:e,data: r }))
    }
})
app.get('/api/alarmsetting/update', (req, res) => {
    console.log(req.query);

        let sql = buildUpdataSql('setting',req.query,{id:1})
        console.log(sql)
        pool.getConnection((err, conn) => {
              conn.query(sql, (e, r) => {
                  if(!e){
                      res.json(new Result({ data: r }))
                  }else{
                    res.json(new Result({ code:'-1',msg:e,data: r }))
                  }

              })
              pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
          })

})
app.post('/api/alarmsetting/update', (req, res) => {
    console.log(req);
        let config = req.body.config;
        config = JSON.stringify(config)
        let sql = "UPDATE setting SET config='"+config+"' where nodeid =1"
        console.log(sql)
        pool.getConnection((err, conn) => {
              conn.query(sql, (e, r) => {
                  if(!e){
                      res.json(new Result({ data: r }))
                  }else{
                    res.json(new Result({ code:'-1',msg:e,data: r }))
                  }

              })
              pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
          })

})
//alarmlog
app.get('/api/alarmlog/list', (req, res) => {
        console.log(req.query);
  pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM alarmlog", (e, r) => {
            if(!e){
                res.json(new Result({ data: r }))
            }else{
              res.json(new Result({ code:'-1',msg:e,data: r }))
            }

        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })

})
app.get('/api/alarmlog/add', (req, res) => {
    console.log(req.query);
    let {nodeid,nodename,name,key,curvalue,bzvalue,date} = req.query;
    let param = [nodeid,nodename,name,key,curvalue,bzvalue,date];
    console.log(param)
    let sql = 'INSERT INTO `leanproduction`.`alarmlog`( `nodeid`, `nodename`, `name`, `key`, `curvalue`, `bzvalue`, `date`) VALUES (?,?,?,?,?,?,? );'
    pool.getConnection((err, conn) => {
          conn.query(sql,param, (e, r) => {
              if(!e){
                  res.json(new Result({ data: r }))
              }else{
                res.json(new Result({ code:'-1',msg:e,data: r }))
              }

          })
          pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
      })
})
app.get('/api/alarmlog/updatebynid', (req, res) => {
    console.log(req.query);

    let sql = buildUpdataSql('alarmlog',req.query,{nodeid:req.query.nodeid})
    pool.getConnection((err, conn) => {
          conn.query(sql, (e, r) => {
              if(!e){
                  res.json(new Result({ data: r }))
              }else{
                res.json(new Result({ code:'-1',msg:e,data: r }))
              }

          })
          pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
      })
    res.json(new Result({ data: req.query }))
})
app.get('/', (req, res) => {
    res.redirect('/public');
})
let buildUpdataSql = (table,param,fiter)=>{
    let str = 'UPDATE '+table+' SET ';
    let arr = []
    Object.keys(param).forEach((v,i)=>{
      if(v != Object.keys(fiter)[0]){
        arr.push(v+'='+param[v]+' ')
      }

    })
    str+= arr.join(',')
    str += 'where nodeid ='+fiter[Object.keys(fiter)[0]];
    return str;
}
app.listen(8088,()=>{
    console.log("servering");
});
