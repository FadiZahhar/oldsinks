<?php
/**
 * footer.php
 *
 * The template for displaying the footer.
 */
?>
<footer style="margin-top:30px;">
	<div class="container">
		<?php dynamic_sidebar( 'footer-sidebar' );  ?>
	</div>
</footer>
<script>
(function($) {
  "use strict";
  $(function(){

    $('#mainnav').find('li:first-child').find('a').addClass('current');

var yOffset1 = $('.mycontainer2').offset().top - 155;
var yOffset2 = $('.mycontainer18').offset().top - 155;
var yOffset3 = $('.mycontainer24').offset().top;

var hash = window.location.hash;

switch(hash) {
    case "#BATHROOM":

    $(document.body).animate({
    'scrollTop':   yOffset1
}, 1000);
    break;

    case "#KITCHEN":
$(document.body).animate({
    'scrollTop':   yOffset2
}, 1000);
    break;

    case "#BBQ":
$(document.body).animate({
    'scrollTop':   yOffset3
}, 1000);
    break;
}


    $(window).bind('hashchange', function() {


    // make a judge like  if(){}else{}
    var hash = window.location.hash;


    switch(hash) {
    case "#BATHROOM":

    $(document.body).animate({
    'scrollTop':   yOffset1
}, 1000);
    break;

    case "#KITCHEN":
$(document.body).animate({
    'scrollTop':   yOffset2
}, 1000);
    break;

    case "#BBQ":
$(document.body).animate({
    'scrollTop':   yOffset3
}, 1000);
    break;

	default:

    var url = $('a[href="'+hash+'"').attr('data-link');
    $('a').removeClass('current');
    $('a[href="'+hash+'"').addClass('current');
    var container = '.' + $('a[href="'+hash+'"').attr('data-rel');
    $.ajax(
    	{
    		url: url, 
    		success: function(result) {
    			//container = eval(container);
    			//alert(container);
        		$(container).find('.product-list.twoColumns').html(result);
                $(container).find('li.current').find('span').html(hash.slice(1));
          						
    	}
    	}
    	);

    break;

}// end break;

	});

  })
})(jQuery);
</script>
	<?php //wp_footer(); ?>
</body>
</html>
