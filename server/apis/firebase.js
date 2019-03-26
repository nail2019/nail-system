const express = require('express')
const fb = require('firebase');

const config = {
  test: {
    apiKey: "AIzaSyDUmBiyuJgOUzYvghXjkn_8MBKwFRMzV4U",
  	authDomain: "nails-test.firebaseapp.com",
  	databaseURL: "https://nails-test.firebaseio.com",
  	projectId: "nails-test",
  	storageBucket: "nails-test.appspot.com",
  	messagingSenderId: "62775543575"
  }
};

const extensionEmail = '@nails.com'

const fireBaseClient = fb.initializeApp(config.test);

var FireBase = {
  login: function(phone_number, password) {
    const email = `${phone_number}${extensionEmail}`
    return fireBaseClient.auth().signInWithEmailAndPassword(email, password)
  },
  logout: function() {
    return fireBaseClient.auth().signOut();
  },
  logged: function() {

  },
  createNewUser : (phone_number, password) => {
    const email = `${phone_number}${extensionEmail}`
    return fireBaseClient.auth().createUserWithEmailAndPassword(email, password)
  },
  getOneAccount: (phone_number) => {
    return  fireBaseClient.database().ref('nails/users').once('value');
  },
  connectFirebaseDatabaseRegister: (phone_number) => {
    console.log(phone_number)
    let phone = phone_number.replace(/^\+/, '');
    // console.log(fireBaseClient.database().ref(`nails/register/${phone}}`))
    return fireBaseClient.database().ref(`nails/register/${phone}`);
  }
}
module.exports = FireBase;
