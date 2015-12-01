(function() {
    var _b = Base = {};
    var _loadedUrls = {};

    var scripts = document.getElementsByTagName("script");
    var i = scripts.length;
    while (i--) {
        var match = scripts[i].src.match(/(^|.*\/)base/);
        if (match) { _b.ROOT = match[1]; }
    }

    _b.xhr = function(method, url, someBool) {
        var request = new XMLHttpRequest();
        request.open(method, url, someBool);
        return request;
    }
				
    _b.require = function(url, callback) {
        if (!url.match(/\.([^\/]*)$/)) { url += ".js"; }
		if(url.indexOf('//') != 0) { url = _b.ROOT + url; }
        if (!_loadedUrls[url]) {
            with (_b.xhr("GET", url, false)) {
                send(null);
                if (status == 200) {
                    eval(responseText);
                    if(callback) callback(responseText);
                    _loadedUrls[url] = true;
                }
                else { throw new Error("Unable to load " + url + " status: " + status); }
            }
        }
    }
})();

//Get Query String
function getQueryParam(name) {
    var scripts = document.getElementsByTagName("script");
    var src = '/javascripts/base-min.js';
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i].getAttribute('src');
      if (s) {
        var ix = s.indexOf(src);
        if (ix > -1) {
          src = s;
          break;
        }
      }
    }
    
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(src);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
