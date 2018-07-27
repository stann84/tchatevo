importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-messaging.js');

const firebase = {
    apiKey: 'AIzaSyDUIriGK6nijTlBRtwUcDWKsQcfgvuMLbo',
    authDomain: 'books-3bd5d.firebaseapp.com',
    databaseURL: 'https://books-3bd5d.firebaseio.com',
    projectId: 'books-3bd5d',
    storageBucket: 'books-3bd5d.appspot.com',
    messagingSenderId: '373231675965'
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function(payload) {
    const title = 'hello'
    const option = {
      body: payload.data.status
    }
    return self.registration.showNotification(title, options)
  })