Template.bots.rendered = function() {
	// add Leaflet map for CartoBot
	
	L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

	  var map = L.map('bot-map', {
	    doubleClickZoom: false
	  }).setView([49.25044, -123.137], 13);

	  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
	console.log('bots rendered!');
	
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
	
	var optoChartData = {
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
	
	var optoBotChartContext = this.$('#optobot-chart').get(0).getContext('2d');
	
	var optoBotChart = new Chart(optoBotChartContext).Line(optoChartData, {
		responsive: true,
		maintainAspectRatio: false
	});
	
};