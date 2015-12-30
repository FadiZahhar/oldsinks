<style>
h1.special {
  width:80%;
  margin:0 auto!important;
}
@media screen and (max-width: 991px) and (min-width:769px) {
  h1.allure-women {
    margin-top:60px;
  }
}
</style>
<?php get_header(); ?>

<div id="default-main">
<div class="container"> <!--open container-->
<div class="row">
  <div class="col-xs-2 col-sm-2 col-md-2">&nbsp;</div>
  <div class="col-xs-12 col-sm-8 col-md-8">
	<?php dynamic_sidebar( 'install-sidebar' );  ?>

	<?php
	// Set up the objects needed
$my_wp_query = new WP_Query();
$all_wp_pages = $my_wp_query->query(array('post_type' => 'page'));

// Get the page as an Object
$page =  get_page_by_title('About Us');

// Filter through all pages and find pages's children
$page_children = get_page_children( $page->ID, $all_wp_pages );

$firsttime = true;
foreach($page_children as $page) {
	if($page->post_content) {
		//echo "<h1>" . $page->post_title . "</h1>";
		//echo "<p>" . $page->post_content . "</p>";
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
  </div> <!-- end col-8 -->



  <div class="col-xs-2 col-sm-2 col-md-2">&nbsp;</div>


</div>


			</div> <!--close container-->
		</div> <!-- /#default-main -->

<?php get_footer(); ?>

<script>
(function($) {
  "use strict";
  $(function(){

    $('#mainnav').find('li').find('a[href="<?= site_url() ?>/install/"]').addClass('current');

	});
})(jQuery);
</script>
