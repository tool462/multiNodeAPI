const { getSystemInfo }     = require('../sysInfo');
const manageNode            = require('../manageNode');
const {
    respondRecentLogs,
    respondGREPLogs,
    toggleTailing
  }                         = require("../logs");

module.exports = function(app) {
    app.post('/api/server', (request, response) => {
        let logData;
        if (typeof(request.body) == "undefined" || typeof(request.body.password) == "undefined"){
            response.send(404);
            return;
        }

        switch (request.body.request) {
            case "serverStatus":
                getSystemInfo().then( sysInfo => {
                    console.log(sysInfo);
                    response.send(sysInfo);
                });
                break;
            case "rebootServer":
                response.send(404);
                manageNode.startReboot('test');
                break;
            case "liskLogs":
                switch (request.body.logType) {
                    case "recent":
                        respondRecentLogs(function(respText) {
                            console.log("final log " + respText);
                            response.send(respText); 
                        });
                        break;

                    case "fork":
                        respondGREPLogs(request.body.forkCause.toString(), function(respText) {
                            response.send(respText); 
                        });
                        break;
                
                    default:
                        break;
                }
            default:
                return;
                break;
        }
        console.log(request.body.request);
    });

    app.post('/api/node', (request, response) => {
        if (typeof(request.body) == "undefined" || typeof(request.body.password) == "undefined"){
            response.send(404);
            return;
        }

        switch (request.body.request) {
            case "restart":
                manageNode.startRestart(function(respText) {
                    response.send(respText); 
                });
                break;
            default:
                response.send(404);
                return;
                break;
        }
        console.log(request.body.request);
    });

    app.get('/api/status', (request, response) => {
        response.send(404);
    });
};