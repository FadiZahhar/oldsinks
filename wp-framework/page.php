<?php
global $wpdb;
$page_id = get_the_id();
//$query = "select * from wp_posts where ID =" . $page_id;
//$results = $wpdb->get_results( $query, OBJECT );
//echo "<pre>"; print_r($results);
?>
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
                    </li>
                    <?php
                    } // end of for each attachments
                    } // end condition, important for not making any error in case of null values
                    ?>                    
                    </div>
