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
    result.push([0,0,i]);
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
      .attr("id", function(d) { return d[2]; })
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
var asteroids = d3.selectAll(".asteroid");
var update = function(data) {
  data.transition()
    .duration(1000)
    .attr("x", function() { return Math.random() * width; })
    .attr("y", function() { return Math.random() * height; })
    .each("end",function() {
      update( d3.select(this) );
    });
};
update(asteroids);

// detect player-asteroid collision
var currentScore = 0;
var highScore = 0;
setInterval(function() {
  currentScore++;
  d3.select(".current").select("span").text(currentScore);
}, 100);

var previousCollision = false;
var collisions = 0;

var detect = function() {
  var collision = false;
  asteroids.each(function() {
    var Px = player.attr("cx");
    var Py = player.attr("cy");
    var Pr = player.attr("r");
    var currentA = d3.select(this);
    var Ax = currentA.attr("x") + 25;
    var Ay = currentA.attr("y") + 25;
    // because asteroids are square, radius is 1/2 x
    var Ar = 25;

    var dist = Math.sqrt(Math.pow(Ax-Px,2) + Math.pow(Ay-Py,2));
    var minDistance = parseInt(Ar) + parseInt(Pr);
    if (dist < minDistance) {
      collision = true;
      if (previousCollision !== collision) {
        collisions++;
      }
      if (currentScore > highScore) {
        highScore = currentScore;
        d3.select(".high").select("span").text(highScore);
      }
      d3.select(".collisions").select("span").text(collisions);
      currentScore = 0;
    }
  });
  previousCollision = collision;
};
d3.timer(detect);

