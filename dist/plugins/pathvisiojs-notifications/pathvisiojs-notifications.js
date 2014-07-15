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
      , lastNotification = {type: null, message: '', counter: 0, $element: null}

    // Copy default options
    for (var i in optionsDefault) {
      if (optionsDefault.hasOwnProperty(i) && !options.hasOwnProperty(i)) {
        options[i] = optionsDefault[i]
      }
    }

    if (options.displayErrors) {
      pvjs.on('error', function(data){
        addPathvisiojsNotification($notifications, 'danger', '<strong>Error!</strong> ' + data.message, lastNotification)
      })
    }

    if (options.displayWarnings) {
      pvjs.on('warning', function(data){
        addPathvisiojsNotification($notifications, 'warning', '<strong>Warning!</strong> ' + data.message, lastNotification)
      })
    }

  }

  /**
   * Append the element to notifications container
   *
   * @param {d3 selector} $container
   * @param {string} type. danger, warning, success, info
   * @param {string} message
   */
  function addPathvisiojsNotification($container, type, message, lastNotification){
    if (lastNotification.type === type && lastNotification.message == message) {
      lastNotification.counter += 1

      // Increment counter
      lastNotification.$element.find('.counter').show().text(lastNotification.counter)

    } else {
      var $notification = $('<div class="alert alert-' + type + '">')
        .html(message)
        .appendTo($container)

      // Add close button
      $('<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button>')
        .prependTo($notification)
        .on('click', function(){
          $(this).parent().remove()
        })

      // Add counter
      $('<span class="counter">1</span>')
        .hide()
        .prependTo($notification)

      lastNotification.type = type
      lastNotification.message = message
      lastNotification.counter = 1
      lastNotification.$element = $notification
    }

  }

  /**
   * Expose plugin globally
   */
  window.pathvisiojsNotifications = PathvisiojsNotifications
})(window)
