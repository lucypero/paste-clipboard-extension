var port = chrome.runtime.connect({name: "knockknock"});


// the new way just adds the line to whatever was in the notepad.
// 
function new_way(msg) {

	let max_character_count = 2000

  var ta = document.getElementById("ta");
	ta.innerHTML += '<br><br>' + msg
	if(ta.innerText.length > max_character_count) {
		let difference = ta.innerText.length - max_character_count
		ta.innerText = ta.innerText.slice(difference)
	}


	window.scrollTo(0,document.body.scrollHeight);
}

// the old way deleted everything in the notepad to insert the copied lines.
// this is annoying when you have something typed on it that you don't want to delete.
function old_way(msg) {

	let displayed_lines = []
	let max_displayed_lines = 20
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
}


port.onMessage.addListener(new_way);
