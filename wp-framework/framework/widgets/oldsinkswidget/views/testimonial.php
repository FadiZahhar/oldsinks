<?php
$post = get_post($instance['page']);
// the content was tags strip to be with no html
// and substring starting 54 to the limit count,
// reason that about us have shortcode this is why we start from 54
?>
<style>
.quote {
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
  line-height:1.5;
  color:#828282;
  font-size:17px;
}
.quote > p {
  margin-bottom:0px;
  color:#828282;
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
  line-height:1.5;
  color:#828282;
  font-size:17px;
  font-style:italic;
}

.quote > span {
  font-weight:700;
  ont-family: 'Raleway', sans-serif;
    line-height:1.5;
  color:#828282;
  font-size:17px;
}
</style>
<div class="quote" style="text-align:center">
  <img src="<?= IMAGES?>/_1.svg" style="float:left"/>
<p><?= $post->post_content ?>&nbsp;&nbsp;<img src="<?= IMAGES?>/_2.svg" stlye="float:right"/></p>
<br/><span><?= $post->post_title ?></span>
  
</div>