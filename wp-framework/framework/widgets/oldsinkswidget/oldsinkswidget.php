<?php
/**
 * oldsinkswidget.php
 * 
 * Plugin Name: Old_Sinks_Widget
 * Plugin URI: http://www.fnz.me
 * Description: A widget that is used with Old Sinks Theme.
 * Version: 1.0
 * Author: Fadi Nicolas Zahhar
 * Author URI: http://www.fnz.me
*/
class Widget_Oldsinks extends WP_Widget {
/*
* Responsible for initialize the widget and initializing any dependencies,
* localization, etc. Replace the widget Oldsinks for your widget purpose.
*/
function __construct() {
  add_action('init', array($this,'widget_Oldsinks_textdomain'));
  parent::__construct(
    'widget-Oldsinks',
    __('Oldsinks Widgets', 'widget-Oldsinks'),
    array(
          'classname' => 'widget-Oldsinks',
          'description' => __('Oldsinks Widget is a Wordpress widget designed to demostrate how to build a widget
          from the ground up using Wordpress best practices.','widget-Oldsinks')
         )
  );
  // Register stylesheets (don't forget to replace the widget Oldsinks for your widget purpose).
  add_action('admin_print_styles', array($this,'register_Oldsinks_admin_styles'));
  add_action('wp_enqueue_scripts', array($this, 'register_Oldsinks_widget_styles'));
  // Register javascript (don't forget to replace the widget Oldsinks for your widget purpose).
  add_action('admin_Oldsinks_enqueue_scripts', array($this,'register_Oldsinks_admin_scripts'));
  //add_action('wp_Oldsinks_enqueue_scripts', array($this, 'register_Oldsinks_widget_scripts'));
  register_nav_menu('Oldsinks-main-menu',__( 'Oldsinks Main Menu' ));
}
/*
* Responsible for rendering the widget's form in the
* administrative dashboard
*/
function form($instance) {
  $instance = wp_parse_args(
    (array)$instance,
    array(
        'Navigation ID' => '',
        'display' => 'collections',
        'page' => '',
    )
);
  include(plugin_dir_path(__FILE__) . '/views/admin.php' );
}
/*
* This function is fired to take the value that are currently in the
* database and update them with the new values (or simply initialize new values).
*/
function update($new_instance, $old_instance) {
  $old_instance['name'] = strip_tags(stripslashes($new_instance['name']));
  $old_instance['display'] = strip_tags(stripslashes($new_instance['display']));
  $old_instance['page'] = strip_tags(stripslashes($new_instance['page']));
  $old_instance['subpage'] = strip_tags(stripslashes($new_instance['subpage']));
  return $old_instance;
}
/*
* Responsible for rendering the widget on the public-facing side of
* the site
*/
function widget($args, $instance) {
  extract( $args, EXTR_SKIP );
  //echo $before_widget;
  include(plugin_dir_path(__FILE__) . '/views/'. $instance['display'] .'.php' );
//  echo $after_widget;
}
function widget_Oldsinks_textdomain() {
  load_plugin_textdomain('widget-Oldsinks',false,plugin_dir_path(__FILE__) . '/lang/');
}
/*
* function to register admin and widget stylesheets
* don't forget to replace the widget Oldsinks for your widget purpose.
*/
function register_Oldsinks_admin_styles() {
  wp_enqueue_style('widget-Oldsinks-admin', plugins_url('Oldsinksplugins/css/admin.min.css'));
}
function register_Oldsinks_widget_styles() {
  wp_enqueue_style('widget-Oldsinks', plugins_url('Oldsinksplugins/css/widget.min.css'));
  //wp_enqueue_script('widget-Oldsinks',plugins_url('Oldsinksplugins/js/widget.min.js'));
}
/*
* functions ot register admin and widget javascript
* don't forget to replace the widget Oldsinks for your widget purpose.
*/
function register_Oldsinks_admin_scripts() {
  wp_enqueue_script('widget-Oldsinks-admin', plugins_url('Oldsinksplugins/js/admin.min.js'));
}
function register_Oldsinks_widget_scripts() {

}
}
// register_widget is a function that register the extended class of the widget
add_action('widgets_init',create_function('', 'register_widget("Widget_Oldsinks");'));

 ?>
