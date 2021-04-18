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
const currentDate = new Date();

const readlist = require("./funcs.js");

let currentRoutineAM = readlist.currentRoutineAM;
    currentRoutinePM = readlist.currentRoutinePM;
    twelvesArrAM = readlist.twelvesArrAM;
    twelvesArrPM = readlist.twelvesArrPM;
    finishedAMArr = readlist.finishedAMArr;
    finishedPMArr = readlist.finishedPMArr;
    newRoutineItem = readlist.newRoutineItem,
    readFile = readlist.readFile, 
    removeAMPMLines = readlist.removeAMPMLines,
    splitEm = readlist.splitEm,
    getAMPM = readlist.getAMPM,
    removeAt = readlist.removeAt,
    doubleUp = readlist.doubleUp,
    getMins = readlist.getMins,
    getHrs = readlist.getHrs,
    fileInput = readlist.fileInput,
    twelveFirst = readlist.twelveFirst,
    prettier = readlist.prettier,
    getUserInput = readlist.getUserInput,
    firstPrompt = readlist.firstPrompt,
    makeAnother = readlist.makeAnother,
    removeIt = readlist.removeIt,
    removeItems = readlist.removeItems,
    removeAnother = readlist.removeAnother,
    getTime = readlist.getTime,
    alertMe = readlist.alertMe,
    currentHour = currentDate.getHours(),
    currentMinutes = currentDate.getMinutes(),
    currentTime = getTime(currentHour),
    writeIt = readlist.writeIt;

newRoutineItem();

let fileSplit = readFile().split('\n');

removeAMPMLines(fileSplit);

const splitArrWords = [];
const splitArrNums = [];

splitEm(fileSplit, splitArrWords, splitArrNums);

const splitArrAMPM = [];

getAMPM(splitArrWords, splitArrAMPM);

removeAt(splitArrWords);

const doubleNums = [];

doubleUp(splitArrNums, doubleNums);


const mins = [];

getMins(doubleNums, mins);

const hrs = [];

getHrs(doubleNums, hrs);

fileInput(splitArrWords, hrs, mins, splitArrAMPM);

currentRoutineAM = currentRoutineAM.sort((a, b) => a.MIN - b.MIN);
currentRoutineAM = currentRoutineAM.sort((a, b) => a.HR - b.HR);

twelveFirst(currentRoutineAM);
twelveFirst(currentRoutinePM);

twelvesArrAM = twelvesArrAM.sort((a,b) => a.MIN - b.MIN);
twelvesArrPM = twelvesArrPM.sort((a,b) => a.MIN - b.MIN);

currentRoutineAM = twelvesArrAM.concat(currentRoutineAM);
currentRoutinePM = twelvesArrPM.concat(currentRoutinePM);

prettier(currentRoutineAM, finishedAMArr, finishedPMArr);
prettier(currentRoutinePM, finishedAMArr, finishedPMArr);

let finishedArr = (['------------------YOUR CURRENT LIST---------------------']).concat
(['-------------------------AM-----------------------------']).concat
(finishedAMArr).concat
(['-------------------------PM-----------------------------']).concat
(finishedPMArr).concat(['--------------------------------------------------------']);

let finishedArrString = finishedArr.join('\n');

console.log(finishedArrString);

firstPrompt(currentRoutineAM, currentRoutinePM);

makeAnother(currentRoutineAM, currentRoutinePM);


currentRoutineAM = currentRoutineAM.sort((a, b) => a.MIN - b.MIN);
currentRoutineAM = currentRoutineAM.sort((a, b) => a.HR - b.HR);

currentRoutinePM = currentRoutinePM.sort((a, b) => a.MIN - b.MIN);
currentRoutinePM = currentRoutinePM.sort((a, b) => a.HR - b.HR);

twelvesArrAM = [];
twelvesArrPM = [];

twelveFirst(currentRoutineAM, twelvesArrAM);
twelveFirst(currentRoutinePM, twelvesArrPM);

twelvesArrAM = twelvesArrAM.sort((a,b) => a.MIN - b.MIN);
twelvesArrPM = twelvesArrPM.sort((a,b) => a.MIN - b.MIN);

currentRoutineAM = twelvesArrAM.concat(currentRoutineAM);
currentRoutinePM = twelvesArrPM.concat(currentRoutinePM);

finishedAMArr = [];
finishedPMArr = [];

prettier(currentRoutineAM, finishedAMArr, finishedPMArr);
prettier(currentRoutinePM, finishedAMArr, finishedPMArr);

finishedArr = (['------------------YOUR CURRENT LIST---------------------']).concat
(['-------------------------AM-----------------------------']).concat
(finishedAMArr).concat
(['-------------------------PM-----------------------------']).concat
(finishedPMArr).concat(['--------------------------------------------------------']);

finishedArrString = finishedArr.join('\n');

console.log(finishedArrString);

removeIt(currentRoutineAM, currentRoutinePM, removeItems);

removeAnother();

finishedAMArr = [];
finishedPMArr = [];

prettier(currentRoutineAM, finishedAMArr, finishedPMArr);
prettier(currentRoutinePM, finishedAMArr, finishedPMArr);

finishedArr = (['------------------YOUR CURRENT LIST---------------------']).concat
(['-------------------------AM-----------------------------']).concat
(finishedAMArr).concat
(['-------------------------PM-----------------------------']).concat
(finishedPMArr).concat(['--------------------------------------------------------']);

finishedArrString = finishedArr.join('\n');

console.log(finishedArrString);
alertMe(finishedArr, currentTime);
console.log('The Current Time is: ' + currentTime);

writeIt(finishedArrString);