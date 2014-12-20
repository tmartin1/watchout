// build board
var height = 400;
var width = 800;
var board = d3.select("body").append("svg")
    .attr("id", "gameboard")
    .attr("width", width)
    .attr("height", height)
  .append("g");

// define dragging behavior
var drag = d3.behavior.drag()
    .on("drag", function() {
      d3.select(this)
      .attr("cx",d3.event.x)
      .attr("cy",d3.event.y);
    });
;

//detect player-asteroid collision

//write collision detection function
////when player.cx to cx+20 or cy to cy+20
////equals any asteroid x to x+50 or y to y+50
//console.log("ouch");
//
//.call that funciton onto player
setInterval(function(){
  if (player.attr("cx") + 25 <= asteroids.each(d.attr("x"))
  && player.attr("cx") - 25 >= asteroids.each(d.attr("x"))
  && player.attr("cy") + 25 <= asteroids.each(d.attr("y"))
  && player.attr("cy") - 25 >= asteroids.each(d.attr("y")) ) {
    console.dir(asteroids);
  }
  console.dir(asteroids.each(function(d){return d.attr("x")}));
},2000)


var smash = function(){
  var pcx = d3.select(".player").attr("cx");
  var pcy = d3.select(".player").attr("cy");

}

// create player
var player = d3.select("g").append("circle")
    .attr("class","player")
    .attr("r",20)
    .attr("cx", width/2)
    .attr("cy", height/2);

//Add drag behavior to player
    player.call(drag);

    player.on("tick",function(){
      if ( d3.select(this).attr("cx") < d3.selectAll(".asteroid").attr("x") + 50
        && d3.select(this).attr("cx") > d3.selectAll(".asteroid").attr("x")
        && d3.select(this).attr("cy") < d3.selectAll(".asteroid").attr("y") + 50
        && d3.select(this).attr("cy") > d3.selectAll(".asteroid").attr("y")
        ) {
        console.log("impact!");
      }
      console.log("ticking!");
    });

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
  // redefine the data
  for (var i=0; i<data.length; i++) {
    data[i][0] = Math.random();
    data[i][1] = Math.random();
  }
  update(data);
}, 1000);

var asteroids = d3.selectAll(".asteroid");


// determine collision


// track score


// reset score on collision






