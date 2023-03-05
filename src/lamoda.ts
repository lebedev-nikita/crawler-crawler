import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import { sendMessage } from "./_bot.js";
import { fmtError } from "./_util.js";

type MarketplaceItem = {
  url: string;
  name: string;
  triggerPrice: number;
};

const clothes: MarketplaceItem[] = [
  {
    url: "https://www.lamoda.ru/p/mp002xm1h76b/clothes-baon-futbolka/",
    name: "Футболка",
    triggerPrice: 900,
  },
];

for (const { url, name, triggerPrice } of clothes) {
  const doc = await fetch(url)
    .then((res) => res.text())
    .then((text) => new JSDOM(text).window.document)
    .catch(async (err) => {
      console.error(err);
      await sendMessage(fmtError(err.message, { url }));
      process.exit(1);
    });

  const someText = doc
    .querySelector(".x-premium-product-prices__price")
    ?.getAttribute("content");

  if (!someText) {
    await sendMessage(fmtError("Не удалось извлечь данные", { url }));
    continue;
  }

  const price = +someText;
  if (price < triggerPrice) {
    const msg = `#${name}\nЦена: ${price}\nРекомендуемая цена: ${triggerPrice}\n${url}`;
    sendMessage(msg);
  }
}
