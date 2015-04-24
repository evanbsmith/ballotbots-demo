Meteor.publishComposite("cartobotdata", function() {
  return {
    find: function() {
      return CartobotData.find({});
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