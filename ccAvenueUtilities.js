import { config } from "./config.js";
import crypto from "crypto";

const working_key = ""; // give proper working key here

export function encrypt(plainText) {
  try {
    const data = Object.entries(plainText)
      .map(([key, value]) => `&${key}=${value}`)
      .join("");
    const m = crypto.createHash("md5");
    m.update(working_key);
    const key = m.digest();
    const iv =
      "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    let encoded = cipher.update(data, "utf8", "hex");
    encoded += cipher.final("hex");
    return encoded;
  } catch (error) {
    console.log(error);
  }
}

export function decrypt(encText) {
  try {
    const working_key = config.CCAV_WORKING_KEY;
    const m = crypto.createHash("md5");
    m.update(working_key);
    const key = m.digest();
    const iv =
      "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let decoded = decipher.update(encText, "hex", "utf8");
    decoded += decipher.final("utf8");
    const responseArray = decoded.split("&");
    const stringify = JSON.stringify(responseArray);
    const removeQ = stringify.replace(/['"]+/g, "");
    const removeS = removeQ.replace(/[[\]]/g, "");
    return removeS.split(",").reduce((o, pair) => {
      pair = pair.split("=");
      return (o[pair[0]] = pair[1]), o;
    }, {});
  } catch (error) {
    console.log(error);
  }
}
