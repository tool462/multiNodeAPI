const settings  = require("./config");
const consts    = require("./consts");
const exec      = require("child_process").exec;

const respondRecentLogs = async (callbackFunc) => {
  let retText;
  const recentLogsExec = `
    cd ${settings.nodePWDFolder}/logs/ && tail onz.log -n 200`;

  exec(recentLogsExec, function(err, stdout, stderr) {
    console.log(err);
    if (err || stderr) {
      retText = (`Omg! I didn't manage to get the logs: \n${stderr}`);
      if (stdout)
        retText = (`This is what I got anyway (stdout): \n${stdout}`);
    }else{
      if (stdout.length > 4000)
        retText = ( "📄 Here are the fork logs:\n" + stdout.substring(stdout.length - 4000, stdout.length));
      else
        retText = ( "📄 Here are the fork logs:\n" + stdout);
    }
    
    callbackFunc (retText);
  });
};

let retVal;
const respondGREPLogs = async (type, callbackFunc) => {
  switch (type) {
    case "all":
      return execGREPLogs(consts.logsGREP.ALL, callbackFunc);
      break;
    case "1":
      execGREPLogs(consts.logsGREP[1], callbackFunc);
      break;
    case "2":
      execGREPLogs(consts.logsGREP[2], callbackFunc);
      break;
    case "3":
      execGREPLogs(consts.logsGREP[3], callbackFunc);
      break;
    case "4":
      execGREPLogs(consts.logsGREP[4], callbackFunc);
      break;
    case "5":
      execGREPLogs(consts.logsGREP[5], callbackFunc);
      break;
    case "Consensus":
      return execGREPLogs(consts.logsGREP.CONSENSUS, callbackFunc);
      break;
    case "SIGKILL":
      return execGREPLogs(consts.logsGREP.SIGKILL, callbackFunc);
      break;
    case "SIGABRT":
      return execGREPLogs(consts.logsGREP.SIGABRT, callbackFunc);
      break;
    default:
      break;
  }
};

const execGREPLogs = async (type, callbackFunc) => {
  let forkLogsExec;
  console.log("LogPlace 11");
  if (type === consts.logsGREP.ALL)
    forkLogsExec = `cd ${settings.nodePWDFolder}/logs/ && tail onz.log -n 1000000 | grep '"cause"'`;

  if (
    type === consts.logsGREP["1"] ||
    type === consts.logsGREP["2"] ||
    type === consts.logsGREP["3"] ||
    type === consts.logsGREP["4"] ||
    type === consts.logsGREP["5"]
  ){
    forkLogsExec = `cd ${settings.nodePWDFolder}/logs/ && tail onz.log -n 100000 | grep '"cause":${parseInt(type)}'`;
  }
  if (type === consts.logsGREP.CONSENSUS)
    forkLogsExec = `cd ${settings.nodePWDFolder}/logs/ && tail onz.log -n 1000 | grep "consensus"`;

  if (type === consts.logsGREP.SIGKILL)
    forkLogsExec = `cd ${settings.nodePWDFolder}/logs/ && tail onz.log -n 100000 | grep "SIGKILL"`;

  if (type === consts.logsGREP.SIGABRT)
    forkLogsExec = `cd ${settings.nodePWDFolder}/logs/ && tail onz.log -n 100000 | grep "SIGABRT"`;

  console.log("LogPlace 12");
  console.log(forkLogsExec);

  let retText;
  exec(forkLogsExec, function(err, stdout, stderr) {
    console.log("Start exec: " + stderr + stdout);
    if ((err || stderr) && (err.killed)) {
      if (stdout)
        retText = ( `This is what I got anyway (stdout): \n${stdout}`);
      else
        retText = ( `Omg! I didn't manage to get the logs: \n${stderr}`);
    }
    else if(err && !err.killed)
      retText = ( `No logs found with that query in the last lines of logs...`);
    else{
      if (stdout.length > 4000)
        retText = ( "📄 Here are the fork logs:\n" + stdout.substring(stdout.length - 4000, stdout.length));
      else
        retText = ( "📄 Here are the fork logs:\n" + stdout);
    }
    
    callbackFunc (retText);
  });
};

exports.respondRecentLogs = respondRecentLogs;
exports.respondGREPLogs = respondGREPLogs;
