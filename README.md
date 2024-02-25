# nhk-easier-scraper

Simple app for getting the latest unread article from [NHK Easier](https://nhkeasier.com/). ID of every read article will be stored in the `article.json` file.

## Installation

[Node](https://nodejs.org) is required. Currently used version can be found in the `.nvmrc` file. After installing Node, run `npm i` in the projects root.

## Usage

`npm run get-article [maxId] [minId]` - get the next article url - in addition to the console output, it will copy a produced link to the clipboard

- [maxId] - optional, instead of starting with the latest article, it will start with the one with the given ID
- [minId] - optional, will stop returning articles with ID lower than the given one

  How to find the ID for a certain article? When on the article page, there is a number at the end of the URL, e.g. for `https://nhkeasier.com/story/1234/` the ID is `1234`.

`npm run count` - print a number of articles read so far

If you don't want to type these commands every time, you can use a script suitable for your OS (examples in the `scripts` folder). I can be placed e.g. on the desktop and run with a double click. `cd` paths in the scripts should be adjusted to the actual location of the project.

`npm run build` - this will run when installing dependencies with npm - you may need to run it manually if any changes are made to the code
