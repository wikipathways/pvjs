(function(window){

  var optionsDefault = {
    displayErrors: true
  , displayWarnings: false
  }

  /**
   * Init plugin
   *
   * @param {pathvisiojs instance} pvjs
   */
  function PathvisiojsNotifications(pvjs, options) {
    var $notifications = $('<div class="pathvisiojs-notifications">').appendTo($(pvjs.$element[0][0]))
      , options = options || {}
      , notifications = []
      , lastNotification = {type: null, message: '', counter: 0, $element: null}

    // Copy default options
    for (var i in optionsDefault) {
      if (optionsDefault.hasOwnProperty(i) && !options.hasOwnProperty(i)) {
        options[i] = optionsDefault[i]
      }
    }

    if (options.displayErrors) {
      pvjs.on('error', function(data){
        addPathvisiojsNotification($notifications, 'danger', '<strong>Error!</strong> ' + data.message, notifications)
      })
    }

    if (options.displayWarnings) {
      pvjs.on('warning', function(data){
        addPathvisiojsNotification($notifications, 'warning', '<strong>Warning!</strong> ' + data.message, notifications)
      })
    }
  }

  function getNotification(type, message, notifications) {
    for (var n in notifications) {
      if (notifications[n].type === type && notifications[n].message === message) {
        return notifications[n]
      }
    }

    return null
  }

  function removeNotification(notification, notifications) {
    for (var n in notifications) {
      if (notifications[n] === notification) {
        notifications.splice(n, 1)
      }
    }
  }

  /**
   * Append the element to notifications container
   *
   * @param {d3 selector} $container
   * @param {string} type. danger, warning, success, info
   * @param {string} message
   */
  function addPathvisiojsNotification($container, type, message, notifications){
    var notification = getNotification(type, message, notifications)

    if (notification !== null) {
      notification.counter += 1

      // Increment counter
      notification.$element.find('.counter').show().text(notification.counter)
    } else {
      var $notification = $('<div class="alert alert-' + type + '">')
        .html(message)
        .appendTo($container)

      notification = {
        type: type
      , message: message
      , counter: 1
      , $element: $notification
      }

      // Add close button
      $('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button>')
        .prependTo($notification)
        .on('click', function(){
          removeNotification(notification, notifications)
          $(this).parent().remove()
        })

      // Add counter
      $('<span class="counter">1</span>')
        .hide()
        .prependTo($notification)

      notifications.push(notification)
    }
  }

  /**
   * Expose plugin globally
   */
  window.pathvisiojsNotifications = PathvisiojsNotifications
})(window)
