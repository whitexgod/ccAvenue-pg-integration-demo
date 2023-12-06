export const cancelRes = (req, res, next) => {
  try {
    req.on("end", function () {
      const htmlcode =
        '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head>Payment Cancelled <a href="http://localhost:5174/ ">Click here to go back to App</a></body></html>';
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
