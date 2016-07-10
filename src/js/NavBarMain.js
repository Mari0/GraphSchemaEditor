'use strict';
define(['jquery',
	'FileInputTab',
	'HttpInputTab',
	'text!tpl/navbar.html'], /**@lends NavigationBar*/
function ($, FileInputTab, HttpInputTab, navbarHtml) {
	/**
	 * Initializes the Navigation Bar and all corresponding tabs
	 * @constructor
	 */
	function NavigationBar() {
		var $body = $('body');

		//Initialize Tabs Navigation Container
		$body.append($(navbarHtml));

		//Initialize Content Container
		var $navbar_content = $(document.createElement('div')).attr('class', 'tab-content');
		$body.append($navbar_content);

		//Init Tabs
		$navbar_content.append(FileInputTab());
		$navbar_content.append(HttpInputTab());

	}

	return NavigationBar;
});
