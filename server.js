import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("ハルトマン");
  }

  if (req.method === "GET" && pathname === "/location-information") {
    navigator.geolocation.watchPosition( (position) => {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var accu = position.coords.accuracy;
      
      var txt = document.getElementById("txt");
      txt.innerHTML = "緯度: " + lat + "<br>" 
      + "経度: " + lng + "<br>"
      + "精度: " + accu + "<br>";

      return new Response(txt);

    },(error) =>{
    },{
      enableHighAccuracy: true
    });
  }

  if (req.method === "GET" && pathname === "/temperature-humidity") {
    const url = "https://www.jma.go.jp/bosai/amedas/const/amedastable.json"
  }
 


  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
