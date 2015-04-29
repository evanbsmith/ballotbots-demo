Router.route('/', {
  name: 'home'
});

Router.route('/about', {
  name: 'about'
});

Router.route('/bots', {
	name: 'bots',
	waitOn: function () {
	    // return one handle, a function, or an array
	    return [Meteor.subscribe('optobotdata'), Meteor.subscribe('cartobotdata'), Meteor.subscribe('echobotdata')];
	}
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/items/new', {
  name: 'items.new'
});

Router.plugin('ensureSignedIn', {
  // only: ['dashboard']
});
