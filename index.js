//set everything up
const port = process.env.PORT || 80;
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const Client = require("mariasql");

var app = express();

//create a new server for socket, but combine it with express functions
const server = require("http").createServer(app);

//create a socket server with the new server
var io = require("socket.io")(server);

//use body parser
app.use(bodyParser.urlencoded({
    extended:true,
}));


//use sessions
app.use(session({
    secret:"my webstore", 
    resave:true,
    saveUninitialized:true
}));

app.use("/scripts", express.static("build"));
app.use("/imgs", express.static("images"));
app.use("/css", express.static("css"));



var pF = path.resolve(__dirname, "public");
var mM = path.resolve(__dirname, "admin");

//root folder
app.get("/", function(req, resp){
    resp.sendFile(pF+"/index.html");   
});

app.get("/products", function(req, resp){
    resp.sendFile(pF+"/products.html");   
});

app.get("/admin", function(req, resp){
    resp.sendFile(mM+"/login.html");   
});

app.get("/main", function(req, resp){
    if(req.session.userID != null){
        resp.sendFile(mM+"/main.html");
    }else{
        resp.sendFile(mM+"/login.html"); 
    }
       
});

app.get("/addProducts", function(req, resp){
    if(req.session.userID != null){
        resp.sendFile(mM+"/addProduct.html");
    }else{
        resp.sendFile(mM+"/login.html"); 
    }
       
});

app.get("/modifyProduct", function(req, resp){
    if(req.session.userID != null){
        resp.sendFile(mM+"/modifyProduct.html");
    }else{
        resp.sendFile(mM+"/login.html"); 
    }
       
});

app.get("/modifyType", function(req, resp){
    if(req.session.userID != null){
        resp.sendFile(mM+"/modifyType.html"); 
    }else{
        resp.sendFile(mM+"/login.html"); 
    }
      
});

app.get("/statistic", function(req, resp){
    if(req.session.userID != null){
        resp.sendFile(mM+"/statistic.html");
    }else{
        resp.sendFile(mM+"/login.html"); 
    }      
});

// --------------------------------communicating with database---------------------------
var DB = new Client({
    host: 'localhost',
    user: 'yomall_admin',
    password: 'yomall',
    db:'yomall'
});

// DB.query('SHOW Tables', function(err, rows) {
//     if (err)
//       throw err;
//     // console.dir(rows);
//     console.log(typeof (rows));
//   });
// var query = DB.query("SELECT * FROM auth_user WHERE id > 1");
// query.on('result', function(res) {
// // `res` is a streams2+ Readable object stream
// res.on('data', function(row) {
//     // console.dir(row);
//     // console.log(typeof (row));
// }).on('end', function() {
//     console.log('Result set finished');
// });
// }).on('end', function() {
// console.log('No more result sets!');
// }); 
// DB.end();


// -------------------------------------login-----------------------------------------
app.post("/login", function(req,resp){
    var password = req.body.password;
    var username = req.body.empId;
    DB.query('SELECT * FROM auth_user WHERE username = ? AND password = ?',
                [ username, password ], function(err, rows) {
        if (err)
            throw err;

        if(rows.length == 1 ){
            req.session.userID = rows[0].id;
            resp.send({
                status:"success",
            });

            console.log('user and password are correct!');
        }else{
            resp.send({
                status:"fail",
            });
        }
    });
    DB.end(); 
});

// -------------------------------------get all product-----------------------------------------
app.post("/checkAllProduct", function(req,resp){
    var password = req.body.password;
    var email = req.body.email;
    DB.query('SELECT id, name FROM product', function(err, rows) {
        if (err)
            throw err;

        if(rows.length > 0 ){
            resp.send({
                status:"success",
                products:rows
            });
        }else{
            resp.send({
                status:"noProduct",
            });
        }
    });
    DB.end(); 
    

});


// -------------------------------------add a product -----------------------------------------
app.post("/addProducts", function(req, resp){
    var name = req.body.name;
    var title = req.body.title;
    var origin_place = req.body.originPlace;
    var catagory = 1;
    var price = req.body.price;
    var origin_price = req.body.originPrice;
    var description = req.body.description;
    DB.query('insert into product(name, title, origin_place, price, origin_price, description ) values(?,?,?,?,?,?)', 
                                [ name, title, origin_place, price, origin_price, description ], function(err, rows) {
        if (err)
            throw err;

        console.log(rows);
    });
    DB.end();
       
});



app.post("/createitem", function(req,resp){
    var title = req.body.title;
    var desc = req.body.desc;
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            resp.end("FAIL");
        }
        
        client.query("INSERT INTO items(user_id, title, description) values ($1, $2, $3)", [req.session.user,title,desc], function(err, result){
            done();
            if(err){
                console.log("err occur")
            }else{
                resp.send({
                    status:"success",
                    user:req.session.user
                })
            }
        })
    })
    

});

app.post("/checkallitem", function(req,resp){
     pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            resp.end("FAIL");
        }
        
        client.query("select * from items", [], function(err, result){
            done();
            if(err){
                console.log("err occur")
            }else{
                resp.send({
                    arr:result.rows
                })
            }
        });
    })
});

app.post("/checkuseritem", function(req,resp){
     pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            resp.end("FAIL");
        }
        
        client.query("select * from items wherer user_id = $1", [req.session.user], function(err, result){
            done();
            if(err){
                console.log("err occur")
            }else{
                resp.send({
                    arr:result.rows
                })
            }
        });
    })
});




app.post("/u/logout", function(req,resp){
    req.session.destroy();
    resp.end("success");

});



//setup io
io.on("connection", function(socket){
    socket.on("message",function(msg){
        console.log("socket worked");
        socket.emit("response", msg+" is received");
    });
    
    socket.on("disconnect", function(){
        
    });
    
});

//listen to the port
server.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    
    console.log(port+" is running");
});