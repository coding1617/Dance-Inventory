// (Re)Sets up the database, including a little bit of sample data
const db = require("./db_connections");

/**** Delete existing table, if any ****/

const drop_stuff_table_sql = "DROP TABLE IF EXISTS `stuff`;"

db.execute(drop_stuff_table_sql);

/**** Create "stuff" table (again)  ****/

const create_stuff_table_sql = `
    CREATE TABLE stuff (
        id INT NOT NULL AUTO_INCREMENT,
        item VARCHAR(45) NOT NULL,
        quantity INT NOT NULL,
        description VARCHAR(150) NULL,
        PRIMARY KEY (id)
    );
`
db.execute(create_stuff_table_sql);

/**** Create some sample items ****/

const insert_stuff_table_sql = `
    INSERT INTO stuff 
        (item, quantity, description) 
    VALUES 
        (?, ?, ?);
`
db.execute(insert_stuff_table_sql, ['Tap Costume', '5', 'Color: Red and Black; Type: One-piece; Other info: Lots of rhinestones, With tights, shoes']);

db.execute(insert_stuff_table_sql, ['Ballet Costume', '7', 'Color: Blue and Gold; Type: Large tutu; Other info: Lots of rhinestones, With tights, shoes']);

db.execute(insert_stuff_table_sql, ['Jazz Costume', '10', 'Color: Pink and Red; Type: Two-piece with shorts; Other info: Lots of rhinestones, With tights, shoes']);

db.execute(insert_stuff_table_sql, ['Acro Costume', '8', 'Color: Gold and Black; Type: One-piece; Other info: Lots of rhinestones, With tights, shoes']); 

db.execute(insert_stuff_table_sql, ['Lyrical Costume', '11', 'Color: Light Purple; Type: Leotard; Other info: Lots of rhinestones, shoes']); 

db.execute(insert_stuff_table_sql, ['Contemporary Costume', '20', 'Color: Green and Black; Type: One-piece with skirt; Other info: Lots of rhinestones, shoes']); 

/**** Read the sample items inserted ****/

const read_stuff_table_sql = "SELECT * FROM stuff";

db.execute(read_stuff_table_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'stuff' initialized with:")
        console.log(results);
    }
);

db.end();

/*

// Alternatively, instead of putting SQL in string literals, read the SQL from files using the "fs" package.
// Put this code at the top, and remove all the SQL string literals defined through the file.
const fs = require("fs");

const drop_stuff_table_sql = fs.readFileSync(__dirname + "/db/queries/init/drop_stuff_table.sql", { encoding: "UTF-8" });
const create_stuff_table_sql = fs.readFileSync(__dirname + "/db/queries/init/create_stuff_table.sql", { encoding: "UTF-8" });
const insert_stuff_table_sql = fs.readFileSync(__dirname + "/db/queries/init/insert_stuff_table.sql", { encoding: "UTF-8" });
const read_stuff_table_sql = fs.readFileSync(__dirname + "/db/queries/init/read_stuff_table.sql", { encoding: "UTF-8" });

*/