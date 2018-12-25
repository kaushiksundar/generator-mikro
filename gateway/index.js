const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.projectDirectory = opts.projectDirectory || "./";
  }
  start() {
    
    this.destinationRoot(this.projectDirectory);
    // Add README file

    
    if(true) {
      const GATEWAY_DIRECTORY = "gateway";
      this.fs.copy(
        this.templatePath('gateway'),
        this.destinationPath(GATEWAY_DIRECTORY+'/')
      );
      this.config.set({"gateways": ["gateway"]});
      this.config.save();
    }
  } // Start method

};