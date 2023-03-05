import assert from "node:assert";
import fetch from "node-fetch";

const BOT_URL = process.env.BOT_URL;
assert(BOT_URL);

export const sendMessage = (message: string) => {
  return fetch(`${BOT_URL}/notify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
};
