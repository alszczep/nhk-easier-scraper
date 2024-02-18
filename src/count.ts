import * as fs from "fs";

const articlesPath = "articles.json";

let readArticlesIds = fs.existsSync(articlesPath)
  ? JSON.parse(fs.readFileSync(articlesPath).toString())
  : [];

console.log(readArticlesIds.length);
