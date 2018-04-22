const exec      = require("child_process").exec;
const config    = require("./config");

const startRestart = async (callbackFunc) => {
  let returnValue = {message: "unexpected error", status: "NOK"};

  console.log('start startRestart');
  let serverStatusExec = `cd ${config.nodePWDFolder} && ./onz_manager.bash reload`;

  exec(serverStatusExec, function(err, stdout, stderr) {
    if (err || stderr) {
      console.log(stderr);
      if (stdout)
        returnValue.message = `Omg! I didn't manage to restart the core. This is what I got anyway (stdout): \n${stdout}`;
      else
        returnValue.message = (`Omg! I didn't manage to restart the core: \n${stderr}`);
    } else {
      returnValue.status = 'OK';
      returnValue.message =('Core restart was initiated.');
    }
    console.log(returnValue.message);
    callbackFunc(returnValue);
  });
  console.log('end startRestart');
};

exports.startRestart = startRestart;
