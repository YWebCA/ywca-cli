'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the top-notch ' + chalk.red('YwcaWorkspace') + ' generator!'
    ));

    var prompts = [
      {
        type    : 'input',
        name    : 'name',
        message : 'What is your name?',
        default : ''
      },
      {
        type    : 'input',
        name    : 'email',
        message : 'What is your email?',
        default : ''
      },
      {
        type    : 'input',
        name    : 'user',
        message : 'What is your github user name?',
        default : ''
      },
      {
        type    : 'input',
        name    : 'repo',
        message : 'What is the name of the repository you will push this to?',
        default : 'ywebca'
      },
      {
        type    : 'input',
        name    : 'dir',
        message : 'What directory would you like to create the workspace in?',
        default : 'ywebca'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  paths: function () {
    this.destinationRoot(this.props.dir);
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {name: this.props.name, email: this.props.email, user: this.props.user, repo: this.props.dir}
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {name: this.props.name, email: this.props.email, user: this.props.user}
      );
    }
  },

  install: function () {
    //this.installDependencies();
    var done = this.async();
    var spawnCommand = this.spawnCommand
    var user = this.props.user;

    this.config.set('name', this.props.name)
    this.config.set('email', this.props.email)
    this.config.set('user', this.props.user)
    this.config.set('repo', this.props.repo)
    this.config.save();

    spawnCommand('git', ['init']).on('close', function () {
      spawnCommand('git', ['add', '--all']).on('close', function() {
        spawnCommand('git', ['commit', '-m', '"init"']).on('close', function () {
          spawnCommand('git', ['remote', 'add', 'origin', 'git@github.com:' + user + '/ywebca.git']).on('close', function() {
            spawnCommand('git', ['push', 'origin', 'master']).on('close', done);
          });
        });
      });
    });
  }
});