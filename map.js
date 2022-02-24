var CHART_WIDTH = 360;
var CHART_HEIGHT = 360;

		d3.csv("data/pumps.csv", function (data) {
			pumps_loc = data;
			console.log(pumps_loc);

			d3.csv("data/workhouse.csv", function (data) {
				workhouse_loc = data;
				d3.csv("data/brewery.csv", function (data) {
					brewery_loc = data;
					d3.csv("data/deaths_age_sex.csv", function (data) {
						deaths = data;
						console.log(deaths);
						d3.json("data/streets.json", function (data) {
							streets = data;
							console.log(streets);
							londonMap(streets, deaths, brewery_loc, workhouse_loc);
						});
					});
				});
			});
		});


		function londonMap(streets, deaths, brewery_loc, workhouse_loc) { 
			var g = d3.select("#timel")
				.append("svg")
				.attr("id", "main")
				.attr("width", "650")
				.attr("height", "590")
				.call(d3.behavior.zoom().on("zoom", function () {
					g.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
				})) 
				.append("g")
				.attr("transform", "translate(-50,125) ");

			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();

			xScale.domain([0, 15]).range([0, CHART_WIDTH]);

			yScale.domain([15, 0]).range([0, CHART_HEIGHT]);

			var dataplot = d3.svg.line()
				.x(function (d) { return xScale(d.x); })
				.y(function (d) { return yScale(d.y); });


			g.selectAll(".line")
				.data(streets)
				.enter().append("path")
				.style('fill', 'none')
				.style('stroke', 'blue')
				.style('stroke-width', '1px')

				.attr("class", "map")
				.attr("d", dataplot)

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(300,140) rotate(-30)")
				.text("Broad Street");

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(160,120) rotate(60)")
				.text("Regent Street");

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(250,-55) rotate(-10)")
				.text("Oxford Street");

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(350,-10) rotate(67)")
				.text("Dean Street")

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.style("font-weight", "bold")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(280,-105) rotate(0)")
				.text("Map Chart")

			////////////////////////////////////////

			g.append("circle")
				.attr("r", 7)
				.style("fill", "black")
				.attr("transform", "translate(545,0) rotate(0)")

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(585,0) rotate(0)")
				.text("Male")

			g.append("circle")
				.attr("r", 6)
				.style("fill", "orange")
				.attr("transform", "translate(544,30) rotate(0)")

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(595,30) rotate(0)")
				.text("Female")

			g.append("circle")
				.attr("r", 6)
				.style("fill", "brown")
				.attr("transform", "translate(544,60) rotate(0)")

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(586,60) rotate(0)")
				.text("Pump")

			g.append("circle")
				.attr("r", 6)
				.style("fill", "green")
				.attr("transform", "translate(544,90) rotate(0)")

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(610, 90) rotate(0)")
				.text("WorkHouse")

			g.append("circle")
				.attr("r", 6)
				.style("fill", "violet")
				.attr("transform", "translate(544,120) rotate(0)")

			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(599,120) rotate(0)")
				.text("Brewery")

			plotPumps(pumps_loc);
			plotDeaths(deaths);
			plotWorkhouse(workhouse_loc);
			plotBrewery(brewery_loc)
		}
  
		function plotPumps(data) {
			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();
			xScale.domain([0, 15]).range([0, CHART_WIDTH]);

			yScale.domain([15, 0]).range([0, CHART_HEIGHT]);

			var pumps = d3.select('#main').select('g').selectAll(".circle_p").data(data);

			pumps.enter().append("circle")
				.attr("r", 6)
				.style("fill", "brown")
				.attr("class", "circle_p");

			pumps
				.attr("cx", function (d) { return xScale(d.x); })
				.attr("cy", function (d) { return yScale(d.y); });
		}



		function plotDeaths(data) {
			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();
			xScale.domain([0, 15]).range([0, CHART_WIDTH]);

			yScale.domain([15, 0]).range([0, CHART_HEIGHT]);

			var circles = d3.select('#main').select('g').selectAll(".circle_d").data(data);

			circles.enter().append("circle")
				.attr("r", 3)
				.style("fill", function (d) { if (d.gender == 0) return "black"; else return "orange" })
				.attr("class", "circle_d");

			circles
				.attr("cx", function (d) { return xScale(d.x); })
				.attr("cy", function (d) { return yScale(d.y); })

				.call(tip_age)
				.on('mouseover', tip_age.show)
				.on('mouseout', tip_age.hide);

			circles.exit().remove();
		}

		var tip_age = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function (d) {
				return "<strong>Age:</strong> <span style='color:red'>" + d.age_real + "</span>";
			})



		function plotWorkhouse(data) {

			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();
			xScale.domain([0, 15]).range([0, CHART_WIDTH]);

			yScale.domain([15, 0]).range([0, CHART_HEIGHT]);

			var circles = d3.select('#main').select('g').selectAll(".circle_w").data(data);

			circles.enter().append("circle")
				.attr("r", 13)
				.style("fill", "Green")
				.attr("class", "circle_w");

			circles
				.attr("cx", function (d) { return xScale(d.x); })
				.attr("cy", function (d) { return yScale(d.y); });

			circles.exit().remove();
		}


		function plotBrewery(data) {

			var xScale = d3.scale.linear();
			var yScale = d3.scale.linear();
			xScale.domain([0, 15]).range([0, CHART_WIDTH]);

			yScale.domain([15, 0]).range([0, CHART_HEIGHT]);

			var circles = d3.select('#main').select('g').selectAll(".circle_b").data(data);

			circles.enter().append("circle")
				.attr("r", 10)
				.style("fill", "violet")
				.attr("class", "circle_b");

			circles
				.attr("cx", function (d) { return xScale(d.x); })
				.attr("cy", function (d) { return yScale(d.y); });

			circles.exit().remove();
		}

		function draw_cumulative(data) {
			tip.show(data);
			plotPumps(pumps_loc);
			plotDeaths(deaths.slice(0, data.total));
		}


		var tip_deaths = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function (d) {
				return "<strong>Deaths:</strong> <span style='color:red'>" + d.deaths + "</span>";
			})

		d3.csv("data/deathdays.csv", function (data) {

			plotTimeline(data);
		});

		function plotTimeline(data) {

			var g = d3.select("#timeline1")
				.append("svg")
				.attr("id", "timeline")

				.attr("width", "700")
				.attr("height", "600")

				.append("g")
				.attr("transform", "translate(50,220)");

			var xScale = d3.scale.ordinal();
			var yScale = d3.scale.linear();
			xScale.domain(data.map(function (d) { return d.date; })).rangeRoundBands([0, 520], 0.1);

			yScale.domain([0, 15]).range([0, 30]);

			var rect = d3.select('#timeline').select('g').selectAll(".bar1").data(data);

			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")



			d3.select('#timeline').select('g').append('g')
				.attr("class", "axis")
				.attr("transform", "translate(0," + 130 + ")")
				.call(xAxis)
				.selectAll("text")
				.attr("y", 0)
				.attr("x", 9)
				.attr("dy", ".35em")
				.attr("transform", "rotate(90)")
				.style("text-anchor", "start"); 

			rect.enter().append("rect")
				.attr("width", 1)
				.attr("height", function (d) { return yScale(d.deaths); })


			rect
				.attr("class", "bar1")
				.attr("x", function (d) { return xScale(d.date); })

				.attr("y", function (d) { return 130 - yScale(d.deaths); })

				.call(tip)

				.on('mouseover', draw_cumulative)
				.on('mouseout', tip.hide);


			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(200,180) rotate(0)")
				.text("Date")



			g.append("text")
				.style("fill", "black")
				.style("font-size", "16px")
				.style("font-weight", "bold")
				.attr("dy", ".35em")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(190,-190) rotate(0)")
				.text("Timeline Chart")

		}


		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function (d) {
				return "<br><strong> Day:</strong> <span style='color:red'>" + d.day + "</span></br>" + "<strong>Deaths:</strong> <span style='color:red'>" + d.deaths + "</span>" + "<br><strong>Total Deaths:</strong> <span style='color:red'>" + d.total + "</span></br>";
			})

///////////////////////////////////////////////////

d3.csv("data/age_distribution.csv", function(data){
	AgeGraph(data)
});
	
function AgeGraph(data)
{

	var xScale = d3.scale.ordinal();
	var yScale = d3.scale.linear();
	xScale.domain(data.map(function(d) { return d.age; })).rangeRoundBands([0, 510], 0.7);
	
	yScale.domain([0,200]).range( [0,150]);			

	var rect = d3.select('#ageGraph').select('g').selectAll("dot").data(data);

	var xAxis = d3.svg.axis()
		   .scale(xScale)
			.orient("bottom")			

	 d3.select('#ageGraph').select('g').append('g')
			 .attr("class", "axis")
			 .attr("transform","translate(0," +-130 + ")")
			   .call(xAxis)
	  .selectAll("text")
		  .attr("y", 13)
		   .attr("x", -13)
		  .attr("dy", ".35em")
		   .attr("transform", "rotate(0)")
		  .style("text-anchor", "start");


	rect.enter().append("rect")
	  .attr("width", 20)
	  .attr("height", function (d){return yScale(d.deaths); }) 
	  .style("fill","yellowgreen")
	  

	rect
	  .attr("class", "bar2")
	  .attr("x", function (d) {return xScale(d.age); })
	  .attr("y", function (d){ return -130- yScale(d.deaths); })
	  .call(tip_deaths)
	  .on('mouseover', tip_deaths.show)
	  .on('mouseout', tip_deaths.hide);
	  
	  
}

d3.csv("data/gender_distribution.csv", function(data){
	GenderGraph(data)
});

function GenderGraph(data)
{
	var xScale = d3.scale.ordinal();
	var yScale = d3.scale.linear();
	xScale.domain(data.map(function(d) { return d.gender; })).rangeRoundBands([0, 210], 0.8);
	
	yScale.domain([0,200]).range( [0,150]);			

	var rect = d3.select('#genderGraph').select('g').selectAll(".bar2").data(data);

	var xAxis = d3.svg.axis()
		   .scale(xScale)
			.orient("bottom")			

	 d3.select('#genderGraph').select('g').append('g')
			 .attr("class", "axis")
			 .attr("transform","translate(0," +-130 + ")")
			   .call(xAxis)
	  .selectAll("text")
		  .attr("y", 13)
		   .attr("x", -13)
		  .attr("dy", ".35em")
		   .attr("transform", "rotate(0)")
		  .style("text-anchor", "start");


	rect.enter().append("rect")
	  .attr("width", 15)
	  .attr("height", function (d){return yScale(d.deaths); }) 
	  .style("fill", function (d){if(d.gender=='male') return "black"; else return "orange"})

	rect
	  .attr("class", "bar2")
	  .attr("x", function (d) {return xScale(d.gender); })
	  .attr("y", function (d){ return -130- yScale(d.deaths); })
	  
	  .call(tip_deaths)
	  .on('mouseover', tip_deaths.show)
	  .on('mouseout', tip_deaths.hide);
	  
	  
}		

var tip_deaths = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
		return "<strong>Deaths:</strong> <span style='color:red'>" + d.deaths + "</span>";
  })		
