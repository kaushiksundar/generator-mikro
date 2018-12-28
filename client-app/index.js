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
            },
            {
                type    : 'list',
                name    : 'tech',
                message : 'Choose Technology: ',
                choices: [{
                  name: 'Node/Express - Custom',
                  value: 'custom'
                }, {
                    name: 'ReactJS',
                    value: 'react'
                }, {
                    name: "VueJS",
                    value: "vue"
                }]
              }
        ]);
         
        // create destination folder
        if(result.name == "") {
            result.name = "web"
        }
        
    
        this.fs.copyTpl(
            this.templatePath('custom/package.json'),
            this.destinationPath(result.name+'/package.json'),
            {name: result.name}
        );

        this.fs.copyTpl(
            this.templatePath('custom/Dockerfile'),
            this.destinationPath(result.name+'/Dockerfile'),
            {name: result.name}
        );

        this.fs.copyTpl(
            this.templatePath('custom/public/index.html'),
            this.destinationPath(result.name+'/public/index.html'),
            {name: result.name}
        );

        this.fs.copyTpl(
            this.templatePath('custom/config.js'),
            this.destinationPath(result.name+'/config.js'),
            {name: result.name}
        );

        this.fs.copyTpl(
            this.templatePath('custom/index.js'),
            this.destinationPath(result.name+'/index.js'),
            {name: result.name}
        );

        this.destinationRoot("./")
        let clientAppsConfig = this.config.get("client-apps");
        clientAppsConfig ? clientAppsConfig.push(result.name) : clientAppsConfig = [result.name]
        this.config.set({"client-apps": clientAppsConfig });
        this.config.save();
    }
    

  }
};