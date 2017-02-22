var $ = window.$ || require('jquery');
var fs = require('fs');
var insertCss = require('insert-css');
var css = fs.readFileSync(
    __dirname + '/notifications.css');

insertCss(css);

var optionsDefault = {
  displaySuccess: true,
  displayErrors: true,
  displayWarnings: false
};
var instancesMap = {};

/**
 * Init plugin
 * @param {kaavio instance} kaavio
 * @param {object} options
 * @return {object} KaavioNotifications instance
 */
/*
function init(kaavio, options) {
  // Create new instance if it does not exist
  if (!instancesMap.hasOwnProperty(kaavio.instanceId)) {
    instancesMap[kaavio.instanceId] = new KaavioNotifications(kaavio, options);
  }

  return instancesMap[kaavio.instanceId];
}
//*/

/**
 * Plugin constructor
 * @param {kaavio instance} kaavio
 * @param {objects} options
 */
function KaavioNotifications(kaavio, options) {
  // TODO locate this near the diagram
  var $notifications = $('<div class="kaavio-notifications">').appendTo($(document.body));
  /*
  var $notifications = $('<div class="kaavio-notifications">').appendTo($(kaavio.containerElement));
  //*/
  options = options || {};
  var notifications = [];
  var lastNotification = {type: null, message: '', counter: 0, $element: null};

  // Copy default options
  for (var i in optionsDefault) {
    if (optionsDefault.hasOwnProperty(i) && !options.hasOwnProperty(i)) {
      options[i] = optionsDefault[i];
    }
  }

  if (options.displayErrors) {
    kaavio.on('error', function(data) {
      addKaavioNotification($notifications, 'danger',
          '<strong>Error!</strong> ' + data.message, notifications);
    })
  }

  if (options.displayWarnings) {
    kaavio.on('warning', function(data) {
      addKaavioNotification($notifications, 'warning',
          '<strong>Warning!</strong> ' + data.message, notifications);
    })
  }

  if (options.displaySuccess) {
    kaavio.on('success', function(data) {
      addKaavioNotification($notifications, 'success',
          '<strong>Success!</strong> ' + data.message, notifications);
    })
  }
}

/**
 * Search for a notification in a list of notifications
 * @param  {String} type
 * @param  {String} message
 * @param  {Array} notifications List of notifications
 * @return {Object|Null}               Notification or Null
 */
function getNotification(type, message, notifications) {
  for (var n in notifications) {
    if (notifications[n].type === type && notifications[n].message === message) {
      return notifications[n];
    }
  }

  return null
}

/**
 * Remove a notification from a list of notifications
 * @param  {Object} notification Notification to search for
 * @param  {Array} notifications List of notifications
 */
function removeNotification(notification, notifications) {
  for (var n in notifications) {
    if (notifications[n] === notification) {
      notifications.splice(n, 1);
    }
  }
}

/**
 * Append the element to notifications container
 * @param {d3 selector} $container
 * @param {string} type. danger, warning, success, info
 * @param {string} message
 */
function addKaavioNotification($container, type, message, notifications) {
  var notification = getNotification(type, message, notifications)

  if (notification !== null) {
    notification.counter += 1;

    // Increment counter
    notification.$element.find('.counter').show().text(notification.counter)
  } else {
    var $notification = $('<div class="alert alert-' + type + '">')
      .html(message)
      .appendTo($container);

    notification = {
      type: type,
      message: message,
      counter: 1,
      $element: $notification
    }

    // Add close button
    $('<button type="button" class="close" data-dismiss="alert">' +
        '<span aria-hidden="true">×</span></button>')
      .prependTo($notification)
      .on('click', function() {
        removeNotification(notification, notifications);
        $(this).parent().remove();
      });

    // Add counter
    $('<span class="counter">1</span>')
      .hide()
      .prependTo($notification);

    notifications.push(notification);
  }
}

module.exports = KaavioNotifications;
