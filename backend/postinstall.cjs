const shell = require('shelljs');

if (process.platform !== 'win32') {
  if (shell.exec('chmod +x node_modules/.bin/prisma').code !== 0) {
    shell.echo('Error: chmod failed');
    shell.exit(1);
  }
}

if (shell.exec('prisma generate').code !== 0) {
  shell.echo('Error: prisma generate failed');
  shell.exit(1);
}