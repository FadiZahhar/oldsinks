/****************************************/
/*--------------------------------------*/
/*      jQuery Element Extensions       */
/*--------------------------------------*/
/****************************************/
jQuery.fn.extend({
	/* Check for selector match */
	exists: function() {
		if(this.length > 0) return true;
  		else return false;
	},
	
	/* Toggle element with fade animation */
    fadeToggle: function() {
		return this.animate({opacity: 'toggle'});
    },
    
    /* 	Common method for retrieving current value 
    	of form element */
    getValue: function() {
        switch(this.attr("type")) {
            case "checkbox":
                return this.is(":checked");
                break;
            case "radio":
                return this.is(":selected");
                break;
            default:
                return this.val();
                break;
        }
		return this.val();
    },
    
    /* 	Common method for resetting current value 
    	of form element */
    resetValue: function() {
        switch(this.attr("type")) {
            case "checkbox":
                this.prop("checked", false);
                break;
            case "radio":
                this.prop("selected", false);
                break;
            default:
                this.val('');
                break;
        }
    },
    
    /* 	Common method for setting value of form 
    	element */
    setValue: function(val) {
        switch(this.attr("type")) {
            case "checkbox":
                this.prop("checked", val);
                break;
            case "radio":
                this.prop("selected", val);
                break;
            default:
                this.val(val);
                break;
        }
    }
});
/****************************************/
/*--------------------------------------*/
/*      jQuery Object Extensions        */
/*--------------------------------------*/
/****************************************/
jQuery.extend({
	/* 	Simple method for capitalizing the first letter 
		in a string */
	capitalize_first: function(str) {
		var s = jQuery.trim(str).toLowerCase();
	  	var first_letter = s.substr(0,1);
	  	return s.replace(first_letter,first_letter.toUpperCase());
	},
	
	/* Check to see if block of text contains a string */
	contains_str: function(text, str_to_find) {
		if(typeof(text) == "string") {
	    	result = text.indexOf(str_to_find);
	    	if(result == -1) return false;
	    	else return true;
	  	} else {
	    	return false;
	  	}
	},
    
    /* Check to see if block of text contains a string */
	starts_with: function(text, str_to_find) {
		if(typeof(text) == "string") {
	    	result = text.indexOf(str_to_find);
	    	if(result == 0) return true;
	    	else return false;
	  	} else {
	    	return false;
	  	}
	},
    
    /* Trim extra whitespace from string */
	trim: function(str) {
		return str.replace(/(^[\s\xA0]+|[\s\xA0]+$)/g, '');
	},
	
	/* Strip HTML tags from string */
	strip_tags: function(str) {
	  return str.replace(/(<.+?>)/g, '');
	}
});
