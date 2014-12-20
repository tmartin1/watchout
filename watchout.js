// build board
var height = 400;
var width = 800;
var board = d3.select("body").append("svg")
    .attr("id", "gameboard")
    .attr("width", width)
    .attr("height", height)
  .append("g");

// populate asteroids
var asteroidMaker = function(num) {
  var result = [];
  for (var i=0; i<num; i++) {
    result.push([0,0]);
  }
  return result;
};
var data = asteroidMaker(5);

var populate = function(data) {
  var pieces = d3.select("g").selectAll("image")
      .data(data);

  pieces.enter().append("image")
      .attr("class","asteroid")
      .attr("xlink:href", "asteroid.png")
      .attr("x", function(d) { return d[0]; })
      .attr("y", function(d) { return d[1]; })
      .attr("height", 50)
      .attr("width", 50);
};
populate(data);

// Create player
var player = d3.select("g").append("circle")
    .attr("class","player")
    .attr("r",20)
    .attr("cx", width/2)
    .attr("cy", height/2);

// define dragging behavior
var drag = d3.behavior.drag()
    .on("drag", function() {
      d3.select(this)
      .attr("cx",d3.event.x)
      .attr("cy",d3.event.y);
    });
;
// Add drag behavior to player
player.call(drag);

// make pieces move
var update = function(data) {
  var pieces = d3.selectAll(".asteroid")
      .data(data)
      .transition()
        .duration(1100)
        .attr("x", function(d) { return d[0] * width; })
        .attr("y", function(d) { return d[1] * height; });
};

setInterval(function() {
  for (var i=0; i<data.length; i++) {
    data[i][0] = Math.random();
    data[i][1] = Math.random();
  }
  update(data);
}, 1000);

// detect player-asteroid collision
var asteroids = d3.selectAll(".asteroid");
var collisions = 0;
var currentScore = 0;
var highScore = 0;
setInterval(function() {
  // Increment current score
  currentScore++;
  d3.select(".current").select("span").text(currentScore);

  // find player position
  var Px = player.attr("cx");
  var Py = player.attr("cy");
  var Pr = player.attr("r");

  asteroids.each(function() {
    var currentA = d3.select(this);
    var Ax = currentA.attr("x") + 25;
    var Ay = currentA.attr("y") + 25;
    // deriving a radius from svg top left x,y
    var Ar = 25;

    var dist = Math.sqrt(Math.pow(Ax-Px,2) + Math.pow(Ay-Py,2));
    var minDistance = parseInt(Ar) + parseInt(Pr);

    if (dist < minDistance) {
      collisions++;
      d3.select(".collisions").select("span").text(collisions);
      if (currentScore > highScore) {
        highScore = currentScore;
        d3.select(".high").select("span").text(highScore);
      }
      currentScore = 0;
    }
  });
}, 10)

