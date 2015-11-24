(function()
{
var undef="undefined";

if (typeof(sr_adserver)==undef)
	sr_adserver=(location.protocol.indexOf('https')>-1 ? "https://" : "http://")+"ad.afy11.net/ad?";

srValidateAction();
srSendAction();


function srValidateAction()
{
	// sraction.js
	if (typeof(sr_mediabuygroup_id)==undef)
		sr_mediabuygroup_id  = 0;
	if (typeof(sr_actioncode)==undef)
		sr_actioncode  = 0;
	if (typeof(sr_actionvalue)==undef)
		sr_actionvalue  = 0;
		
	sr_actioncode=parseInt(sr_actioncode);
	sr_actionvalue=parseInt(sr_actionvalue);
	
	if (sr_actionvalue+""=="NaN")
		sr_actioncode=0;
	if (sr_actionvalue+""=="NaN")
		sr_actioncode=0;
	
}

function srSendAction()
{
	var randomNumber = Math.round(Math.random() * 100000000);
	var _encodeURIComponent=encodeURIComponent;
	var source = sr_adserver +
		'&mode=2'+
		'&mgId='+sr_mediabuygroup_id+
		'&ac='+sr_actioncode+
		'&av='+sr_actionvalue;
		
		if (typeof(sr_actiondata_1)!=undef)
			source+='&ad1='+_encodeURIComponent(sr_actiondata_1);
		if (typeof(sr_actiondata_2)!=undef)
			source+='&ad2='+_encodeURIComponent(sr_actiondata_2);
		if (typeof(sr_actiondata_3)!=undef)
			source+='&ad3='+_encodeURIComponent(sr_actiondata_3);
		if (typeof(sr_actiondata_4)!=undef)
			source+='&ad4='+_encodeURIComponent(sr_actiondata_4);
		if (typeof(sr_actiondata_5)!=undef)
			source+='&ad5='+_encodeURIComponent(sr_actiondata_5);
		if (typeof(sr_actiondata_6)!=undef)
			source+='&ad6='+_encodeURIComponent(sr_actiondata_6);
		if (typeof(sr_actiondata_7)!=undef)
			source+='&ad7='+_encodeURIComponent(sr_actiondata_7);
		if (typeof(sr_actiondata_8)!=undef)
			source+='&ad8='+_encodeURIComponent(sr_actiondata_8);

		source+='&cMode=0';
		source+='&rand='+randomNumber;
		
		document.write('<img src="'+source+'" height="0" width="0" >');
}

})()

function srExecute()
{
}

