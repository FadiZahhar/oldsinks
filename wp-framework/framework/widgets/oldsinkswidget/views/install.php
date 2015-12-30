<?php
// since we have the id, query where id - instance of selected page.
/*if($instance['page']=='Not Selected') {
$post = get_post(wp_get_post_parent_id( get_the_ID() ));
$page_id = get_the_ID();
                    
}
else {*/
$post = get_post($instance['page']);
$page_id = $instance['page'];
//}
//$meta = get_post_meta( $instance['page']);
//$image = wp_get_attachment_image_src( get_post_thumbnail_id( $instance['page']), 'single-post-full' );

// Set up the objects needed
$my_wp_query = new WP_Query();
$all_wp_pages = $my_wp_query->query(array('post_type' => 'page'));

?>

          <!-- First Container developed by Fadi Nicolas Zahhar -->
              <div class="mycontainer">
                <h1 class="allure-women center"><span id="ctl00_cphPageBody_lblCategory"><?= $post->post_title ?></span><span id="ctl00_cphPageBody_lblTag"></span></h1>
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
                      'post_parent' => $page_id 
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
                    <li class="col-md-6 col-sm-6 col-xs-6">
                      <a title="<?= $image_description ?>" class="fancybox-effects-c" href="<?= $full_image_url ?>" rel="gall<?= $post->ID ?>"><img src="<?= $medium_image_url ?>" alt="<?= $alt ?>" width="100%"></a>
                    </li>
                    <?php
                    } // end of for each attachments
                    } // end condition, important for not making any error in case of null values
                    ?>                    
                    </div>
                  </ul>
              </div>
          <br/>