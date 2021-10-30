/*$(document).ready(function(){
  getFrontPage();
});*/

var width = 500,
    height = 500,
    nodeMin = 3;
var force, nodes, links, svg, OP;
var names = {};
var nodecolor = {};
var discussion_url;
var loading_gif = new Image();
loading_gif.src = "./img/ajax-loader.gif";

var baseURL= location.pathname

var loading_gif_small = new Image();
loading_gif_small.src = "./img/small-loader.gif";


//Create tooltip element
var tooltip = d3.select("#chart")
.append("div")
.attr("class", "large-3 columns")
.attr("id", "tooltip")
.style("position", "absolute")
.style("z-index", "10")
.style("opacity", 0);


function setupGraph(){
  $("#chart").empty();
  $(".network").empty();

  names = {};
  nodecolor = {};

  force = d3.layout.force()
    .charge(-100)
    .linkDistance(20)
    .size([width, height]);

  nodes = force.nodes(),
        links = force.links();

  force.on("tick", function () {
    svg.selectAll("line.link")
    .attr("x1", function (d) { return d.source.x; })
    .attr("y1", function (d) { return d.source.y; })
    .attr("x2", function (d) { return d.target.x; })
    .attr("y2", function (d) { return d.target.y; });

  svg.selectAll("circle.node")
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; });
  });


  d3.select("svg").remove();
  svg = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class","network");
}

function updateNetwork(){
  var link = svg.selectAll("line.link")
    .data(links, function (d) { return d.source.id + "-" + d.target.id;});

  link.enter().insert("svg:line", "circle.node")
    .attr("class", "link")
    .style("stroke-width", function(d) { return 2; })
    .style("stroke", "gray")
    .style("opacity",0.8);

  var node = svg.selectAll("circle.node")
    .data(nodes, function (d) {return d.id;});

  var nodeEnter = node.enter().append("svg:circle")
    .attr("class", "node")
    .call(force.drag)
    .attr("r", function(d){
      if(d.score>=0){
        return nodeMin + Math.pow(d.score, 1/(2.7));
      }
      return 1;
    })
  .style("opacity",0.8)
    .on("mouseover", displayTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseout", removeTooltip)
    .call(force.drag)

    force.start();
  //colorNodes();
}

function getColor(value){
    //value from 0 to 1
    var hue=((1-value)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}

function colorcode_commment(comment) {
  //console.log(comment);

  //commentData = comment.replace(/\W/g, ' ');
  var postData = '{ comment: { text: "' + commentData + '" }, languages: ["en"], requestedAttributes: {TOXICITY:{ } } }';

  var score = 0;

  /*jQuery.ajax({
    url: 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyDyRDMXjs3UFWxmsAcyBnkTG5dLgK4Jjzw',
    type: "POST",
    data: postData,
    dataType: "json",
    async: false,
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      //var comment = document.getElementById(this.indexValue.id);
      score = data.attributeScores.TOXICITY.summaryScore.value;
      //console.log(score);
      //return score

    }
  });*/
  score = 90;

  return score;
}

function colorNodes(){
  //console.log(nodes);
  //for(name in nodecolor){
  for(var node in nodes){
    //nodecolor[name]=d3.rgb(255*Math.random(), 255*Math.random(), 255*Math.random())
    //console.log(nodes[node]);

    //x = colorcode_commment(nodes[node].body);
    var x = Math.random(100);

    var myColor = d3.rgb(getColor(x));
    //console.log("what is it", x, myColor);

    nodecolor[nodes[node].name]=myColor;
  }

  //set colors
  svg.selectAll("circle")
    .style("fill", function(d){

      if (d.name === OP.name){
        return "purple";
      }else{
        //console.log(d);
        //return nodecolor[d.name];
        //x = Math.random();
        //x = colorcode_commment(d.body);
        //myColor = d3.rgb(getColor(x));
        //console.log(nodecolor[node.name]);
        return nodecolor[d.name];
      }
    })
}

function displayTooltip(node){
  var pos = d3.mouse(this);

  tooltip.html(
      "<span id='name'>"+node.name+"</span> : "+
      showLinks(node.body)
      )
    .style("top", (pos[1])+"px")
    .style("left",(pos[0])+"px")
    .style("z-index", 10)
    .style("opacity", .9)
    $("#tooltip a").append(loading_gif_small);
    $("#tooltip a").embedly({
      query: {maxheight: 100},
      done: function(){$(this).remove(loading_gif_small);}
    });
}

function moveTooltip(node){
  var pos = d3.mouse(this);
  tooltip
    .style("top", (d3.event.pageY+10)+"px")
    .style("left",(d3.event.pageX+10)+"px");
}

function removeTooltip(node){
  tooltip
    .style("z-index",  -1)
    .style("opacity", 0)    //Make tooltip invisible
    svg.selectAll("circle")
    .transition()
    .style("opacity", 0.8);
}

// from http://dzone.com/snippets/validate-url-regexp
function showLinks(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1'>$1</a>");
}

function displayPreview(e, preview){
  var pos = [e.pageX, e.pageY+20]
    tooltip.html(preview.innerHTML)
    .style("top", (pos[1])+"px")
    .style("left",(pos[0])+"px")
    .style("z-index", 10)
    .style("opacity", .9)
}

$("#input").click(function(){
  buildNetwork($("input").val());
})


//===========================================

//get front page
function getFrontPage(){
  console.log("does it get here");
  $.getJSON("https://reddit.com/.json?jsonp=?", function(json){
    console.log(json);
    articles = json["data"]["children"];
    url = "http://reddit.com"+articles[0]["data"]["permalink"];
    var discussion = location.search.substring(12);
    if (discussion===""){
      buildNetwork(url);
    }
    else{
      buildNetwork(discussion);
    }

  articles.forEach(function(article, i){

    url = "http://reddit.com"+article["data"]["permalink"];
    var rank = i+1;
    var preview = document.createElement("div");
    var embed = document.createElement("a");
    embed.href = article["data"]["url"];
    embed.innerHTML = article["data"]["url"];
    $(embed).embedly({
      query: {maxheight: 200}
    });

    $(preview).append("<strong>"+article["data"]["title"]+"</strong>");
    $(preview).append(embed);

    button = document.createElement('li');
    var a = document.createElement("a");
    a.innerHTML = rank;
    a.className="tiny button";
    $(a).attr("data-discussion", url);
    $(a).click(function(){
      buildNetwork(a.dataset.discussion)
    });
    $(a).mouseover(function(e){
      displayPreview(e, preview);
    });
    $(a).mouseout(function(){
      removeTooltip();
    });
    $(button).append(a);
    $("#stories").append(button);

  });
  }).error(function(){alert("Error loading data from Reddit, please try again");});
}


//read import from Reddit API json format
function readJSON(input){

  setupGraph();
  svg.selectAll("circle.node").remove();
  svg.selectAll("line.link").remove();
  var data = input;
  var firstNode = data[0];
  console.log("does it get to readjson", input);
  console.log("does it get to firstNode", firstNode);

  var entry = firstNode['data']['children'][0]['data'];

  var out = {}
  out.name = entry.author;
  out.id = entry.name;
  out.created = entry.created;
  out.body = entry.title;
  out.score= entry.ups - entry.downs;
  discussion_url = entry.url;
  OP = out;
  var a = document.createElement("a");
  a.href = entry.url;
  a.innerHTML = entry.url;
  $("#preview").empty();
  $("#preview").append(a);
  $(a).embedly({
    query: {maxheight: 100}
  });

  var title = document.createElement("a");
  title.href = "http://reddit.com"+ entry.permalink;
  title.target="_blank";
  title.innerHTML = "<h4 class='subheader'>"+entry.title+"</h4>";
  $("#topic_title").empty();
  $("#topic_title").append(title);
  nodes.push(out);
  var convo = data[1];

  walkGraph(convo);

  colorNodes();
}

//traverse graph
function walkGraph(entry){
  if (entry instanceof Array){
    entry.forEach(function(a){
      walkGraph(a);
    });
  }
  else{
    for (var a in entry){
      if (a =='data' || entry[a] instanceof Object){
        walkGraph(entry[a]);
      }
    }
  }
  checkIfUser(entry)
}



function checkIfUser(entry){
  var out = {};
  if (entry.hasOwnProperty('name') &&
      entry.hasOwnProperty('id') &&
      entry.hasOwnProperty('created')
     ){
    out.name = entry.author;
    out.id = entry.name;
    out.parent_id = entry.parent_id;
    out.created = entry.created;
    out.body = entry.body;
    out.score= entry.ups - entry.downs;
    nodes.push(out);
    getParentNode(out, addLink);
    addName(out);
  }
  else{
    //console.log('false');
  }
}

function addName(user){
  if (user.name in names){
    names[user.name]+=1
    nodecolor[user.name]= "red";
  }
  else{
    names[user.name]=1;
  }
}

//check for a link, between parent and child, or child and parent
function getParentNode(user, fn){
  nodes.forEach(function(node){
    if (node.id === user.parent_id){
      fn(user, node);
    }
    if (node.parent_id === user.id){
      fn(node, user);
    }
  });
}

function addLink(user, target){
  var link = { "source" : user,
    "target" : target,
    "value" : 5};
  if (links.indexOf(link)==-1){
    links.push(link);
    updateNetwork();
  }
}

function buildNetwork(url){
  req = url+".json?jsonp=?";

  window.history.pushState(req, "Title", baseURL + "?discussion="+url);
  $("#topic_title").html("<h4 class='subheader'>Loading new Network...</h4>");
  $("#preview").empty();
  $("#preview").append(loading_gif);

  console.log("request_url", req);

  $.ajax({
    //original jsonp
    dataType: "json",
    url: req,
    success: readJSON,
    error: showError
  });


}

export function buildNetwork_extension(url){

  //req = url+".json?jsonp=";
  const req = url+".json";

  /*window.history.pushState(req, "Title", baseURL + "?discussion="+url);
  $("#topic_title").html("<h4 class='subheader'>Loading new Network...</h4>");
  $("#preview").empty();
  $("#preview").append(loading_gif);

  console.log("request_url", req);

  let url = 'https://' + domain + '/user/' + this.name + '/comments.json?sort=new&limit=100';

  if (id) {
      url += '&' + type + '=' + id;
  }*/

  chrome.runtime.sendMessage({
      contentScriptQuery: "queryDiscussion",
      url: req,
      type: "json",
      error: showError
  }, function(response){
    readJSON(response.json);
  });

  //console.log(results);
}

function showError(){
  alert("something went wrong.  make sure the URL is a reddit discussion link.");
}
