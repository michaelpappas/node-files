"use strict"

const fsP = require("fs/promises");

/** return the contents of the text file in the argument */
async function cat(path){
  let content;
  try{
    content = await fsP.readFile(path, "utf8");
  }
  catch(err){
    console.log("Error:", err)
    process.exit(1);
  }
  console.log(content);
}

cat(process.argv[2]);
