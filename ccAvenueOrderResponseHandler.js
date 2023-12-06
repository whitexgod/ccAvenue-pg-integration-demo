import { decrypt } from "./ccAvenueUtilities.js";
import qs from "querystring";

export const postRes = (req, res, next) => {
  console.log("response route hit!")
  try {
    let ccavEncResponse = "",
      ccavResponse = "",
      ccavPOST = "";

    req.on("data", function (data) {
      ccavEncResponse += data;
      ccavPOST = qs.parse(ccavEncResponse);
      ccavResponse = decrypt(ccavPOST.encResp);
    });

    req.on("end", function () {
      console.log(ccavResponse);
      let pData = "";
      pData = "<table border=1 cellspacing=2 cellpadding=2><tr><td>";
      pData = pData.replace(/&/gi, "</td></tr><tr><td>");
      pData = pData + "</td></tr></table>";
      const htmlcode =
        '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head>Payment done <a href="http://localhost:5174/ ">Click here to go back to App</a></body></html>';
      res.writeHeader(200, { "Content-Type": "text/html" });
      res.write(htmlcode);
      // res.redirect("http://localhost:5174/");
      res.end();
    });
  } catch (error) {
    console.log(error);
    next(new Error(error));
  }
};
