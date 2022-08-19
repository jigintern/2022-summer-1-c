import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

// Auth
import { getAuth, signInWithEmailAndPassword , setPersistence,createUserWithEmailAndPassword, signOut,browserSessionPersistence} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js';

//Firestore
import { getFirestore,collection,addDoc} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore-lite.js';

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
// 接続情報を変数dbに格納
const db = getFirestore(app);

const auth = getAuth(app);

function getEmailFromStore(email) {
  return email;
}

function getPasswordFromStore(password) {
  return password;
}

// firebase.js
const email = getEmailFromStore();
const password = getPasswordFromStore();
if( email === null  || password === null) {
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    console.log(auth)
    console.log(auth.currentUser)
    console.log(auth.currentUser.email())
  })
}


//新規登録の処理
export function signUp() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('登録成功しました');
    window.location.href= 'info-form.html';

    const userinfo = auth.currentUser;
    console.log(userinfo.email);

    getEmailFromStore(userinfo.email);
    getPasswordFromStore(userinfo.password);
    // ...
    //
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('登録に失敗しました');
    console.log(error);
    console.log(errorMessage);
    // ..
  });

  // setPersistence(auth, browserSessionPersistence)
  // .then(() => {
  //   // Existing and future Auth states are now persisted in the current
  //   // session only. Closing the window would clear any existing state even
  //   // if a user forgets to sign out.
  //   // ...
  //   // New sign-in will be persisted with session persistence.
  //   alert('登録成功しました');
  //   return signInWithEmailAndPassword(auth, email, password);

  // })

}
const user = auth.currentUser;
    console.log(user)


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
    // window.location.href= 'index.html';
    const userinfo = auth.currentUser;
    console.log(userinfo.email);

    getEmailFromStore(user.email);
    getPasswordFromStore(user.password);
    // ...
    //

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

//コレクションへの参照
// const colRef = collection(db, "users");
// const newUserInfo = doc(colRef); // ドキュメント名の引数がないので、ランダムなIDが振られる

//プロフィール情報追加処理
export async function addInfo() {
  let username = document.getElementById('username').value;
  let age = document.getElementById('age');
  const idx = age.selectedIndex;
  const ageValue = age.options[idx].value;
  let gender = document.getElementsByName('gender');

  for (var i = 0; i <  gender.length; i++) {
    if (gender[i].checked) {
      console.log(gender[i].value);
      break;
    }
  }

  //データベースに保存する処理
  try {
    const docRef = await addDoc(collection(db, "users"), {
      age: ageValue,
      gender: gender[i].value,
      username: username
    });
    console.log("ドキュメントID ", docRef.id);
    console.log("データの保存が成功しました");
    alert('プロフィール情報を登録しました');
    window.location.href= 'index.html';
  } catch (e) {
    console.error("エラーメッセージ: ", e);
  }

  console.log(username);
  console.log(ageValue);
  console.log(gender[i].value);
}

