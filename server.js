import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("ハルトマン");
  }

  if (req.method === "GET" && pathname === "/location-information") {
    const pos = await getCurrentPosition();
    console.log(pos.coords);
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const acc = position.coords.accuracy;

    const txt = document.getElementById("txt"); // テスト用
    txt.innerHTML = "緯度: " + lat + "<br>"   // 緯度
                  + "経度: " + lng + "<br>"   // 経度
                  + "精度: " + acc + "<br>"; // その精度
  }

  const calcDistance = (lat1, lng1, lat2, lng2) => {
    const R = Math.PI / 180;
    lat1 *= R;
    lng1 *= R;
    lat2 *= R;
    lng2 *= R;
    return 6371000 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
    /* https://ja.wikipedia.org/wiki/大円距離 */
  };

  if (req.method === "GET" && pathname === "/temperature-humidity") {
    const amedasURL = "https://www.jma.go.jp/bosai/amedas/const/amedastable.json";
    const generateDateimeString = () => {
      const nowTime = new Date(); // 現在時刻を取得
      nowTime.setHours((new Date()).getHours() -1); // 最終更新にHoursを調整
      return nowTime.getFullYear().toString()                       // 年
             + (nowTime.getMonth() + 1).toString().padStart(2, '0') // 月
             + nowTime.getDate().toString().padStart(2, '0')        // 日
             + nowTime.getHours().toString().padStart(2, '0')       // 時
             + "0000";                                              // 分、秒
    }
    const queryDatetime = generateDateimeString()

  }
 


  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
