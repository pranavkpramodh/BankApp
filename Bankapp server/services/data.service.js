// jw importing
const jwt = require('jsonwebtoken')
// import db
const db = require('./db')

userDetailes = {
  1000: { acno: 1000, username: "amal Kumar", password: 1000, balance: 1000, transaction: [] },
  1001: { acno: 1001, username: "amal", password: 1001, balance: 1000, transaction: [] },
  1002: { acno: 1002, username: "amal", password: 1002, balance: 1000, transaction: [] },
}



// registration
const registration = (acno, username, password) => {

  return db.User.findOne({ acno })//data
    .then(user => {
      if (user) {
        return {
          status: 'false',
          statusCode: 400,
          message: 'user already registered'
        }
      }

      else {
        const newUser = new db.User({
          acno: acno,
          username: username,
          password: password,
          balance: 0,
          transaction: []
        })

        newUser.save();//data saved in mngodb

        return {
          status: 'true',
          statusCode: 200,
          message: 'register successfull'
        }
      }
    })
}


//login service
const login = (acno, pswd) => {

  return db.User.findOne({ acno,pswd })//data
  .then(user=>{
    if(user){
      currentUser = user.username
      currentAcno = acno
      const token = jwt.sign({ currentAcno: acno }, 'superkey2020')//To genarate token

      return{
        status: 'true',
        statusCode: 200,
        message: 'login successful',
        token: token,
        currentUser:currentUser,
        currentAcno:currentAcno
      }
    }else{
      return{
        status: 'false',
        statusCode: 400,
        message: 'invalid userdetails'
      }
    }

  })
}


    

// deposit 
const deposit = (acno, pswd, amt) => {
  let amount = parseInt(amt)
  return db.User.findOne({ acno,pswd })//data
    .then(user=>{
      if(user){
        user.balance+=amount;
        user.transaction.push({
          Type:"Credit",
          Amount:amount
        })
        user.save()
         return{
          status: 'true',
          statusCode: 200,
          message: `${amount} is credited and balance is ${user.balance}`
        }
      }else{
        return{
          status: 'false',
          statusCode: 400,
          message: 'Incorrect Userdetails'
        }
      }
    })
  }

//     if (pswd == userDetailes[acno]['password']) {
//       userDetailes[acno]['balance'] += amount
//       userDetailes[acno]['transaction'].push({
//         Type: "Credit",
//         Amount: amount
//       })
//       return {
//         status: 'true',
//         statusCode: 200,
//         message: `${amt} is credited and balance is ${userDetailes[acno]['balance']}`
//       }

//       // return userDetailes[acno]['balance']
//     } else {
//       // alert('Password missmatch')
//       return {
//         status: 'false',
//         statusCode: 400,
//         message: 'Password missmatch'
//       }
//     }
//   } else {
//     // alert('Inavalid data')
//     return {
//       status: 'false',
//       statusCode: 400,
//       message: 'invalid Data'
//     }
//   }
// }


// withdraw
const withdraw = (acno, pswd, amt) => {
  let amount = parseInt(amt)
  return db.User.findOne({ acno,pswd })//data
  .then(user=>{
    if(user){
      user.balance-=amount;
      user.transaction.push({
        Type:"Debit",
        Amount:amount
      })
      user.save()
      return{
          status: 'true',
          statusCode: 200,
          message: `${amount} is debited and balance is ${user.balance}`
      }
    }else{
      return{
        status: 'false',
        statusCode: 400,
        message: 'Invalid userDeailes'
      }    
    }
  })
}






//     if (pswd == userDetailes[acno]['password']) {
//       if (userDetailes[acno]['balance'] > amount) {

//         userDetailes[acno]['balance'] -= amount
//         userDetailes[acno]['transaction'].push({
//           Type: "Debit",
//           Amount: amount
//         })

//         return {
//           status: 'true',
//           statusCode: 200,
//           message: `${amt} is debited and balance is ${userDetailes[acno]['balance']}`
//         }

//         // return userDetailes[acno]['balance']

//       } else {
//         // alert('Transaction failed')
//         return {
//           status: 'false',
//           statusCode: 400,
//           message: 'Transaction failed'
//         }
//       }

//     } else {
//       // alert('Password missmatch')
//       return {
//         status: 'false',
//         statusCode: 400,
//         message: 'Password missmatch'
//       }
//     }

//   } else {
//     return {
//       status: 'false',
//       statusCode: 400,
//       message: 'Invalid data'
//     }
//     // alert('Invalid data')
//   }
// }



// get transaction
const getTransaction = (acno) => {
  return db.User.findOne({ acno })//data
  .then(user=>{
    if(user){
  return {
    status: 'true',
    statusCode: 200,
    transaction: user.transaction
  }
}else{
  return{
    status: 'false',
    statusCode: 400,
    message: 'User not found'

  }
}

  // userDetailes[acno]['transaction']
})
}


const deleteAcc = (acno) => {
return db.User.deleteOne({acno})
.then(user =>{
  if(user){
    return{
      status: 'true',
      statusCode: 200,
      message: 'user deleted successfully'
  }
    
  }else{
    return{
      status: 'false',
      statusCode: 400,
      message: 'User not found'
    }
  
  }
})
}




module.exports = {
  registration,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
}