CREATE DATABASE IF NOT EXISTS crewProj;
USE crewProj;

SELECT * FROM users;
SELECT * FROM usersFacebook;
SELECT * FROM usersGoogle;
DROP DATABASE crewProj;

DROP TABLE usersFacebook;
DROP TABLE usersGoogle;
DROP TABLE users;
DELETE FROM usersGoogle WHERE email = 'ezokrafita2@gmail.com';

ALTER TABLE users auto_increment = 1; 

CREATE TABLE IF NOT EXISTS users (
	`usrid` INT NOT NULL AUTO_INCREMENT,
    `email` varchar(100) NOT NULL,
    `name` varchar(100) NOT NULL,
    `user_profile` varchar(5) NOT NULL DEFAULT 'user',
    PRIMARY KEY(usrid)
);

CREATE TABLE IF NOT EXISTS PersonalUsers (
	`id` INT NOT NULL AUTO_INCREMENT,
    `ext_usrid` INT NOT NULL,
    `psw` varchar(100) NOT NULL,
    `salt` varchar(500) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (ext_usrid)
        REFERENCES users (usrid)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS UsersFacebook (
	`id` INT NOT NULL AUTO_INCREMENT,
    `ext_usrid` INT NOT NULL,
    `idFacebook` varchar(100) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(ext_usrid)
        REFERENCES users(usrid)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS UsersGoogle(
	`id` INT NOT NULL AUTO_INCREMENT,
    `ext_usrid` INT NOT NULL,
    `idGoogle` varchar(100) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(ext_usrid)
        REFERENCES users(usrid)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Allergens(
	`idAllergen` INT NOT NULL AUTO_INCREMENT,
    `nameAllergen` varchar(100) NOT NULL,
    PRIMARY KEY(idAllergen)
    
);
INSERT INTO Allergens (idAllergen, nameAllergen) 
VALUES 
	(1, 'Cacahuetes'),
    (2, 'Anacardos'),
    (3, 'Almendras'),
    (4, 'Pistacho'),
    (5, 'Nueces'),
    (6, 'Avellanas'),
    (7, 'Castañas'),
    (8, 'Pipas de girasol');

CREATE TABLE IF NOT EXISTS UserAllergens(
	`idUsrAllergen` INT NOT NULL AUTO_INCREMENT,
    `ext_usrid` INT NOT NULL,
    `ref_idAllergen` INT NOT NULL,
    PRIMARY KEY(idUsrAllergen),
    FOREIGN KEY(ext_usrid)
        REFERENCES users(usrid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(ref_idAllergen)
        REFERENCES Allergens(idAllergen)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Intolerances(
	`idIntolerance` INT NOT NULL AUTO_INCREMENT,
    `nameIntolerance` varchar(100) NOT NULL,
    PRIMARY KEY(idIntolerance)
);

INSERT INTO Intolerances (idIntolerance, nameIntolerance) 
VALUES 
	(1, 'Lactosa'),
    (2, 'Gluten'),
    (3, 'Sacarosa'),
    (4, 'Fructosa');

CREATE TABLE IF NOT EXISTS UserIntolerances(
	`idUsrIntolerance` INT NOT NULL AUTO_INCREMENT,
    `ext_usrid` INT NOT NULL,
    `ref_idIntolerance` INT NOT NULL,
    PRIMARY KEY(idUsrIntolerance),
    FOREIGN KEY(ext_usrid)
        REFERENCES users(usrid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(ref_idIntolerance)
        REFERENCES Intolerances(idIntolerance)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SuperMarkets(
	`idSMarket` INT NOT NULL AUTO_INCREMENT,
    `nameSuperMarket` varchar(100) NOT NULL,
    PRIMARY KEY(idSMarket)
);

INSERT INTO SuperMarkets (idSMarket, nameSuperMarket) 
VALUES 
	(1, 'Mercadona'),
    (2, 'Carrefour'),
    (3, 'Día'),
    (4, 'Lidl'),
    (5, 'Otros');

CREATE TABLE IF NOT EXISTS UserSMarkets(
	`idUsrSMarkets` INT NOT NULL AUTO_INCREMENT,
    `ext_usrid` INT NOT NULL,
    `ref_idSMarket` INT NOT NULL,
    PRIMARY KEY(idUsrSMarkets),
    FOREIGN KEY(ext_usrid)
        REFERENCES users(usrid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(ref_idSMarket)
        REFERENCES SuperMarkets(idSMarket)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FoodPreferences(
	`idFoodPref` INT NOT NULL AUTO_INCREMENT,
    `nameFoodPref` varchar(100) NOT NULL,
    PRIMARY KEY(idFoodPref)
);

INSERT INTO FoodPreferences (idFoodPref, nameFoodPref) 
VALUES 
	(1, 'Bio'),
    (2, 'Veganos'),
    (3, 'Vegetarianos'),
    (4, 'Origen España');

CREATE TABLE IF NOT EXISTS UserFoodPref(
	`idUsrFoodPref` INT NOT NULL AUTO_INCREMENT,
    `ext_usrid` INT NOT NULL,
    `ref_idFoodPref` INT NOT NULL,
    PRIMARY KEY(idUsrFoodPref),
    FOREIGN KEY(ext_usrid)
        REFERENCES users(usrid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY(ref_idFoodPref)
        REFERENCES FoodPreferences(idFoodPref)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);





CREATE TABLE IF NOT EXISTS PersonalShoppingList (
	`listId` INT NOT NULL AUTO_INCREMENT,
    `listName` varchar(100) NOT NULL,
    `APISMarketId` varchar(100) NOT NULL,
    `APISMarketName` varchar(100) NOT NULL,
    PRIMARY KEY(listId)
);

-- CREATE TABLE IF NOT EXISTS SuperMarkets  (
-- 	`SMarketId` INT NOT NULL AUTO_INCREMENT,
-- 	`APISMarketId` varchar(100) NOT NULL,
--     `SMarketName` varchar(100) NOT NULL,
--     PRIMARY KEY(listId)
-- );

CREATE TABLE IF NOT EXISTS PShopListUsers  (
	`ext_usrid` INT NOT NULL,
	`ref_listId` INT NOT NULL,
	`ref_SMarketId` INT NOT NULL,
    PRIMARY KEY(ext_usrId, ref_listId, ref_SMarketId),
    FOREIGN KEY (ext_usrId),
        REFERENCES users(usrid),
    FOREIGN KEY (ref_listId, ref_SMarketId),
        REFERENCES PersonalShoppingList(listId, APISMarketId)
        -- ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS PShopSmarketsUsersFacebook  (
	`ext_usrIdF` INT NOT NULL,
	`ref_listId` INT NOT NULL,
	`ref_SMarketId` INT NOT NULL,
    PRIMARY KEY(ext_usrIdF, ref_listId, ref_SMarketId),
    FOREIGN KEY (ext_usrIdF),
        REFERENCES users(usrIdF),
    FOREIGN KEY (ref_listId, ref_SMarketId)
        REFERENCES PersonalShoppingList(listId, APISMarketId)
        -- ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS PShopSmarketsUsers  (
	`ext_usrIdG` INT NOT NULL,
	`ref_listId` INT NOT NULL,
	`ref_SMarketId` INT NOT NULL,
    PRIMARY KEY(ext_usrIdG, ref_listId, ref_SMarketId),
    FOREIGN KEY (ext_usrIdG)
        REFERENCES usersGoogle(usrIdG),
    FOREIGN KEY (ref_listId, ref_SMarketId)
        REFERENCES PersonalShoppingList(listId, APISMarketId)
        -- ON DELETE CASCADE
);




INSERT INTO users VALUES(1,'admin', 'admin','admin');