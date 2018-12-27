const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.projectDirectory = opts.projectDirectory || "./";
  }
  async start() {
    // this.log("======> "+this.projectDirectory);
    // this.destinationRoot(this.projectDirectory);

    let answers = await this.prompt([
        {
            type    : 'confirm',
            name    : 'createClientApp',
            message : 'Do you want to create a client app? '
          }
    ]);


    if(answers.createClientApp) {
        let result = await this.prompt([
            {
                type    : 'input',
                name    : 'name',
                message : 'Enter a name for the Client App (i.e.: web): '
            }
        ]);
         
        // create destination folder
        if(result.name == "") {
            result.name = "web-client-app"
        }
        
        // this.destinationRoot(this.projectDirectory+"/"+result.name);
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(result.name+'/package.json'),
            {name: result.name}
        );

        this.destinationRoot("./")
        this.config.set({"client-apps": [result.name]});
        this.config.save();
    }
    

  }
};