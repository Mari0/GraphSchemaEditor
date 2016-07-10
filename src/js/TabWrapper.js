'use strict';
define([
	'jquery',
	'lodash',
	'bootstrap'], /**@lends TabWrapper*/
function ($, _) {
	"use strict";
	function TabWrapper(tabContainerId,tabContentId) {
		var that = this;

		var tabCounter = 0, $activeTab, $activeContentContainer, activeTabId;

		var	_tabContainerId;
		if(tabContainerId)
			_tabContainerId = tabContainerId;
		else
			_tabContainerId = 'tabContainer';


		var	_tabContentId;
		if(tabContentId)
			_tabContentId = tabContentId;
		else
			_tabContentId= 'tabContent';

		var tplContainer = _.template('<div class="container-fluid"><ul class="nav nav-tabs marginBottom" id="<%-containerId%>"></ul></div>');

		var tplContent = _.template('<div id="<%-contentId%>" class="tab-content"></div>');

		var $node = $(tplContainer({containerId: _tabContainerId}));

		var $container = $node.find("#" + _tabContainerId);
		var $contentContainer = $(tplContent({contentId:_tabContentId}));


		var bindShowEvent = function($tab, callback){
			$tab.find("a").click(function(e){
				e.preventDefault();
				$(this).tab('show');
				$activeTab = $(this);
				activeTabId = $activeTab.attr('href');
				console.log('Current tab: ' + activeTabId);
				if(callback) callback();
			});
		};

		var bindCloseEvent = function($tab, callback){
			$tab.find(".closeTab").click(function (event) {
				//there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
				event.preventDefault();
				var tabContentId = $(this).parent().attr("href");
				if (tabContentId === activeTabId) {
					//Show the tab to the right
					var $a = $container.find('li a[href=\"' + tabContentId + '\"]').parent();
					var $tab = $a.next().first();
					if ($tab.length === 0) {
						//If a the tab doesn't exists show them to the left
						$tab = $a.prev().first();
						if ($tab.length === 0) {
							$tab = $a.first();
						}
					}
					$(this).parent().parent().remove(); //remove li of tab
					$(tabContentId).remove(); //remove respective tab content
					$tab.find('a').click(); // Select first tab
					activeTabId = $tab.attr('href'); //register new current tab
					$activeContentContainer.attr('class', 'panel panel-default tab-pane fade active in');
				} else {
					$(this).parent().parent().remove(); //remove li of tab
					$(tabContentId).remove(); //remove respective tab content
				}
				if(callback) callback();
			});
		};


		that.get$node = function(){
			return  $node.add($contentContainer);
		};
		that.getActiveTabId = function(){
			return activeTabId;
		};
		that.addClosableTab = function(label, content, callback, closeCallback){
			var tabId = _tabContentId + tabCounter++;
			$container.find('li').attr('class', '');
			if($activeContentContainer)
				$activeContentContainer.attr('class', 'panel panel-default tab-pane fade');

			var $tab = $(document.createElement('li'))
				.attr('class', 'active')
				.append($(document.createElement('a'))
					.attr('href', '#' + tabId)
					.append($.parseHTML('<button class="close closeTab" type="button" style="margin: -2px 0 0 10px; font-size: 18px;" >×</button>' + label)));
			$activeTab = $tab.find('a');
			$container.append($tab);

			//register close event
			bindCloseEvent($tab, closeCallback);
			bindShowEvent($tab, callback);

			activeTabId = '#' + tabId;

			$activeContentContainer = $(document.createElement('div'))
				.attr('class', 'panel panel-default tab-pane fade active in')
				.attr('id', tabId)
				.append(content);

			$contentContainer.append($activeContentContainer);
			//this.showTab(activeTabId);
		};

        that.addTab = function(label,content,callback){
            var tabId = _tabContentId + tabCounter++;
            $container.find('li').attr('class', '');
            if($activeContentContainer)
                $activeContentContainer.attr('class', 'panel panel-default tab-pane fade');

            var $tab = $(document.createElement('li'))
                .attr('class', 'active')
                .append($(document.createElement('a'))
                    .attr('href', '#' + tabId)
                    .text(label));
            $activeTab = $tab.find('a');
            $container.append($tab);

            //register close event
            bindShowEvent($tab, callback);

            activeTabId = '#' + tabId;

            $activeContentContainer = $(document.createElement('div'))
                .attr('class', 'panel panel-default tab-pane fade active in')
                .attr('id', tabId)
                .append(content);

            $contentContainer.append($activeContentContainer);
            //this.showTab(activeTabId);
        }
	}

	return TabWrapper;
});
