const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing Mikro - Yeoman Generator for Microservices...');
  }
  async start() {
    let answers = await this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : '\nEnter a name for Micro Services Project (i.e.: mikro-project): '
      }
    ])
    if(answers.name == "") {
      answers.name = "mikro-project";
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

    if(true) {
      this.fs.copyTpl(
        this.templatePath('docker-compose.yml'),
        this.destinationPath('docker-compose.yml')
      );
    }

    // this.destinationRoot("../");

    this.destinationRoot("./")
    
    this.composeWith(require.resolve('../add'), {projectDirectory: answers.name});
    this.composeWith(require.resolve('../client-app'), {projectDirectory: answers.name});
    this.composeWith(require.resolve('../gateway'), {projectDirectory: answers.name});

    this.config.set({"mikro-generator-version": "0.0.4"});
    this.config.save();

    

   
  } // Start method

}