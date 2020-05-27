import https from "https";
import url from "url";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (oreq: any, ores) => {
  const parts: Array<string> = oreq.url.replace("/api/proxy/", "").split("/");

  const headers = {
    ...oreq.headers,
    referer: "https://" + parts[0],
  };
  delete headers["host"];
  proxyRequest(
    {
      host: parts[0],
      port: 443,
      path: `/${parts.slice(1).join("/")}`,
      headers,
    },
    ores
  );
};

interface proxyOptions {
  host: string;
  port: number;
  path: string;
  headers: { [key: string]: string };
}

const proxyRequest = (options: proxyOptions, res) => {
  const { host, port, path, headers } = options;
  const creq = https
    .request(
      {
        host,
        port,
        path,
        headers,
      },
      (pres) => {
        // if (pres.headers["location"]) {
        //   let loc = pres.headers["location"];
        //   console.log(loc);
        //   const rurl = new url.URL(loc);
        //   return proxyRequest(
        //     {
        //       path: rurl.pathname,
        //       host: rurl.host,
        //       port: 443,
        //       headers,
        //     },
        //     res
        //   );
        // }
        res.writeHead(pres.statusCode, pres.headers);
        pres.on("data", (chunk) => {
          res.write(chunk);
        });
        pres.on("close", () => {
          res.end();
        });
        pres.on("end", () => {
          res.end();
        });
      }
    )
    .on("error", (e) => {
      // we got an error
      console.log(e.message);
      try {
        // attempt to set error message and http status
        res.writeHead(500);
        res.write(e.message);
      } catch (e) {
        // ignore
      }
      res.end();
    });

  creq.end();
};

export default handler;
