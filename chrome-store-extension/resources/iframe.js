// Function to inject the iframe into a page
(function () {
	var content = '@content', // Content to inject into the iframe
		iframe = document.createElement('iframe'); // Create the iframe

	// Add the iframe to the page
	document.body.appendChild(iframe);
	
	// Open the iframe stream
	iframe.contentWindow.document.open();
	// Write the content to the iframe
	iframe.contentWindow.document.writeln(content);
	// Close the iframe stream
	iframe.contentWindow.document.close();
})();