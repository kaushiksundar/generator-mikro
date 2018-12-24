const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing...');
  }
  start() {
    this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'Enter a name for the Micro Services (i.e.: microservice-name): '
      }
    ]).then( (answers) => {
      // create destination folder
      if(answers.name == "") {
        this.log("Micro service name can't be empty");
      } else {
        this.destinationRoot(answers.name);
        
        this.fs.copyTpl(
            this.templatePath('microservice/package.json'),
            this.destinationPath('package.json'),
            {name: answers.name}
        );

        this.fs.copyTpl(
            this.templatePath('microservice/Dockerfile'),
            this.destinationPath('Dockerfile'),
            {name: answers.name}
        );

        this.destinationRoot(answers.name+"/src");

        this.fs.copyTpl(
            this.templatePath('microservice/src/index.js'),
            this.destinationPath('index.js'),
            {name: answers.name}
        );

        this.fs.copyTpl(
            this.templatePath('microservice/src/config.js'),
            this.destinationPath('config.js'),
            {name: answers.name}
        );
      }
      
    });
  }
};