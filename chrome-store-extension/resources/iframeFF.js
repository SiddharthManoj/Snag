// Function to inject the iframe into a page
(function () {
    var content = '@content', // Content to inject into the iframe
        iframe = document.createElement('iframe'); // Create the iframe

    // Add the iframe to the page
    document.body.appendChild(iframe);

	// Update the content to the iframe
    iframe.contentWindow.location.href = "data:text/html;charset=utf-8," + encodeURIComponent(content);
})();