// Read and execute commands
const fs = require('fs');
const readline = require('readline');
const myMoney = require('./myMoney');

const GeekTrust = () => {
  const db = {};

  // Execute command from file
  const execCmd = (cmdStr) => {
    const args = cmdStr.split(' ');
    myMoney[(args.shift()).toLowerCase()](db, ...args);
  };

  // Read input file line by line
  const readInput = (file) => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(file),
    });

    lineReader.on('line', (line) => {
      execCmd(line);
    });
  };

  // Start the application
  readInput(process.argv[2]);
};

GeekTrust();

module.exports = GeekTrust;
