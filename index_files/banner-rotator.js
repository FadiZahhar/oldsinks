function swfObjectReplace(item, readyCallBack) {    
    var eId = item.attr("id");
    var object = item.find('object').first();
    var html5Video = item.find('video').first(); // HTML5 video tag
    var fv = item.find('object param[name=flashvars]').first();
    var hasObjects = false;

    if(object.length > 0) {
        hasObjects = true;
        var replacementDiv = $('<div></div>');
        replacementDiv.attr("id", 'swfObjectContainer' + eId);
        
        // extract necessary bits from existing object             
        //var movie = object.find('param[name="movie"]');                
        var movie = item.find('object param[name=movie]');
        
        // IE workaround :-|
        if(movie != undefined) {
            movie = movie.attr("value");
            //if (movie == undefined) return false;
        } else {
            //movie = object.find("embed").attr("movie");
            movie = item.find('object embed');
            if (movie != undefined) movie = movie.attr("value");
            else return false;
        }
        
        if(movie != undefined && movie.indexOf('youtube.com') > 0) {
            var reg = /v\/(.*?)&/;
            var parsedUrl = reg.exec(movie);                
            movie = 'http://www.youtube.com/watch?v=' + parsedUrl[1];
        } else {
            movie = escape(movie);
        }	                
        var height = object.attr("height");
        var width = object.attr("width");
         
        // re-build with swfobject
        var flashvars = 'file=' + movie + '&autostart=false&autoplay=0&playerready=' + readyCallBack;        
        if (fv != undefined) {
            flashvars += "&" + fv.attr("value");
        }
        
        var params = {
            'allowfullscreen': 'true', 
            'allowscriptaccess': 'always', 
            'bgcolor': '#ffffff',
            'wmode': 'transparent',
            'flashvars': flashvars
        };
		
		// insert new container and remove existing object	                	                
        object.before(replacementDiv);
        object.remove();
		
        var attributes = { 'id': 'swfObjectEmbed-' + eId, 'name': 'swfObjectEmbed-' + eId };                    
        swfobject.embedSWF(
            "/app_assets/jwplayer5.swf", 
            'swfObjectContainer' + eId, 
            width, height, '9', '', false, params, attributes
        );                      
    }

    if (html5Video.length > 0) {
        hasObjects = true;
    }
    
    return hasObjects;
}

function swRotator_swfObjectLoaded(obj) {
    var player = document.getElementById(obj['id']);    
    player.addViewListener("play", "swRotator_swfObjectPlayListener");
    player.addModelListener("state", "swRotator_swfObjectStateChangeListener");
    //player.addModelListener("buffer", "swRotator_swfObjectBufferListener");
            
    var rotator = $('#' + obj['id']).closest('.swRotator');
    if(rotator.hasClass('swFader')) {        
        var api = rotator.find('.pager').data("api");
    } else {
        var api = rotator.find('.scrollable').data('scrollable');
    }
    
    // set rotator to start after an initial delay
    if (api.timer == undefined) {        
        api.timer = setTimeout(function() {
            api.play();
        },
            api.interval + 2000
        );
    }
}

function swRotator_swfObjectPlayListener(obj) { 
    var isPlaying = obj.state;
    
    // get API instance; location depends on transition type
    var rotator = $('#' + obj.id).closest('.swRotator');        
    if(rotator.hasClass('swFader')) {        
        var api = rotator.find('.pager').data("api");
    } else {
        var api = rotator.find('.scrollable').data('scrollable');
    }

    if (isPlaying) {
        // Clear initial timer if still set and stop to prevent 
        // pager.hover event from restarting the transition
        if (api.timer) {
            clearTimeout(api.timer);
            clearInterval(api.timer); 
        }
        api.stop();
    } else  {
        api.timer = setTimeout(function() {
                api.play();
            }, 
            api.interval
        );
    }
}        

function swRotator_swfObjectStateChangeListener(obj) {        
    // auto restart transition once video has finished playing
    if(obj.newstate == "COMPLETED") {
        // get API instance; location depends on transition type
        var rotator = $('#' + obj.id).closest('.swRotator');        
        if(rotator.hasClass('swFader')) {        
            var api = rotator.find('.pager').data("api");
        } else {
            var api = rotator.find('.scrollable').data('scrollable');
        }
                    
        setTimeout(function() {
                api.play();
            }, 
            api.interval
        );
    }
}      

function swRotator_swfObjectBufferListener(obj) {        
    var buffered = obj.percentage;
    
    // get API instance; location depends on transition type
    var rotator = $('#' + obj.id).closest('.swRotator');        
    if(rotator.hasClass('swFader')) {        
        var api = rotator.find('.pager').data("api");
    } else {
        var api = rotator.find('.scrollable').data('scrollable');
    }
    
    // Clear initial timer if still set and stop to prevent 
    // pager.hover event from restarting the transition
    if(api.timer) clearTimeout(api.timer); 
    api.stop();
}


var swRotator = function(options) {
    var r = this;

    var container = null;
    var slider = null;
    var items = null;
    var item = null;
    var pager = null;
    var height = null;
    var width = null;
    var widthUnits = null;
    var transition = null;
    var vertical = null;
    var delay = null;
    var speed = null;
    var showPager = null;

    r.init = function(options) {
        r.container = options.container ? options.container : null;
        r.height = options.height ? options.height : null;
        r.width = options.width ? options.width : null;
        r.widthUnits = options.widthUnits ? options.widthUnits : null;
        r.transition = options.transition ? options.transition : null;
        r.vertical = options.vertical;
        r.reversed = options.reversed;
        r.delay = options.delay ? options.delay * 1000 : 3000;
        r.speed = options.speed ? options.speed * 1000 : 400;
        r.showPager = options.showPager;

        // abort if no container
        if (!r.container) return false;

        r.container = $('#' + r.container);
        r.slider = r.container.find(".scrollable");
        r.pager = r.container.find(".pager");
        r.items = r.slider.find('.items');
        r.item = r.items.find('.item');
        r.setDimensions();

        if (r.item.length == 1) {
            r.showPager = false;
        }

        // slide setup
        if (r.transition == 'swSlider') {
            var options = { circular: true, vertical: false, speed: r.speed };
            var autoscroll_options = { autopause: false, autoplay: false, interval: r.delay };
            var nav_options = { navi: '#' + r.container.attr("id") + ' .pager', activeClass: 'current' };

            // set dimensions
            if (r.vertical) {
                r.items.height('20000em');
                options.vertical = true;
            } else {
                r.items.width('20000em');
                r.item.css({ float: 'left' });
            }

            if (r.showPager) {
                r.pager.show();
                // set first pager item as current
                r.pager.find('a:first').addClass('current');
            }


            // initialize slider and pull out api reference
            r.slider = r.slider.scrollable(options).autoscroll(autoscroll_options).navigator(nav_options);
            var api = r.slider.data('scrollable');
            // api doesn't expose interval, so need to create an explicit reference
            api.interval = r.delay;

            // reverse next/prev functions when transition direction is right or down
            if (r.reversed) {
                api.seekTo(r.item.length - 1, 0)

                api.getConf().prev = '.next';
                api.getConf().next = '.prev';
                api.next = function(time) {
                    return api.move(-1, time);
                }
                api.prev = function(time) {
                    return api.move(1, time);
                }
            }

            api.onBeforeSeek(function(evt, index) {
                // explicitly stop jwplayer when advancing to next (IE workaround)
                if (evt.currentTarget.getItems()[evt.currentTarget.getIndex()] != undefined) {
                    var id = "swfObjectEmbed-" + evt.currentTarget.getItems()[evt.currentTarget.getIndex()].id;
                    if (id && document.getElementById(id)) {
                        var player = document.getElementById(id);
                        state = player.getConfig().state;
                        if (state == "PLAYING") {
                            player.sendEvent("STOP");
                        }
                    }
                }

                // explicitly stop and restart autoscroll timer (workaround to reset timer when manually advanced)
                api.stop();
                if (api.timer) clearInterval(api.timer);
                api.timer = setInterval(function() { api.next(); }, api.interval);
            });
        }
        // fade setup
        else {
            var item_selector = '#' + r.container.attr("id") + ' .scrollable .items .item';
            if($(item_selector).length == 0) return;
            
            var options = { effect: 'fade', fadeOutSpeed: 'slow', rotate: true, fadeInSpeed: r.speed };
            var slide_options = {
                api: true,
                autopause: false,
                autoplay: false,
                clickable: false,
                interval: r.delay
            };

            if (r.showPager) {
                r.pager.show();
            }

            // initialize fader    
            var api = r.pager.tabs(item_selector, options).slideshow(slide_options);
            api.interval = slide_options.interval;

            // store api reference for access from jw player api events
            r.pager.data('api', api);

            // redefine the "next" function
            api.getTabs().next = function() {
                // explicitly stop jwplayer when advancing to next (IE workaround)
                var player = document.getElementById(api.getTabs().getCurrentPane().find("object").attr("id"));
                if (player) player.sendEvent("STOP");
                api.getTabs().click(api.getTabs().getIndex() + 1);
            }

            api.getTabs().onBeforeClick(function(index) {
                // explicitly stop jwplayer when advancing to next (IE workaround)
                var player = document.getElementById(api.getTabs().getCurrentPane().find("object").attr("id"));
                if (player) player.sendEvent("STOP");

                // explicitly stop and restart autoscroll timer (workaround to reset timer when manually advanced)
                api.stop();
                if (api.timer) {
                    clearTimeout(api.timer);
                    clearInterval(api.timer); 
                }
                api.timer = setTimeout(api.play, api.interval);
            });
        }

        // Replace any object elements with jw players via swfobject
        var hasObjects = false;
        var hasLightbox = false;
        $.each(r.item, function(i) {
            var result = swfObjectReplace($(this), 'swRotator_swfObjectLoaded');
            if (result == true && (i == 0 || (r.reversed && i == r.item.length - 1))) hasObjects = true;

            if (r.item.find("a.sw-lightbox").length > 0) hasLightbox = true;
        });

        if (hasLightbox) {
            $("a.sw-lightbox").lightBox({ fixedNavigation: true });
        }
        

        // only start autoplay if no objects found besides the first item, 
        // otherwise start is triggered by swRotator_swfObjectLoaded
        if (!hasObjects) {
            setTimeout(function() { api.play(); }, api.interval);
        }
    }


    r.setDimensions = function() {
        r.slider.height(r.height + 'px');
        r.slider.width(r.width + r.widthUnits);

        r.item.height(r.height + 'px');
        if (r.widthUnits == '%') {
            r.item.width(r.slider.width());
        } else {
            r.item.width(r.width + 'px');
        }
    }


    r.init(options);
}
