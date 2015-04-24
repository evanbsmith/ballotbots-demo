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
			  var point = L.circle(coords,10,{color: '#ee6e73', fillOpacity: 0.8});
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
	
	
	
	// add Chart.js chart for EchoBot
	
	var echoChartData = {
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
	    datasets: [
	        {
	            label: "My First dataset",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: [65, 59, 80, 81, 56, 55, 40]
	        },
	        {
	            label: "My Second dataset",
	            fillColor: "rgba(151,187,205,0.2)",
	            strokeColor: "rgba(151,187,205,1)",
	            pointColor: "rgba(151,187,205,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: [28, 48, 40, 19, 86, 27, 90]
	        }
	    ]
	};
	
	var echoBotChartContext = this.$('#echobot-chart').get(0).getContext('2d');
	
	var echoBotChart = new Chart(echoBotChartContext).Line(echoChartData, {
		responsive: true,
		maintainAspectRatio: false
	});
	
	// add Chart.js chart for OptoBot
	
	// var optoChartData = {
	//     labels: ["January", "February", "March", "April", "May", "June", "July"],
	//     datasets: [
	//         {
	//             label: "My Second dataset",
	//             fillColor: "rgba(151,187,205,0.2)",
	//             strokeColor: "rgba(151,187,205,1)",
	//             pointColor: "rgba(151,187,205,1)",
	//             pointStrokeColor: "#fff",
	//             pointHighlightFill: "#fff",
	//             pointHighlightStroke: "rgba(151,187,205,1)",
	//             data: [28, 48, 40, 19, 86, 27, 90]
	//         }
	//     ]
	// };
	//
	// var labelsTest = _.pluck(OptobotData.find({}).fetch(),'timestamp');
	// labelsTest = _.map(labelsTest,function(el,i,array){
	// 	return moment(el).format('h:mm');
	// });
	// var dataTest = _.pluck(OptobotData.find({}).fetch(),'value');
	// console.log('labelsTest');
	// console.log(labelsTest);
	//
	//
	// var optoChartDataReal = {
	//     labels: labelsTest,
	//     datasets: [
	//         {
	//             label: "My Second dataset",
	//             fillColor: "rgba(151,187,205,0.2)",
	//             strokeColor: "rgba(151,187,205,1)",
	//             pointColor: "rgba(151,187,205,1)",
	//             pointStrokeColor: "#fff",
	//             pointHighlightFill: "#fff",
	//             pointHighlightStroke: "rgba(151,187,205,1)",
	//             data: dataTest
	//         }
	//     ]
	// };
	//
	// var optoBotChartContext = this.$('#optobot-chart').get(0).getContext('2d');
	//
	// var optoBotChart = new Chart(optoBotChartContext).Line(optoChartDataReal, {
	// 	responsive: true,
	// 	maintainAspectRatio: false
	// });
	
	
	
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
				x: element.timestamp,
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