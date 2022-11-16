import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import bodyParser from 'body-parser';
import cors from 'cors';
const __filename = fileURLToPath(import.meta.url);
import fs from "fs";
const __dirname = path.dirname(__filename);
app.use(cors({
  origin: ['http://127.0.0.1','http://localhost']
}));
app.use(express.static(__dirname + "/public"));
app.use(
  "/build/",
  express.static(path.join(__dirname, "node_modules/three/build"))
);
app.use(
  "/jsm/",
  express.static(path.join(__dirname, "node_modules/three/examples/jsm"))
);
app.use(
  "/fetch/",
  express.static(path.join(__dirname, "node_modules/node-fetch/src"))
);


app.listen(3000, () => console.log("Visit http://127.0.0.1:3000"));
var data = fs
  .readFileSync("./span.csv")
  .toString() // convert Buffer to string
  .split("\n") // split string to lines
  .map((e) => e.trim()) // remove white spaces for each line
  .map((e) => e.split(",").map((e) => e.trim())); // split each line to array

// console.log(data)
var array_x_coordinate = [];
var array_y_coordinate = [];
var array_z_coordinate = [];
// let regExpLiteral = /(.*?)\)/
for (let step = 1; step < data.length - 1; step++) {
  let x_coordinate = parseFloat(data[step][0]);
  let y_coordinate = parseFloat(data[step][1]);
  let z_coordinate = parseFloat(data[step][2]);
  let i = step - 1;
  array_x_coordinate[i] = x_coordinate;
  array_y_coordinate[i] = y_coordinate;
  array_z_coordinate[i] = z_coordinate;
}

//   console.log(array_x_coordinate)
//   console.log(array_y_coordinate)
//   console.log(array_z_coordinate)
// console.log(array_x_coordinate.length)
app.get("/get_coordinates", function (req, res) {
  res
    .status(200)
    .json({
      x: array_x_coordinate,
      y: array_y_coordinate,
      z: array_z_coordinate,
    });
});


