// module that creates the rerun command and saves it in a file

var fs = require('fs'); 

// check and create rerun command folder 
function createFolder(){
    console.log('Onno_Debug: the createFolder function is called!'); 
    if (!fs.existsSync('./rerun-command')){
        console.log('Onno_Debug: the folder does not exist!');
        fs.mkdirSync('./rerun-command');
    }
}

// write the initial command to the file, this file will store all failed tests; 
function createCommandFile(){

    console.log('Onno_Debug: the createCommandFile function is called!');
    fs.writeFile('./rerun-command/rerun_command.txt', 'protractor protractor.conf.js --cucumberOpts.tags=""');
}

// create command to run all the failed tests; 
function appendTagToCommand(tag){

    console.log('Onno_Debug: the appendTagCommand is called for tag: ' + tag);  

    fs.readFile('./rerun-command/rerun_command.txt',"utf8", (err, data) => {
                    
        // initiate variable for the command
        if (err) throw err;
        
        // remove the last quotation mark from the string
        var initialCommand = data.substring(0, data.length - 1);

        console.log('Onno_Debug: the initialCommand read from the rerun_command.txt: ' + initialCommand);  
        
        // check if there already is a tag in the protractor command
        if (initialCommand.indexOf('@') > -1) {
        
            // if no tag append the command with comma
            console.log('Onno: the next failed tag is logged!');
            newCommand = initialCommand + ', ' + tag + '"'; 
            console.log("Onno_Debug: the new command is: " + newCommand); 
        } else {
        
            // if no tag append the command without comma
            console.log('Onno: the first failed tag is logged!');
            newCommand = initialCommand + tag + '"'; 
            console.log("The new command is: " + newCommand); 
        }   

        if (fs.existsSync('./rerun-command/rerun_command.txt')){
            fs.writeFileSync('./rerun-command/rerun_command.txt', newCommand, 'utf8');
        }  else {
            createCommandFile(); 
            fs.writeFileSync('./rerun-command/rerun_command.txt', newCommand, 'utf8');
        }            
        
    });
}

module.exports = {

    createFolder : createFolder, 
    createCommandFile : createCommandFile,
    appendTagToCommand : appendTagToCommand
    
}
