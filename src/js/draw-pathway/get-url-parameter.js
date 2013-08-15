function getURLParameter(name) {

  // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
  // This will be replaced once we get the backend php to get the json

  var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  if (parameter !== null) {
    return parameter;
  }
  else {
    return "WP673_63184";
  };
};
