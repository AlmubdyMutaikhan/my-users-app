const validate = require('./config/validator')
const DBclass = require('./config/db')
const hf = require('./config/hf')

class User {
    constructor() {
        console.log("user object is initialized\n")
        this.dbObj = new DBclass()
        this.dbConnection = this.dbObj.connectAndGetDBConnection()
    }
    /*
        data_schema : {email, firstname,lastname, age, password, }
    */
    async create(data) {
        // check for validity of  data
        if(validate.validateUserData(data) == 0) {
            // continue and create user in DataBase
            const res = await this.dbObj.insertIntoTable(this.dbConnection,
                [data.firstname, data.lastname, data.email, data.password, data.age])
            
            console.log(res)
        } else {
            console.error("Unsuccessful end of process")
        }
    }

    async all() {
        try {
            // get data of users
            let users = await this.dbObj.retrieveAllRows(this.dbConnection)
            // clear their password
            users = hf.prepareUsersData(users)
            console.log(users)
            return users
        } catch(err) {
            return err
        }
    }

    async update(id, attr, value) {
        try {
            // get the updated row
            const new_row = await this.dbObj.updateRowById(this.dbConnection, id, attr, value)
            console.log(new_row)
        } catch(err) {
            console.log("unsuccessful end of process")
        }
    }

    destroy(id) {
        this.dbObj.deleteRowById(this.dbConnection, id)
    }
}


let user = new User()
