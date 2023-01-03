"use strict";

const fsP = require("fs/promises");
const axios = require("axios")

/* use axios to return the first 20 characters of a url html */
async function webCat(path){
  let resp;
  try{
    resp = await axios.get(path);
  }
  catch(err){
    console.log(`"Error fetching "${path}:`)
    console.log("Error: Request failed with status code 404")
    process.exit(1);
  }
  console.log(resp.data.slice(0, 20, "..."));
}

/** return the contents of a the text file in the argument */
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

// cat(process.argv[2]);
if(process.argv[2].endsWith('txt')){
  cat(process.argv[2])
}
else if(process.argv[2].startsWith('http://')){
  webCat(process.argv[2])
}
else{
  console.log("input is neither a text file or valid url")
}


