import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  const maxlife = 100;
  let life = 100;
  let old = 20;
  let temp = 30;
  let humidity = 50;

  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    return new Response("ハルトマン");
  }

  if (req.method === "GET" && pathname === "/Life-gauge") {
    life -= old * (temp + humidity / 100) * 0.01;
    return new Response(life);
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
