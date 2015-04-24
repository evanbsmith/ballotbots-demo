Meteor.publishComposite("optobotdata", function() {
  return {
    find: function() {
      return OptobotData.find({});
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
