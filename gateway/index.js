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
      
      this.log("!!!!!!!! Retreive Microservices config from memory !!!!!!!!!");
      const microservicesConfig = this.config.get("microservices");

      this.fs.copyTpl(
        this.templatePath('gateway/Dockerfile'),
        this.destinationPath(gatewayDirectory+'/Dockerfile'),
        {services: microservicesConfig}
      );

      this.fs.copyTpl(
        this.templatePath('gateway/package.json'),
        this.destinationPath(gatewayDirectory+'/package.json'),
        {name: gatewayDirectory}
      );

      this.fs.copyTpl(
        this.templatePath('gateway/src/config.js'),
        this.destinationPath(gatewayDirectory+'/src/config.js')
      );

      this.fs.copyTpl(
        this.templatePath('gateway/src/index.js'),
        this.destinationPath(gatewayDirectory+'/src/index.js')
      );

      this.fs.copyTpl(
        this.templatePath('gateway/src/routers/apiAdapter.js'),
        this.destinationPath(gatewayDirectory+'/src/routers/apiAdapter.js')
      );

      this.fs.copyTpl(
        this.templatePath('gateway/src/routers/baseURL.js'),
        this.destinationPath(gatewayDirectory+'/src/routers/baseURL.js'),
        {services: microservicesConfig}
      );

      
      microservicesConfig.forEach((microservice) => {
        this.fs.copyTpl(
          this.templatePath(`gateway/src/routers/microservice1Router.js`),
          this.destinationPath(`${gatewayDirectory}/src/routers/${microservice}Router.js`),
          {services: microservicesConfig}
        );  
      });
      

      this.fs.copyTpl(
        this.templatePath('gateway/src/routers/router.js'),
        this.destinationPath(gatewayDirectory+'/src/routers/router.js'),
        {services: microservicesConfig}
      );



      this.destinationRoot("./")
      let gatewayConfig = this.config.get("gateways");
      gatewayConfig ? gatewayConfig.push(gatewayDirectory) : gatewayConfig = [gatewayDirectory]
      this.config.set({"gateways": gatewayConfig});
      this.config.save();
      
    }
   
  } // Start method

};