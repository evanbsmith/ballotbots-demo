OptobotData = new Mongo.Collection('optobotdata');

OptobotData.helpers({

});

OptobotData.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.value = parseInt(doc.value);
  doc.timestamp = moment(doc.date + " " + doc.time).toDate();
  doc.timestamp2 = moment.unix(doc.label).toDate();
});

// CSVToArray( strData, strDelimiter )

if (Meteor.isServer) {
	Meteor.startup(function () {
		console.log('optoBotData count: ' + OptobotData.find().count());
		console.log(OptobotData.findOne());
        if(OptobotData.find().count() === 0){
            var csvData = Assets.getText('optobotdata.csv');
			// console.log('csvData raw');
// 			console.log(csvData);
// 			console.log('optobotdata - imported');
			var dataAsArray = CSVToArray(csvData);
			// console.log('dataAsArray');
// 			console.log(dataAsArray);
			var dataAsJSON = arrayToJSON(dataAsArray);
			_.each(dataAsJSON, function(item,key,list){
				OptobotData.insert(item);
			});
        }
	});
}
