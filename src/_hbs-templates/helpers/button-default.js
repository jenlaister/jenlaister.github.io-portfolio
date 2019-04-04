
module.exports.register = function (handlebars) {
    handlebars.registerHelper('button-default', function (url, text) {
      var url = handlebars.escapeExpression(url);

      var result = '<a href="' + url + '">' + text + '</a>';

      return new handlebars.SafeString(result);
    });
};
