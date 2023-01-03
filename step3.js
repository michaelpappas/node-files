"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

/* use axios to return the first 20 characters of a url html */
async function webCat(path) {
  let resp;
  try {
    resp = await axios.get(path);
  } catch (err) {
    console.log(`"Error fetching "${path}:`);
    console.log("Error: Request failed with status code 404");
    process.exit(1);
  }
  return resp.data.slice(0, 20, "...");
}

/** return the contents of a the text file in the argument */
async function cat(path) {
  let content;
  try {
    content = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }
  return content;
}

/** Reads or writes files */
async function readOrWrite(path, outputFile) {
  let content;

  if (path.endsWith("txt")) {
    content = await cat(path);
  } else if (path.startsWith("http://")) {
    content = await webCat(path);
  }

  if (outputFile) {
    try {
      await fsP.writeFile(outputFile, content, "utf8");
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  } else {
    console.log(content);
  }
}

let path;
let output;

if (process.argv[2] == "--out") {
  path = process.argv[4];
  output = process.argv[3];
  readOrWrite(path, output);
} else {
  path = process.argv[2];
  readOrWrite(path);
}
