import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  const maxlife = 100;
  let life = 100;
  let gender = "man";
  let old = 20;
  let temp = 30;
  let humidity = 50;

  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("ハルトマン");
  }

  if (req.method === "GET" && pathname === "/life-gauge") {
    if (gender == "man") {
      life -= old * (temp + humidity / 100) * 0.01;
    }
    else if (gender == "woman") {
      life -= old * (temp + humidity / 100) * 0.015;
    }
    else if (gender == "other") {
      life -= old * (temp + humidity / 100) * 0.012;
    }

    return new Response(life);
  }

  if(req.method === "POST" && pathname === "/temp-humid") {
    const requestJson = await req.json();
    const lat = requestJson.lat;
    const lng = requestJson.lng;

    // 最短の観測所を求める予定

    const getNowTime = () => {
      const nowTime = new Date();                                   // 現在の時刻を入手
      if(nowTime.getMinutes() < 10){                                // 最新のアメダスデータ時刻に調整
        nowTime.setHours((new Date()).getHours() -1);
        nowTime.setMinutes(40);
      }else{
        nowTime.setMinutes((new Date()).getMinutes() -20);
      }
      return nowTime.getFullYear().toString()                       // 年
           + (nowTime.getMonth() + 1).toString().padStart(2, '0')   // 月
           + nowTime.getDate().toString().padStart(2, '0')          // 日
           + nowTime.getHours().toString().padStart(2, '0')         // 時
           + nowTime.getMinutes().toString().substr(0,1) + "0"      // 分（10分単位）
           + "00";                                                  // 秒
    }


    const txt = "test";
    return new Response(txt); // 適当に文字列を返しておく
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
