
/*
Pulled from file: WireFrame.js  02-08-2006 Brian Timmer
Base JavaScript file for application
*/


// Sets the row highlighting
function RollOverHighlight(classname) {
    if (document.getElementById) {
        var t, i, rows;
        var ts = document.getElementsByTagName("table");
        for (t in ts) {
            if (ts[t].className == classname) {
                rows = ts[t].getElementsByTagName("tr");
                for (i in rows) {
                    rows[i].onmouseover = function() { rollOver(this); };
                    rows[i].onmouseout = function() { rollOut(this); };
                }
            }
        }
    }
}

function rollOver(elm) {
    if (!/selecteditem/.test(elm.className))
        elm.className = "hovereditem";
}

function rollOut(elm) {
    if (!/selecteditem/.test(elm.className)) {
        elm.className = "";
    }
}


// Highlights a selected row
function HighlightRow(cbk) {
    if (document.getElementById) {
        var row = cbk.parentNode.parentNode;
        row.className = (cbk.checked) ? "selecteditem" : "";
    }
}

// Checks/Unchecks all checkboxes in a form
function ToggleCheck(chk) {
    if (document.getElementById) {
        var inputs, i, t, rows;
        var ts = document.getElementsByTagName("table");
        for (t in ts) {
            if (ts[t].className == "datagrid table") {
                inputs = ts[t].getElementsByTagName('input');
                for (i in inputs) {
                    if (/checkbox/.test(inputs[i].type)) {
                        if (inputs[i] != chk) {
                            inputs[i].checked = chk.checked;
                            HighlightRow(inputs[i]);
                        }
                    }
                }
            }
        }


    }
}


// Sets all of the checkboxes for the permission system to whatever
// the checkbox the user if clicking is set to.
function CheckSubCheckBoxes(elm) {
    if (document.getElementById) {
        var inputs, i, parentDl;
        parentDl = elm.parentNode.parentNode;
        inputs = parentDl.getElementsByTagName('input');
        for (i in inputs) {
            if (/checkbox/.test(inputs[i].type)) {
                inputs[i].checked = elm.checked;
            }
        }
    }
    else elm.style.display = "none";
}

/*Common String Functions*/
String.prototype.trim = function() {
    a = this.replace(/^\s+/, '');
    return a.replace(/\s+$/, '');
}

String.prototype.Left = function(intChars) {
    var a = this;
    if (intChars > a.length) {
        return '';
    } else {
        return a.substring(0, intChars);
    }
}

String.prototype.stripSpaces = function() {
    var strValue = this;

    strValue = strValue.replace(/\s/g, "");
    return strValue;
}

String.prototype.Right = function(intChars) {
    var a = this;
    if (intChars > a.length) {
        return '';
    } else {
        return a.substring(a.length - intChars, intChars);
    }
}

function IsDefined(obj) {
    if (typeof obj == "undefined" || obj == null) {
        return false;
    }

    return true;
}
// END Wireframe.js file code


// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
  	this.length = from < 0 ? this.length + from : from;
  	return this.push.apply(this, rest);
};

Array.prototype.findIndex = function(value){
	var ctr = "";
	for (var i=0; i < this.length; i++) {
		// use === to check for Matches. ie., identical (===), ;
		if (this[i] == value) {
			return i;
		}
	}
	return ctr;
};

;(function () {
    function Tidal() {
        this._cache = {};
        this._uid = -1;
        this._raisedEvents = {};
    }

    Tidal.prototype.sub = function (name, fn, context, handlePrevious) {
        var cache = this._cache;
        if (!cache.hasOwnProperty(name))
            cache[name] = [];

        var handler = {
            fn: fn,
            ctx: context || this,
            uid: ++this._uid
        };

        cache[name].push(handler);

        if (typeof context === 'boolean') {
            handlePrevious = context;
        }

        var previousArgs = this._raisedEvents[name];
        if (handlePrevious === true && Object.prototype.toString.call(previousArgs) === '[object Array]') {
            for (var i = 0, l = previousArgs.length; i < l; i++) {
                var args = previousArgs[i];
                this._callSub(handler, args);
            }
        }

        return this._uid;
    };

    Tidal.prototype.pub = function (name, options) {
        var cache = this._cache;

        var args = arguments.length > 2 ?
            Array.prototype.slice.call(arguments, 1) :
            (arguments[1] != null ? arguments[1] : []);

        if (Object.prototype.toString.call(args) !== '[object Array]') {
            args = [args];
        }

        var raisedEvents = this._raisedEvents;
        if (!raisedEvents.hasOwnProperty(name)) {
            raisedEvents[name] = [];
        }

        raisedEvents[name].push(args);

        if (!cache.hasOwnProperty(name)) {
            return;
        }

        var handlers = cache[name];
        var numArgs = args.length;

        if (options && options.cancellable === true) {

            var ret = true;
            for (var i = 0, l = handlers.length; i < l; i++) {
                var handler = handlers[i];
                if (this._callSub(handler, args, numArgs) === false) {
                    ret = false;
                }
            }
            return ret;

        } else {

            for (var i = 0, l = handlers.length; i < l; i++) {
                var handler = handlers[i];
                this._callSub(handler, args, numArgs);
            }
            return this;

        }

    };

    Tidal.prototype._callSub = function (handler, args, numArgs) {
        var ret = null;
        switch (numArgs || args.length) {
            case 0:
                ret = handler.fn.call(handler.ctx);
                break;
            case 1:
                ret = handler.fn.call(handler.ctx, args[0]);
                break;
            case 2:
                ret = handler.fn.call(handler.ctx, args[0], args[1]);
                break;
            case 3:
                ret = handler.fn.call(handler.ctx, args[0], args[1], args[2]);
                break;
            default:
                ret = handler.fn.apply(handler.ctx, args);
                break;
        }

        if (ret === false) {
            return false;
        } else {
            return true;
        }
    };

    Tidal.prototype.remove = function (arg) {
        var name, fn, handlers;
        var cache = this._cache;
        var isCallback = typeof arg === 'function';
        var isContext = typeof arg === 'object';
        var isUid = typeof arg === 'number';
        var isName = typeof arg === 'string';
        var isHandle = Object.prototype.toString.call(arg) === '[object Array]';
        if (isHandle) {
            name = arg[0], fn = arg[1];
            if (!cache.hasOwnProperty(name))
                return;

            handlers = cache[name];
            var l = handlers.length;
            while (l--) {
                if (handlers[l].fn === fn) {
                    handlers.splice(l, 1);
                }
            }
        } else if (isName) {
            if (!cache.hasOwnProperty(arg))
                return;

            cache[arg] = [];
        } else if (isCallback || isContext || isUid) {
            for (var _name in cache) {
                handlers = cache[_name];
                for (var i = 0, l = handlers.length; i < l; i++) {
                    if ((isCallback && handlers[i].fn === arg) ||
                         (isContext && handlers[i].ctx === arg) ||
                         (isUid && handlers[i].uid === arg)) {
                        handlers.splice(i, 1);
                    }
                }
            }
        }
        return this;
    }

    window.Tidal = Tidal;
})();



//
// Overall SiteWrench javascript namespace
//
sw = {
    events: new Tidal(),
    set_notification: function(msg) {
        // set a message if it's passed
        if (msg != undefined) { $(".notification").text(msg); }
        if ($(".notification").text().length > 0) {
            $(".notification").fadeIn('slow');
            window.setTimeout("$('.notification').fadeOut();", 2500);
        }
        else {
            $(".notification").hide();
        }
    },
    validate_form: function(form_to_validate, message, validate_class) {
        var sw_me = this;
        var validated = true;
        var focused = false;
        if (!validate_class || validate_class == "") {
            validate_class = ".sw-required";
        }
        $(form_to_validate.find(validate_class)).each(function() {
            var item = $(this);
            if (item.attr("disabled") != true && (item.val() == '' || (item.attr("type") == "checkbox"  && item.is(":checked") == false))) {
                validated = false;
                $(this).addClass("sw-validated");
                if (!focused) {
                    focused = true;
                    $(this).focus();
                }
            }
            else {
                $(this).removeClass("sw-validated");
            }
        });
        if (!validated) {
            if (!message) {
                message = "Please complete all required fields.";
            }
            sw_me.set_notification(message);
        }
        return validated;
    },
    validate_spam_bot: function(parent_element) {
        var bot_stop = $(parent_element + " .form-bot-stopper");
        if (bot_stop.length > 0) {
            bot_stop.find(".form-bot-stopper-notice").remove();
            stopAtempt = parseInt($("input[name*='tbAnswer']").val());
            var stopValid = true;
            var stopString = $(".form-bot-stopper-question").html();
            inputLoc = stopString.indexOf("<input");
            if (inputLoc <= 0) {
                inputLoc = stopString.indexOf("<INPUT");
            }
            stopString = stopString.substring(0, inputLoc - 1)
            var stopVals = stopString.split('+');

            var stopTotal = 0;
            stopTotal = parseInt($.trim(stopVals[0])) + parseInt($.trim(stopVals[1].replace("=", "")));
            if (stopAtempt != NaN) {
                stopValid = (stopTotal == stopAtempt);
            } else {
                stopValid = false;
            }
            if (!stopValid) {
                $(".form-bot-stopper").append('<div class="form-bot-stopper-notice">We\'re sorry, your answer was incorrect. This math question has been inserted to reduce the amount of spam we receive from web bots. The correct answer is ' + stopTotal + ', if you\'d like to try again.</div>');
                return false;
            }
        }
        return true;
    },
    validate_net_element: function(parent_element, class_name) {
        var valid_net_valid = true;
        (function($) {
            if (class_name == null || class_name == "") {
                class_name = "span.sw-validator-message";
            }
            var p = $(parent_element);
            var el = p.find("input[type='text'],input[type='email'],input[type='num'],input[type='textarea'],input[type='password'],select");

            $(el).each(function() {
                var e = $(this);

                var s = e.parent().find(class_name);
                if (s.length > 0 && e.val() == "") {
                    s.show();
                    s.css("visibility", "visible");
                    s.css("display", "inline");
                    valid_net_valid = false;
                }
            });
        })($);
        return valid_net_valid;
    },
    setup_site_search: function(field_id, btn_id) {
        $("#" + btn_id).click(function() {
            val = $("#" + field_id)[0].value;
            if (val != "") {
                window.location = "/searchresults.aspx?s=" + escape(val);
            }
            return false;
        });
        $("#" + field_id).click(function() { $(this)[0].value = ""; });
    },
    setup_list_signup: function(field_id, btn_id) {
        $("#" + btn_id).click(function() {
            val = $("#" + field_id)[0].value;
            if (val != "") {
                window.location = "/signup.aspx?e=" + escape(val);
            }
            return false;
        });
        $("#" + field_id).click(function() { $(this)[0].value = ""; });
    },
    locator_map: function(pp_id) {
        Base.require("locator-map.js");
        if (pp_id != "") {
            if (GBrowserIsCompatible()) {
                PublicSiteServices.LocatorMap_getData(pp_id, function(ajax_item) {
                    if (!util.is_ajax_error(ajax_item)) {
                        // render map if there is no error
                        locator_map.setup(ajax_item);
                    }
                });
            }
        }
    },
    file_cabinet: function(pp_id, token,size) {
        Base.require("file-cabinet.js");
        if (pp_id != "") {
            PublicSiteServices.FileCabinet_getData(pp_id, token, function(ajax_item) {
                if (!util.is_ajax_error(ajax_item)) {
                    // render file cabinet if there is no error
                    file_cabinet.setup(ajax_item, token,size);
                }
            });
        }
    }
}

//
// SiteWrench utility javascript namespace
//
util = {
    is_ajax_error: function (ajax_item) {
        var strErr = '';
        var intIndex = 0;

        if (ajax_item.IsError) {
            for (intIndex = 0; intIndex <= ajax_item.Errors.length - 1; intIndex++) {
                strErr += '- ' + ajax_item.Errors[intIndex] + '\n';
            }
            alert(strErr);
            return true;
        }

        return false;
    },
    clean_for_int: function (val) {
        reg = /[^\d]/gi;
        val = val.toString();
        return val.replace(reg, "");
    },
    clean_for_decimal: function (val, allow_neg) {
        if (allow_neg) reg = /[^\d\.-]/gi;
        else reg = /[^\d\.]/gi;
        val = val.toString();
        return val.replace(reg, "");
    },
    clean_for_slug: function (val) {
        reg = /[^a-zA-Z|\d\-_]/gi;
        return val.replace(reg, "");
    },
    clean_for_subdomain: function (val) {
        reg = /[^a-zA-Z|\d]/gi;
        return val.replace(reg, "");
    },
    round_number: function (num, dec) {
        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
    },
    get_table_checks: function (tbl_id) {
        chks = new Array();
        index = 0;
        $('#' + tbl_id + ' > tbody input[type=\'checkbox\']').each(function () {
            if ($(this)[0].checked) {
                chks[index] = $(this).attr('value');
                index++;
            }
        });
        return chks;
    },
    format_percentage: function (val) {
        val = util.clean_for_decimal(val, true);
        if (val > 0) {
            return util.round_number((val * 100), 2).toString() + " %";
        }
        else {
            return "0 %";
        }
    },
    fix_json_date: function (jsonDate) {
        return new Date(+jsonDate.replace(/\/Date\((\d+)\)\//, '$1'));
    },
    format_datetime: function (dt, include_time, timeOnNewLine) {
        var strAM = 'AM';
        var strMin;
        var strSec;
        var strDte = ''

        strDte = (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();

        if (include_time) {
            if (timeOnNewLine !== false) {
                strDte += '<br/>';
            } else {
                strDte += '&nbsp;';
            }
            strDte += util.format_time(dt);
        }

        return strDte;
    },
    format_time: function (dt) {
        var strAM = 'am';
        var strMin;
        var strSec;
        var strDte = '';
        if (dt.getHours() - 12 > 0) {
            strAM = 'pm';
            strDte += (dt.getHours() - 12);
        } else {
            if (dt.getHours() == "0") {
                strDte += "12";
            } else {
                strDte += dt.getHours();
            }
        }

        if (dt.getSeconds() < 10) {
            strSec = '0' + dt.getSeconds();
        } else {
            strSec = dt.getSeconds();
        }

        if (dt.getMinutes() < 10) {
            strMin = '0' + dt.getMinutes();
        } else {
            strMin = dt.getMinutes()
        }

        strDte += ':' + strMin + ' ' + strAM;
        return strDte;
    },
    make_elapsed_time: function (dt) {
        if (dt.getFullYear() == "1900") {
            return "never"
        }

        // get time component since database dates are stored as GMT with local time, so we have to "convert" back :/
        dt = new Date(dt.toUTCString().replace(/GMT/gi, '').trim());

        var now = new Date();
        var mins = Math.round((now.getTime() - dt.getTime()) / 60000); // 60000 ms in a minute
        var hrs = 0;
        var days = 0;

        // determine proper hrs
        if (mins >= 60) {
            hrs = Math.floor(mins / 60);
            mins = Math.floor(mins - (hrs * 60));
        }

        // determine proper days
        if (hrs >= 24) {
            days = Math.floor(hrs / 24);
            hrs = Math.floor(hrs - (days * 24));
        }

        var day_msg = " days";
        var hr_msg = " hrs";
        var min_msg = " mins";

        var msg_parts = new Array();
        var formatted_elapsed_time = "";

        // set days part
        if (days > 0) {
            if (days == 1) {
                day_msg = day_msg.replace("s", "");
            }
            else if (days >= 90) {
                // if the date is older than 90 days ago
                // just show a typical formatted date
                return util.format_datetime(dt, false);
            }
            msg_parts[0] = days + day_msg;
        }
        // set hours part
        if (hrs > 0) {
            if (hrs == 1) {
                hr_msg = hr_msg.replace("s", "");
            }
            msg_parts[1] = hrs + hr_msg;
        }
        // set minutes part
        if (mins > 0) {
            if (mins == 1) {
                min_msg = min_msg.replace("s", "");
            }
            msg_parts[2] = mins + min_msg;
        }

        formatted_elapsed_time = msg_parts.join(" ");

        // if they're all zero set a better message
        if (formatted_elapsed_time.replace(" ", "") == "") {
            formatted_elapsed_time = "a moment";
        }

        return formatted_elapsed_time + " ago";
    },
    format_currency: function (num, include_cents, currency_symbol) {
        if (include_cents == undefined) include_cents = true;
        if (!currency_symbol) currency_symbol = "$";
        if (num == undefined) {
            return (include_cents) ? currency_symbol + "0.00" : currency_symbol + "0";
        }
        var regx = new RegExp("\\" + currency_symbol + "|\\,","g");
        num = num.toString().replace(regx, "");
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));

        if (include_cents)
            return (((sign) ? '' : '-') + currency_symbol + num + '.' + cents);
        else
            return (((sign) ? '' : '-') + currency_symbol + num);
    },
    format_filesize: function (size) {
        if (size < 1048576) {
            if (size == 0) return "-";
            return util.round_number(size * 0.001, 2) + " KB";
        }
        else
            return util.round_number(size / 1048576, 2) + " MB";
    },
    format_checked_attr: function (bool) {
        return (bool) ? "checked='checked'" : "";
    },
    make_recurrence_message: function (rrule) {
        var msg = "";
        var bits = rrule.split("\n");
        for (var i = 0; i < bits.length; i++) {
            var type = bits[i].split(":")[0];
            if (type == "RRULE") {
                var rule = bits[i].split(":")[1];
                var parameters = rule.split(";");

                var freq = "";
                var interval = "";
                var byDay = "";
                var byMonthDay = "";
                var until = "";

                for (var j = 0; j < parameters.length; j++) {
                    var key = parameters[j].split("=")[0];
                    var val = parameters[j].split("=")[1];
                    switch (key) {
                        case "FREQ":
                            freq = val;
                            break;
                        case "INTERVAL":
                            interval = val;
                            break;
                        case "BYDAY":
                            byDay = val;
                            break;
                        case "BYMONTHDAY":
                            byMonthDay = val;
                            break;
                        case "UNTIL":
                            until = val.split(" ")[0];
                            break;
                    }
                }

                msgParts = [];
                msgParts[0] = "Every";
                if (interval > 1) {
                    msgParts[msgParts.length] = interval;
                }
                switch (freq) {
                    case "DAILY":
                        msgParts[msgParts.length] = (interval > 1) ? " days " : " day ";
                        break;
                    case "WEEKLY":
                        msgParts[msgParts.length] = (interval > 1) ? " weeks " : " week ";
                        break;
                    case "MONTHLY":
                        msgParts[msgParts.length] = (interval > 1) ? " months " : " month ";
                        break;
                    case "YEARLY":
                        msgParts[msgParts.length] = (interval > 1) ? " years " : " year ";
                        break;
                }
                if (byDay != "") {
                    msgParts[msgParts.length] = "on";
                    byDays = byDay.split(",");
                    for (var d = 0; d < byDays.length; d++) {
                        switch (byDays[d]) {
                            case "MO":
                                msgParts[msgParts.length] = "Monday";
                                break;
                            case "TU":
                                msgParts[msgParts.length] = "Tuesday";
                                break;
                            case "WE":
                                msgParts[msgParts.length] = "Wednesday";
                                break;
                            case "TH":
                                msgParts[msgParts.length] = "Thursday";
                                break;
                            case "FR":
                                msgParts[msgParts.length] = "Friday";
                                break;
                            case "SA":
                                msgParts[msgParts.length] = "Saturday";
                                break;
                            case "SU":
                                msgParts[msgParts.length] = "Sunday";
                                break;
                        }
                    }
                }
                if (until != "") {
                    msgParts[msgParts.length] = "until";
                    msgParts[msgParts.length] = until;
                }

                msg = msgParts.join(" ");
            }
        }
        return msg;
    },
    round_number: function (num, dec) {
        return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    },
    contenttype_data: function (type) {
        types = [];
        types[0] = { content_type: "image/jpeg", name: "JPG image", icon: "" };
        types[1] = { content_type: "image/jpg", name: "JPG image", icon: "" };
        types[2] = { content_type: "image/gif", name: "GIF image", icon: "" };
        types[3] = { content_type: "image/png", name: "PNG image", icon: "" };
        types[4] = { content_type: "image/bmp", name: "BMP image", icon: "" };
        types[5] = { content_type: "image/tiff", name: "TIFF image", icon: "" };
        types[6] = { content_type: "audio/mpeg", name: "Audio file", icon: "/sitefiles/global/images/icon_audio_big.gif" };
        types[7] = { content_type: "audio/x-aiff", name: "Audio file", icon: "/sitefiles/global/images/icon_audio_big.gif" };
        types[8] = { content_type: "audio/x-wav", name: "Audio file", icon: "/sitefiles/global/images/icon_audio_big.gif" };
        types[9] = { content_type: "application/zip", name: "ZIP file", icon: "/sitefiles/global/images/icon_zip_big.gif" };
        types[10] = { content_type: "application/rar", name: "RAR file", icon: "/sitefiles/global/images/icon_generic_big.gif" };
        types[11] = { content_type: "application/vnd.ms-excel", name: "EXCEL document", icon: "/sitefiles/global/images/icon_xls_big.gif" };
        types[12] = { content_type: "application/msword", name: "WORD document", icon: "/sitefiles/global/images/icon_doc_big.gif" };
        types[13] = { content_type: "application/vnd.ms-powerpoint", name: "POWERPOINT document", icon: "/sitefiles/global/images/icon_generic_big.gif" };
        types[14] = { content_type: "application/pdf", name: "PDF", icon: "/sitefiles/global/images/icon_pdf_big.gif" };
        types[15] = { content_type: "text/plain", name: "Text file", icon: "/sitefiles/global/images/icon_txt_big.gif" };
        types[16] = { content_type: "text/html", name: "HTML file", icon: "/sitefiles/global/images/icon_generic_big.gif" };
        types[17] = { content_type: "text/css", name: "CSS file", icon: "/sitefiles/global/images/icon_generic_big.gif" };
        types[18] = { content_type: "application/rtf", name: "Richtext file", icon: "/sitefiles/global/images/icon_rtf_big.jpg" };
        types[19] = { content_type: "video/mpeg", name: "Video file", icon: "/sitefiles/global/images/icon_generic_big.gif" };
        types[20] = { content_type: "video/x-m4v", name: "Video file", icon: "/sitefiles/global/images/icon_mov_big.jpg" };
        types[21] = { content_type: "video/quicktime", name: "Video file", icon: "/sitefiles/global/images/icon_mov_big.jpg" };
        types[22] = { content_type: "video/x-msvideo", name: "Video file", icon: "/sitefiles/global/images/icon_generic_big.gif" };
        types[23] = { content_type: "", name: "Folder", icon: "/sitefiles/global/images/icon_folder_big.jpg" };
        types[24] = { content_type: "-", name: "Unknown file", icon: "/sitefiles/global/images/icon_generic_big.gif" };

        for (var i = 0; i < types.length; i++) {
            if (types[i].content_type == type)
                return types[i];
        }

        return types[24];
    },
    truncate_string: function (s, len) {
        t_s = s;
        if (t_s.length > len) {
            t_s = t_s.substring(0, len);
            try {
                if (s.substring(t_s.length, t_s.length + 1) != " ") {
                    idx_last_space = t_s.lastIndexOf(" ");
                    if (idx_last_space != -1) {
                        t_s = t_s.substring(0, idx_last_space);
                    }
                }
            }
            catch (e) { }
        }

        if (s.length > len) {
            t_s += "...";
        }
        return t_s;
    },
    truncate_middle_string: function (s, len, separator) {
        if (s.length <= len) return s;

        separator = separator || '...';

        var sepLen = separator.length,
            charsToShow = len - sepLen,
            frontChars = Math.ceil(charsToShow / 2),
            backChars = Math.floor(charsToShow / 2);

        return s.substr(0, frontChars) +
               separator +
               s.substr(s.length - backChars);
    },
    set_cookie_value: function (key, value) {
        var current = new Date();
        current.setDate(current.getDate() + 3);
        cookie = escape(key) + '=' + escape(value) + '; expires=' + current.toGMTString() + '; path=/';
        document.cookie = cookie;
    },
    get_cookie_value: function (key) {
        var c, s, e;
        var value = '';

        if (document.cookie.length > 0) {
            c = document.cookie;
            s = c.indexOf(key + '=');
            if (s != -1) {
                e = c.indexOf(';', s);
                s += key.length + 1;
                value = (e > 0) ? c.substring(s, e) : c.substring(s);
                return unescape(value);
            }
        }

        return value;
    },
    get_querystring_value: function (ji) {
        hu = window.location.search.substring(1);
        gy = hu.split("&");
        for (i = 0; i < gy.length; i++) {
            ft = gy[i].split("=");
            if (ft[0] == ji) {
                return ft[1];
            }
        }

    },
    GetAssetThumbnailPath: function (key, thumbIndex) {
        if (/assets\/\d+\/\w+.\w+/.test(key)) {
            if (thumbIndex > 0) {
                var bits = key.split("/");
                if (bits != undefined) {
                    return "/assets/" + bits[bits.length - 2] + "/" + thumbIndex + "_" + bits[bits.length - 1];
                } else {
                    return "";
                }
            }
            else {
                if (bits != undefined) {
                    return "/assets/" + bits[bits.length - 2] + "/" + bits[bits.length - 1];
                } else {
                    return "";
                }
            }
        } else {
            return thumbIndex + "_" + key;

        }
    },
    ajax_post: function (url, params, callback) {
        return $.ajax({
            url: url,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: params,
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (location.href.indexOf("local") > -1) {
                    newWin = window.open();
                    newWin.document.write("textStatus: " + textStatus + "<br>errorThrown: " + errorThrown + "<br>XMLHttpRequest:" + XMLHttpRequest.responseText);
                }
            }
        });
    },
    flipToUA: function (ua, url) {
        var current = new Date();
        var cookie;
        if (ua == "mobile") {
            current.setDate(current.getDate() - 1);
        }
        else {
            current.setDate(current.getDate() + 3);
        }
        cookie = 'skip_mobile=1; expires=' + current.toGMTString() + '; path=/';
        document.cookie = cookie;
        window.location = url;
    },
    open_media_browser: function (button, hidden_field, media_type) {
        var url = "/admin/dlgMediaBrowser.aspx?btn=" + button + "&hf=" + hidden_field;
        if (media_type) {
            url = url + "&mt=" + media_type;
        }
        window.open(url, 'media', 'width=750,height=500,resizable=1,scrollbars=1');
    }

}

function pageLoad(sender, args) {
    sw.events.pub('pageLoad', [sender, args]);
}

function pageUnload(sender, args) {
    sw.events.pub('pageUnload', [sender, args]);
}