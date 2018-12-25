const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.projectDir = opts.projectDir || "./";
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
        },{
          name: 'Python',
          value: 'python'
        }]
      }
    ]);


    // create destination folder
    if(answers.name == "") {
      answers.name = "microservice_1"
    }

    if(answers.language == "nodeJS") {
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

      this.destinationRoot("src");

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
    else if(answers.language == "python"){
      this.log("Python service is under construction");  
    }
    
  }
};