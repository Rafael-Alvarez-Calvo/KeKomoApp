SELECT * FROM users AS U
JOIN userallergens AS UA ON UA.ext_usrid = U.usrid
JOIN allergens AS A ON A.idAllergen = UA.ref_idAllergen
JOIN userintolerances AS UI ON UI.ext_usrid = U.usrid
JOIN intolerances AS I ON I.idIntolerance = UI.ref_idIntolerance
JOIN usersmarkets AS USM ON USM.ext_usrid = U.usrid
JOIN supermarkets AS SM ON SM.idSMarket = USM.ref_idSMarket
JOIN userfoodpref AS UFP ON UFP.ext_usrid = U.usrid
JOIN foodpreferences AS FP ON FP.idFoodPref = UFP.ref_idFoodPref
WHERE U.usrid = 1;