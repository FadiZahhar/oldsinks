<div class="profreelancer-widget-qpulse">
  <div>
  <label><?php _e('Navigation ID','widget-Oldsinks'); ?></label>
  <input type="text" id="<?php echo $this->get_field_id('name'); ?>"
                              name="<?php echo $this->get_field_name('name'); ?>"
                              value="<?php echo esc_attr($instance['name']); ?>" />
  </div>

<div>
    <label><?php _e('Widget To Display ', 'widget-Oldsinks'); ?></label>
      <select id="<?php echo $this->get_field_id('display'); ?>" name="<?php echo $this->get_field_name('display'); ?>">
            <option value="collection" <?php selected('collection', $instance['display'],true); ?>><?php _e('Collection section.', 'profreelancer-widget-qpulse' ); ?></option>
            <option value="install" <?php selected('install', $instance['display'],true); ?>><?php _e('Install Section', 'profreelancer-widget-qpulse' ); ?></option>
            <option value="testimonials" <?php selected('testimonials', $instance['display'],true); ?>><?php _e('Testimonials Widget', 'profreelancer-widget-qpulse' ); ?></option>
            <option value="social_widget" <?php selected('social_widget', $instance['display'],true); ?>><?php _e('Social Media Widget', 'profreelancer-widget-qpulse' ); ?></option>
            <option value="singletitle" <?php selected('singletitle', $instance['display'],true); ?>><?php _e('Contact Form Widget', 'profreelancer-widget-qpulse' ); ?></option>
            <option value="testimonial" <?php selected('testimonial', $instance['display'],true); ?>><?php _e('testimonials', 'profreelancer-widget-qpulse' ); ?></option>
            <option value="footer" <?php selected('footer', $instance['display'],true); ?>><?php _e('footer', 'profreelancer-widget-qpulse' ); ?></option>
      </select>
</div>

  <div>
    <label><?php _e('Select Page', 'widget-Oldsinks'); ?></label>
    <?php $args = array(
  	'sort_order' => 'asc',
  	'sort_column' => 'post_title',
  	'hierarchical' => 1,
  	'exclude' => '',
  	'include' => '',
  	'meta_key' => '',
  	'meta_value' => '',
  	'authors' => '',
  	'child_of' => 0,
  	'parent' => 0,
  	'exclude_tree' => '',
  	'number' => '',
  	'offset' => 0,
  	'post_type' => 'page',
  	'post_status' => 'publish'
  );
  $pages = get_pages($args);
  ?>
      <select id="<?php echo $this->get_field_id('page'); ?>" name="<?php echo $this->get_field_name('page'); ?>">
        <option value="Not Selected" <?php selected('Not Selected', $instance['page'],true); ?>><?php _e('Not Selected', 'profreelancer-widget-qpulse' ); ?></option>
        <?php foreach($pages as $page) : ?>
        <option value="<?= $page->ID ?>" <?php selected($page->ID, $instance['page'],true); ?>><?php _e($page->post_title, 'profreelancer-widget-qpulse' ); ?></option>
        <?php endforeach; ?>
      </select>
  </div>





</div>
