//get what is being copied
// send it to your js scipt that runs on your notepad
// paste it on the notepad
// profit

//all that is left is to send this to a content script and paste it on your notepad
/*
chrome.runtime.onInstalled.addListener(function() {
chrome.tabs.create({url: chrome.extension.getURL('background.html')});
});
*/

//port = chrome.runtime.connect(null, {name: 'hi'});

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
        port.postMessage(result)
        console.log('got value from sandbox: ' + result);
    }
    sandbox.value = '';
    return result;
}

chrome.runtime.onConnect.addListener(function(port) {
	setInterval(function() {
	  getContentFromClipboard(port)
	},50)
});