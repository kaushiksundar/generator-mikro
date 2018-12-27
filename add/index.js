const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.projectDirectory = opts.projectDirectory || "./";
  }
  async start() {
    let answers = await this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'Enter a name for the Micro Services (i.e.: microservice_1): '
      },
      {
        type    : 'list',
        name    : 'language',
        message : 'Choose microservice language: ',
        choices: [{
          name: 'NodeJS',
          value: 'nodeJS'
        }]
      }
    ]);


    // create destination folder
    if(answers.name == "") {
      answers.name = "microservice_1"
    }

    if(answers.language == "nodeJS") {
      
      this.fs.copyTpl(
          this.templatePath('microservice/package.json'),
          this.destinationPath(answers.name+'/package.json'),
          {name: answers.name}
      );

      this.fs.copyTpl(
          this.templatePath('microservice/Dockerfile'),
          this.destinationPath(answers.name+'/Dockerfile'),
          {name: answers.name}
      );

      this.fs.copyTpl(
          this.templatePath('microservice/src/index.js'),
          this.destinationPath(answers.name+'/src/index.js'),
          {name: answers.name}
      );

      this.fs.copyTpl(
          this.templatePath('microservice/src/config.js'),
          this.destinationPath(answers.name+'/src/config.js'),
          {name: answers.name}
      );
    }

    this.destinationRoot("./")
      this.config.set({"microservices": [answers.name]});
      this.config.save();
    
  }
};