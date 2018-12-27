const Generator = require('yeoman-generator');
const path = require('path');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // this.projectDirectory = opts.projectDirectory || "./";
  }
  async start() {
    
    let answers = await this.prompt([
      {
        type    : 'confirm',
        name    : 'createGateway',
        message : 'Do you want to create a gateway: '
      }]);
      
    if(answers.createGateway) {
      let result = await this.prompt([
        {
          type    : 'input',
          name    : 'name',
          message : 'Enter a name for the Gateway (default: gateway): '
        }]);

      let gatewayDirectory = result.name == "" ? "gateway": result.name;
      
      this.fs.copy(
        this.templatePath('gateway'),
        this.destinationPath(gatewayDirectory+'/')
      );

      this.destinationRoot("./")
      let gatewayConfig = this.config.get("gateways");
      gatewayConfig ? gatewayConfig.push(gatewayDirectory) : gatewayConfig = [gatewayDirectory]
      this.config.set({"gateways": gatewayConfig});
      this.config.save();
      
    }
   
  } // Start method

};