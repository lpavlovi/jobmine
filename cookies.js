const ac = new RegExp(/(jobmprod\S+|PS_(?!TOKENEXPIRE)\w+|SignOnDefault|ExpirePage)=\S+/);

var matchCookie = function(str) {
  x = str.match(ac);
  return x != null ? x[0] : false;
};

// Isolate cookie name and value from the response headers
// join array on a space to get a cookie string
// Used as a part of the header in many requests where the user need to be logged in
exports.generate = function(cookies) {
  var list_cookie = []
  var cookie_str;

  for (var i = 0; i < cookies.length; i++) {
    if (!!matchCookie(cookies[i]))
      list_cookie.push(matchCookie(cookies[i]));
  }

  cookie_str = list_cookie.join(' ');
  return cookie_str;
};

