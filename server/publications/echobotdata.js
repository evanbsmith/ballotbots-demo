Meteor.publishComposite("echobotdata", function() {
  return {
    find: function() {
      return EchobotData.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});
