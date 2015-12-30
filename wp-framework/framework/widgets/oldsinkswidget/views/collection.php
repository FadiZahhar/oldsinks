<?php
// since we have the id, query where id - instance of selected page.
if($instance['page']=='Not Selected') {
$post = get_post(wp_get_post_parent_id( get_the_ID() ));
$page_id = get_the_ID();
                    
}
else {
$post = get_post($instance['page']);
$page_id = $post->ID;
}
//$meta = get_post_meta( $instance['page']);
//$image = wp_get_attachment_image_src( get_post_thumbnail_id( $instance['page']), 'single-post-full' );

// Set up the objects needed
$my_wp_query = new WP_Query();
$all_wp_pages = $my_wp_query->query(array('post_type' => 'page'));

?>


  <div id="default-main">
    <div class="container"> <!--open container-->

        <div id="contentLeft" class="col-md-3 hidden-sm hidden-xs"> <!--open contentLeft-->

          <!--This will insert a dynamic side menu -->


<div class="left-navigation">

  

<ul class="store-tag-list">
<?php
// Get the page as an Object
//$page =  get_page_by_title('BATHROOM SINKS');

// Filter through all pages and find Portfolio's children
$page_children = get_page_children( $post->ID, $all_wp_pages );
$first = true;
foreach($page_children as $children) :
  if($first) {
    $first = false;
    $get_first_page = $children->ID;
    $current = 'current';
  }
  else {
    $current = '';
  }
?>
<li><a href="#<?= $children->post_name ?>" class="<?= $current ?>" data-link="<?= $children->guid ?>" data-rel="mycontainer<?= $page_id ?>"><?= $children->post_title ?></a></li>
<?php
endforeach;
?>
</ul>

</div>


<!--This will insert all content found in the "Left" content area -->




</div> <!--close contentLeft-->

<div id="contentMain" class="col-md-9 col-sm-12 col-xs-12"> <!--open default Full Width Content-->
          <!--This will insert all content found in the "Main" content area -->



          <!-- First Container developed by Fadi Nicolas Zahhar -->
              <div class="mycontainer<?= $page_id ?>">
                <h1 class="allure-women center"><span id="ctl00_cphPageBody_lblCategory"><?= $post->post_title ?></span><span id="ctl00_cphPageBody_lblTag"></span>
                  <br/>
                  <nav class="nav center navbar-toggle" style="float:none; padding:0px">
                  <ul style="min-width:35%;margin-top:-20px; z-index:9; background-color:#000;opacity:0.8;padding:0px">
                    <li class="current" style="background-color:#fff"><span id="labelist"><?= $page_children[0]->post_title ?></span>&nbsp;&nbsp;<img src="<?= IMAGES ?>/Plus.svg" style="margin-top:-3px"/></li>
                    <?php
// Get the page as an Object
//$page =  get_page_by_title('BATHROOM SINKS');

// Filter through all pages and find Portfolio's children
$page_children = get_page_children( $post->ID, $all_wp_pages );
$first = true;
foreach($page_children as $children) :
  if($first) {
    $first = false;
    $get_first_page = $children->ID;
    $current = 'current';
  }
  else {
    $current = '';
  }
?>
<li><a href="#<?= $children->post_name ?>" class="<?= $current ?>" data-link="<?= $children->guid ?>" data-rel="mycontainer<?= $page_id ?>"><?= $children->post_title ?></a></li>
<?php
endforeach;
?>
                  </ul>
                </nav></h1>
                  <ul class="product-list twoColumns">
                    <div class="row">
                    <?php
                    $args = array( 
                      'post_type' => 'attachment', 
                    'numberposts' => -1,
                      'orderby' => 'menu_order', 
                      'order' => 'ASC', 
                      'post_mime_type' => 'image' ,
                      'post_status' => null, 
                      'numberposts' => null, 
                      'post_parent' => $get_first_page 
                    );

                    $attachments = get_posts($args);
                    // condition to check if attachments have values
                    if ($attachments) {
                    foreach ( $attachments as $index => $attachment ) {
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
                    if($index<12) {
                      $style = "";
                    }
                    else {
                      $style = "display:none";
                    }
                    ?>
                    <li class="col-md-3 col-sm-4 col-xs-6" style="<?= $style ?>">
                      <a title="<?= $image_description ?>" class="fancybox-effects-c" href="<?= $full_image_url ?>" rel="gall<?= $post->ID ?>"><img src="<?= $thumb_image_url ?>" alt="<?= $alt ?>" width="100%"></a>
                       <?php if ( function_exists('cn_social_icon') ) echo cn_social_icon(); ?>
                    </li>
                    <?php
                    } // end of for each attachments
                    } // end condition, important for not making any error in case of null values
                    ?>                    
                    </div>
                  </ul>
              </div>
          <br/>

        </div> <!--close Full Width  Content-->