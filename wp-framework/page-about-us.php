<?php get_header(); ?>
<style>
h1 {
	border:none; 
	text-transform:none;
    font-family: 'Raleway', sans-serif;
    font-size: 22px;
    letter-spacing: 0px;
    font-weight: 500;
    font-style: normal;
    color:#2b2b2b;
    margin-top:0px;
    padding:0px;
    text-align:center;
    line-height:2;
}

h1.special {
  width:80%;
  margin:0 auto;
}



p {
	 font-family: 'Raleway', sans-serif;
	 font-size:17px;
	 color:#979797;
	 text-align:center;
	 line-height:1.4;
}

ul.mainmenu {
	list-style:none;
	padding:20px 0 20px 0;
	margin-bottom:50px;
}
ul.mainmenu > li  {
	list-style:none;
	display:inline-block;
}

ul.mainmenu > li > a {
	font-family: 'Raleway', sans-serif;
	font-size:22px;
	letter-spacing:4px;

}
</style>
<script>
(function($) {
  "use strict";
  $(function(){
    

    
    $('.your-class').slick({
    	dots: false,
  		infinite: true,
  		speed: 2000,
  		fade: true,
  		cssEase: 'linear',
  		autoplay: true,
  		autoplaySpeed: 2000
  	}
  		);



  })
})(jQuery);
</script>
<?php
	// Set up the objects needed
$my_wp_query = new WP_Query();
$all_wp_pages = $my_wp_query->query(array('post_type' => 'page'));

// Get the page as an Object
$page =  get_page_by_title('About Us');

// Filter through all pages and find pages's children
$page_children = get_page_children( $page->ID, $all_wp_pages );

?>

	<div class="your-class">
				<?php

				$args = array( 
                      'post_type' => 'attachment', 
                      'numberposts' => -1,
                      'orderby' => 'menu_order', 
                      'order' => 'ASC', 
                      'post_mime_type' => 'image' ,
                      'post_status' => null, 
                      'numberposts' => null, 
                      'post_parent' => get_the_id() 
                 );

                    $attachments = get_posts($args);
                    // condition to check if attachments have values
                    if ($attachments) {
                    foreach ( $attachments as $attachment ) {
                    // original full image by wordpress
                    $full_image_url = wp_get_attachment_image_src( $attachment->ID, 'full' )[0];
                    // large generated image by wordpress
                    $large_image_url = wp_get_attachment_image_src( $attachment->ID, 'large' )[0];
                    // medium generated image by wordpress
                    $medium_image_url = wp_get_attachment_image_src( $attachment->ID, 'medium' )[0];
                    // thumbnail generated image by wordpress
                    $thumb_image_url = wp_get_attachment_image_src( $attachment->ID, 'thumbnail' )[0];
                    // alt of the image
                    $alt = get_post_meta($attachment->ID, '_wp_attachment_image_alt', true);
                    // title of the image
                    $image_title = $attachment->post_title;
                    // caption of the image
                    $image_caption = $attachment->post_excerpt;
                    // description of the image
                    $image_description = $image->post_content;
                    ?>
                    <div><img src="<?= $full_image_url ?>" alt="<?= $image_title ?>" width="100%" /></div>
                    <?php
                    } // end of for each attachments
                    }
				?>

			</div>


<div class="container"> <!--open container-->

		

<div class="row">
	<div class="col-xs-12 col-sm-12 col-md-12">
		<ul class="mainmenu">
  		<li class="col-xs-4 col-sm-4 col-md-4"><a href="<?= site_url()?>/#BATHROOM" style="text-decoration:underline">BATHROOM SINKS</a></li>
  		<li  class="col-xs-4 col-sm-4 col-md-4 center"><a href="<?= site_url()?>/#BBQ" style="text-decoration:underline">BBQ SINKS</a></li>
  		<li  class="col-xs-4 col-sm-4 col-md-4 right"><a href="<?= site_url()?>/#KITCHEN" style="text-decoration:underline">KITCHEN SINKS</a></li>
  		</ul>
	</div>
</div>
<div class="row">
	<div class="col-xs-0 col-sm-1 col-md-1">&nbsp;</div>
  <div class="col-xs-12 col-sm-10 col-md-10">
  	
<?php

// echo what we get back from WP to the browser
//echo '<pre>' . print_r( $page_children, true ) . '</pre>'; exit;
$firsttime = true;
foreach($page_children as $page) {
	if($page->post_content) {
		echo "<h1>" . $page->post_title . "</h1>";
		echo "<p>" . $page->post_content . "</p>";
	}
	else {
		if($firsttime) {
			$firsttime = false;
			echo "<br/><br/>";
		}
		echo "<h1 class='special'>" . $page->post_title . "</h1>";
	}
}
?>
	  	


  </div> <!-- end col-10 -->

<div class="col-xs-0 col-sm-1 col-md-1">&nbsp;</div>

  


</div>


			</div> <!--close container-->


<?php get_footer(); ?>
<script>
(function($) {
  "use strict";
  $(function(){

    $('#mainnav').find('li').find('a[href="<?= site_url() ?>/about-us/"]').addClass('current');

  });
})(jQuery);
</script>