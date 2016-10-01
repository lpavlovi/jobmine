var acceptable_cookies = [
  new RegExp(/jobmprod\S+=\S+/),
  new RegExp(/PS_(?!TOKENEXPIRE)\w+=\S+/),
  new RegExp(/SignOnDefault=\S+/),
  new RegExp(/ExpirePage=\S+/)
];

var matchCookie = function(str) {
  for(var i = 0; i < acceptable_cookies.length; i++) {
    x = str.match(acceptable_cookies[i]);
    if (x != null) return x[0];
  }
  return false;
};

var build_cookie_string = function(cookies) {
  var list_cookie = []
  var cookie_str;

  for (var i = 0; i < cookies.length; i++) {
    if (!!matchCookie(cookies[i]))
      list_cookie.push(matchCookie(cookies[i]));
  }

  cookie_str = list_cookie.join(' ');
  return cookie_str;
};

module.exports = {
  'generate': build_cookie_string
};
