Template.bots.rendered = function() {
	console.log('bots rendered!');

	// add Leaflet map for CartoBot
	
	L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

	// var map = L.map('bot-map', {
// 		doubleClickZoom: false
// 	}).setView([49.25044, -123.137], 13);
//
// 	L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

	
	// add mapbox.js
	  
	this.autorun(function () {
		if (Mapbox.loaded()) {
		  L.mapbox.accessToken = "pk.eyJ1IjoiZXZhbmJzbWl0aCIsImEiOiJJcG5XSTlvIn0.z7GQsUVmO0fPgUI9VtIOgg";
		  var map = L.mapbox.map('bot-map', "mapbox.light");
		  
		  var cartobotData = CartobotData.find({include: true}).fetch();
		  
		  console.log('cartobotData test');
		  console.log(cartobotData);
		  
		  var cartobotFeatureLayer = L.featureGroup().addTo(map);
		  
		  _.each(cartobotData,function(e,i,a){
			  // console.log([e.latitude,e.longitude]);
			  var coords = [e.latitude,e.longitude];
			  var point = L.circle(coords,15,{color: '#ee6e73', fillOpacity: 0.8});
			  point.bindPopup(moment(e.timestamp).format('h:mm:ss a'));
			  //.bindPopup();
			  cartobotFeatureLayer.addLayer(point);
		  });

		  var cartoLatLongArray = _.map(cartobotData,function(e,i,a){
 			  return [e.latitude,e.longitude];
 		  });
		  
		  // var markerArray = _.map(cartoLatLongArray,function(e,i,a){
 // 			  return L.circle(e,10,{color: '#ee6e73', fillOpacity: 0.8});
 // 		  });
		  
		  
		  // console.log("cartoLatLongArray test");
 // 		  console.log(cartoLatLongArray);
 //
 // 		  console.log('markerArray test');
 // 		  console.log(markerArray);
		  
		  
		
		  var cartoPath = L.polyline(cartoLatLongArray,{color: '#ee6e73', clickable: false}).addTo(map);
		  
		  // var cartoPoints = L.featureGroup(markerArray).eachLayer(function(layer){
 //
 // 		  });
		  		  //
		  // console.log('cartoPoints featureGroup test');
		  // console.log(cartoPoints);
		  //
		  // cartoPoints.addTo(map);
		  
		  map.fitBounds(cartoPath.getBounds());
		  
		}
	});
	
	
	
	// add nvd3.js chart for EchoBot
	
	var echoBotSvg = d3.select('#echobot-chart').append('svg');
	
	
    var echoBotChart = nv.addGraph(function() {
		
		// echoBotData code
		
		var echoBotData = [];
		var echoBotDataObj = {
			color: "#ee6e73",
			key: "EchoBotData",
			values: []
		};
		
		echoBotData.push(echoBotDataObj);
		
		echoBotData[0].values = _.map(EchobotData.find({}).fetch(),function(element, index, array){
			var obj = {
				x: moment(element.timestamp),
				y: parseInt(element.label)
			};
			return obj;
		});
		
		
		
		console.log('echoBotData fetch test');
		console.log(echoBotData);
		
		// echoBotChart code

		var chart = nv.models.lineChart()
			.xScale(d3.time.scale())
	        // .height(300)
			// .staggerLabels(false)
	        //.staggerLabels(historicalBarChart[0].values.length > 8)
	        .tooltips(true)
			.isArea(true)
	        // .showValues(true)
	        .duration(250)
	        ;
			
		
		var tickMultiFormat = d3.time.format.multi([
			["%-I:%M%p", function(d) { return d.getMinutes(); }], // not the beginning of the hour
			["%-I%p", function(d) { return d.getHours(); }], // not midnight
			["%b %-d", function(d) { return d.getDate() != 1; }], // not the first of the month
			["%b %-d", function(d) { return d.getMonth(); }], // not Jan 1st
			["%Y", function() { return true; }]
		]);
		
		chart.xAxis
			.showMaxMin(false)
			.tickPadding(10)
			.tickFormat(function (d) { return tickMultiFormat(new Date(d)); })
			;
			
		chart.yAxis
			.showMaxMin(true)
			.tickFormat(d3.format(",.0f"))
			;
	
		// console.log('chart test before called');
// 		console.log(chart);
		
		chart.showXAxis(true);
		
        d3.select('#echobot-chart svg')
            .datum(echoBotData)
            .transition()
            .call(chart);
			
        nv.utils.windowResize(chart.update);
		
        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        return chart;

		
    });
	

	// optoBot nvd3 code

	var optoBotSvg = d3.select('#optobot-chart').append('svg');
	
	
    var optoBotChart = nv.addGraph(function() {
		
		// optoBotData code
		
		var optoBotData = [];
		var optoBotDataObj = {
			color: "#ee6e73",
			key: "OptoBotData",
			values: []
		};
		optoBotData.push(optoBotDataObj);
		
		optoBotData[0].values = _.map(OptobotData.find({}).fetch(),function(element, index, array){
			var obj = {
				x: moment(element.timestamp),
				y: element.value
			};
			return obj;
		});
		
		
		
		console.log('optoBotData fetch test');
		console.log(optoBotData);
		
		// optoBotChart code

		var chart = nv.models.lineChart()
			.xScale(d3.time.scale())
	        // .height(300)
			// .staggerLabels(false)
	        //.staggerLabels(historicalBarChart[0].values.length > 8)
	        .tooltips(true)
			.isArea(true)
	        // .showValues(true)
	        .duration(250)
	        ;
			
		
		var tickMultiFormat = d3.time.format.multi([
			["%-I:%M%p", function(d) { return d.getMinutes(); }], // not the beginning of the hour
			["%-I%p", function(d) { return d.getHours(); }], // not midnight
			["%b %-d", function(d) { return d.getDate() != 1; }], // not the first of the month
			["%b %-d", function(d) { return d.getMonth(); }], // not Jan 1st
			["%Y", function() { return true; }]
		]);
		
		chart.xAxis
			.showMaxMin(false)
			.tickPadding(10)
			.tickFormat(function (d) { return tickMultiFormat(new Date(d)); })
			;
			
		chart.yAxis
			.showMaxMin(true)
			.tickFormat(d3.format(",.0f"))
			;
	
		// console.log('chart test before called');
// 		console.log(chart);
		
		chart.showXAxis(true);
		
        d3.select('#optobot-chart svg')
            .datum(optoBotData)
            .transition()
            .call(chart);
			
        nv.utils.windowResize(chart.update);
		
        chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        return chart;

		
    });
	
	console.log('nv.addGraph return test');
	
};