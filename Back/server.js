//------------------ MODULES -------------------//
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const corsEnable = require("cors");
const cookieParser = require("cookie-parser");
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

const Facebook = require("./lib/OauthFacebook");
const facebook = new Facebook();
const JWT = require("./lib/JWT.js");
const Google = require("./lib/OauthGoogle");
const getPreferences = require("./lib/getAnyPreference.js")

const {validateCredentials, validateEmail, validatePsw} = require("./lib/validator.js");


const server = express();
const listeningPort = 8888;

//------------------ MIDDLEWARES -------------------//
//Setup the public (Frontend) folder
const publicFiles = express.static("public");
server.use(publicFiles);
//Setup body parser for json use
server.use(bodyParser.urlencoded({"extended" : false}));
server.use(bodyParser.json());
server.use(corsEnable({origin : `${process.env.FRONT_URL}`, credentials : true}));
server.use(cookieParser());
// server.use(VerifySession);

//Setting public directories
server.use(express.static("./../public"));

function connectionDB() {
    return mysql.createConnection({
        "host": "localhost",
        "user": "root",
        "password": "root",
        "database": "crewProj",
        "multipleStatements" : true
    });
}

function PromiseConnectionDB(){
    return new Promise((resolve, reject) => {
        const DBconnection = connectionDB();
        if (DBconnection){
            DBconnection.connect(err => {
                if (err) {
                    reject("DBError");
                }
                resolve(DBconnection);
            });
        }
        else
            reject("DBError");
    });
        
}

// Funciones middleware
// function VerifySession(req, res, next){
//     let endpoints = ["/signup", "/login", "facebook-redirect", "/facebook-login", "/google-redirect", "/google-login", "/logout", /info-user-form"];

//     //indexOf nos devuelve la posicion en el array de lo que estamos buscando en este caso
//     // console.log(req.path)
//     if(endpoints.indexOf(req.path.toLowerCase()) > -1 || (req.cookies.JWT && JWT.verifyJWT(req.cookies.JWT))){
//         next()
//     } else {
//         res.clearCookie("JWT")
//         // res.redirect("/")
//         res.status(403).send({"res" : "0" , "msg" : "No active session"});
//     }

// }

//------------ENDPOINTS--------------------//

//-------------------------GET---------------------//
server.get("/logout", (req, res) =>{
    res.clearCookie(JWT);
    res.redirect("http://localhost:3000");
});

server.get("/get-allergies-user", (req, res) => {
    if (req.cookies.JWT){

        const {usrid} = JWT.getJWTInfo(req.cookies.JWT);
        if(usrid){
            getPreferences.getAllergensUser(usrid)
            .then(result => res.send({"res" : "1", "result" : result}))
            .catch(e => res.send({"res": "0", "msg": e}));
        } else {
            res.send({"res" : "0", "msg" : "No usrid in JWT"})
        }

    } else {
        res.send({"res" : "0", "msg" : "No JWT"})
    }
});

server.get("/get-intolerances-user", (req, res) => {
    if (req.cookies.JWT){

        const {usrid} = JWT.getJWTInfo(req.cookies.JWT);
        if(usrid){
            getPreferences.getIntolerancesUser(usrid)
            .then(result => res.send({"res" : "1", "result" : result}))
            .catch(e => res.send({"res": "0", "msg": e}));
        } else {
            res.send({"res" : "0", "msg" : "No usrid in JWT"})
        }

    } else {
        res.send({"res" : "0", "msg" : "No JWT"})
    }
});

server.get("/get-supermarkets-user", (req, res) => {
    if (req.cookies.JWT){

        const {usrid} = JWT.getJWTInfo(req.cookies.JWT);
        if(usrid){
            getPreferences.getSuperMarketUser(usrid)
            .then(result => res.send({"res" : "1", "result" : result}))
            .catch(e => {res.send({"res": "0", "msg": e})});
        } else {
            res.send({"res" : "0", "msg" : "No usrid in JWT"})
        }

    } else {
        res.send({"res" : "0", "msg" : "No JWT"})
    }
});

server.get("/get-foodpreferences-user", (req, res) => {
    if (req.cookies.JWT){

        const {usrid} = JWT.getJWTInfo(req.cookies.JWT);
        if(usrid){
            getPreferences.getFoodPrefUser(usrid)
            .then(result => res.send({"res" : "1", "result" : result}))
            .catch(e => res.send({"res": "0", "msg": e}));
        } else {
            res.send({"res" : "0", "msg" : "No usrid in JWT"})
        }

    } else {
        res.send({"res" : "0", "msg" : "No JWT"})
    }
});

server.get("/get-preferences-list/:option", (req, res) => {
    //REST PARAMS -> req.params;
    //QUERRY PARAMS -> req.query;
    const {option} = req.params;
    if(option === "allergens"){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = "SELECT idAllergen id, nameAllergen name FROM Allergens";
            DBconnection.query(sql, (err, result) => {
                if(err)
                    throw err
                else {
                    res.send({"res" : "1" , result})
                }
            })

        })
    }

    else if(option === "intolerances"){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = "SELECT idIntolerance id, nameIntolerance name FROM Intolerances";
            DBconnection.query(sql, (err, result) => {
                if(err)
                    throw err
                else {
                    res.send({"res" : "1" , result})
                }
            })

        })
    }
    else if(option === "supermarkets"){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = "SELECT idSMarket id, nameSuperMarket name FROM SuperMarkets";
            DBconnection.query(sql, (err, result) => {
                if(err)
                    throw err
                else {
                    res.send({"res" : "1" , result})
                }
            })

        })
    }
    else if(option === "foodpreferences"){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = "SELECT idFoodPref id, nameFoodPref name FROM FoodPreferences";
            DBconnection.query(sql, (err, result) => {
                if(err)
                    throw err
                else {
                    res.send({"res" : "1" , result})
                }
            })

        })
    }
    else {
        res.send({"res": "0"})
    }

});

server.get("/facebook-redirect", (req,res) =>{

    res.redirect(facebook.getRedirectUrl());
});

server.get("/facebook-login", async (req, res) => {

    const Token = await (facebook.getOauthToken(req.query.code, req.query.state));
    const data = await facebook.getUserInfo(Token, ["name", "email"])
    
    const {id, name, email} = data;

    console.log(data);

    if(id && name && email){

        let Validated = validateEmail(email);

        if(Validated){
            PromiseConnectionDB()
            .then((DBconnection) => {
                const sql = "SELECT * FROM users U INNER JOIN UsersFacebook UF ON UF.ext_usrid = U.usrid WHERE email = ? OR idFacebook = ?"; //Select siempre devuelve un array, y cuidado con el like, si hay un correo que lo contiene te entran
                DBconnection.query(sql, [email, id], (err, result) => {

                    if (err){
                        res.redirect(`${process.env.FRONT_URL}/error/-2`)
                    } else if (result.length){

                            //Generate JWT
                            const Payload = {
                                "usrid" : result[0].usrid,
                                "name" : result[0].name,
                                "email" : result[0].email,
                                "iat" : new Date()
                            };

                            //COMPLETAR con resto de datos pedidos

                            const jwt = JWT.generateJWT(Payload);
                            const jwtVerified = JWT.verifyJWT(jwt);

                            if(jwtVerified){

                                //Access as administrator
                            res.cookie("JWT", jwt, {"httpOnly" : true})
                            res.redirect(`${process.env.FRONT_URL}/login-successful`)

                            } else {
                                res.redirect(`${process.env.FRONT_URL}/error/-1`)
                            }
                            
                    } else {

                        const Payload = {
                            "usrid" : id,
                            "name" : name,
                            "email" : email,
                            "provider" : "facebook"
                        };

                        const jwt = JWT.generateJWT(Payload);

                        res.cookie("Oauth", jwt, {"httpOnly" : true});
                        // res.send({"res" : "2", "msg" : "User facebook to fill form", data});
                        res.redirect(`${process.env.FRONT_URL}/external-register-successful`);
                    }
                    DBconnection.end();
                });
            })
            .catch(() => res.redirect(`${process.env.FRONT_URL}/error/-3`))
            
        } else {
            res.redirect(`${process.env.FRONT_URL}/error/-4`)
        }
    } else {
        res.redirect(`${process.env.FRONT_URL}/error/-5`)
    }
});

server.get("/google-redirect", (req, res) => {
	res.redirect(Google.getGoogleAuthURL());
});

server.get("/google-login", async (req, res) => {

    const {code} = req.query;
    
	if (code) {
        const userData = await Google.getGoogleUser(code);

        if(userData){
            // res.send(userData);
            const {id, email, name} = userData;
            const Validated = validateEmail(email);

            if(Validated || (email === "admin" && psw === "admin")){
                PromiseConnectionDB()
                .then((DBconnection) => {
                    //Select siempre devuelve un array, y cuidado con el like, si hay un correo que lo contiene te entran
                    const sql = "SELECT * FROM users U INNER JOIN UsersGoogle UG ON UG.ext_usrid = U.usrid WHERE email = ? OR idGoogle = ?";
                    DBconnection.query(sql, [email,id], (err, result) => {

                        if (err){
                            // res.send({"res" : "-2", "msg" : err})
                            res.redirect(`${process.env.FRONT_URL}/error/-2`)
                            //poner en todos los que se haga la peticion desde el navegador y no desde un fetch
                        } else if (result.length){

                            //Generate JWT
                            const Payload = {
                                "usrid" : result[0].usrid,
                                "name" : result[0].name,
                                "email" : result[0].email,
                                "iat" : new Date()
                            };

                            const jwt = JWT.generateJWT(Payload);
                            const jwtVerified = JWT.verifyJWT(jwt);

                            if(jwtVerified){

                                //Access as administrator
                                res.cookie("JWT", jwt, {"httpOnly" : true})
                                // res.send({"res" : "1", "msg" : `${result[0].name} has been found in DB and logged in with google`});
                                res.redirect(`${process.env.FRONT_URL}/login-successful`)

                            } else {
                                // res.send({"res" : "-1", "msg" : "JWT not verified"})
                                res.redirect(`${process.env.FRONT_URL}/error/-1`)
                            }
                                
                        } else {

                            // res.send({"res" : "2", "msg" : "User Google to fill form", userData})

                            const Payload = {
                                "usrid" : id,
                                "name" : name,
                                "email" : email,
                                "provider" : "google"
                            };

                            const jwt = JWT.generateJWT(Payload);

                            res.cookie("Oauth", jwt, {"httpOnly" : true})
                            res.redirect(`${process.env.FRONT_URL}/external-register-successful`)

                        }
                        DBconnection.end();
                    });
                })
                // .catch(err => res.send({"res" : "-3", "msg" : err}))
                .catch(() => res.redirect(`${process.env.FRONT_URL}/error/-3`))
            }

        } else {
            // res.send({"res" : "-4", "msg" : "No userData"});
            res.redirect(`${process.env.FRONT_URL}/error/-4`)
        }

	} else {
        // res.send({"res" : "-5", "msg" : "No code"})
        res.redirect(`${process.env.FRONT_URL}/error/-5`)
    }
});

server.get("/get-oauth-user-data", (req, res) => {

    res.clearCookie("Oauth")

    if(JWT.verifyJWT(req.cookies.Oauth)){

        res.send(JWT.getJWTInfo(req.cookies.Oauth));
        //a front llega o datos de usuario o null
    } else {
        res.send({"error" : true});
    }


});

server.get("/get-personal-shopping-list", (req, res) => {

    const { usrid } = JWT.getJWTInfo(req.cookies.JWT)

    if(usrid){
        PromiseConnectionDB()
        .then((DBconnection) => {

            const sql = `SELECT PSL.*, COUNT(PSLP.ref_productId) AS totalProducts
                            FROM PersonalShoppingList AS PSL
                                JOIN PShopListUsers AS PSLU
                                    ON PSLU.ref_listId = PSL.listId
                                LEFT JOIN PShopListProduct AS PSLP
                                    ON PSLP.ext_listId = PSL.listId 
                            WHERE PSLU.ext_usrid = ?
                            GROUP BY PSL.listId;`;
            DBconnection.query(sql, [usrid], (err, result) => {
                if(err)
                    throw err
                else {
                    res.send({"res" : "1", "result" : result})
                }
                DBconnection.end()
            })

        })
        .catch(err => console.error(err))

    } else {
        res.send({"res" : "0", "msg" : "No usrid"})
    }
});

server.get("/get-products-from-personal-shopping-list", (req, res) => {

    const {listId} = req.query;
    if(listId){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = `SELECT PSLP.* FROM PShopListProduct AS PSLP
                                LEFT JOIN PersonalShoppingList AS PSL
                                    ON PSL.listId = PSLP.ext_listId
                                WHERE PSLP.ext_listId = ?;`;
            DBconnection.query(sql, [listId], (err, result) => {
                if(err)
                    throw err
                else if(result.length) {
                    res.send({"res" : "1", result})
                } else {
                    res.send({"res" : "2", "msg" : "No products in this list", result})
                }
                DBconnection.end()
            });
        });
    } else {
        res.send({"res" : "-2", "msg" : "No listId"})
    }
});

server.get("/search-barcode-from-code-reader", (req, res) => {
    
    const {barcode} = req.query;
    if(barcode){
        fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        .then(res => res.json())
        .then(product => {
            if(product){
                res.send({"res" : "1", product})
            } else {
                res.send({"res" : "0", "msg" : "No data of this product"})
            }
        })
        .catch(err => res.send({"res" : "-1", "msg" : console.error(err)}))
    } else {
        res.send({"res" : "-2", "msg" : "No barcode"})
    }
});

server.get("/get-products-from-favourites", (req, res) => {

    const { usrid } = JWT.getJWTInfo(req.cookies.JWT);

    if(usrid){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = `SELECT UPF.UserProductFavId,ref_productId FROM UserProductFav AS UPF
                                JOIN users AS U
                                    ON U.usrid = UPF.ext_usrid
                                WHERE UPF.ext_usrid = ?;`;
            DBconnection.query(sql, [usrid], (err, result) => {
                if(err)
                    res.send({"res" : "0", err})
                else {
                    res.send({"res" : "1", result})
                }
                DBconnection.end()
            });
        })
        .catch(err => res.send({"res" : "-1", "msg" : console.error(err)}))

    } else {
        res.send({"res" : "-2", "msg" : "No usrid"})
    }
});

//-----------------------------POST------------------------//
server.post("/signup", (req,res) =>{

    const {name, email, psw} = req.body;

    if(name !== "" || email !== "" || psw !== ""){


        let validated = validateCredentials(email, psw);

        if(validated){

            PromiseConnectionDB()
            .then((DBconnection) => {

                const sql = "SELECT U.* FROM users U INNER JOIN PersonalUsers PU ON PU.ext_usrid = U.usrid WHERE email = ?";
                DBconnection.query(sql, [email], (err, result) => {
                    if (err){
                        res.send({"res" : "-1", "msg" : err})
                        // res.redirect(`${process.env.FRONT_URL}/error/-1`)

                    } else if (result.length){
                        res.send({"res" : "0", "msg" : "user already registered"}); 

                    } else {
                        res.send({"res" : "1", "msg" : "User to fill the form"});   
                    }
                    DBconnection.end();
                });
            })
            .catch(e => res.send({"res" : "-2", "msg" : "Unable to connect to database", "e" : console.error(e) }));
            // .catch(() => {
            //     res.redirect(`${process.env.FRONT_URL}/error/-2`)
            // });

        } else {
            res.send({"res" : "-3", "msg" : "Error in credentials"})
            // res.redirect(`${process.env.FRONT_URL}/error/-3`)
        }
    } else {
        // res.redirect(`${process.env.FRONT_URL}/error/-4`)
        res.send({"res" : "-4", "msg" : "no req.body"})
    }
})

server.post("/login", (req, res) =>{
    
    const {email, psw} = req.body;
    if(email !== "" || psw !== "" ){


        let Validated = validateCredentials(email, psw);
        
        if(Validated){

            PromiseConnectionDB()
            .then((DBconnection) => {
                //HACER verificacion de psw con la salt db

                //Select siempre devuelve un array, y cuidado con el like, si hay un correo que lo contiene te entran
                const sql = `SELECT U.* FROM users AS U JOIN PersonalUsers AS PU ON U.usrid = PU.ext_usrid WHERE PU.psw = ? AND U.email = ?`; 
                DBconnection.query(sql, [psw, email], (err, result) => {
                    if (err){
                        res.send({"res" : "-1", "msg" : err})
                    } else if (result.length){

                        //Generate JWT
                        const Payload = {
                            "usrid" : result[0].usrid,
                            "email" : result[0].email,
                            "name" : result[0].name,
                            "profile" : result[0].user_profile,
                            "iat" : new Date()
                        };

                        //COMPLETE Payload

                        const jwt = JWT.generateJWT(Payload);
                        // const jwtVerified = JWT.verifyJWT(jwt);
                        res.cookie("JWT", jwt, {"httpOnly" : true})
                            .send({"res" : "1", "msg" : `${result[0].name} has logged in`, result});

                    } else {
                        res.send({"res" : "-2", "msg" : "User not registered"});
                    }
                    DBconnection.end();
                });

            })      
            .catch(e => res.send({"res" : "-3", "msg" : "Unable to connect to database", "e" : console.error(e) }));
            

        } else {
            res.send({"res" : "-4", "msg" : "Error in credentials"})
        }

    } else {
        res.send({"res" : "-5", "msg" : "no req.body"})
    }
});

server.post("/info-user-form", (req, res) => {
    if(req.body){

        const {psw, idFacebook, idGoogle, email, name, allergies, intolerances, favSMarkets, foodPreferences} = req.body;

        PromiseConnectionDB()
        .then((DBconnection) => {

            const sql = "INSERT INTO users (email,name) VALUES (?, ?)";
            DBconnection.query(sql, [email, name], (err, result) => {
                if(err)
                    throw err
                else {

                    const idResultInsert = result.insertId;

                    if(allergies){
                        
                        const ArrAllergens = allergies.map((d) => [idResultInsert, d]);
                        const sql = "INSERT INTO UserAllergens (ext_usrid, ref_idAllergen) VALUES ?;"
                        DBconnection.query(sql, [ArrAllergens], err => {
                            if (err)
                                throw err
                        })
                    }

                    if(intolerances){
                        
                        const ArrIntolerances = intolerances.map((d) => [idResultInsert, d]);
                        const sql = "INSERT INTO UserIntolerances (ext_usrid, ref_idIntolerance) VALUES ?;"
                        DBconnection.query(sql, [ArrIntolerances], err => {
                            if (err)
                                throw err
                        })
                    }

                    if(favSMarkets){
                        
                        const ArrFavSMarkets = favSMarkets.map((d) => [idResultInsert, d]);
                        const sql = "INSERT INTO UserSMarkets (ext_usrid, ref_idSMarket) VALUES ?;"
                        DBconnection.query(sql, [ArrFavSMarkets], err => {
                            if (err)
                                throw err
                        })
                    }

                    if(foodPreferences){
                        
                        const ArrFoodPreferences = foodPreferences.map((d) => [idResultInsert, d]);
                        const sql = "INSERT INTO UserFoodPref (ext_usrid, ref_idFoodPref) VALUES ?;";
                        DBconnection.query(sql, [ArrFoodPreferences], err => {
                            if (err)
                                throw err
                            
                        })
                    }
                    
                    const Payload = {
                        "usrid" : idResultInsert,
                        "email" : email,
                        "name" : name,
                        // "allergens" : allergies || [],
                        // "intolerances" : intolerances || [],
                        // "favSMarkets" : favSMarkets || [],
                        // "foodPreferences" : foodPreferences || [],
                        "iat" : new Date()
                    };

                    if(psw){

                        const {password, salt} = JWT.encryptPassword(psw)

                        const sql = "INSERT INTO PersonalUsers (ext_usrid, psw, salt) VALUES (?, ?, ?)";
                        DBconnection.query(sql, [idResultInsert, password, salt], err => {
                            if(err){
                                res.send({"res" : "0", "msg" : err})
                            } else {

                                //Generate JWT
                                const jwt = JWT.generateJWT(Payload);
                                const jwtVerified = JWT.verifyJWT(jwt);

                                if(jwtVerified){

                                    res.cookie("JWT", jwt, {"httpOnly" : true})
                                    res.send({"res" : "1", "msg" : `${name} has been sign up in users`});

                                } else {
                                    res.send({"res" : "-1", "msg" : "JWT not verified"})
                                }

                            }
                            
                        });

                    } else if(idFacebook){

                        const sql = "INSERT INTO UsersFacebook (ext_usrid, idFacebook) VALUES (?, ?)";
                        DBconnection.query(sql, [idResultInsert, idFacebook], err => {
                            if(err){
                                res.send({"res" : "0", "msg" : err})
                            } else {

                                //Generate JWT
                                const jwt = JWT.generateJWT(Payload);
                                const jwtVerified = JWT.verifyJWT(jwt);

                                if(jwtVerified){

                                    res.cookie("JWT", jwt, {"httpOnly" : true})
                                    res.send({"res" : "1", "msg" : `${name} has been sign up in usersFacebook`});

                                } else {
                                    res.send({"res" : "-1", "msg" : "JWT not verified"})
                                }
                            }
                        });

                    } else if(idGoogle){

                        const sql = "INSERT INTO UsersGoogle (ext_usrid, idGoogle) VALUES (?, ?)";
                        DBconnection.query(sql, [idResultInsert, idGoogle], err => {
                            if(err){
                                res.send({"res" : "0", "msg" : err})
                            } else {

                                //Generate JWT
                                const jwt = JWT.generateJWT(Payload);
                                const jwtVerified = JWT.verifyJWT(jwt);

                                if(jwtVerified){

                                    res.cookie("JWT", jwt, {"httpOnly" : true})
                                    res.send({"res" : "1", "msg" : `${name} has been sign up in usersGoogle`});

                                } else {
                                    res.send({"res" : "-1", "msg" : "JWT not verified"})
                                }
                            }
                            
                        });

                    } else {
                        res.send({"res" : "-2", "msg" : "No data"})
                    }
                }
                DBconnection.end(); 
            })
        })
        .catch(() => res.send({"res" : "-3", "msg" : "Error in database connection"}))

    } else {
        res.send({"res" : "-4", "msg" : "No body"});
    }
});

server.post("/create-personal-shopping-list", (req,res) =>{

    const { usrid } = JWT.getJWTInfo(req.cookies.JWT)

    const {listname, supermarketid, supermarketname} = req.query;
    
    if(usrid && listname && supermarketid && supermarketname){

        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = "INSERT INTO PersonalShoppingList (listName,APISMarketId,APISMarketName) VALUES (?, ?, ?)";
            DBconnection.query(sql, [listname, supermarketid, supermarketname], (err, result) => {
                if(err)
                    throw err
                else {
                    const idResultInsert = result.insertId;
                    const sql = "INSERT INTO PShopListUsers (ext_usrid, ref_listId) VALUES (?, ?)";
                    DBconnection.query(sql, [usrid,idResultInsert], err => {
                        if(err)
                            throw err
                        else {
                            res.send({"res" : "1", "msg" : `Shopping list #${idResultInsert} ${listname} created in database`})
                        }
                    })
                }
                DBconnection.end()
            })
        })
        .catch(err => console.error(err))

    } else {
        res.send({"res" : "0", "msg" : "No req.query"})
    }
});

server.post("/add-product-to-personal-shopping-list", (req, res) =>{

    const {listId, productId} = req.body;

    if(listId && productId){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = "SELECT ref_productId FROM PShopListProduct WHERE ref_productId = ? AND ext_listId = ?";
            DBconnection.query(sql, [productId, listId], (err, result) => {
                if(err)
                    throw err
                else if(result.length) {
                    res.send({"res" : "1", "msg" : "Product already added to personal shopping list"})
                } else {
                    const sql = "INSERT INTO PShopListProduct (ext_listId,ref_productId) VALUES (?, ?)";
                    DBconnection.query(sql, [listId,productId], err => {
                        if(err)
                            throw err
                        else {
                            res.send({"res" : "2", "msg" : "Product added to personal shopping list"})
                        }
                    })
                }
                DBconnection.end()
            })

        })
        .catch(err => res.send({"res" : "-1", "msg" : console.error(err)}))
    } else {
        res.send({"res" : "-2", "msg" : "No listId or productId"})
    }

});

server.post("/add-product-to-favourites", (req, res) => {

    const { usrid } = JWT.getJWTInfo(req.cookies.JWT)
    const { barcode } = req.body;

    if(usrid && barcode){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = "SELECT ref_productId FROM UserProductFav WHERE ref_productId = ? AND ext_usrid = ?";
            DBconnection.query(sql,[barcode, usrid], (err, result) => {
                if(err)
                    throw err
                else if(result.length){
                    res.send({"res" : "1", "msg" : "Product already added to favourites"})
                } else {
                    const sql = "INSERT INTO UserProductFav (ext_usrid, ref_productId) VALUES (?, ?)";
                    DBconnection.query(sql, [usrid,barcode], err => {
                        if(err)
                            throw err
                        else {
                            res.send({"res" : "2", "msg" : "Product added to favourites"})
                        }
                    })
                }
                DBconnection.end();
            })
        })
        .catch(err => res.send({"res" : "-1", "msg" : console.error(err)}))

    } else {
        res.send({"res" : "-2", "msg" : "No usrid or productId"})
    }
});

//------------------------PUT--------------------------------//
server.put("/edit-personal-shopping-list", (req, res) => {

    // const { listId, listName, APISMarketId, APISMarketName} = req.query;
    const {newListName, newMarketId, newMarketName, listId, listName, APISMarketId, APISMarketName} = req.body;

    if(listId && listName && APISMarketId && APISMarketName){
        PromiseConnectionDB()
        .then((DBconnection) => {

            const sql = `UPDATE PersonalShoppingList 
                                SET listName = ?, APISMarketId = ?,APISMarketName = ? 
                                WHERE listId = ? AND
                                      listName = ? AND 
                                      APISMarketId = ? AND 
                                      APISMarketName = ?;`;
            DBconnection.query(sql, [newListName, newMarketId, newMarketName,listId,listName, APISMarketId, APISMarketName], err => {
                if(err)
                    res.send({"res" : "0", "msg" : err})
                else {
                    res.send({"res" : "1", "msg" : "Updated shopping list"})
                }
                DBconnection.end();
            })

        })
        .catch(err => res.send({"res" : "-1", "msg" : console.error(err)}))
    }
});

//------------------------DELETE---------------------------//
server.delete("/delete-personal-shopping-list", (req, res) => {

    const {listId} = req.body;
    if(listId){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = `DELETE FROM crewproj.personalshoppinglist WHERE listId = ?;`;
            DBconnection.query(sql, [listId], err => {
                if(err)
                    res.send({"res" : "0", "msg" : err})
                else {
                    res.send({"res" : "1", "msg" : "Deleted shopping list"})
                }
                DBconnection.end();
            })
        })
        .catch(err => res.send({"res" : "-1", "msg" : console.error(err)}))
    } else {
        res.send({"res" : "-2", "msg" : "No listId"})
    }
});

server.delete("/delete-product-from-personal-shopping-list", (req, res) => {

    const {PShoplistProductId, ext_listId} = req.body;

    if(PShoplistProductId && ext_listId){

        const ArrPShoplistProductId = PShoplistProductId.map((d) => [d]);
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = `DELETE FROM crewproj.PShopListProduct WHERE PShoplistProductId IN (?) AND ext_listId = ?;`;
            DBconnection.query(sql, [ArrPShoplistProductId, ext_listId], err => {
                if(err)
                    throw err
                else {
                    res.send({"res" : "1", "msg" : "Product deleted from list"})
                }
                DBconnection.end();
            })
        })
        .catch(err => res.send({"res" : "-1", "msg" : console.error(err)}))
    } else {
        res.send({"res" : "-2", "msg" : "No PShoplistProductId"})
    }
});

server.delete("/delete-product-from-favourites", (req, res) => {

    const { usrid } = JWT.getJWTInfo(req.cookies.JWT);
    const {UserProductFavId} = req.body;

    if(usrid && UserProductFavId){
        PromiseConnectionDB()
        .then((DBconnection) => {
            const sql = `DELETE FROM crewproj.UserProductFav WHERE UserProductFavId = ? AND ext_usrid = ?;`;
            DBconnection.query(sql, [UserProductFavId, usrid], err => {
                if(err)
                    res.send({"res" : "0", err})
                else {
                    res.send({"res" : "1", "msg" : "Deleted product from favourites"})
                }
                DBconnection.end();
            })
        })
        .catch(err => res.send({"res" : "-1", "msg" : console.error(err)}))
    } else {
        res.send({"res" : "-2", "msg" : "No usrid or ref_productId"})
    }
});

server.listen(listeningPort);




