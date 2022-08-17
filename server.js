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
    const requestJson = await req.json();   // json{lat, lng}を受け取る
    const lat = requestJson.lat;
    const lng = requestJson.lng;

    // アメダスの観測地点jsonファイルを取得
    const fetchAmedasObs = async () => {
      const url = "https://www.jma.go.jp/bosai/amedas/const/amedastable.json";
      const res = await fetch(url);
      const json = await res.json();

      // jsonのテコ入れ。各地点の経度・緯度それぞれに行う。
      // 元のデータ："lat":[a, b]
      // 修正後　　："lat":[c = a+b/60, b(No Use)]
      // 意味　　　：a度b分 → c度
      Object.keys(json).map( key => {
        const amedas = json[key];
        json[key].lat = amedas.lat[0] + (amedas.lat[1] / 60);
        json[key].lon = amedas.lon[0] + (amedas.lon[1] / 60);
      });
      return json;
    }

    // 球面2点間の距離を求める（https://ja.wikipedia.org/wiki/大円距離 参照）
    const distance = (lat1, lng1, lat2, lng2) => {
      const r = 6371000;  // 地球半径
      const toRadian = Math.PI / 180;
      lat1 *= toRadian;
      lng1 *= toRadian;
      lat2 *= toRadian;
      lng2 *= toRadian;
      return r * Math.acos( Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(Math.abs(lng1-lng2)) );
    }

    const amedasObs = await fetchAmedasObs();
    console.log(lat);
    console.log(lng);
    console.log(amedasObs["11001"].lat);
    console.log(amedasObs["11001"].lon);
    const testDistance = distance(lat, lng, amedasObs["11001"].lat, amedasObs["11001"].lon);
    console.log(testDistance);

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

    // 最新のアメダス気象jsonファイルを取得
    const fetchAmedasInfo = async(nowTime) => {
      const url = "https://www.jma.go.jp/bosai/amedas/data/map/" + nowTime + ".json";
      const res = await fetch(url);
      const json = await res.json();
      return json;
    }

    const nowTime = getNowTime();
    const amedasInfo = await fetchAmedasInfo(nowTime);

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
