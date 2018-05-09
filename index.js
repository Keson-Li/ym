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

app.get("/Jadmin", function(req, resp){
    resp.sendFile(mM+"/login.html");   
});


// --------------------------------communicating with database---------------------------
var DB = new Client({
    host: 'localhost',
    user: 'yomall_admin',
    password: 'yomall',
    db:'yomall'
});

DB.query('SHOW Tables', function(err, rows) {
    if (err)
      throw err;
    console.dir(rows);
  });
var query = DB.query("SELECT * FROM auth_user WHERE id > 1");
query.on('result', function(res) {
// `res` is a streams2+ Readable object stream
res.on('data', function(row) {
    console.dir(row);
}).on('end', function() {
    console.log('Result set finished');
});
}).on('end', function() {
console.log('No more result sets!');
}); 
DB.end();



app.post("/admin", function(req,resp){
    var password = req.body.password;
    var username = req.body.username;
    var email = req.body.email;
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            resp.end("FAIL");
        }
        
        client.query("INSERT INTO users(username, email, password) values ($1, $2, $3)", [username,email,password], function(err, result){
            done();
            if(err){
                console.log("err occur")
            }
            
        })
    })
    
    resp.send({
        status:"success",
    });
});


app.post("/login", function(req,resp){
    var password = req.body.password;
    var email = req.body.email;
    pg.connect(dbURL, function(err, client, done){
        if(err){
            console.log(err);
            resp.end("FAIL");
        }
        
        client.query("select * from users where password = $1 and email = $2", [password,email], function(err, result){
            done();
            if(err){
                console.log("err occur")
            }
            if(result.rows.length > 0){
                req.session.user = result.rows[0].id;
                req.session.email = result.rows[0].email;
                resp.send({
                    status:"success",
                });
            }else{
                resp.send({
                    status:"fail"
                });
            }
            
        })
    })
    

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