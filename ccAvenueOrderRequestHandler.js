import { config } from "./config.js";
import crypto from "crypto";
import { decrypt, encrypt } from "./ccAvenueUtilities.js";

export const postReq = (req, res, next) => {
  try {
    const orderParams = {
      order_id: crypto.randomUUID(),
      merchant_id: 1111111,
      redirect_url: "http://localhost:4000/ccavResponseHandler",
      cancel_url: "http://localhost:4000/cancel",
      integration_type: "iframe_normal",
      currency: "INR",
      language: "en",
      amount: "200",
      billing_name: "Tuhin Mukherjee",
      billing_address: "OPTIONAL",
      billing_city: "OPTIONAL",
      billing_state: "OPTIONAL bengal",
      billing_zip: "OPTIONAL",
      billing_country: "OPTIONAL",
      billing_tel: "OPTIONAL",
      billing_email: "OPTIONAL",
    };

    let encRequest = encrypt(orderParams);

    console.log(decrypt(encRequest));

    if (!encRequest) {
      return res.status(400).send({
        message: "Failed to encrypt data!",
        success: false,
      });
    }

    const URL = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${config.CC_MERCHANT_ID}&encRequest=${encRequest}&access_code=${config.CC_ACCESS_KEY}`;
    // const URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${config.CCAV_MERCHANT_ID}&encRequest=${encRequest}&access_code=${config.CCAV_ACCESS_KEY}`;

    res.status(200).send({
      data: URL,
      success: true,
    });

    console.log(URL, "url");
  } catch (error) {
    console.log(error);
    next(new Error(error));
  }
};
