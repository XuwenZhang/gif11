// https://mappa.js.org/docs/getting-started.html


// Other possible interesting videos:
// Subscribers data: https://www.youtube.com/watch?v=Ae73YY_GAU8&feature=youtu.be
// Earthquake Data: https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=1083s

// For integrating images: https://www.youtube.com/watch?v=FVYGyaxG4To
let canvas;

let myMap;

let options = {
  lat: 0,
  lng: 0,
  zoom: 1,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}


const mappa = new Mappa('Leaflet');




function preload() {

  xuwenPath = loadTable('xuwen.csv', 'csv', 'header');

}


function setup() {
  canvas = createCanvas(800, 800);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);


  myMap.onChange(drawPath.bind(null, xuwenPath));

}


function draw() {
}


function drawPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {

    const latitude = Number(path.getString(i, 'reclat'));
    const longitude = Number(path.getString(i, 'reclon'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);

      noStroke();

      fill(230, 130, 30, 45);
      ellipse(pos.x, pos.y, 20, 20)

      stroke('Yellow');
      strokeWeight(4);
      line(pos.x, pos.y, pos.x, pos.y);
    }
  }
}
