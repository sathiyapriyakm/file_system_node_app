import express from "express";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const PORT=process.env.PORT;

// making express listen to our request at port 3001
app.listen(PORT, () => {
  console.log("server started in port number...",PORT);
});

// this is for default request
app.get("/", (req, res) => {
  res.send("Welcome to APP <br><br><br>"+
      "1. To create file use =>  /createfile <br>" +
      "2. To get filelist use  => /getfilelist<br>"
  );
});

// when user enters "createFIle" this function will get called and
//file with current date-time will be created with timestamp as body of file
app.get("/createfile", (req, res) => {
  const { fileName, timestamp } = getFileDate();
  fs.writeFile(`./Backup/${fileName}.txt`,timestamp, (err) => {
    if (err) console.lor(err);
    else console.log("file created" + fileName);
  });
  res.send(`file Created with name ${fileName}.txt with content ${timestamp}`);
});

app.get("/getfilelist", (req, res) => {
  fs.readdir("./Backup/", (err, files) => {
    if (files.length == 0) {
      res.send("No files in directory");
    } else {
      let fileList = "Files in directory are<br>";
      files.forEach((file) => {
        fileList += file + "<br>";
      });
      res.send(fileList);
    }
  });
});

// this function is written to get current timestamp and date-time
function getFileDate() {
  
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hrs = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  var timestamp = hrs+"hrs"+minutes+"mins"+seconds+"secs";
  let fileName =
    date + "-" + month + "-" + year + " " + hrs + "_" + minutes + "_" + seconds;

  return { fileName, timestamp };
}
