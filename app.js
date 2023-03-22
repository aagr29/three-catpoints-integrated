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
// "https://feature-detection.virtual-tas-pipeline.real-time.community/api/worker/catenary/construct?key=AIzaSyBhmSYn1IaOu88QgC2kZ7ae0g0325czLyU&usr=test&pwd=test"

async function getCatenaryPoints(payload) {
  const response = await fetch(
    "http://localhost:80/jsonpayload",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data_res = await response.json();
  // return data_res.catPoints;
  return data_res
}
// """{"name":"Adrian","point1":[1.0,0.0,1.0],"point2":[5.5,0.0,0.80],"point3":[10.0,0.0,1.0],"end1":[0.0,0.0],"end2":[13.0,0.0]}"""
// {"name":"Adrian", "thetas":[0.0,0.0], "centreXs":[0.0,0.0], "centreYs":[0.0,0.0], "centreZs":[0.0,0.0],"lmins":[-10.0,-10.0],"lmaxs": [10.0,10.0],"alphas": [100.0, 100.0]}
let payload;
// payload= {name:"Adrian",points:[[534361.0,5212505.0,100.0], [534361.0,5212505.0,90.0]],probs:[1.0,0.5],DTMSourceGS:"gs://eq-c2rw-research/04092022_1_and_03092022_1_processing/DTM/"}
// payload={name:"Adrian", thetas:[0.0,0.0], centreXs:[0.0,0.0], centreYs:[0.0,0.0], centreZs:[0.0,0.0],lmins:[-10.0,-10.0],lmaxs: [10.0,10.0],alphas: [100.0, 100.0]}
// payload={name:"Adrian", theta:0.0, centreX:0.0, centreY:0.0, centreZ:0.0,lmin:-10.0,lmax: 10.0,alpha: 100.0}
//Initialise a project by downloading the Network Detection output model to the server's SQL database ready to be queried
// payload={name:"Adrian",project:"Testing",bigQuerySource:"eq-c2rw-research.manualNetworkBuilderTestInput",backupGSPath:"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/backupGSPath/"}
// Request plotting information for poles and conductors which make up a given bay (via Bay Id) also gives the plotting information for all nearby wires so that operator can see if a bay attached to this one has not been modelled (a bay entered by another operator on the same server will also be returned)
// payload={name:"Adrian",infoForBayId: 3528, project:"Testing",bayCreator:"InputDatabase",DTMSourceGS:"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/DTM/"}
// Model details for all poles within a bounding box
// payload={name:"Adrian",project:"Testing",polesXMin:525000.1,polesXMax:525425.0,polesYMin:5226000.0,polesYMax:5227500.0,DTMSourceGS:"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/DTM/"}
//Model details for all conductors within a bounding box
// payload={name:"Adrian",project:"Testing",conductorsXMin:525703,conductorsXMax:526500,conductorsYMin:5226000.0,conductorsYMax:5226581.526,DTMSourceGS:"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/DTM/"}
//Get latest used bayId, siteId, conductorId, poleId in the loacl database for a given user
// payload={name:"Adrian",project:"Testing",getIdsForUser:"InputDatabase"}
//delete a catenary
// payload={name:"Adrian",project:"Testing",  deleteCat:101}
//Replace a catenary
// payload={name:"Adrian",project:"Testing", replaceCat:101, theta:0.0, centreX:0.0, centreY:0.0, centreZ:0.0,lmin:-10.0,lmax: 10.0,alpha: 100.0, DTMSourceGS:"gs://pathToDTMFiles/"}
// Build a Catenary for plotting from three points on it plus the pole positions
// payload={name:"Adrian",point1:[1.0,0.0,1.0],point2:[5.5,0.0,0.80],point3:[10.0,0.0,1.0],end1:[0.0,0.0],end2:[13.0,0.0],points:[[0.14205182496663768, 0.1416422571787171, 1.289745124140968], [1.4386806338732994, 0.08171185677596166, 0.9968232823854244], [2.606386932650505, 0.14524071584300963, 0.9091032145129639], [3.9024174722867477, 0.05100926825328858, 0.836107831994011], [5.2, 0.0, 0.8008888888888884], [0.18452639447233454, 0.016481756363204546, 0.12598245516955564], [6.628501806586528, 0.06232067652426459, 0.912815666366341], [7.991125030444873, 0.006444662550676661, 0.893470094909051], [9.295854230022295, 0.06958201296267601, 1.0863089765693248], [10.44955441877392, 0.18160986267224682, 1.0861536377990944], [11.831377163634771, 0.08944660591696114, 1.3384475677288492], [13.17625843207497, 0.08630473695477231, 1.4782954519065932]],probs:[0.5,0.3,1.0,0.5,1.0,1.0,1.0,0.5,0.5,0.3,1.0,0.5]}
// a = HTTP.request("POST", "http://localhost:8000/jsonpayload", [("Content-Type", "application/json")], """{"name":"Adrian","infoForBayId": 3528, "project":"Testing","bayCreator":"InputDatabase","DTMSourceGS":"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/DTM/"}""")
// a = HTTP.request("POST", "http://localhost:8000/jsonpayload", [("Content-Type", "application/json")], """{"name":"Adrian","project":"Testing","bigQuerySource":"eq-c2rw-research.manualNetworkBuilderTestInput","backupGSPath":"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/backupGSPath/"}""")
// payload={name:"Adrian",infoForBayId: 206, project:"Testing",bayCreator:"InputDatabase",DTMSourceGS:"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/DTM/"}
// payload={name:"Adrian",project:"Testing",bigQuerySource:"eq-c2rw-research.manualNetworkBuilderTestInput",backupGSPath:"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/backupGSPath/"}






payload = {name:"Adrian",project:"Testing",bigQuerySource:"eq-c2rw-research.manualNetworkBuilderTestInput",backupGSPath:"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/backupGSPath/",DTMSourceGS:"gs://eq-c2rw-research/manualNetworkBuilder/dataForTests/DTM/", "sinkDataset": "eq-c2rw-research:manualCorrectedResultsTesting","polygon":[[-43.122079177932584, 147.29874553140093], [-43.12201234795895, 147.3233312485821], [-43.104002810880004, 147.3232364537733], [-43.104069599044145, 147.29865794440283], [-43.122079177932584, 147.29874553140093]],datum:"GDA94", zone:55, hemisphere:false}





console.log(JSON.stringify(payload))
// payload = {
  //   name: "Adrian",
  //   point1: [1.0,0.0,1.0],
  //   point2: [5.5,0.0,0.80],
  //   point3: [10.0,0.0,1.0],
  //   end1:[0.0,0.0],
  //   end2: [13.0,0.0],
  // };

  let data1 =  await getCatenaryPoints(payload);
  // let data2 =  await getCatenaryPoints(payload);
  console.log(data1)
  // console.log(data2)
  // console.log(data1.catPoints)


  