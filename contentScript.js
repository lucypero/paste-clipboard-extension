chrome.runtime.onConnect.addListener(port => {
	console.log("connected", port)
	if (port.name === 'hi') {
       port.onMessage.addListener(processMessage);
    }
})

function processMessage(request, sender, sendResponse) {
	console.log(sender.tab ?
	            "from a content script:" + sender.tab.url :
	            "from the extension");
	if (request.greeting == "hello")
	  sendResponse({farewell: "goodbye"});
};

//nre

var port = chrome.runtime.connect({name: "knockknock"});

let displayed_lines = []
let max_displayed_lines = 5

port.onMessage.addListener(function(msg) {
  // console.log("recieved message:", msg)
  var ta = document.getElementById("ta");
	ta.innerHTML = ''
  //document.execCommand("insertHTML", false, msg);

	displayed_lines.push(msg)

	if(displayed_lines.length > max_displayed_lines)
		displayed_lines.shift()

	//display all displayed_lines in order
	for(line of displayed_lines)
		ta.innerHTML += line + '<br><br>'
});
