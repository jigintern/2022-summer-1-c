import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

// Auth
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword, signOut} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js'

//Firestore
import { getFirestore,collection,addDoc  } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app);


//新規登録の処理
export function signUp() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('登録成功しました');
    window.location.href= 'index.html';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('登録に失敗しました');
    console.log(error);
    console.log(errorMessage);
    // ..
  });
}

//ログインの処理
export function logIn() {
  let email = document.getElementById("login-email");
  let password = document.getElementById("login-password");

  email = email.value;
  password = password.value;

  console.log('test');

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('ログイン成功');
    window.location.href= 'index.html';
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('ログイン失敗');
    console.log(errorMessage);
  });
}

//ログアウト処理
export function logOut() {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert('ログアウトしました');
    window.location.href= 'login-form.html';
  }).catch((error) => {
    // An error happened.
    alert('ログアウトに失敗しました');
    console.log(error);
  });
}


