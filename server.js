import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

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

    if(life <= 0) {
      return new Response(0);
    }
    else {
      reqCount++;
      return new Response(orgFloor(life));
    }
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
