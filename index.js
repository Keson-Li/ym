//set everything up
const port = process.env.PORT || 8080;
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
app.use("/script", express.static("scripts"));
app.use("/imgs", express.static("images"));
app.use("/css", express.static("css"));



var pF = path.resolve(__dirname, "public");
var mM = path.resolve(__dirname, "admin");

//root folder

app.get("/products", function(req, resp){
    resp.sendFile(pF+"/products.html");   
});

app.get("/sales",function(req,resp){
    resp.sendFile(pF+"/sales.html")
})

app.get("/productDetails", function(req, resp){
    resp.sendFile(pF+"/productDetail.html");   
});

app.get("/shopingCart", function(req, resp){
    resp.sendFile(pF+"/shopingCart.html");   
});

app.get("/header",function(req,resp){
    resp.sendFile(pF+"/header.html");
})
app.get("/menu",function(req,resp){
    resp.sendFile(pF+"/menu.html");
})

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
    req.session.userID = 'test';
    resp.send({status:"success",});
    // DB.query('SELECT * FROM auth_user WHERE username = ? AND password = ?',
    //             [ username, password ], function(err, rows) {
    //     if (err)
    //         throw err;

    //     if(rows.length == 1 ){
    //         req.session.userID = rows[0].id;
    //         resp.send({
    //             status:"success",
    //         });

    //         console.log('user and password are correct!');
    //     }else{
    //         resp.send({
    //             status:"fail",
    //         });
    //     }
    // });
    // DB.end(); 
});

// -------------------------------------get all product-----------------------------------------
app.get("/checkAllProduct", function(req,resp){
    DB.query('SELECT id, name   FROM product', function(err, rows) {
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

// -------------------------------------get all product with catagory-----------------------------------------
app.get("/checkProductsWithCatagory", function(req,resp){
    DB.query('SELECT p.id, p.name as name, c.name as cata  FROM product p join catagory c on p.catagory_id = c.id', function(err, rows) {
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


// -------------------------------------get all catagories-----------------------------------------
app.get("/checkAllCatagories", function(req,resp){
    DB.query('SELECT id, name FROM catagory', function(err, rows) {
        if (err)
            throw err;

        if(rows.length > 0 ){
            resp.send({
                status:"success",
                catagories:rows
            });
        }else{
            resp.send({
                status:"noCatagory",
            });
        }
    });
    DB.end(); 
    

});

app.post("/checkAllCatagories", function(req,resp){
    DB.query('SELECT id, name FROM catagory', function(err, rows) {
        if (err)
            throw err;
        if(rows.length > 0 ){
            resp.send({
                status:"success",
                catagories:rows
            });
        }else{
            resp.send({
                status:"noCatagory",
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
    var catagoryName = req.body.allCatagory;
    // var catagory_id;
    var price = req.body.price;
    var origin_price = req.body.originPrice;
    var description = req.body.description;
    DB.query('select id from catagory where name = ?', 
                                [ catagoryName], function(err, rows) {
        if (err)
            throw err;
        console.log(rows);
        if(rows.length >0){
            var catagory_id = parseInt(rows[0].id);
            DB.query('insert into product(name, title, origin_place, price, origin_price, description, catagory_id ) values(?,?,?,?,?,?,?)', 
                                        [ name, title, origin_place, price, origin_price, description, catagory_id ], function(err, rows) {
                if (err)
                    throw err;
                console.log(rows);

                if (rows.info.affectedRows == 1){
                    resp.send({
                        status:'success'
                    })
                }else{
                    resp.send({
                        status:'failed'
                    })

                }
            });

        }

    });
    DB.end();
});

// -------------------------------------add a catagory -----------------------------------------
app.post("/addCatagory", function(req, resp){
    var name = req.body.name;
    console.log(name);
    DB.query('insert into catagory(name) values(?)', 
                                [ name], function(err, rows) {
        if (err)
            throw err;
        console.log(rows);

        if (rows.info.affectedRows == 1){
            resp.send({
                status:'success'
            })
        }else{
            resp.send({
                status:'failed'
            })

        }
    });
    DB.end();
       
});

// -------------------------------------set a catagory -----------------------------------------
app.post("/setCatagory", function(req, resp){
    var productID = req.body.productID;
    var cataID = req.body.cataID;
    DB.query('UPDATE product SET catagory_id = ? WHERE id = ?', 
                                [ cataID, productID ], function(err, rows) {
        if (err)
            throw err;
        console.log(rows);

        if (rows.info.affectedRows == 1){
            resp.send({
                status:'success'
            })
        }else{
            resp.send({
                status:'failed'
            })

        }
    });
    DB.end();
       
});

// -------------------------------------delete a catagory -----------------------------------------
app.post("/deleteACatagories", function(req, resp){
    var catagory_id = parseInt(req.body.catagoryID, 10);
    console.log(typeof(catagory_id));
    console.log(catagory_id);
    if(req.body.purpose == 'delete'){
        DB.query('delete from catagory where id = ?', 
                                [ catagory_id], function(err, rows) {
        if (err){
            if(err.code == 1451){
                resp.send({
                    status:'failed',
                    reason: 'foreign key failed',
                })
            }
        }else{
            if (rows.info.affectedRows == 1){
                resp.send({
                    status:'success'
                })
            }else{
                resp.send({
                    status:'failed',
                    reason: 'unknown',
                })
    
            }
        }

        
    });
    DB.end();

    }
    
       
});

// -------------------------------------modify a catagory -----------------------------------------
app.post("/modifyACatagories", function(req, resp){
    var name = req.body.name;
    var catagory_id = parseInt(req.body.catagoryID, 10);
    DB.query('update catagory set name = ? where id = ?', 
                                [ name, catagory_id], function(err, rows) {
        if (err)
            throw err;
        console.log(rows);

        if (rows.info.affectedRows == 1){
            resp.send({
                status:'success'
            })
        }else{
            resp.send({
                status:'failed'
            })

        }
    });
    DB.end();
       
});

// -------------------------------------get all catagories-----------------------------------------
app.post("/checkProductPromoto", function(req,resp){
    var productID = req.body.productID;
    console.log(productID);
    DB.query('SELECT name,is_popular, is_newMan, is_newUpdated, is_promoting, is_heat, is_event_sale FROM product where id = ?',[productID], function(err, rows) {
        if (err)
            throw err;

        if(rows.length > 0 ){
            resp.send({
                status:"success",
                promoteTypes:rows
            });
        }else{
            resp.send({
                status:"noproduct",
            });
        }
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

// -------------------------------------load product -----------------------------------------

app.post("/products",function(req,resp){
    console.log(req.body)
    DB.query("SELECT * FROM product WHERE catagory_id = ? and is_active = 1",[req.body.cata],function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result)
        if (result != undefined && result.length >0){
            console.log(result)
            resp.send({
                status:"success",
                product:result
            })
        }
    })
})
// -------------------------------------load sales product -----------------------------------------
app.post("/sales",function(req,resp){

    var saleType=req.body.type;
    if(saleType == "self"){
        DB.query("SELECT * FROM product WHERE is_own = 1 and is_active = 1",function(err,result){
            if(err){
                console.log(err)
            }
            console.log(result)
            if(result != undefined && result.length >0){
                resp.send({
                    status:"succes",
                    product:result
                })
            }
        })
    }
    if(saleType == "heat"){
        DB.query("SELECT * FROM product WHERE is_heat = 1 and is_active = 1",function(err,result){
            if(err){
                console.log(err)
            }
            console.log(result)
            if(result != undefined && result.length >0){
                resp.send({
                    status:"succes",
                    product:result
                })
            }
        })
    }
    if(saleType == "promoting"){
        DB.query("SELECT * FROM product WHERE is_promoting =1 and is_active = 1",function(err,result){
            if(err){
                console.log(err)
            }
            if(result != undefined && result.length >0){
                resp.send({
                    status:"succes",
                    product:result
                })
            }
        })
    }
    if(saleType == "eventSale"){
        DB.query("SELECT * FROM product WHERE is_event_sale =1 and is_active = 1",function(err,result){
            if(err){
                console.log(err)
            }
            if(result != undefined && result.length >0){
                resp.send({
                    status:"succes",
                    product:result
                })
            }
        })
    }
    DB.query("SELECT * FROM product WHERE catagory_id = ? and is_active = 1",[req.body.cata],function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result)
        if (result != undefined && result.length >0){
            console.log(result)
            resp.send({
                status:"succes",
                product:result
            })
        }
    })
})
// -------------------------------------load product details -----------------------------------------
app.post("/productDetail",function(req,resp){
    console.log(resp);
    DB.query("SELECT * FROM product WHERE id = ?",[req.body.id],function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result)
        if(result != undefined && result.length>0){
            resp.send({
                status:"success",
                product:result
            })
        }
    })
})

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