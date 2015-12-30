<style>
.sbi_item.sbi_type_image {
  float:left;
  padding:8px;
}
.sbi_follow_btn {
  display:none!important;
}
</style>
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
  <ul id="footerul" style="margin:0 auto; max-width:80%">
    <li class="tag-style-of-the-week col-md-12 col-sm-12 col-xs-12 center" style="margin:0 auto">
      <?= do_shortcode('[instagram-feed num=5 cols=0]'); ?>
    </li>

        <li class="tag-style-of-the-week col-md-12 col-sm-12 col-xs-12 center">

          <p>
            <?= $page->post_content ?>
          </p>
          <hr />
        </li>

        <li  class="tag-style-of-the-week col-md-12 col-sm-12 col-xs-12 center" style="padding:0px 0px 10px 0px">

<?php
    // Get the nav menu based on $menu_name (same as 'theme_location' or 'menu' arg to wp_nav_menu)
    // This code based on wp_nav_menu's code to get Menu ID from menu slug

    $menu_name = 'main-menu';

    if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
      $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );

      $menu_items = wp_get_nav_menu_items($menu->term_id);
      //echo "<pre>"; print_r($menu_items);

      //$menu_list = '<ul id="mainnav" class="menu-' . $menu_name . '">';
      $menu_list = '';
      $firsttime = true;
      foreach ( (array) $menu_items as $key => $menu_item ) {
          $title = $menu_item->title;
          $url = $menu_item->url;
          if($menu_item->menu_item_parent==0) {
            if(!$firsttime) {
            $firsttime = true;
            //$menu_list .= '</ul></li>';
          }
          else {
            //$menu_list .= '</li>';
          }
          $menu_list .= '<a href="'.$url.'" class="footer_menu" style="margin-left: 15px;">'.$title.'</a>';
        }
        elseif($menu_item->menu_item_parent>0){
          if($firsttime) {
            $firsttime = false;
            //$menu_list .= '<ul>';
          }
          //$menu_list .= '<li><a href="' . $url . '">' . $title . '</a></li>';
        }
        

      }
      //$menu_list .= '</ul>';
    } 
    else {
      $menu_list = '<ul><li>Menu "' . $menu_name . '" not defined.</li></ul>';
    }
    // $menu_list now ready to output
    echo $menu_list;
    ?>
      


        </li>

        <li class="tag-style-of-the-week col-md-12 col-sm-12 col-xs-12 center">

          <?php
          // Set up the objects needed
          $my_wp_query = new WP_Query();
          $all_wp_pages = $my_wp_query->query(array('post_type' => 'page'));
          $page_children = get_page_children($instance['page'], $all_wp_pages );
          ?>

                <p><?= $page_children[0]->post_content ?></p>
                <!--<a href="#">Privacy Policy</a> | <a href="#">Sitemap</a> | <a href="#">Ancient Surfaces</a> -->

        </li>

        </ul>