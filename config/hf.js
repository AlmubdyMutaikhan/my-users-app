const prepareUserDataOne = (user_data) => {
    user_data.password = null
    return user_data
}

const prepareUsersData = (user_datas) => {
    user_datas = user_datas.map(user_data => {
        return prepareUserDataOne(user_data)
    }) 
    return user_datas
}

const isAuthenticated = (req, res, next) => {
    if(req.session.auth) {
        next()
    } else {
        res.send({"msg" : "user must be logged in"})
    }
}

module.exports = {
    prepareUsersData,
    isAuthenticated
}