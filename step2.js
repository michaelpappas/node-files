"use strict"

const fsP = require("fs/promises");
const axios = require("axios")

async function webCat(path){
  try{
    const resp = await axios.get(path);
    console.log(resp.data.slice(0, 20, "..."));
  }
  catch(err){
    console.log("Error:", err)
    process.exit(1);
  }
}

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

// cat(process.argv[2]);
if(process.argv[2].endsWith('txt')){
  cat(process.argv[2])
}
else{
  webCat(process.argv[2])
}
