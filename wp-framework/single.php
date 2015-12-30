<?php
/**
 * single.php
 *
 * The template for displaying single posts.
 */
?>

<?php get_header(); 
$post_id = get_the_id();
$post = get_post($post_id);
$meta = get_post_meta($post_id);
//echo "<pre>"; print_r($meta); exit;
$date = date_create($post->post_date);
?>
<style>
.allure-women {
	border:none;
	margin-top:0px;
}
.col-xs-12.col-sm-8.col-md-8 > img {
	max-width:756px;
  width:100%;
}
@media screen and (max-width: 991px) and (min-width:769px) {
  h1 {
    margin-top:60px;
  }
}
</style>
<div id="default-main">
			<div class="container"> <!--open container-->



<div class="row">
  <div class="col-xs-0 col-sm-2 col-md-2">&nbsp;</div>
  <div class="col-xs-12 col-sm-8 col-md-8">
  	<h1 style="text-align:center">Blog</h1>
  	<div class="date"><?= date_format($date, 'F j, Y'); ?></div>
  	<h1 class="allure-women"><?= $meta['post_title'][0] ?></h1>
	<?= do_shortcode($post->post_content) ?>

  </div>
  <div class="col-xs-0 col-sm-2 col-md-2">&nbsp;</div>
</div>

</div>
</div>
<?php get_footer(); ?>

<script>
(function($) {
  "use strict";
  $(function(){

    $('#mainnav').find('li').find('a[href="<?= site_url() ?>/category/blog/"]').addClass('current');

  });
})(jQuery);
</script>