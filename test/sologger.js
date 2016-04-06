var loggin = require('loggin');

loggin.conf({
  enabled: ['customStdoutColorVerbose', 'customStderrColorVerbose'],
  handlers: {
    customStdoutColorVerbose: {
      Class: 'loggin/core/handlers/stream-handler',
      layout: 'colorVerbose',
      kwargs: {
        maxLevel: 'LOG',
        stream: process.stdout
      }
    },
    customStderrColorVerbose: {
      Class: 'loggin/core/handlers/stream-handler',
      layout: 'colorVerbose',
      kwargs: {
        minLevel: 'WARNING',
        stream: process.stderr
      }
    }
  },
  layouts: {
    colorRegular: {
      Class: 'loggin/core/layouts/colored',
      record: 'regular',
      kwargs: {
        dateFormat: '%H:%M:%S.%L',
        template: '\x1B[90m[%(date)s]\x1B[0m %(process)5s %(level)-17s ' +
          '%(context)s\n%(message)s\n\n'
      }
    },
    colorVerbose: {
      Class: 'loggin/core/layouts/colored',
      record: 'verbose',
      kwargs: {
        showStackTraces: true,
        dateFormat: '%H:%M:%S.%L',
        template: '\x1B[90m[%(date)s]\x1B[0m %(process)5s %(level)-17s ' +
          '%(module)s:%(line)d:%(column)d %(context)s\n%(message)s\n\n'
      }
    }
  }
});

module.exports = loggin;
