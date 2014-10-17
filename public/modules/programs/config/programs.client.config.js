'use strict';

// Configuring the Articles module
angular.module('programs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Events', 'programs', 'dropdown', '/programs(/create)?');
		Menus.addSubMenuItem('topbar', 'programs', 'List Events', 'programs');
		Menus.addSubMenuItem('topbar', 'programs', 'New Event', 'programs/create');
		Menus.addSubMenuItem('topbar', 'programs', 'My Events', 'programs/myPrograms');
	}
]);