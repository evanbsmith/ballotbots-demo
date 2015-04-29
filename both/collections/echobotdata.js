EchobotData = new Mongo.Collection('echobotdata');

EchobotData.helpers({

});

EchobotData.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.value = parseInt(doc.value);
  doc.label = parseInt(doc.label);
  doc.timestamp = moment(doc.date + " " + doc.time).format();
});

// CSVToArray( strData, strDelimiter )

if (Meteor.isServer) {
	Meteor.startup(function () {
		console.log('echoBotData count: ' + EchobotData.find().count());
		console.log(EchobotData.findOne());
        if(EchobotData.find().count() === 0){
            var csvData = Assets.getText('echobotdata-real.csv');
			// console.log('csvData raw');
// 			console.log(csvData);
// 			console.log('optobotdata - imported');
			var dataAsArray = CSVToArray(csvData);
			// console.log('dataAsArray');
// 			console.log(dataAsArray);
			var dataAsJSON = arrayToJSON(dataAsArray);
			_.each(dataAsJSON, function(item,key,list){
				EchobotData.insert(item);
			});
        }
	});
}