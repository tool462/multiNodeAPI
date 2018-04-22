const si        = require('systeminformation');
const config    = require("./config");

const getSystemInfo = async () => {
    let systemInfo = {};

    // CPU
    let data = await si.currentLoad().catch(() =>
      console.log(error) );
    systemInfo.currentLoad = data.currentload;
    
    // File System
    data = await si.fsSize().catch(() =>
      console.log(error) );
    systemInfo.diskUsage = data[config.diskNo].use;
    systemInfo.diskSize = data[config.diskNo].size / 1024 / 1024 / 1024;    // /1204/1024/1024 = Disk size in Gigabyte

    // Memory
    data = await si.mem().catch(() =>
      console.log(error) );
    systemInfo.usedMemory = data.used / 1024 / 1024 / 1024;     // /1204/1024/1024 = used memory in Gigabyte
    systemInfo.freeMemory = data.free / 1024 / 1024 / 1024;     // /1204/1024/1024 = free memory in Gigabyte

    let replyString = '';
    replyString =               'CPU usage: ' + systemInfo.currentLoad.toFixed(2) + ' % \n';
    replyString = replyString + 'Disk usage: ' + systemInfo.diskUsage.toFixed(2) + ' % \n';
    replyString = replyString + 'Disk size: ' + systemInfo.diskSize.toFixed(2) + ' GB \n';
    replyString = replyString + 'Memory usage: ' + systemInfo.usedMemory.toFixed(2) + ' GB \n';
    replyString = replyString + 'Free memory: ' + systemInfo.freeMemory.toFixed(2) + ' GB';

    return replyString;
}

exports.getSystemInfo = getSystemInfo;