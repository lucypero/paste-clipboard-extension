var interval;

var last_one = ""

function getContentFromClipboard(port) {
    var result = '';
    var sandbox = document.getElementById('sandbox');
    sandbox.value = '';
    sandbox.select();
    if (document.execCommand('paste')) {
        result = sandbox.value;
        if( result == last_one) {
            return 0
        }
        last_one = result
        if (port) { port.postMessage(result) }
    }
    sandbox.value = '';
    return result;
}

chrome.runtime.onConnect.addListener(function(port) {
    port.onDisconnect.addListener(function(port) {
        clearInterval(interval)
    })
    clearInterval(interval)
    interval = setInterval(function() {
        getContentFromClipboard(port)
    },50)
});
