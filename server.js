import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

//firebaseポリフィル
// import "https://deno.land/x/xhr@0.1.1/mod.ts";
// import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
// installGlobals();
// //firebaseライブラリ
// import firebase from "https://cdn.skypack.dev/firebase@8.7.0/app";
// import "https://cdn.skypack.dev/firebase@8.7.0/auth";
// import "https://cdn.skypack.dev/firebase@8.7.0/firestore";

// import {
//   Application,
//   Router,
//   Status,
// } from "https://deno.land/x/oak@v7.7.0/mod.ts";
// import { virtualStorage } from "https://deno.land/x/virtualstorage@0.1.0/middleware.ts";

// const firebaseConfig = JSON.parse(Deno.env.get("FIREBASE_CONFIG"));
// const firebaseApp = firebase.initializeApp(firebaseConfig, "example");
// const auth = firebase.auth(firebaseApp);
// const db = firebase.firestore(firebaseApp);

// //デプロイメントで以前にサインインしたユーザーのマップを作成
// const users = new Map();

// const router = new Router();

// // コレクション内の任意の楽曲を返す
// router.get("/songs", async (ctx) => {
//   const querySnapshot = await db.collection("songs").get();
//   ctx.response.body = querySnapshot.docs.map((doc) => doc.data());
//   ctx.response.type = "json";
// });

// // タイトルにマッチする最初のドキュメントを返します
// router.get("/songs/:title", async (ctx) => {
//   const { title } = ctx.params;
//   const querySnapshot = await db.collection("songs").where("title", "==", title)
//     .get();
//   const song = querySnapshot.docs.map((doc) => doc.data())[0];
//   if (!song) {
//     ctx.response.status = 404;
//     ctx.response.body = `The song titled "${ctx.params.title}" was not found.`;
//     ctx.response.type = "text";
//   } else {
//     ctx.response.body = querySnapshot.docs.map((doc) => doc.data())[0];
//     ctx.response.type = "json";
//   }
// });

// function isSong(value) {
//   return typeof value === "object" && value !== null && "title" in value;
// }

// // 同じタイトルの曲を削除し、新しい曲を追加します
// router.post("/songs", async (ctx) => {
//   const body = ctx.request.body();
//   if (body.type !== "json") {
//     ctx.throw(Status.BadRequest, "Must be a JSON document");
//   }
//   const song = await body.value;
//   if (!isSong(song)) {
//     ctx.throw(Status.BadRequest, "Payload was not well formed");
//   }
//   const querySnapshot = await db
//     .collection("songs")
//     .where("title", "==", song.title)
//     .get();
//   await Promise.all(querySnapshot.docs.map((doc) => doc.ref.delete()));
//   const songsRef = db.collection("songs");
//   await songsRef.add(song);
//   ctx.response.status = Status.NoContent;
// });

// //インポートしたlocalStorageミドルウェアを追加
// const app = new Application();
// app.use(virtualStorage());

// //ユーザーを認証するためのミドルウェアを追加
// app.use(async (ctx, next) => {
//   const signedInUid = ctx.cookies.get("LOGGED_IN_UID");
//   const signedInUser = signedInUid != null ? users.get(signedInUid) : undefined;
//   if (!signedInUid || !signedInUser || !auth.currentUser) {
//     const creds = await auth.signInWithEmailAndPassword(
//       Deno.env.get("FIREBASE_USERNAME"),
//       Deno.env.get("FIREBASE_PASSWORD"),
//     );
//     const { user } = creds;
//     if (user) {
//       users.set(user.uid, user);
//       ctx.cookies.set("LOGGED_IN_UID", user.uid);
//     } else if (signedInUser && signedInUid.uid !== auth.currentUser?.uid) {
//       await auth.updateCurrentUser(signedInUser);
//     }
//   }
//   return next();
// });

// //ミドルウェアアプリケーションにルーターを追加し、アプリケーションが8000をリッスンする
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });

// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

let reqCount = 1;

// 任意の桁で切り捨て
function orgFloor(value) {
  return Math.floor(value * 10) / 10;
}

serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  const maxlife = 100;
  let life = 100;
  let gender = "man";
  let old = 20;
  let temp = 30;
  let humidity = 50;

  console.log(pathname);

  if (req.method === "GET" && pathname === "/life-gauge") {
    if (gender == "man") {
      life -= old * (temp + humidity / 100) * 0.01 * reqCount;
    }
    else if (gender == "woman") {
      life -= old * (temp + humidity / 100) * 0.015 * reqCount;
    }
    else if (gender == "other") {
      life -= old * (temp + humidity / 100) * 0.012 * reqCount;
    }

    reqCount++;
    return new Response(orgFloor(life));
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
