import express from "express";
import cors from "cors";
import { postReq } from "./ccAvenueOrderRequestHandler.js";
import { postRes } from "./ccAvenueOrderResponseHandler.js";
import { cancelRes } from "./ccAvenueCancelRequestHandler.js";
import { refundReq } from "./ccAvenueRefundRequestHandler.js";

const app = express();

export const server = app.listen(4000, () => {
  console.log(`Server is running at port 4000`);
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200);
  res.send("Hello");
});

app.use((error, req, res, next) => {
  res.status(404).send({ success: false });
});

app.post("/ccavRequestHandler", postReq);

app.post("/ccavResponseHandler", postRes);

app.post("/refund", refundReq);

app.post("/cancel", cancelRes);
