const validate = require('./validator')

class User {
    constructor() {
        console.log("user object is initialized\n")
    }
    /*
        data_schema : {email, firstname,lastname, age, password, }
    */
    create(data) {
        // check for validity of  data
        if(validate.validateUserData(data) == 0) {
            // continue and create user in DataBase
            
        } else {
            console.error("Unsuccessful end of process")
        }
    }




}


let user = new User()
user.create({email : "n", firstname : "a", lastname : "z", password : "12345", ae : 88})
