/* Per the instructions/recommendations of my peers, I have reordered my todolist app into two files.  This is not exactly to their instructions,
as the instructions were specfically to reallocate my runtime to a file called index.js, while leaving the functions as is.
Referencing multiple files in the previous version of this todolist app was originally intended to separate my code based off of
the concepts of run, read, write functionality.  Not exactly knowing what runtime means in programming terms,
and finding a series of misleading references online, I interpreted this to mean that my functions would live in one file, and be called upon from the
application's index file.  Thusly my todolist app is now divided up into two simple files, one index.js and one funcs.js.  Index.js defines the majority of 
variables, and calls functions from funcs.js to execute them.  I'm somewhat sure I have misinterpreted the instructions, but nevertheless the code, once again, works, more or less.

Please see previous versions of listmodules with extensive notation in the readlist.js, writelist.js, and savelist.js files.  The variables and functions are all named the same,
and only minor variations have been made to the originals in order to obtain functionality in this format.

Once again, thanks for reading.
*/

const prompt = require('prompt-sync')();
const fs = require('fs');
let currentRoutineAM = [],
	currentRoutinePM = [],
	twelvesArrAM = [],
	twelvesArrPM = [],
	finishedAMArr = [],
	finishedPMArr = [];

function newRoutineItem(TASK, HR, MIN, AMPM) {
	let newObj = new Object();
	newObj.TASK =TASK;
	newObj.HR = HR;
	newObj.MIN = MIN;
	newObj.AMPM = AMPM;
	return newObj;
}

function readFile() {
	let wantFile = prompt('Would you like to import your List file?: ');
	if (wantFile == 'y' || wantFile == 'yes' || wantFile == 'Yes') {
		let fileRead = prompt("What's the name of your List file?: ");
		let readIt = fs.readFileSync(fileRead + '.txt', 'utf8');
		return readIt;
	} else {
		console.log('No List file imported');
		let fileSplit = '';
		return fileSplit;
	}
}

function removeAMPMLines(arr) {
	for (let i in arr) {
		if (arr[i].includes('at') == false) {
			arr.splice(arr.indexOf(arr[i]), 1);
		}
	}
}

function splitEm (arr, arr2, arr3) {
	for (let i = 0; i < arr.length; i++) {
		arr2.push(arr[i].match(/[\w][\S]*/g));
		arr3.push(arr[i].match(/\d/g))
	}
}

function getAMPM (arr, arr2) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j].match(/[AP]M/)) {
				arr2.push(arr[i][j].charAt(arr[i][j].length -2).concat
				(arr[i][j].charAt(arr[i][j].length - 1)));
				arr[i].splice(arr[i].indexOf(arr[i][j]));
			}
		}arr[i] = (arr[i].join(' '));
	}
}

function removeAt (arr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].slice(0, -3);
	}
}


function doubleUp (arr, arr2) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			if (arr[i][j+1] !== undefined) {
			arr2.push(arr[i][j].concat(arr[i][j+1]));
			arr[i].splice(arr[i][j], 1);
			}
		}
	}
}

function getMins (arr, arr2) {
	for (let i = 0; i < arr.length; i++) {
		if (i !== 0 && i % 2 !== 0) {
			arr2.push(arr[i]);
		}
	}
}

function getHrs (arr, arr2) {
	for (let i = 0; i < arr.length; i++) {
		if (i == 0 || i % 2 == 0) {
			arr2.push(arr[i]);
		}
	}
}

function fileInput(arr, arr2, arr3, arr4) {
	for (i in arr) { 
		let TASK = arr[i],
			HR = arr2[i],
			MIN =  arr3[i],
			AMPM  = arr4[i];
		if (AMPM == 'AM') {
		currentRoutineAM.push(newRoutineItem(TASK, HR, MIN, AMPM));
		}
		if (AMPM == 'PM') {
		currentRoutinePM.push(newRoutineItem(TASK, HR, MIN, AMPM));
		}
	}
}

function twelveFirst(arr, arr2) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i].HR === '12') {
			if (arr2 === undefined) {
				continue;
			}
			arr2.push(arr[i]);
			arr.pop();
		}
	}
}

function prettier (arr, arr2, arr3) {
	for (let i in arr) {
		arr[i].HR = arr[i].HR.toString(); 
		if (arr[i].HR.length == 1) {
			arr[i].HR = '0' + arr[i].HR;
		}
		if (arr[i].HR == '00') {
			arr[i].HR = '12';
		}
		arr[i].MIN = arr[i].MIN.toString();
		if (arr[i].MIN.length == 1) { 
			arr[i].MIN = '0' + arr[i].MIN;
		}
		if (arr[i].AMPM == 'AM'){
			arr2.push(arr[i].TASK + ' at ' + arr[i].HR+ ':' + arr[i].MIN + arr[i].AMPM);
		}
		if (arr[i].AMPM == 'PM') {
			arr3.push(arr[i].TASK + ' at ' + arr[i].HR+ ':' + arr[i].MIN + arr[i].AMPM);
		}
	}
}

function getUserInput (arr1, arr2) {
    let TASK = prompt('What would you like to do?: '),
    	HR = Number(prompt('At what Hour?(double digits): ')),
    	MIN = Number(prompt('And Minutes?(double digits): ')),
    	AMPM = prompt('AM or PM?: ').toUpperCase(),
		newItem = newRoutineItem(TASK, HR, MIN, AMPM);
	if (newItem.AMPM == 'AM') {
    	arr1.push(newItem);
	}
	if (newItem.AMPM == 'PM') {
    	arr2.push(newItem);
	}
}

function firstPrompt (arr1, arr2) {
	let makeItem = prompt('Would you like to add to your List?: ');
	if (makeItem == 'y' || makeItem == 'yes' || makeItem == 'Yes' || makeItem == 'sure') {
    	getUserInput(arr1, arr2);
	} else if (makeItem == 'n' || makeItem == 'no' || makeItem == 'No' || makeItem == 'nah') {
    	console.log('Compiling List ...');
	} else {
    	console.error('Please answer yes or no.');
    	firstPrompt();
	}
}

function makeAnother(arr1, arr2) {
	let again = prompt('Add another Item to your To Do List?: ')
	if (again == 'y' || again == 'yes' || again == 'Yes' || again == 'sure') {
    	getUserInput(arr1, arr2);
    	makeAnother(arr1, arr2);
	} else if (again == 'n' || again == 'no' || again == 'No' || again == 'sure') {
    	console.log('Compiling List ...');
	} else {
    	console.error('Please answer yes or no');
    	makeAnother(arr1, arr2);
	}
}

function removeIt(arr, arr2, removeFunc) {
	let removePrompt = prompt('Remove an Item from your List?: ');
	if (removePrompt == 'Y' || 
		removePrompt == 'y' || 
		removePrompt == 'yes' || 
		removePrompt == 'YES') {
				removeFunc(arr, arr2);
				removeAnother();
	} else {
		console.log('Compiling List ...');
	}
}

function removeItems(arr, arr2) {
	let whichOne = prompt('What Item?: ');
	let isAMPM = prompt('AM or PM?: ');
			for (let i in arr) {
				if (arr[i].TASK == whichOne && arr[i].AMPM == isAMPM) {
					arr.splice(i, 1);
				}
			for (let i in arr2) {
				if (arr2[i].TASK == whichOne && arr2[i].AMPM == isAMPM) {
					arr2.splice(i, 1);
				}
			}
			}
}

function removeAnother() {
	let again = prompt('Remove another Item from your To Do List?: ')
	if (again == 'y' || again == 'yes' || again == 'Yes' || again == 'sure') {
		removeItems(currentRoutineAM, currentRoutinePM);
		removeAnother();
	} else if (again == 'n' || again == 'no' || again == 'No' || again == 'sure') {
		console.log('Compiling List ...');
	} else {
		console.error('Please answer yes or no');
		removeAnother();
	}
}

function getTime (now) {
	if (now > 12) {
		now -= 12;
		if (now < 1) {
			now = '12';
			}
		if (now < 10 && now > 0) {
			now = '0' + now;
		}
		if (currentMinutes < 10) {
			currentMinutes = '0' + currentMinutes;
		}
		return now +':' + currentMinutes + 'PM';
	} if (now < 1) {
		now = '12';
	}
	    if (now < 10) {
			now = '0' + now;
		}
		if (currentMinutes < 10 && currentMinutes !== '00') {
			currentMinutes = '0' + currentMinutes;
		}
		return now + ':' + currentMinutes + 'AM';
}

function alertMe (arr, time) {
	for (let i in arr) {
		if (arr[i].charAt(arr[i].length - 7) == time.charAt(0) && 
		arr[i].charAt(arr[i].length - 6) == time.charAt(1) && 
		arr[i].charAt(arr[i].length -2) == time.charAt(5)) {
			console.log("This Hour's Tasks: " + arr[i]);
		}
	}
}

function writeIt(finishedArrString) {
	let writePrompt = prompt('Would you like to save your list?: ');
	if (writePrompt == 'y' || writePrompt == 'yes' || writePrompt == 'Yes') {
		let fileName = prompt('What would you like to name your file?: ');
		fs.writeFile(fileName + '.txt', finishedArrString, () => {
			console.log(fileName + '.txt was saved.');
		});
	}else {
		console.log('List not saved.');
	}
}

module.exports = {
	currentRoutineAM,
	currentRoutinePM,
	twelvesArrAM,
	twelvesArrPM,
	finishedAMArr,
	finishedPMArr,
	newRoutineItem,
	readFile,
	removeAMPMLines,
	splitEm,
	getAMPM,
	removeAt,
	doubleUp,
	getMins,
	getHrs,
	fileInput,
	twelveFirst,
	prettier,
	getUserInput,
	firstPrompt,
	makeAnother,
	removeIt,
	removeItems,
	removeAnother,
	getTime,
	alertMe,
	writeIt};