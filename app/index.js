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
        message : 'Enter a name for Micro Services Project (i.e.: My-Project): '
      }
    ]).then( (answers) => {
      // create destination folder
      this.destinationRoot(answers.name);
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
    });
  }
};