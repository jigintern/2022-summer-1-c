
  // //firebase認証の処理
  // import firebase from "firebase/app";

  // import "firebase/auth";

  // // TODO: Replace the following with your app's Firebase project configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCIIjm36dBdDcONxx5KIvRQHlP4caKDLy8",
  //   authDomain: "water-checker-e8afa.firebaseapp.com",
  //   projectId: "water-checker-e8afa",
  //   storageBucket: "water-checker-e8afa.appspot.com",
  //   messagingSenderId: "534699138057",
  //   appId: "1:534699138057:web:bd947b7209a84f5151ecd8"
  // };

  // //Initialize Firebase
  // firebase.initializeApp(firebaseConfig);

function get() {
  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");

  console.log(email.value);
  console.log(password.value);
}

const button = document.querySelector('.button');

//ログインボタンを押下で作動
// button.addEventListerner('click',(e) => {
//   preventdefault
//   const email = document.querySelector('#login-email').value;
//   const password = document.querySelector('#login-password').value;
//   console.log(email);
//   alert('発火');
// });
