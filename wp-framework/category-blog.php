<?php 
/**
 * category.php
 *
 * The template for displaying category pages.
 */
?>

<?php get_header(); 
// replace catname with the correct cateogry
$args = array( 'numberposts' => -1, 'category_name' => 'blog', 'orderby' => 'menu_order', 'order' => 'asc', 'post_status' => 'publish' );
$parents = get_posts( $args );
//echo "<pre>"; print_r($parents); exit;

?>
<style>
.allure-women {
  text-align: center;
}
</style>
<div id="default-main">
			<div class="container"> <!--open container-->



<div class="row">
  <div class="col-xs-2 col-sm-2 col-md-2">&nbsp;</div>
  <div class="col-xs-12 col-sm-8 col-md-8">

<!-- First Container developed by Fadi Nicolas Zahhar -->
    <div class="mycontainer">
      <h1 class="allure-women">Blog</h1>
        <ul class="product-list twoColumns">
          <div class="row">
            <?php
            foreach($parents as $parent) :
              $date = date_create($parent->post_date);
              $medium_image_url = wp_get_attachment_image_src( get_post_thumbnail_id( $parent->ID), 'medium' );

            ?>
          <li class="col-md-6 col-sm-6 col-xs-12">
            <a href="<?= $parent->guid ?>">
            <div class="date"><?= date_format($date, 'F j, Y'); ?></div>
            <div class="title"><?= $parent->post_title ?></div>
            <img src="<?= $medium_image_url[0] ?>" width="95%"  />
            </a>
          </li>
          <?php
          endforeach;
          ?>
          </div>
        </ul>
    </div>

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

    $('#mainnav').find('li').find('a[href="<?= site_url() ?>/category/blog/"]').addClass('current');

  });
})(jQuery);
</script>