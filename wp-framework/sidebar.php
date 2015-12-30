<?php 
/**
 * sidebar.php
 *
 * The primary sidebar.
 */
?>

<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
	<aside class="sidebar col-md-4" role="complementary">
		<?php dynamic_sidebar( 'sidebar-1' ); ?>
<div class="container"> <!--open container-->



<div class="row">
  <div class="col-xs-2 col-sm-2 col-md-2">&nbsp;</div>
  <div class="col-xs-12 col-sm-8 col-md-8">
<?php
$post = get_post(665);
// the content was tags strip to be with no html
// and substring starting 54 to the limit count,
// reason that about us have shortcode this is why we start from 54
?>
<style>
.quote {
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
  line-height:1.5;
  color:#828282;
  font-size:17px;
}
.quote > p {
  margin-bottom:0px;
  color:#828282;
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
  line-height:1.5;
  color:#828282;
  font-size:17px;
  font-style:italic;
}

.quote > span {
  font-weight:700;
  ont-family: 'Raleway', sans-serif;
    line-height:1.5;
  color:#828282;
  font-size:17px;
}
</style>
<div class="quote" style="text-align:center">
  <img src="<?= IMAGES?>/_1.svg" style="float:left"/>
<p><?= $post->post_content ?>&nbsp;&nbsp;<img src="<?= IMAGES?>/_2.svg" stlye="float:right"/></p>
<br/><span><?= $post->post_title ?></span>
  
</div>
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
</div>
<div class="col-xs-2 col-sm-2 col-md-2">&nbsp;</div>
</div>
</div>
	</aside> <!-- end sidebar -->
<?php endif; ?>