appAPI.ready(function($) {
    /******************************************************
     * iFrame
     *****************************************************/

    // Inject extension iFrame
    // var iframeOrigin = 'data:text/html;charset=utf-8,' + escape(appAPI.resources.get('iframe.html'));
    var iframeOrigin = 'https://portalvhds78g99jcnmky62.blob.core.windows.net/weekeep-ext/index.html';
    // var iframeOrigin = 'https://localhost:57528';
    var iframeWindow;
    var iframeHasLoaded = false;
    var iframe = $('<iframe />')
        // .attr('src', 'data:text/html;charset=utf-8,' + escape(appAPI.resources.get('iframe.html')))
        // .attr('src', 'https://portalvhds78g99jcnmky62.blob.core.windows.net/weekeep-ext/index.html')
        .attr('src', iframeOrigin)
        .attr('id', 'wekeep-extension-iframe')
        .css({
            "position": "fixed",
            "top": "0",
            "bottom": "0",
            "right": "0",
            "width": "300px",
            "height": "100%",
            "background": "white",
            "border": "none",
            "outline": "none",
            "z-index": "2147483647",
        })
        .prependTo('body')
        // on load set variables and send href
        .load(function() {
            iframeWindow = this.contentWindow;
            iframeHasLoaded = true;
            messageIframe('href', window.location.href);
        });

    // iFrame API
    function messageIframe(action, value) {
        var message = {action: action, value: value};

        if (iframeHasLoaded) {
            iframeWindow.postMessage(message, iframeOrigin);
        } else {
            console.error('Tried to send message before iframe loaded:')
            console.log(message)
        }
    }

    // send href to iframe
    var currentHref = window.location.href;
    var lastHref;

    var watchHref = setInterval(function() {
        currentHref = window.location.href;

        if (currentHref !== lastHref) {
            // console.log(lastHref + '\n' + currentHref);
            if (iframeHasLoaded) {
                messageIframe('href', currentHref);
            }

            lastHref = currentHref;
        }
    }, 50);

    /******************************************************
     * State
     *****************************************************/

    var isOpen;

    // messages
    appAPI.message.addListener(function(msg) {
        switch (msg.action) {
            case 'open extension':
                openExtension();
                break;

            case 'close extension':
                closeExtension();
                break;
        }
    });

    function openExtension() {
        isOpen = true;
        iframe.addClass('active');
    }

    function closeExtension() {
        isOpen = false;
        iframe.removeClass('active');
    }
    

    /******************************************************
     * CSS
     *****************************************************/

    // Extension CSS Animation
    appAPI.dom.addInlineCSS(
        '#wekeep-extension-iframe {' +
	        'transform: translate(300px, 0);' +
	        '-webkit-transition: transform 0.6s cubic-bezier(0.1, 1, 0, 1);' +
	        '-moz-transition: transform 0.6s cubic-bezier(0.1, 1, 0, 1);' +
	        '-ms-transition: transform 0.6s cubic-bezier(0.1, 1, 0, 1);' +
	        '-o-transition: transform 0.6s cubic-bezier(0.1, 1, 0, 1);' +
	        'transition: transform 0.6s cubic-bezier(0.1, 1, 0, 1);' +
        '}' +

        '#wekeep-extension-iframe.active {' +
	        'transform: translate(0, 0);' +
	        'box-shadow: -3px 0 6px rgba(0,0,0,0.3)' +
        '}'
    );

});
