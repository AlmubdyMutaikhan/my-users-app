const sqlite3 = require('sqlite3').verbose()

const connectAndGetDBConnection = () => {
    let db = new sqlite3.Database('./my_users.db', sqlite3.OPEN_READWRITE, (err) => {
        if(err) {
            console.log("unable to connect to DB")
            console.log(err)
        } else {
            console.log("succesfully connected to DB")
        }
    })

    return db    
}

const createTable = (db) => {
    db.run(`CREATE TABLE users(firstname text NOT NULL, lastname text NOT NULL, email text NOT NULL,
        password text NOT NULL, age integer NOT NULL);`, function(err) {
            if(err) {
                console.log(err)
            } else {
                console.log("created table")
            }
        })
}

const insertIntoTable= (db, values) => {
    db.run(`INSERT INTO users(firstname, lastname, email, password, age) VALUES(?,?,?,?,?)`, values, function(err){
        if(err) {
            console.log("unable to insert user data into db")
            console.log(err)
        } else {
            console.log("succesfully added user to DB")
            console.log("ID of user is " + this.lastID)
            return this.lastID
        }
    })
}

// returns promise 
const getAllRows = (query,db) => {
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

const getRowById = (query,db) => {
    return new Promise(function(resolve,reject){
        db.get(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

// this is a wrapper function under the get_all_rows
// simply returns rows from DB in json format
const retrieveAllRows = async (db) => {
    try {
        const users = await getAllRows('SELECT *, rowid as id FROM users', db)
        return users
    } catch(err) {
        console.log(err)
        return err
    }
}

const retrieveRowById = async (db, id) => {
    try {
        const user = await getRowById(`SELECT * FROM users WHERE rowid = ${id}`, db)
        return user
    } catch(err) {
        console.log(err)
        return err
    }
}




let db = connectAndGetDBConnection()