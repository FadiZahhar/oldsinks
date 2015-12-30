<?php
// since we have the id, query where id - instance of selected page.
$page = get_post($instance['page']);
$meta = get_post_meta( $instance['page']);
$image = wp_get_attachment_image_src( get_post_thumbnail_id( $instance['page']), 'single-post-full' );

global $wp_query;
$args = array(
    'posts_per_page' => 10,
    'orderby' => 'ID',
    'order' => 'asc',
    'cat' => $instance['category']
);
$socials = get_posts($args);

// the content was tags strip to be with no html
// and substring starting 54 to the limit count,
// reason that about us have shortcode this is why we start from 54
?>
<style>
/* Styles for dialog window */
#small-dialog<?= $page->ID ?> {
	background: white;
	padding:20px;
	text-align: left;
	max-width: 650px;
	margin: 40px auto;
	position: relative;
}
/**

/**
 * Fade-zoom animation for first dialog
 */

/* start state */
.my-mfp-zoom-in #small-dialog<?= $page->ID ?> {
opacity: 0;
-webkit-transition: all 0.2s ease-in-out;
-moz-transition: all 0.2s ease-in-out;
-o-transition: all 0.2s ease-in-out;
transition: all 0.2s ease-in-out;
-webkit-transform: scale(0.8);
-moz-transform: scale(0.8);
-ms-transform: scale(0.8);
-o-transform: scale(0.8);
transform: scale(0.8);
}
/* animate in */
.my-mfp-zoom-in.mfp-ready #small-dialog<?= $page->ID ?> {
opacity: 1;
-webkit-transform: scale(1);
-moz-transform: scale(1);
-ms-transform: scale(1);
-o-transform: scale(1);
transform: scale(1);
}
/* animate out */
.my-mfp-zoom-in.mfp-removing #small-dialog<?= $page->ID ?> {
-webkit-transform: scale(0.8);
-moz-transform: scale(0.8);
-ms-transform: scale(0.8);
-o-transform: scale(0.8);
transform: scale(0.8);
opacity: 0;
}
/* Dark overlay, start state */
.my-mfp-zoom-in.mfp-bg {
opacity: 0;
-webkit-transition: opacity 0.3s ease-out;
-moz-transition: opacity 0.3s ease-out;
-o-transition: opacity 0.3s ease-out;
transition: opacity 0.3s ease-out;
}
/* animate in */
.my-mfp-zoom-in.mfp-ready.mfp-bg {
opacity: 0.8;
}
/* animate out */
.my-mfp-zoom-in.mfp-removing.mfp-bg {
opacity: 0;
}
/**
/* Magnific Popup CSS */
.mfp-bg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1042;
  overflow: hidden;
  position: fixed;
  background: #0b0b0b;
  opacity: 0.8;
  filter: alpha(opacity=80); }

.mfp-wrap {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1043;
  position: fixed;
  outline: none !important;
  -webkit-backface-visibility: hidden; }

.mfp-container {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: 0 8px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box; }

.mfp-container:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle; }

.mfp-align-top .mfp-container:before {
  display: none; }

.mfp-content {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin: 0 auto;
  text-align: left;
  z-index: 1045; }

.mfp-inline-holder .mfp-content,
.mfp-ajax-holder .mfp-content {
  width: 100%;
  cursor: auto; }

.mfp-ajax-cur {
  cursor: progress; }

.mfp-zoom-out-cur,
.mfp-zoom-out-cur .mfp-image-holder .mfp-close {
  cursor: -moz-zoom-out;
  cursor: -webkit-zoom-out;
  cursor: zoom-out; }

.mfp-zoom {
  cursor: pointer;
  cursor: -webkit-zoom-in;
  cursor: -moz-zoom-in;
  cursor: zoom-in; }

.mfp-auto-cursor .mfp-content {
  cursor: auto; }

.mfp-close,
.mfp-arrow,
.mfp-preloader,
.mfp-counter {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none; }

.mfp-loading.mfp-figure {
  display: none; }

.mfp-hide {
  display: none !important; }

.mfp-preloader {
  color: #cccccc;
  position: absolute;
  top: 50%;
  width: auto;
  text-align: center;
  margin-top: -0.8em;
  left: 8px;
  right: 8px;
  z-index: 1044; }

.mfp-preloader a {
  color: #cccccc; }

.mfp-preloader a:hover {
  color: white; }

.mfp-s-ready .mfp-preloader {
  display: none; }

.mfp-s-error .mfp-content {
  display: none; }

button.mfp-close,
button.mfp-arrow {
  overflow: visible;
  cursor: pointer;
  border: 0;
   background:#FFF;
  -webkit-appearance: none;
  display: block;
  padding: 0;
  z-index: 1046; }


button::-moz-focus-inner {
  padding: 0;
  border: 0; }

.mfp-close {
  width: 44px;
  height: 44px;
  line-height: 44px;
  position: absolute;
 right: 0px;
	top: -43px;
  text-decoration: none;
  text-align: center;
  padding: 0 0 18px 10px;
  color: white;
  font-style: normal;
  font-size: 28px;
  outline:none;
  font-family: 'Open Sans', sans-serif;
 }
  .mfp-close:hover, .mfp-close:focus {
    opacity: 1; }

.mfp-close-btn-in .mfp-close {
  color: #333333; }

.mfp-image-holder .mfp-close,
.mfp-iframe-holder .mfp-close {
  color: white;
  right: -6px;
  text-align: right;
  padding-right: 6px;
  width: 100%;
}
@media all and (max-width:480px){
	.comments-area textarea{
		height:100px;
	}
}
@media all and (max-width:320px){
	.comments-area span.label,.comments-area span.text-field{
		float:none;
		width:100%;
	}
	.comments-area span{
		padding-bottom:3px;
	}
	#small-dialog<?= $page->ID ?>{
		padding:15px;
	}
	.comments-area input[type="text"], .comments-area textarea{
		width:92%;
	}
	.comments-area div{
		padding:2px 0;
	}
}

</style>
<div class="google-map" id="contact<?= $page->ID ?>">
  <!-- Added Code by Fadi Nicolas Zahhar for open content -->
  <section class="cd-section" style="background-image:url('<?= $image[0] ?>');background-size:cover;">
    <h3><?= $instance['name'] ?></h3><br/>
    <?php
    foreach($socials as $social):
?>
<a href="<?= $social->post_content ?>" target="_blank"><i class="fa fa-<?= strtolower($social->post_title) ?>-square fa-5x"></i></a>
<?php
    endforeach;
     ?>
    <br/><br/>
    <a class="button2 hvr-shutter-in-horizontal popup-with-zoom-anim" href="#small-dialog<?= $page->ID ?>"><?= $page->post_title ?></a>
    <div id="small-dialog<?= $page->ID ?>" class="mfp-hide">
    <iframe src="<?= get_permalink ($page->ID); ?>" width="100%" height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen> </iframe>
    </div>

  </section> <!-- .cd-section -->
  <!-- End Code -->

</div>
