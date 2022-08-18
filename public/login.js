// //firebase認証の処理
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword, signOut} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js'

const auth = getAuth();

// TODO: Replace the following with your app's Firebase pro, ject configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIIjm36dBdDcONxx5KIvRQHlP4caKDLy8",
  authDomain: "water-checker-e8afa.firebaseapp.com",
  projectId: "water-checker-e8afa",
  storageBucket: "water-checker-e8afa.appspot.com",
  messagingSenderId: "534699138057",
  appId: "1:534699138057:web:bd947b7209a84f5151ecd8"
};


//Initialize Firebase
const app = initializeApp(firebaseConfig);

//新規登録の処理
function signUp() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('登録成功しました')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('登録に失敗しました');
    // ..
  });
}

//ログインの処理
function logIn() {
  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");

  console.log(email.value);
  console.log(password.value);

  emailValue = email.value;
  passwordValue = password.value;

  // ログインを試みる
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('ログイン成功');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('ログイン失敗');
  });
}

//ログアウト処理
function logOut() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
