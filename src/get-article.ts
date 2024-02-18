import * as fs from "fs";
import { parse } from "node-html-parser";
import clipboard from "clipboardy";

const articlesPath = "articles.json";
const nhkEasierUrlBase = new URL("https://nhkeasier.com");

const run = async () => {
  const response = await fetch(nhkEasierUrlBase);
  const html = await response.text();
  const parsedHtml = parse(html);

  const href = parsedHtml
    .querySelector("main > article > h4 > a")
    ?.getAttribute("href");
  if (!href) {
    throw new Error("Error while getting the article link.");
  }

  let latestArticleId = Number(href.replace(/\D/g, ""));

  const readArticlesIds = fs.existsSync(articlesPath)
    ? JSON.parse(fs.readFileSync(articlesPath).toString())
    : [];

  while (latestArticleId > 0 && readArticlesIds.includes(latestArticleId)) {
    latestArticleId--;
  }

  if (latestArticleId === 0) {
    console.log("No unread articles");
    return;
  }

  fs.writeFileSync(
    articlesPath,
    JSON.stringify([...readArticlesIds, latestArticleId])
  );

  const storyUrl = `https://nhkeasier.com/story/${latestArticleId}/`;
  console.log(storyUrl);
  clipboard.writeSync(storyUrl);
};

run();
