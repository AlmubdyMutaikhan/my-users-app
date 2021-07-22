const sqlite3 = require('sqlite3').verbose()

class DBclass {
    connectAndGetDBConnection = () => {
        let db = new sqlite3.Database('./DB_SRC/my_users.db', sqlite3.OPEN_READWRITE, (err) => {
            if(err) {
                console.log("unable to connect to DB")
                console.log(err)
            } else {
                console.log("************************")
                console.log("succesfully connected to DB")
            }
        })
    
        return db    
    }

    constructor() {}
    
    createTable = (db) => {
        db.run(`CREATE TABLE users(firstname text NOT NULL, lastname text NOT NULL, email text NOT NULL,
            password text NOT NULL, age integer NOT NULL);`, function(err) {
                if(err) {
                    console.log(err)
                } else {
                    console.log("created table")
                }
            })
    }
    

    insertPromise = async(db,sql_script, values) => {
        return new Promise(function(resolve,reject){
            db.run(sql_script, values, function(err){
               if(err){return reject(err);}
               resolve("user created succesfully");
             });
        });
    }
    insertIntoTable= async (db, values) => {
        const user = await this.insertPromise(db,
                `INSERT INTO users(firstname, lastname, email, password, age) VALUES(?,?,?,?,?)`, values)
        return user
    }
    
    // returns promise 
    getAllRows = (db, query) => {
        return new Promise(function(resolve,reject){
            db.all(query, function(err,rows){
               if(err){return reject(err);}
               resolve(rows);
             });
        });
    }
    
    getRowById = (db, query) => {
        return new Promise(function(resolve,reject){
            db.get(query, function(err,rows){
               if(err){return reject(err);}
               resolve(rows);
             });
        });
    }
    
    // this is a wrapper function under the get_all_rows
    // simply returns rows from DB in json format
    retrieveAllRows = async (db) => {
        try {
            const users = await this.getAllRows(db, 'SELECT *, rowid as id FROM users')
            return users
        } catch(err) {
            console.log(err)
            return err
        }
    }
    
    retrieveRowById = async (db, id) => {
        try {
            const user = await this.getRowById(db, `SELECT * FROM users WHERE rowid = ${id}`)
            return user
        } catch(err) {
            console.log(err)
            return err
        }
    }

    updateRowByIdPromise = async (db, sql_script) => {
        return new Promise(function(resolve, reject) {
            db.run(sql_script, function(err, updated_row) {
                if(err) {return reject(err)}
                resolve("successful update of user")
            })
        })
    }
    updateRowById = async (db, id, attr, value) => {
        let sql_script = `UPDATE users SET ${attr}="${value}" WHERE rowid=${id}`
        try {
            const updated_row = await this.updateRowByIdPromise(db, sql_script)
            return updated_row
        }catch(err) {
            return err
        }
    } 

    deleteRowById = async (db, id) => {
        return new Promise(function(resolve, reject) {
            db.run(`DELETE from users WHERE rowid=${id}`, function(err) {
                if(err) {
                    return reject(err)
                } else {
                    resolve(`successfully deleted user with ID=${id}`)
                }
            })
        })
    }

    findByEPpromise = async (db, sql_script) => {
        return new Promise(function(resolve, reject) {
            db.get(sql_script, function(err, row) {
                if(err) {return reject(err)}
                resolve(row)
            })
        })
    }

    findByEmailAndPassword = async (db, email, password) => {
        try {
            const rowid = await this.findByEPpromise(db, `SELECT rowid FROM users WHERE email="${email}" AND password="${password}"`)
            return rowid
        } catch(err) {
            return err
        }
    }
}


module.exports = DBclass

