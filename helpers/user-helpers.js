let db = require('../config/connection');
let collection = require('../config/collection')
const bcrypt = require("bcrypt");


module.exports = {
    doSignUp: (userData) => {
        return new Promise(async (resolve, reject) => {
          userData.Password = await bcrypt.hash(userData.Password, 10);
          db.get()
            .collection(collection.USER_COLLECTION)
            .insertOne(userData)
            .then((data) => {
              resolve(data);
            });
        });
      },


      doLogin: (userData) => {
        let response = {};
        return new Promise(async (resolve, reject) => {
          let user = await db
            .get()
            .collection(collection.USER_COLLECTION)
            .findOne({ Email: userData.Email });
          if (user) {
            bcrypt.compare(userData.Password, user.Password).then((result) => {
              if (result) {
                console.log("login success");
                response.user = user;
                console.log(user);
                response.status = true;
                resolve(response);
              } else {
                console.log("login failed");
                response.status = false;
                resolve(response);
              }
            });
          } else {
            console.log("user not found");
            response.status = false;
            resolve(response);
          }
        });
      },
    


}