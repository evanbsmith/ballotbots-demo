CartobotData = new Mongo.Collection('cartobotdata');

CartobotData.helpers({

});

CartobotData.before.insert(function (userId, doc) {
  doc.createdAt = moment().format();
  doc.latitude = parseFloat(doc.latitude);
  doc.longitude = parseFloat(doc.longitude);
  doc.timestamp = moment(doc.date + " " + doc.time, "D-MM-YYYY HH:mm:s").format();
  doc.include = parseInt(doc.include) === 1 ? true : false;
  
  
  // doc.feature = {
  // 	  "type": "Feature",
  // 	  "geometry" : {
  // 		  "type" : "Point",
  // 		  "coordinates" : [doc.longitude,doc.latitude]
  // 	  },
  // 	  "properties" : doc
  // };
});


// CSVToArray( strData, strDelimiter )

if (Meteor.isServer) {
	Meteor.startup(function () {
		console.log('cartoBotData count: ' + CartobotData.find().count());
		console.log(CartobotData.findOne());
        if(CartobotData.find().count() === 0){
            var csvData = Assets.getText('cartobotdata.csv');
			// console.log('csvData raw');
// 			console.log(csvData);
// 			console.log('optobotdata - imported');
			var dataAsArray = CSVToArray(csvData);
			// console.log('dataAsArray');
// 			console.log(dataAsArray);
			var dataAsJSON = arrayToJSON(dataAsArray);
			_.each(dataAsJSON, function(item,key,list){
				CartobotData.insert(item);
			});
        }
	});
}