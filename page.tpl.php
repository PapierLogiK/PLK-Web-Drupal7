<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>


<?php
/**
 * Javacsript for CSS style modification:
 * Resize Teasers Blocks Height in function of the display width
 */
?>
<script>
window.addEventListener("resize", function(e) {
    var mapElement = document.getElementById(".node-teaser");
    mapElement.style.height = mapElement.offsetWidth * 2;
});
</script>


<?php
/**
  * Javacsript for CSS class and style modification:
  * setup a fixed class attribute to header vs position scroll
  * in relation with specific CSS attributes for header, sub-menus and content in header.css 
  */
?>
<script>
	var derniere_position_de_scroll_connue = 0;
	var ticking = false;

	function faitQuelquechose(position_scroll) {
	    // faites quelque chose avec la position du scroll
	    var stickyHeader = $(".header");
  		var stickyPracticeMenu = $("#block-superfish-2");
  		var stickyResourcesMenu = $("#block-superfish-9"); 
  		var stickyPageTitle = $(".layout-3col h1"); 
  		var pageContentLayout = $(".layout-3col"); 
  			
  		    
  		if (position_scroll >= 60) {
		    stickyHeader.addClass('fixed'); 
  		 	stickyPracticeMenu.addClass('fixed');
  		 	stickyResourcesMenu.addClass('fixed');
  		 	stickyPageTitle.addClass('fixed');
  		 	pageContentLayout.addClass('fixedHeader'); 
  		}
  			
  		else {
  			stickyHeader.removeClass('fixed');
  			stickyPracticeMenu.removeClass('fixed');
  			stickyResourcesMenu.removeClass('fixed');
  			stickyPageTitle.removeClass('fixed');
  			pageContentLayout.removeClass('fixedHeader');
  		}
		    
	}
    		
  	window.addEventListener('scroll', function(e) {
		derniere_position_de_scroll_connue = window.scrollY;
 	 	var p = $( "#block-block-4 p" );
	    p.text( "position du scroll: " + derniere_position_de_scroll_connue);
 	 	if (!ticking) {
 	   		window.requestAnimationFrame(function() {
   	   		faitQuelquechose(derniere_position_de_scroll_connue);
   	   		ticking = false;
   	 	});
 	 }
 	 ticking = true;
	});
</script>



    
<div class="layout-center">   


  <header class="header" role="banner">

    <?php if ($logo): ?>
      <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="header__logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="header__logo-image" /></a>
    <?php endif; ?>

    <?php if ($site_name || $site_slogan): ?>
      <div class="header__name-and-slogan">
        <?php if ($site_name): ?>
          <h1 class="header__site-name">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" class="header__site-link" rel="home"><span><?php print $site_name; ?></span></a>
          </h1>
        <?php endif; ?>

        <?php if ($site_slogan): ?>
          <div class="header__site-slogan"><?php print $site_slogan; ?></div>
        <?php endif; ?>
      </div>
    <?php endif; ?>

    <?php if ($secondary_menu): ?>
      <nav class="header__secondary-menu" role="navigation">
        <?php print theme('links__system_secondary_menu', array(
          'links' => $secondary_menu,
          'attributes' => array(
            'class' => array('links', 'inline', 'clearfix'),
          ),
          'heading' => array(
            'text' => $secondary_menu_heading,
            'level' => 'h2',
            'class' => array('visually-hidden'),
          ),
        )); ?>
      </nav>
    <?php endif; ?>

    <?php print render($page['header']); ?>

  </header>

  <div class="layout-3col layout-swap">

    <?php
      // Render the sidebars to see if there's anything in them.
      $sidebar_first  = render($page['sidebar_first']);
      $sidebar_second = render($page['sidebar_second']);
      // Decide on layout classes by checking if sidebars have content.
      $content_class = 'layout-3col__full';
      $sidebar_first_class = $sidebar_second_class = '';
      if ($sidebar_first && $sidebar_second):
        $content_class = 'layout-3col__right-content';
        $sidebar_first_class = 'layout-3col__first-left-sidebar';
        $sidebar_second_class = 'layout-3col__second-left-sidebar';
      elseif ($sidebar_second):
        $content_class = 'layout-3col__left-content';
        $sidebar_second_class = 'layout-3col__right-sidebar';
      elseif ($sidebar_first):
        $content_class = 'layout-3col__right-content';
        $sidebar_first_class = 'layout-3col__left-sidebar';
      endif;
    ?>

    <main class="<?php print $content_class; ?>" role="main">
      <?php print render($page['highlighted']); ?>
      <?php print $breadcrumb; ?>
      <a href="#skip-link" class="visually-hidden visually-hidden--focusable" id="main-content">Back to top</a>
      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <h1><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>
      <?php print render($tabs); ?>
      <?php print render($page['help']); ?>
      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
      <?php print $feed_icons; ?>
    </main>

    <div class="layout-swap__top layout-3col__full">

      <a href="#skip-link" class="visually-hidden visually-hidden--focusable" id="main-menu" tabindex="-1">Back to top</a>

      <?php if ($main_menu): ?>
        <nav class="main-menu" role="navigation">
          <?php
          // This code snippet is hard to modify. We recommend turning off the
          // "Main menu" on your sub-theme's settings form, deleting this PHP
          // code block, and, instead, using the "Menu block" module.
          // @see https://drupal.org/project/menu_block
          print theme('links__system_main_menu', array(
            'links' => $main_menu,
            'attributes' => array(
              'class' => array('navbar', 'clearfix'),
            ),
            'heading' => array(
              'text' => t('Main menu'),
              'level' => 'h2',
              'class' => array('visually-hidden'),
            ),
          )); ?>
        </nav>
      <?php endif; ?>

      <?php print render($page['navigation']); ?>

    </div>

    <?php if ($sidebar_first): ?>
      <aside class="<?php print $sidebar_first_class; ?>" role="complementary">
        <?php print $sidebar_first; ?>
      </aside>
    <?php endif; ?>

    <?php if ($sidebar_second): ?>
      <aside class="<?php print $sidebar_second_class; ?>" role="complementary">
        <?php print $sidebar_second; ?>
      </aside>
    <?php endif; ?>

  </div>

  <?php print render($page['footer']); ?>

</div>

<?php print render($page['bottom']); ?>
