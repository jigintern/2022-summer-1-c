import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

let reqCount = 1;

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
      life -= old * (temp + humidity / 100) * 0.01;
    }
    else if (gender == "woman") {
      life -= old * (temp + humidity / 100) * 0.015;
    }
    else if (gender == "other") {
      life -= old * (temp + humidity / 100) * 0.012;
    }

    reqCount++;
    return new Response(life);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
