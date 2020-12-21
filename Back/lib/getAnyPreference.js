const mysql = require("mysql");

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

function getAllergensUser(usrid) {
    return new Promise((resolve,reject) => {
        PromiseConnectionDB(usrid)
            .then(DBconnection => {
                const sql = "SELECT ref_idAllergen AS id, nameAllergen AS name FROM users AS U JOIN UserAllergens AS UA ON UA.ext_usrid = U.usrid JOIN allergens AS A ON A.idAllergen = UA.ref_idAllergen WHERE U.usrid = ?";
                DBconnection.query(sql, [usrid], (err, result) => {
                    if(err)
                        reject(err);
                    else {
                        resolve(result);
                    }
                })
    
            })
    });
}

function getIntolerancesUser(usrid) {
    return new Promise((resolve) => {
        PromiseConnectionDB(usrid)
            .then(DBconnection => {
                const sql = "SELECT ref_idIntolerance AS id, nameIntolerance AS name FROM users AS U JOIN UserIntolerances AS UI ON UI.ext_usrid = U.usrid JOIN Intolerances AS I ON I.idIntolerance = UI.ref_idIntolerance WHERE U.usrid = ?";
                DBconnection.query(sql, [usrid], (err, result) => {
                    if(err)
                        reject(err);
                    else {
                        resolve(result);
                    }
                })
    
            })
    });
}
function getSuperMarketUser(usrid) {
    return new Promise((resolve) => {
        PromiseConnectionDB(usrid)
            .then(DBconnection => {
                const sql = "SELECT ref_idSMarket AS id, nameSuperMarket AS name FROM users AS U JOIN UserSMarkets AS USM ON USM.ext_usrid = U.usrid JOIN SuperMarkets AS SM ON SM.idSMarket = USM.ref_idSMarket WHERE U.usrid = ?";
                DBconnection.query(sql, [usrid], (err, result) => {
                    if(err)
                        reject(err);
                    else {
                        resolve(result);
                    }
                })
    
            })
    });
}
function getFoodPrefUser(usrid) {
    return new Promise((resolve) => {
        PromiseConnectionDB(usrid)
            .then(DBconnection => {
                const sql = "SELECT ref_idFoodPref AS id, nameFoodPref AS name FROM users AS U JOIN UserFoodPref AS UFP ON UFP.ext_usrid = U.usrid JOIN FoodPreferences AS FP ON FP.idFoodPref = UFP.ref_idFoodPref WHERE U.usrid = ?";
                DBconnection.query(sql, [usrid], (err, result) => {
                    if(err)
                        reject(err);
                    else {
                        resolve(result);
                    }
                })
    
            })
    });
}

module.exports = {"getAllergensUser" : getAllergensUser, "getIntolerancesUser" : getIntolerancesUser, "getSuperMarketUser" : getSuperMarketUser, "getFoodPrefUser" : getFoodPrefUser};