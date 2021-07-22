const PROPERTIES = [ { name : 'email', type : 'string' },
                     {name : 'firstname', type : 'string'},
                     {name : 'password', type : 'string'},
                     {name : 'lastname', type : 'string'},
                     {name : 'age', type : "number"}] // general propertis schema of user model

// checks for null or undefined of var
const isValidDataType = (val) => {
    return !(typeof(val) === null || typeof(val) === 'undefined')
} 

// checks if ONE key corresponds with {PROPERTIES}
const isCorrespondingKey = (key,val) => {
    const obj = {name : key, type : typeof(val)} // create obj as in PROPERTIES
    let flag = false // result check boolean

    // traverse PROPERTIES and compare with given obj
    for(let i = 0; i < PROPERTIES.length;i++) {
        let prop_obj = PROPERTIES[i] // store current PROPERTIES element in temp var
        // compare it with given values
        if(prop_obj.name === obj.name && prop_obj.type === obj.type) {
            flag = true
            break; // if found then stop the search
        }
    }
    return flag
}

const OutputError = () => {
        console.log("\t****************")
        console.log("\terror while validatin user data:\n")
        console.log("\tPossible reasons: ")
        console.log("\t1 - Not a valid property name")
        console.log("\t2 - Null or invalid value type of given property\n\t****************\n")
}

// final check of object's keys 
const check_keys = (obj, keys) => {
    // if properites' amount in an object corresponds
    if(keys.length === PROPERTIES.length) {
        // compare keys with schema PROPERTIES
        for(let i = 0; i < keys.length;i++) {
            let key = keys[i]
             // if key is null or doesnt corresponds with its value
             if(!(isValidDataType(obj[key]) && isCorrespondingKey(key,obj[key]))) {
                return false
            }
        }
        return true
    } else {
        return false
    }
}

const validateUserData = (data) => {
    // if data obj is not undefined or null
    if(isValidDataType(data)) {
        // store keys of json obj in temp variable (arr)
        let tmp_key_store = Object.keys(data)
        // check keys for valid type  
        const is_valid_params = check_keys(data, tmp_key_store)
        if(!is_valid_params) {
            OutputError()
            return 1
        } else {
            return 0
        }

    } else {
        OutputError()
        return 1
    }     
}

module.exports = {
    validateUserData
}