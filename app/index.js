const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing...');
  }
  async start() {
    let answers = await this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'Enter a name for Micro Services Project (i.e.: Mikro-Project): '
      }
    ]);
    // create destination folder
    let addAPIGateway = false;
    let result = await this.prompt([
      {
        type    : 'confirm',
        name    : 'gateway',
        message : 'Do you want to add an API Gateway? '
      }
    ]);
        
    addAPIGateway = result.gateway;
    if(answers.name == "") {
      answers.name = "Mikro-Project";
    }
    this.destinationRoot(answers.name);
    // Add README file
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
    this.fs.copyTpl(
      this.templatePath('build.sh'),
      this.destinationPath('build.sh')
    );
    this.fs.copyTpl(
      this.templatePath('docker-compose.yml'),
      this.destinationPath('docker-compose.yml')
    );

    const MICROSERVICE_DIRECTORY = "microservice_1";
    this.fs.copy(
      this.templatePath('microservice_1'),
      this.destinationPath(MICROSERVICE_DIRECTORY+'/')
    );

    if(addAPIGateway) {
      const GATEWAY_DIRECTORY = "gateway";
      this.fs.copy(
        this.templatePath('gateway'),
        this.destinationPath(GATEWAY_DIRECTORY+'/')
      );
    }
  } // Start method

};