appAPI.ready(function() {
	var isOpen = false;
	appAPI.browserAction.setResourceIcon('images/icon-gray.png');

	function setClosedState() {
		isOpen = false;
		appAPI.message.toAllTabs({action: "close extension"});
		appAPI.browserAction.setResourceIcon('images/icon-gray.png');
	}
	
	function setOpenState() {
		isOpen = true;
		appAPI.message.toAllTabs({action: "open extension"});
		appAPI.browserAction.setResourceIcon('images/icon-color.png');
	}
	
	// Button
	appAPI.browserAction.onClick(function(){
		if (isOpen) {
			appAPI.message.toAllTabs({action: "close extension"});
			setClosedState();
		} else {
			appAPI.message.toAllTabs({action: "open extension"});
			setOpenState();
		}
	});
	
	// messages
	appAPI.message.addListener(function(msg) {
		switch (msg.action) {
			case 'set closed state':
				setClosedState();
		    	break;
		}
	});

});
