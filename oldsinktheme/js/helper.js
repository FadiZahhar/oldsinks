(function($) {
	var jQuery = $;

	$(document).ready(function() {

		/* gives slider a height when we need to position absolute at the top of the page */

		$(window).on('resize load', function() {
			sliderHeight();
			fixDressThumbnails();
		});
		function sliderHeight() {
			var sh = $('.item img:visible').height();
			$('.slider').css({
				'height' : sh + 'px'
			});
		}
		function fixDressThumbnails() {
			var photoWidth = $('#product-detail-main-image').find('img').width() + 10;
			$('#product-detail-photos-list').css('width', photoWidth);
		}

		$("#myModal").on("show.bs.modal", function(e) {
			var m = $("#myModal .modal-body");
			m.html(' <iframe width="100%" height="375px" frameborder="0" src="/subscribe"></iframe>');
		});
	});
	
	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

})(jQ171);


// Locator Map Loading Fix for Results
function checkForMap() {

	if($("ol.places-app-location-list li").size() >= 1) {
		$("ol.places-app-location-list li").each(function() {
			$(this).addClass("col-md-3 col-sm-3 col-xs-6");
		});
	}

	var numLocations = $(".places-app-locations-list li");

	for(var i = 0; i < numLocations.length; i += 4) {
		numLocations.slice(i, i + 4).wrapAll("div class='row'></div>");
	}

	clearInterval(runTime);

}

function checkForFeatured() {
	if($("li.places-app-location-featured").size() >= 1) {
		var endrunTime2 = clearInterval(runTime2);
		$("li.places-app-location-featured").each(function() {

			$(this).prepend("<h4>Featured</h4>");
		});
	}

}

var runTime = setInterval(checkForMap, 1000);
var runTime2 = setInterval(checkForFeatured, 1000);

$(document).ready(function() {

	$(window).bind('resize', function() {
		sliderHeight("resize");
	});

	$(window).bind('load', function() {
		sliderHeight("load");
	});
	function sliderHeight(source) {
		$(".scrollable").css("height", $(".slider").css("height"));
	}

	// Adding featured text and star to featured stores on locator map
	$("li.places-app-location-featured").each(function() {
		$(this).prepend.html("<h4>Featured</h4>");
	});
	//Add Page Name as Class
	var url = window.location.pathname;
	var firstSlash = url.split('/');
	var className = firstSlash[1];
	var parentsSize = $("#mainnav li a[href='" + url + "']").parents().length;

	if(parentsSize >= 15) {
		var parentName = $("#mainnav li").has("a[href='" + url + "']").attr("id");
	} else {
		var parentName = "mn-" + className;
	}

	$('body').addClass(parentName)

	//Add Page Name as Class on Blog Archive
	if(window.location.href.indexOf("/blog/archive/") != -1) {
		$('body').addClass('blog-archive');
		$("body.blog-archive .blog-entry").addClass("col-md-6 col-sm-6 col-xs-12");
		$("body.blog-archive .blog-entry").each(function() {
			$(this).children("h4.post-date, h4.post-title, .post-body").wrapAll("<div class='blog-archive-content'></div>");
		});
	}

	//Add Page Name as Class on Blog Category
	if(window.location.href.indexOf("/blog/category/") != -1) {
		$('body').addClass('blog-archive');
		$("body.blog-archive .blog-entry").addClass("col-md-6 col-sm-6 col-xs-12");
		$("body.blog-archive .blog-entry").each(function() {
			$(this).children("h4.post-date, h4.post-title, .post-body").wrapAll("<div class='blog-archive-content'></div>");
		});
	}

	//Responsive Banner Rotator
	var resize_divs = function() {

		function checkForImage() {
			// This function runs to check for the image first and if its found, resizes the photo inside appropriately.  I added some css3 styling to make it somewhat animated on Memphis Zoo - see URL above //

			if($("#home-top img").length >= 1) {

				var bannerHeight = $("#home-top img").height();

				clearInterval(runTime);

				$("#home-top").height(bannerHeight);
				$("#home-top .templatecontent").height(bannerHeight);
				$("#home-top .scrollable").height(bannerHeight);
				$("#home-top .swFader .scrollable .items").height(bannerHeight);
				$("#home-top .swFader .scrollable .items .item").height(bannerHeight);
			}
		}

	}
	var runTime = setInterval(resize_divs, 1000);

	//Changing text in signup button
	$('input#signupButton').val('Submit');

	//Changing text in search field
	$('input#searchField').val('Enter Keyword or Style Number');

	//Changing text in blog date
	$(".recent-blog-posts-date").each(function() {
		var theNumber = $(this).text();
		var check = checkDigit(theNumber);
		$(this).empty().append(check);
	});
	//Changing text in blog date
	$(".recent-blog-posts-month").each(function() {
		var theNumber = $(this).text();
		var check = checkDigit(theNumber);
		$(this).empty().append(check);
	});
	// 
	$("#add-to-cart-options").find("br").each(function() {
		$(this).remove();
	});
	// Adding Bootstrap Classes to Calendar Widget
	$('.upcoming-events-wrapper ul li').addClass('col-md-4 col-sm-12 col-xs-12');

	// Adding Bootstrap Classes to Blog Widget
	$('div#home-bottom .recent-blog-posts-wrapper ul li').addClass('col-md-4 col-sm-4 col-xs-12');

	// Adding Bootstrap Rows to Blog Archive & Categories
	var divs = $("body.blog-archive div#default-main div.blog div.blog-entry");
	for(var i = 0; i < divs.length; i += 2) {
		divs.slice(i, i + 2).wrapAll("<div class='row'></div>");
	}

	// Adding Accordion to Subnav
	$('#subnav.archives').accordion({
		header : 'span',
		collapsible : true,
		autoHeight : false,
		navigation : true
	});

	// Adding Bootstrap Classes to Store Divs
	$('.product-list-wrapper li').addClass('col-md-4 col-sm-4 col-xs-6');
	$('.product-list-wrapper > h1').addClass('center');
	$('.product-list-controls').addClass('row');

	setupRelatedTuxes();
	checkWindowSize();

	$(window).resize(function() {
		checkWindowSize();
	});
	
	function makeTwoColumns() {
		console.log("Making two columns");
		var allTags = $(".product-list li.product-list-item").get();
		$(".product-list").empty().append(allTags);

		var divs = $("div#default-main ul.product-list li.product-list-item");

		for(var i = 0; i < divs.length; i += 2) {
			divs.slice(i, i + 2).wrapAll("<div class='row'></div>");
		}

		$(".product-list").removeClass("twoColumns").removeClass("threeColumns").addClass("twoColumns");
	}

	function makeThreeColumns() {
		console.log("Making three columns");
		var allTags = $(".product-list li.product-list-item").get();
		$(".product-list").empty().append(allTags);

		var divs = $("div#default-main ul.product-list li.product-list-item");

		for(var i = 0; i < divs.length; i += 3) {
			divs.slice(i, i + 3).wrapAll("<div class='row'></div>");
		}

		$(".product-list").removeClass("twoColumns").removeClass("threeColumns").addClass("threeColumns");
	}

	function checkWindowSize() {
		var windowSize = $(window).width();
		if(windowSize <= 600) {
			if(!$(".product-list").hasClass("twoColumns")) {
				makeTwoColumns();
			}
		} else {
			if(!$(".product-list").hasClass("threeColumns")) {
				makeThreeColumns();
			}
		}
	}

	// Adding Bootstrap Rows to Store Divs
	//var divs = $("body.mn-category div#default-main ul.product-list li.product-list-item");
	//for(var i = 0; i < divs.length; i+=3) {
	//divs.slice(i, i+3).wrapAll("<div class='row'></div>");
	//}

	// Adding Bootstrap Rows to Photogalleries
	var divs = $(".photogallery");
	for(var i = 0; i < divs.length; i += 3) {
		divs.slice(i, i + 3).wrapAll("<div class='row'></div>");
	}

	$('.photogallery').addClass('col-sm-4 col-xs-6');

	// Related Product Image Resize
	$("#product-detail-related-products .product-list .product-list-item .product-list-item-image > a").each(function() {
		var fileName = $(this).children("img").attr("src");
		var prefix = fileName.indexOf("_");
		var originalFileName = fileName.substr(prefix + 1);
		var lastSlash = fileName.lastIndexOf("/");
		var filePath = fileName.substr(0, lastSlash + 1);
		var newFileName = filePath + originalFileName;
		$(this).children("img").attr("src", newFileName);
	});
	// Adding Bootstrap Rows to Category Landing Page Featured Products Widget
	var divs = $("div.store-category-display ul.product-list li.product-list-item");
	for(var i = 0; i < divs.length; i += 3) {
		divs.slice(i, i + 3).wrapAll("<div class='row'></div>");
	}
	// Adding Bootstrap Classes to Category Landing Page Featured Products Widget
	$('div.store-category-display ul.product-list li.product-list-item').addClass('col-md-4 col-sm-4 col-xs-4');

	/* ==========================================================================
	 Form Styling
	 ========================================================================== */

	$('#default-main .formmodule table tr td.formmodule-column2').each(function() {

		$(this).find('span').addClass('control-label');
		$(this).find('input').addClass('form-control');
		$(this).find('textarea').addClass('form-control');

	});

	$('#default-main .formmodule table tr td').each(function() {

		$(this).find('span').unwrap();
		$(this).find('input').unwrap();
		$(this).find('textarea').unwrap();
		$(this).find('select').unwrap();
		$(this).find('.formmodule-radiobuttonlist input').addClass('radio-input');
		$(this).find('table tbody tr td').unwrap();
		$(this).find('table tbody tr').unwrap();
		$(this).find('table tbody').unwrap();

	});

	$('#default-main .formmodule table tr').each(function() {

		$(this).wrapInner('<div class="form-group"></div>');
		$(this).find('.form-group').unwrap();

	});

	$('#default-main .formmodule table tbody').each(function() {

		$(this).find('.form-group').unwrap();

	});

	$('#default-main .formmodule table tbody').each(function() {

		$(this).find('.form-group').unwrap();

	});

	$('.formmodule > .form-group').unwrap();
	$('.formmodule > .form-group > td > table > .form-group').unwrap();

	$('#default-main .formmodule .form-group td').each(function() {

		$(this).find('.form-group').unwrap();

	});

	$('.radio-input').parent().removeClass('form-group').addClass('radio');

	$('.radio-input').removeClass('form-control');

	$('input.formmodule-phone').wrapAll('<div class="phone-wrap form-inline">');
	$('.phone-wrap > span').addClass('label-wrap');

	$('.formmodule-dropdownlist').parent().addClass('dropdown-wrap')
	$('.dropdown-wrap > span').addClass('label-wrap');

	$('.formmodule-table > div').unwrap();

	$("select option[value='Please choose']").attr("selected", "selected");
	$('.formmodule-submit input').addClass("btn btn-features");

	/* ==========================================================================
	 Mobile Primary Menu Toggle
	 ========================================================================== */

	$('#mainnav li').each(function() {
		if($(this).children('ul').size() >= 1) {
			$(this).addClass('hasChild');
			$(this).append('<a class="expand-btn"></a>');
		}
	});

	$('.expand-btn').click(function() {
		$(this).parent().children('ul').toggleClass('active');
		$(this).toggleClass('active');
	});

	$('#mainnav li a').each(function() {
		var numRealParents = $(this).parents().length;
		var baseNumber = numRealParents - 6;
		var numAdjustedParents = baseNumber / 2;
		var padding = numAdjustedParents * 5;
		$(this).css('margin-left', padding + 'px');
	});
	
	// Moving Suit Up Links into place on men product pages
	$('body.mn-products #product-detail-overview').insertBefore('#add-to-cart-options');
	$('body.mn-products #product-detail-overview a').css({"width":($('#add-to-cart-options #ctl00_cphPageBody_btnAddToWishList').outerWidth() + $('#add-to-cart-options a.product-detail-send-link').outerWidth() + 24) + 'px'  });

	// Add title to related tux products
	$('#product-detail-related-products ul.product-list .row:nth-of-type(2)').prepend('<h3>Recommended Groomswear</h3>');

}); 

var setupRelatedTuxes = function() {
	
		var allureMenNames = ["onyx", "alluremen-tan", "irongraypeak", "alluremen-irongray", "cementnotch", "slateblue","heathergray","heathergraynotchgroo","slatepeak","allureMen-black","allureMen-steelgray"];
		var tuxBuilderItems = ["onyx", "alluremen-tan", "irongraypeak", "alluremen-irongray", "cementnotch", "slateblue","heathergray","heathergraynotchgroo"];
		var res;
		var tuxBuilder;

	// Adding Suit Up stuff to related tux products
	$('#product-detail-related-products ul.product-list li').each(function() {
		
		// Setup variables
		var productURL = $(this).find('.product-list-item-image').find('a').attr('href');
		var urlValue = productURL.substring(productURL.lastIndexOf('/') + 1).toLowerCase();
		
		// Find tux products only	
		if(jQuery.inArray(urlValue, allureMenNames) !== -1) {

				// Find tux BUILDER products only	
				if(jQuery.inArray(urlValue, tuxBuilderItems) !== -1) {
					
					switch(urlValue) {
						case 'onyx':
								tuxBuilder = "https://www.suit-up.com/OutfitBuilder/Build?ref=allure&jkt=ab7a2c2d-ca47-48ee-a957-c33a47508cd3&jktc=2c30bfbe-9618-4937-892d-c1004c137583&nckw=efd3d46e-4aba-4948-b3fc-39383fd39c6e&cmb=5d26499c-56fb-4de4-b9ba-7cdc82a2ee02&cmbc=8c10bdc9-2337-4750-90d5-5b38a5c53c88&nckt=3&nckc=8c10bdc9-2337-4750-90d5-5b38a5c53c88&trs=00c6c9b0-f3ec-406b-9d1c-2220c346d1ad&hnk=38aa91af-be01-4c80-b63a-bd4a68229357&srt=5b36aaab-fb24-411b-b9e3-7f241e6cc934&acc=3e03790b-bf0d-4661-beec-351c9b9eb6ee&acc=77be652a-129b-4d93-82ef-51ea71984112&acc=9fa902a9-2607-4fa7-867e-226fb21f5a99&acc=88322c46-df32-4a9f-bd98-4bbb7b1913f1";
								break;
						case 'alluremen-tan':
								tuxBuilder = "https://www.suit-up.com/OutfitBuilder/Build?ref=allure&jkt=e0679771-073c-4495-a691-535141a24e3d&jktc=90165f18-5fa5-4b98-bd1f-a58dee6d6978&wct=8acd6b14-7070-4cdc-ab0b-94c57dc32037&wctc=90165f18-5fa5-4b98-bd1f-a58dee6d6978&nckw=137a23c4-1f4c-4e83-ae88-1e98f6b3b575&nckt=3&nckc=7be1c0f3-4df2-4e5a-bf85-91da87a4c547&trs=9911ecf9-ba74-444c-b97e-ae385e66dbbe&hnk=6f1dd15a-9e63-4ad0-96bb-abc7b9ed149b&srt=5b36aaab-fb24-411b-b9e3-7f241e6cc934&acc=3e03790b-bf0d-4661-beec-351c9b9eb6ee&acc=77be652a-129b-4d93-82ef-51ea71984112&acc=9fa902a9-2607-4fa7-867e-226fb21f5a99&acc=88322c46-df32-4a9f-bd98-4bbb7b1913f1";
								break;
						case 'irongraypeak':
								tuxBuilder = "https://www.suit-up.com/OutfitBuilder/Build?ref=allure&jkt=18c0b20d-7fe3-40bb-b23f-5ae84d784fdc&jktc=bc4641c9-6c92-4530-9a35-e3aa7e97d6fe&wct=3030e1d5-32c2-42ce-a7f0-da3731f347b6&wctc=bc4641c9-6c92-4530-9a35-e3aa7e97d6fe&nckw=355a97e4-2c21-48a1-afe4-295499ad1caf&nckt=3&nckc=9e0732e9-10ea-4898-b642-797a304626b0&trs=327ff11e-d597-40ef-b2a3-0bd4dce6ea91&hnk=f0cdacdd-ae55-44b5-a348-b6fa2feb17c2&srt=5b36aaab-fb24-411b-b9e3-7f241e6cc934&acc=3e03790b-bf0d-4661-beec-351c9b9eb6ee&acc=77be652a-129b-4d93-82ef-51ea71984112&acc=9fa902a9-2607-4fa7-867e-226fb21f5a99&acc=88322c46-df32-4a9f-bd98-4bbb7b1913f1";
								break;
						case 'alluremen-irongray':
								tuxBuilder = "https://www.suit-up.com/OutfitBuilder/Build?ref=allure&jkt=1b9d22c0-3770-4b9e-ab0c-8a0e3d398ba6&jktc=bc4641c9-6c92-4530-9a35-e3aa7e97d6fe&wct=3030e1d5-32c2-42ce-a7f0-da3731f347b6&wctc=bc4641c9-6c92-4530-9a35-e3aa7e97d6fe&nckw=355a97e4-2c21-48a1-afe4-295499ad1caf&nckt=3&nckc=9e0732e9-10ea-4898-b642-797a304626b0&trs=327ff11e-d597-40ef-b2a3-0bd4dce6ea91&hnk=f0cdacdd-ae55-44b5-a348-b6fa2feb17c2&srt=5b36aaab-fb24-411b-b9e3-7f241e6cc934&acc=3e03790b-bf0d-4661-beec-351c9b9eb6ee&acc=77be652a-129b-4d93-82ef-51ea71984112&acc=9fa902a9-2607-4fa7-867e-226fb21f5a99&acc=88322c46-df32-4a9f-bd98-4bbb7b1913f1";
								break;
						case 'cementnotch':
								tuxBuilder = "https://www.suit-up.com/OutfitBuilder/Build?ref=allure&jkt=935762da-2f6d-47f4-9e2f-f1ad2e089a5d&jktc=41891331-dbac-4f94-b83e-38759ff9dfc0&wct=0dfd3579-f406-4469-b616-8076f6653fb7&wctc=41891331-dbac-4f94-b83e-38759ff9dfc0&nckw=b8f63cdb-e692-479a-b686-ce1ba0ac3396&nckt=3&nckc=9edb870a-ca32-48ed-82db-86b8e7b94683&trs=c1ce1e8b-1a5b-4ec8-9b1a-8ca7789b3282&hnk=4a1920f3-5030-4239-bf40-2c6e7837b8b8&srt=5b36aaab-fb24-411b-b9e3-7f241e6cc934&acc=3e03790b-bf0d-4661-beec-351c9b9eb6ee&acc=77be652a-129b-4d93-82ef-51ea71984112&acc=9fa902a9-2607-4fa7-867e-226fb21f5a99&acc=88322c46-df32-4a9f-bd98-4bbb7b1913f1";
								break;
						case 'slateblue':
								tuxBuilder = "https://www.suit-up.com/OutfitBuilder/Build?ref=allure&jkt=eaef3469-5d79-433d-8920-3a0103b4d0c5&jktc=ea81832a-a5b1-48a4-9354-bf3aa7793f50&wct=1c266891-f4f1-4cbd-8645-ba96b8f68f35&wctc=ea81832a-a5b1-48a4-9354-bf3aa7793f50&nckw=0d19509c-d90e-4898-9610-8b3cd4bdb503&nckt=3&nckc=68e09495-89bf-4778-981d-c18588807393&trs=1ace45cd-96ce-4b38-966d-b5dd0d0c0826&hnk=15fce77d-fa49-4f29-825f-ff6e0986ed39&srt=5b36aaab-fb24-411b-b9e3-7f241e6cc934&acc=3e03790b-bf0d-4661-beec-351c9b9eb6ee&acc=77be652a-129b-4d93-82ef-51ea71984112&acc=9fa902a9-2607-4fa7-867e-226fb21f5a99&acc=88322c46-df32-4a9f-bd98-4bbb7b1913f1";
								break;
						case 'heathergray':
								tuxBuilder = "https://www.suit-up.com/OutfitBuilder/Build?ref=allure&jkt=74dd92ef-7006-4eaf-aa2d-bf03dcf25187&jktc=bb94566e-88ec-4060-8f16-91964142d37f&wct=91d690a5-48a9-4998-85c9-493f07b98438&wctc=bb94566e-88ec-4060-8f16-91964142d37f&nckw=f967b215-02b2-43cd-84ab-315578ea418c&nckt=3&nckc=bb94566e-88ec-4060-8f16-91964142d37f&trs=70a80038-f260-4c89-8ee3-7bb604c27e39&cmb=&hnk=c1444f5e-e309-4907-9a11-a2e1b9d178d8&srt=5b36aaab-fb24-411b-b9e3-7f241e6cc934&acc=3e03790b-bf0d-4661-beec-351c9b9eb6ee&acc=77be652a-129b-4d93-82ef-51ea71984112&acc=9fa902a9-2607-4fa7-867e-226fb21f5a99&acc=88322c46-df32-4a9f-bd98-4bbb7b1913f1";
								break;
						case 'heathergraynotchgroo':
								tuxBuilder = "https://www.suit-up.com/OutfitBuilder/Build?ref=allure&jkt=d344402a-8ace-4fe7-b6ff-2ceb87421d6a&jktc=bb94566e-88ec-4060-8f16-91964142d37f&wct=91d690a5-48a9-4998-85c9-493f07b98438&wctc=bb94566e-88ec-4060-8f16-91964142d37f&nckw=955b8ed4-900d-4a16-b38d-92af00643439&nckt=3&nckc=48b4fba4-4cec-4792-968e-ed281da04c2c&trs=70a80038-f260-4c89-8ee3-7bb604c27e39&hnk=67afba74-dc55-42fb-b4a8-a47880e52f89&srt=5b36aaab-fb24-411b-b9e3-7f241e6cc934&acc=3e03790b-bf0d-4661-beec-351c9b9eb6ee&acc=77be652a-129b-4d93-82ef-51ea71984112&acc=9fa902a9-2607-4fa7-867e-226fb21f5a99&acc=88322c46-df32-4a9f-bd98-4bbb7b1913f1";
								break;
					}
						
					$(this).find('.product-list-item-image').find('a').append('<div class="action"><a href="'+tuxBuilder+'" title="View in Tux Builder" target="_blank" data-toggle="tooltip" data-placement="top" ><img src="/SiteFiles/1550/Images/icon-tuxbuilder.svg" alt="Tux Builder" /></a></div>');
								
				}
		
			$(this).appendTo($(this).parents('ul'));
		}

	});
	
}

function checkDigit(number) {

	if(number.length == 1) {
		var newNumber = "0" + number;
	} else {
		var newNumber = number;
	}

	return newNumber;
}

