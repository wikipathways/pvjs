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
    var $notifications = pvjs.$element.append('div').attr('class', 'pathvisiojs-notifications')
      , options = options || {}

    // Copy default options
    for (var i in optionsDefault) {
      if (optionsDefault.hasOwnProperty(i) && !options.hasOwnProperty(i)) {
        options[i] = optionsDefault[i]
      }
    }

    if (options.displayErrors) {
      pvjs.on('error', function(data){
        addPathvisiojsNotification($notifications, 'danger', '<strong>Error!</strong> ' + data.message)
      })
    }

    if (options.displayWarnings) {
      pvjs.on('warning', function(data){
        addPathvisiojsNotification($notifications, 'warning', '<strong>Warning!</strong> ' + data.message)
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
  function addPathvisiojsNotification($container, type, message){
    $container
      .append('div').attr('class', 'alert alert-' + type)
      .html(message)
      .on('click', function(){
        d3.select(this).on('click', null).remove()
      })
  }

  /**
   * Expose plugin globally
   */
  window.pathvisiojsNotifications = PathvisiojsNotifications
})(window)
