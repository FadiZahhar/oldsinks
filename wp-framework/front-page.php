<?php
/**
 * template-full-width.php
 *
 * Template Name: Full Width Page
 */
?>

<?php get_header(); ?>
<style>
.product-list.twoColumns img {
    min-width:140px;
    min-height:150px;
    padding:0px;
    padding-bottom:0px;
}
.mycontainer2 {
    min-height:576px;
}
@media screen and (max-width: 1000px) {
#contentLeft {
    display:none;
}
    }
@media screen and (max-width: 991px) {
#default-main {
    margin-top:150px;
}
}
@media screen and (max-width: 769px) {
.nav a {
    padding: 2px 10px;
    text-decoration: none;
    color: #999;
    line-height: 100%;
    letter-spacing: 1px;
}
}
@media screen and (max-width: 440px) {
.product-list.twoColumns img {
    min-width: 0px;
    min-height: 0px;
    }
}
</style>


<div class="container"> <!--open container-->
<?php get_sidebar(); ?>



</div>



<?php get_footer(); ?>
