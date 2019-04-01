// module that creates the rerun command and saves it in a file

var fs = require('fs'); 

// check and create rerun command folder 
function createFolder(){
    if (!fs.existsSync('./rerun-command')){
        fs.mkdirSync('./rerun-command');
    }
}

// write the initial command to the file, this file will store all failed tests; 
function createCommandFile(){
    if (!fs.existsSync('./rerun-command/rerun_command.txt')){
        fs.writeFile('./rerun-command/rerun_command.txt', 'protractor protractor.conf.js --cucumberOpts.tags=""');
    }  
}

// create command to run all the failed tests; 
function appendTagToCommand(tag){

    fs.readFile('./rerun-command/rerun_command.txt',"utf8", (err, data) => {
                    
        // initiate variable for the command
        if (err) throw err;
        
        // remove the last quotation mark from the string
        var intitalCommand = data.substring(0, data.length - 1);
        
        // check if there already is a tag in the protractor command
        if (intitalCommand.indexOf('@') > -1) {
        
            // if no tag append the command with comma
            console.log('Onno: the next failed tag is logged!');
            newCommand = intitalCommand + ', ' + tag + '"'; 
            console.log("Onno_Debug: the new command is: " + newCommand); 
        } else {
        
            // if no tag append the command without comma
            console.log('Onno: the first failed tag is logged!');
            newCommand = intitalCommand + tag + '"'; 
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

    createFolder : createFolder(), 
    createCommandFile : createCommandFile(),
    appendTagToCommand : appendTagToCommand(tag)
    
}
