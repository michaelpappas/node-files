"use strict"

const fsP = require("fs/promises");


async function cat(path){
  try{
    let content = await fsP.readFile(path, "utf8");
    console.log(content);
  }
  catch(err){
    console.log("Error:", err)
    process.exit(1);
  }
}

cat(process.argv[2]);
