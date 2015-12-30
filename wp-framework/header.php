<?php
/**
 * header.php
 *
 * The header for the theme.
 */
?>

<?php
	// Get the favicon.
	$favicon = IMAGES . '/icons/favicon.png';

	// Get the custom touch icon.
	$touch_icon = IMAGES . '/icons/apple-touch-icon-152x152-precomposed.png';
?>

<!DOCTYPE html>
<!--[if IE 8]> <html <?php language_attributes(); ?> class="ie8"> <![endif]-->
<!--[if !IE]><!--> <html <?php language_attributes(); ?>> <!--<![endif]-->

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<title><?php wp_title( '|', true, 'right' ); ?><?php bloginfo( 'name' ); ?></title>
	<meta name="description" content="<?php bloginfo( 'description' ); ?>">

	<!-- Mobile Specific Meta -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<!-- Favicon and Apple Icons -->
	<link rel="shortcut icon" href="<?php echo $favicon; ?>">
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="<?php echo $touch_icon; ?>">
	

<link rel="stylesheet" type="text/css" href="<?= THEMEROOT ?>/slick/slick.css"/>

<link rel="stylesheet" type="text/css" href="<?= THEMEROOT ?>/slick/slick-theme.css"/>

	<!-- jquery is needed check the version possible to upgrade to the latest if needed -->
	<script type="text/javascript" src="<?= THEMEROOT ?>/lib/jquery-1.10.1.min.js"></script>

	<script type="text/javascript" src="<?= SCRIPTS ?>/jquery-ui.min.js"></script>
	<!-- check what are the jquery extensions is used on this theme -->
	<script type="text/javascript" src="<?= SCRIPTS ?>/jquery-extensions.js"></script>
<script type="text/javascript" src="<?= THEMEROOT ?>/slick/slick.min.js"></script>


		<!-- Bootstrap -->
		<link href="<?= STYLES ?>/font-awesome.css" rel="stylesheet">
	  <link rel="stylesheet" href="<?= STYLES ?>/bootstrap.min.css">

		<!-- CSS -->
		<link href="<?= STYLES ?>/normalize.css" rel="stylesheet">
	  <link href="<?= STYLES ?>/master2014.css" rel="stylesheet">
	  <link href='https://fonts.googleapis.com/css?family=Raleway:500,700,800' rel='stylesheet' type='text/css'> 
<style>
html , body {
	overflow-x:hidden;
}
body , p {
	color:#262626;
}
.testimonial {
	color:#828282;
}


#mainnav a {
	font-family: 'Raleway', sans-serif;
	font-size:12px;
	letter-spacing:1px;
	font-weight:500;
}

#mainnav {
float:right;
margin-right:-15px;
}
ul.store-tag-list  {
	font-family: 'Raleway', sans-serif;
	font-size:12px;
	letter-spacing:1px;
	font-weight:500;
	margin-left:-46px;
	list-style: none;
	margin-top:95px;
}

ul.store-tag-list a {
    font-family: 'Raleway', sans-serif;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 500;
}

ul.store-tag-list > li {
	line-height: 33px;
}

h1 {
    font-family: 'Raleway', sans-serif;
    font-size: 22px;
    letter-spacing: 4px;
    font-weight: 500;
    font-style: normal;
    margin-top:30px;
    color:#2b2b2b;
}

.current , nav a:hover, ul.store-tag-list a.current {
	font-weight: bolder;
}
div.mycontainer:first-child {
	min-height:510px;
	height:auto;
}

#headerUtility ul li {
	margin-right:-15px;
}

footer p {
    color: #808080!important;
    font-size: 11px;
    letter-spacing: 0.7px;
    line-height: 1.9;
    text-align: center;
}

hr {
    border: 0px;
    width: 100%;
    color: #808080;
    background-color: #808080;
    height: 1px;
    line-height: 1px;
    margin: 25px 0px;
    padding: 0px;
    clear: both;
}

.footer_menu {
	text-transform: uppercase;
	font-size:11px;
}
h1.special {
	font-size: 22px;
	text-transform: uppercase;
	font-style: italic;
	letter-spacing:1px;
	border-bottom:4px double #979797;
	text-align: center;
	margin:0px;
	line-height:1;
	padding:12px 0 12px 0;
}

h1.special:last-child {
	border:none;
	margin-bottom:75px;
}


.date {
	font-family: courier;
	font-size:11px;
	font-weight: bold;
	text-transform:uppercase;
	color:#979797;
}
.title {
	font-family: 'Raleway', sans-serif;
	font-size:19px;
	text-transform: uppercase;
	letter-spacing: 1px;
	color:#303030;
	line-height: 1;
	padding: 0px 0 15px 0;
}

p.paragraph {
	font-family: 'Raleway', sans-serif;
	font-size:17px;
	line-height:1.5;
    width: 87%;
    margin: 0 auto;
    text-align: justify;
    padding:30px 0 30px 0;
    color:#2b2b2b;
    font-weight: 500;
}

p.caption {
    font-family: 'Raleway', sans-serif;
    font-size: 9px;
    color: #979797;
    line-height: 1.5;
    padding: 10px 0 0px 0;
    width: 87%;
    margin: 0 auto;
}




/* nav my responsive menu */
.nav {
	margin: 20px 0;
}
.nav ul {
	margin: 0;
	padding: 0;
}
.nav li {
	margin: 0 5px 10px 0;
	padding: 0;
	list-style: none;
	display: inline-block;
	*display:inline; /* ie7 */
}
.nav a {
	padding: 3px 12px;
	text-decoration: none;
	color: #999;
	line-height: 100%;
}
.nav a:hover {
	
}
.nav .current a {
	
}

/* right nav */
.nav.right ul {
	text-align: right;
	opacity:0.85;
}

.nav.right ul a {
	color:#212121;
}

/* center nav */
.nav.center ul {
	text-align: center;
}

li.tag-style-of-the-week.col-md-12.col-sm-12.col-xs-12.center {
    margin-bottom: 20px;
}

a[href="#bbq-sinks"] {
	display: none;
}


@media screen and (max-width: 1000px) {

nav.nav.center.navbar-toggle {
	display:block;
}

nav.nav.center.navbar-toggle {
		position: relative;
		margin-right:0px;
		margin-bottom:0px;
		margin-left:230px;
		width:100%;
	}

	nav.nav.center.navbar-toggle ul {
		min-width:37%!important;
	}
	nav.nav.center.navbar-toggle ol {
		margin-left:-20px;
		margin-top:5px;
	}
	nav.nav.center.navbar-toggle ol li >a {
		font-size:10px;
	}
	nav.nav.center.navbar-toggle ul {
		width: 180px;
		padding: 5px 0;
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;

	}
	nav.nav.center.navbar-toggle li {
		display: none; /* hide all <li> items */
		margin: 0;
	}
	nav.nav.center.navbar-toggle .current {
		display: block; /* show only current <li> item */
	}
	nav.nav.center.navbar-toggle a {
		display: block;
		text-align: left;
	}
	nav.nav.center.navbar-toggle .current a {
		background: none;
		color: #666;
	}

	/* on nav hover */
	nav.nav.center.navbar-toggle ul:hover {
		
	}
	nav.nav.center.navbar-toggle ul:hover li {
		/*display: block;*/
		/*margin: 0 0 5px;*/
	}
	nav.nav.center.navbar-toggle ul:hover .current {
		
	}

}

@media screen and (max-width: 991px and min-width:769px) {
	h1 {
		margin-top:60px;
	}
}

@media screen and (max-width: 768px) {

	h1.special > span {
    font-size: 14px;
}


nav.nav.center.navbar-toggle {
		position: relative;
		margin-right:20px;
		margin-bottom:0px;
		margin-left:50%;
	}

	nav.nav.center.navbar-toggle ul {
		min-width:35%!important;
	}

	.nav {
		position: relative;
		margin-right:20px;
		margin-bottom:0px;
	}
	.nav ol {
		margin-left:-20px;
		margin-top:5px;
	}
	.nav ol li >a {
		font-size:10px;
	}
	.nav ul {
		width: 180px;
		padding: 5px 0;
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;

	}
	.nav li {
		display: none; /* hide all <li> items */
		margin: 0;
	}
	.nav .current {
		display: block; /* show only current <li> item */
	}
	.nav a {
		display: block;
		text-align: left;
	}
	.nav .current a {
		background: none;
		color: #666;
	}

	/* on nav hover */
	.nav ul:hover {
		
	}
	.nav ul:hover li {
		/*display: block; */
		margin: 0 0 5px;
	}
	.hide {
		display:none;
	}
	.show {
		display:block;
	}
	.nav ul:hover .current {
		
	}

	/* right nav */
	.nav.right ul {
		left: auto;
		right: 0;
	}

	/* center nav */
	.nav.center ul {
		left: 50%;
		margin-left: -90px;
	}

	li.current, a.current, li > a {
	font-size:12px;
	letter-spacing: 1px;
	}
	.nav2 {
		margin-top: 25px;
	}
}

@media screen and (max-width: 550px) {

		h1.special > span {
    font-size: 11px;
}
.nav2 {
		margin-top: 14px;
	}
	}

@media screen and (max-width: 400px) {

		h1.special > span {
    font-size: 10px;
}

img.img-responsive {
    margin-top: -10px;
    z-index: 9999999999;
}

.product-list.twoColumns img {
    max-height: 120px!important;
    min-width: 120px!important;
    min-height: 120px!important;
    padding: 0px;
    padding-bottom: 0px;

}

.mycontainer18 .product-list.twoColumns img {
    padding:0px 11px 0px 0px;

}

.mycontainer24 .product-list.twoColumns img {
	padding: 0px 26px 0px 0px;
}

.nav.right ul {
	width:auto!important;
}
	

}

@media screen and (max-width: 380px) {

		h1.special > span {
    font-size: 9px;
}
	.product-list.twoColumns img {
	min-width: 90px!important;
    min-height: 90px!important;
	}

	.mycontainer18 .product-list.twoColumns img {
	min-width: 85px!important;
    min-height: 85px!important;
	}

	h1.special:last-child {
		margin-bottom:0px;
	}
}
</style>


		<!-- Custom Helper Script -->

		<!-- Add mousewheel plugin (this is optional) -->
		<script type="text/javascript" src="<?= THEMEROOT ?>/lib/jquery.mousewheel-3.0.6.pack.js"></script>

		<!-- Add fancyBox main JS and CSS files -->
		<script type="text/javascript" src="<?= THEMEROOT ?>/source/jquery.fancybox.js?v=2.1.5"></script>
		<link rel="stylesheet" type="text/css" href="<?= THEMEROOT ?>/source/jquery.fancybox.css?v=2.1.5" media="screen" />

		<!-- Add Button helper (this is optional) -->
		<link rel="stylesheet" type="text/css" href="<?= THEMEROOT ?>/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" />
		<script type="text/javascript" src="<?= THEMEROOT ?>/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>

		<!-- Add Thumbnail helper (this is optional) -->
		<link rel="stylesheet" type="text/css" href="<?= THEMEROOT ?>/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7" />
		<script type="text/javascript" src="<?= THEMEROOT ?>/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>

		<!-- Add Media helper (this is optional) -->
		<script type="text/javascript" src="<?= THEMEROOT ?>/source/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

		<script type="text/javascript">
			$(document).ready(function() {
				/*
				 *  Simple image gallery. Uses default settings
				 */
				// Set custom style, close if clicked, change title type and overlay color
				$(".fancybox-effects-c").fancybox({
					wrapCSS    : 'fancybox-custom',
					closeClick : true,

					openEffect : 'none',

					helpers : {
						title : {
							type : 'inside'
						},
						overlay : {
							css : {
								'background' : 'rgba(238,238,238,0.85)'
							}
						}
					}
				});



			});
		</script>
		<style type="text/css">
			.fancybox-custom .fancybox-skin {
				box-shadow: 0 0 50px #222;
			}

			.nav.right.navbar-toggle {
			 cursor:pointer;
			}
		</style>

	<?php //wp_head(); ?>

	<script>
	(function($) {
  "use strict";
  $(function(){

    $('.nav.right.navbar-toggle').on('click',function(e){
        e.preventDefault;
        $(this).find('ul').find('li').toggleClass('show');
    });

    $('nav.nav.center.navbar-toggle').on('click',function(e){
        e.preventDefault;
        $(this).find('ul').find('li').toggleClass('show');
    });

    

	});

})(jQuery);
	</script>
</head>
<body class="mn-category">

	<div class="page-wrap">
	<div id="header"> <!-- Header -->

		<!-- Utility -->
		<nav id="headerUtility">
			<div class="container">
				<!--
				no need to use it in the theme in case we will put other things -->
				<ul class="utility-nav col-md-3 col-xs-12">
				&nbsp;
				</ul>
				<ul class="utility-social col-md-9 col-xs-12">
					<li class="mainSocial"><a title="Facebook Us" href="https://www.facebook.com/Ancient-Surfaces-206792556031046/" target="_blank"><img src="<?= THEMEROOT ?>/icons/main_fb@2x.svg" width="20px" alt="Facebook"></a></li>
					<li class="mainSocial"><a title="Pin Us" href="https://www.pinterest.com/ancientsurfaces/" target="_blank"><img src="<?= THEMEROOT ?>/icons/main_pinterest@2x.svg" width="20px" alt="Pinterest"></a></li>
					<li class="mainSocial"><a title="Tweet Us" href="https://twitter.com/ancientsurfaces" target="_blank"><img src="<?= THEMEROOT ?>/icons/main_twitter@2x.svg" width="20px" alt="Twitter"></a></li>
					<li class="mainSocial"><a title="Follow Us" href="https://www.instagram.com/p/-d5POPEzTr/" target="_blank"><img src="<?= THEMEROOT ?>/icons/main_ig@2x.svg" width="20px" alt="Instagram"></a></li>
					<li class="tel" style="width:120px;text-align:center;color:#515151;font-family: 'Raleway', sans-serif;letter-spacing:1px">(212) 461-0245</li>
					<li><a href="mailto:sales@ancientsurfaces.com" style="color:#515151;font-family: 'Raleway', sans-serif;letter-spacing:1px">sales@ancientsurfaces.com</a></li>
				</ul>
			</div>
		</nav>

		<!-- Navigation -->
		<nav class="navbar navbar-default" role="navigation">
			<div class="container">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<nav class="nav right navbar-toggle nav2">

						<?php
		// Get the nav menu based on $menu_name (same as 'theme_location' or 'menu' arg to wp_nav_menu)
		// This code based on wp_nav_menu's code to get Menu ID from menu slug

		$menu_name = 'main-menu';

		if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
			$menu = wp_get_nav_menu_object( $locations[ $menu_name ] );

			$menu_items = wp_get_nav_menu_items($menu->term_id);
			//echo "<pre>"; print_r($menu_items);

			$menu_list = '<ul>';
			$menu_list .= '<li class="current"><img src="'.IMAGES.'/Burger.svg" /></li>';
			$firsttime = true;
			foreach ( (array) $menu_items as $key => $menu_item ) {
			    $title = $menu_item->title;
			    $url = $menu_item->url;
			    if($menu_item->menu_item_parent==0) {
			    	if(!$firsttime) {
						$firsttime = true;
						$menu_list .= '</ol></li>';
					}
					else {
						$menu_list .= '</li>';
					}
			    $menu_list .= '<li><a href="' . $url . '">' . $title . '</a>';
				}
				elseif($menu_item->menu_item_parent>0){
					if($firsttime) {
						$firsttime = false;
						$menu_list .= '<ol>';
					}
					$menu_list .= '<li><a href="' . $url . '">' . $title . '</a></li>';
				}		
			}
			$menu_list .= '</ul>';
		} 
		else {
			//$menu_list = '<ul><li>Menu "' . $menu_name . '" not defined.</li></ul>';
		}
		// $menu_list now ready to output
		echo $menu_list;
		?>
		
	</nav>
					<!--<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>-->
					<a class="navbar-brand" href="http://old-sinks.com/"><img class="img-responsive" src="<?= THEMEROOT ?>/icons/logo.svg" alt="Allure Bridals"></a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav navbar-right">

		<div id="ctl00_cphMainMenu_swMainMenu_pnlMainMenu">

			<?php
		// Get the nav menu based on $menu_name (same as 'theme_location' or 'menu' arg to wp_nav_menu)
		// This code based on wp_nav_menu's code to get Menu ID from menu slug

		$menu_name = 'main-menu';

		if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
			$menu = wp_get_nav_menu_object( $locations[ $menu_name ] );

			$menu_items = wp_get_nav_menu_items($menu->term_id);
			//echo "<pre>"; print_r($menu_items);

			$menu_list = '<ul id="mainnav" class="menu-' . $menu_name . '">';
			$firsttime = true;
			foreach ( (array) $menu_items as $key => $menu_item ) {
			    $title = $menu_item->title;
			    $name = explode(" ",$title);
			    $url = $menu_item->url;
			    $id = get_the_id();
			    //echo $id; exit;
			    if($menu_item->menu_item_parent==0) {
			    	if(!$firsttime) {
						$firsttime = true;
						$menu_list .= '</ul></li>';
					}
					else {
						$menu_list .= '</li>';
					}
			    $menu_list .= '<li><a href="' . $url . '" '. $current .'>' . $title . '</a>';
				}
				elseif($menu_item->menu_item_parent>0){
					if($firsttime) {
						$firsttime = false;
						$menu_list .= '<ul>';
					}
					$menu_list .= '<li><a href="'.site_url().'#'.$name[0].'">' . $title . '</a></li>';

				}
				

			}
			$menu_list .= '</ul>';
		} 
		else {
			$menu_list = '<ul><li>Menu "' . $menu_name . '" not defined.</li></ul>';
		}
		// $menu_list now ready to output
		echo $menu_list;
		?>
		

		


	</div>

					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container -->
		</nav>

	</div> <!-- /.header -->
