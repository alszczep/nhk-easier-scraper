import * as fs from "fs";
import { parse } from "node-html-parser";
import clipboard from "clipboardy";

const articlesPath = "articles.json";
const nhkEasierUrlBase = new URL("https://nhkeasier.com");

const run = async () => {
  const maxId = process.argv[2] ? Number(process.argv[2]) : undefined;
  const minId = process.argv[3] ? Number(process.argv[3]) : undefined;

  if (maxId && isNaN(maxId)) {
    throw new Error("maxId should be a number");
  }

  if (minId && isNaN(minId)) {
    throw new Error("minId should be a number");
  }

  if (maxId && minId && minId >= maxId) {
    throw new Error("minId should be lower than maxId");
  }

  const response = await fetch(nhkEasierUrlBase);
  const html = await response.text();
  const parsedHtml = parse(html);

  const href = parsedHtml
    .querySelector("article > h4 > a")
    ?.getAttribute("href");
  if (!href) {
    throw new Error("Error while getting the article link");
  }

  const latestAvailableArticleId = Number(href.replace(/\D/g, ""));

  const readArticlesIds = fs.existsSync(articlesPath)
    ? JSON.parse(fs.readFileSync(articlesPath).toString())
    : [];

  let latestArticleId = Math.min(
    maxId ?? latestAvailableArticleId,
    latestAvailableArticleId
  );
  const firstArticleId = Math.max(minId ?? 1, 1);

  while (
    latestArticleId >= firstArticleId &&
    readArticlesIds.includes(latestArticleId)
  ) {
    latestArticleId--;
  }

  if (latestArticleId < firstArticleId) {
    throw new Error("No unread articles");
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
