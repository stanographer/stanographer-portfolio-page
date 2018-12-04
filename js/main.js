/*
 * Project:        NOISE - HTML5 Template
 * Version:        1.0
 * Author:         Neon Unicorns
 * Author ulr:     https://themeforest.net/user/neonunicorns
 */

(function($) {

  'use strict';

  /* -----------------------
   * Predefined Variables
   * --------------------- */
  var $window = $(window),
    $document = $(document),
    $body = $('body'),
    $html = $('html, body');

  // Variables
  var siteLoad = false;

  // Animation easing
  // ease-in-out-quart http://cubic-bezier.com/#.77,0,.17,1
  var animEasing = 'cubic-bezier(0.77, 0, 0.175, 1)';

  // Sections
  var $sectionHome = $('.section-home'),
    $sectionAbout = $('.section-about'),
    $sectionServices = $('.section-skills'),
    $sectionPortfolio = $('.section-portfolio'),
    $sectionContact = $('.section-contact');

  var $onLoadTrigger = $('<div/>', {
    'class': '$onLoadTrigger',
    css: { 'display': 'none' }
  });

  /* -----------------------------
   * Preloader
   * ---------------------------*/
  // makes sure the whole site is loaded
  // and add native js event listener for window
  window.addEventListener('load', function() {
    var $preloader = $('.preloader-container');
    var $loader = $preloader.find('.loader');
    $loader.addClass('loader-anim-start');
    window.setTimeout(function() {
      $loader.addClass('loader-anim-end');
    }, 1000);
    window.setTimeout(function() {
      $preloader.addClass('preloader-container-left');
    }, 2000);
    window.setTimeout(function() {
      $preloader.hide();
      $body.addClass('loaded');
      siteLoad = true;
      $onLoadTrigger.trigger('click');
    }, 3000);
  }, false);


  /* -----------------------
   * Functions
   * --------------------- */
  // Helper functions
  var maxH = function() {
    var allH = [];
    allH.push($sectionHome.height());
    allH.push($sectionAbout.height());
    allH.push($sectionServices.height());
    allH.push($sectionPortfolio.height());
    allH.push($sectionContact.height());
    return Math.max.apply(Math, allH);
  };
  var maxW = function() {
    var allW = [];
    allW.push($sectionHome.width());
    allW.push($sectionAbout.width());
    allW.push($sectionServices.width());
    allW.push($sectionPortfolio.width());
    allW.push($sectionContact.width());
    return Math.max.apply(Math, allW);
  };

  /* Portfolio filtering function */
  var portfolioFilteringMasonry = function() {
    // Caching selectors
    var $portfolioContainer = $('.portfolio-grid'),
      $portfolioItems = $portfolioContainer.find('.grid-item'),
      $portfolioFilters = $('.portfolio-filters ul'),
      $portfolioFilter = $portfolioFilters.find('li.portfolio-filter');
    // Initialize masonry plugin
    var mas = $portfolioContainer.masonry({
      itemSelector: '.grid-item',
      columnWidth: 285,
      gutter: 5,
      fitWidth: true,
      transitionDuration: '1s'
    });
    // Bind event listener
    $portfolioFilters.on('click', 'li.portfolio-filter', function() {
      $portfolioFilter.removeClass('active');
      $(this).addClass('active');
      filter($portfolioItems, $(this).data('filter'));
    });

    // Portfolio filtering
    function filter(items, filter) {
      items = items || '*';
      var matches = [];
      var hiddenMatched = [];
      var visibleUnmatched = [];
      if (filter !== 'all') {
        // test each item
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var isMatched = $(item).data('category') === filter;
          // add to matches if its a match
          if (isMatched) {
            matches.push(item);
          }
          // add to additional group if item needs to be hidden or revealed
          if (isMatched && $(item).is(':hidden')) {
            hiddenMatched.push(item);
          } else if (!isMatched && !$(item).is(':hidden')) {
            visibleUnmatched.push(item);
          }
        }
      } else {
        for (var i = 0; i < items.length; i++) {
          hiddenMatched.push(items[i]);
        }
      }
      $(visibleUnmatched).hide();
      $(hiddenMatched).show();
      mas.masonry('layout');
    }
  };
  portfolioFilteringMasonry();

  // Prepare page for animation
  var prepareAnimation = function() {
    // Find all elements to animate
    var $slideAnim = $('.slide-anim'),
      $fadeInAnim = $('.fadeIn-anim');
    // Hide all elements
    $slideAnim.css('opacity', 0);
    $fadeInAnim.css('opacity', 0);


    $slideAnim.each(function() {
      var $this = $(this),
        animationDelay = $this.data('anim-delay') || 1,
        animationDuration = $this.data('anim-duration') || 500;
      // Wrap in container
      var animContainer = $('<div/>', {
        'class': 'anim-container'
      });
      $this.wrap(animContainer);
      // Calculate delay
      var delay = (animationDuration / 1000) + (animationDelay / 10);
      // Prepare transition
      var transitions =
        'right ' + animationDuration / 1000 + 's ' + animEasing + ' ' + animationDelay / 10 + 's, ' +
        'left ' + animationDuration / 1000 + 's ' + animEasing + ' ' + delay + 's';
      // Create mask
      var animMask = $('<div/>', {
        'class': 'anim-mask',
        css: {
          'transition': transitions
        }
      });
      $this.css('transition', 'opacity 0s linear ' + delay + 's');
      // Insert mask
      animMask.insertAfter($this);
    });
  };
  prepareAnimation();

  var animateSection = function(index) {
    var $section = $('.section-' + index);
    if (!$section.hasClass('animated')) {
      // Slide animation
      var $slideAnim = $section.find('.slide-anim');
      $slideAnim.each(function() {
        var $this = $(this);
        $this.parent('.anim-container').addClass('animm');
      });
      // FadeInLeft animation
      var $fadeInAnim = $section.find('.fadeIn-anim');
      $fadeInAnim.each(function() {
        var $this = $(this);
        var animationDelay = $this.data('anim-delay') || 1;
        var animationDuration = $this.data('anim-duration') || 500;
        var transitions = 'all .5s ease, ' +
          'transform ' + animationDuration / 1000 + 's ' + animEasing + ' ' + animationDelay / 10 + 's, ' +
          'opacity ' + animationDuration / 1000 + 's ' + animEasing + ' ' + animationDelay / 10 + 's';
        $this.css({
          'transition': transitions,
          'opacity': 1
        });
      });
      $section.addClass('animated');
    } else {
      return false;
    }
  };


  /* -----------------------
   * Fullpage.js
   * --------------------- */
  $('#main').fullpage({
    anchors: ['home', 'about', 'skills', 'portfolio', 'contact'],
    responsiveWidth: maxW(),
    responsiveHeight: maxH(),
    navigation: true,
    afterLoad: function(anchorLink, index) {
      if (!siteLoad) {
        $onLoadTrigger.on('click', function() {
          animateSection(index);
        });
      } else {
        animateSection(index);
      }
    }
  });


  /* ---------------------------------------------
   Portfolio gallery
   --------------------------------------------- */
  var $portfolioContainer = $('.portfolio-grid');
  $portfolioContainer.magnificPopup({
    delegate: 'a',
    type:'inline',
    removalDelay: 100,
    closeBtnInside: true,
    showCloseBtn: true,
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    callbacks: {
      beforeOpen: function () {
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        this.st.mainClass = "mfp-zoom-in";
      },
      open: function () {
        // disable fullpage.js scrolling
        $.fn.fullpage.setAllowScrolling(false);
      },
      close: function () {
        // enable fullpage.js scrolling
        $.fn.fullpage.setAllowScrolling(true);
      }
    }
  });

  /* ---------------------------------------------
   Menu
   --------------------------------------------- */
  // Caching selectors
  var $menu = $('.menu'),
    $showMenuButton = $('.show-menu-button'),
    $menuMask = $('.menu-mask'),
    $fpNav = $('#fp-nav');

  // Variables
  var menuAnimTime = 400;

  // Show menu function
  var showMenu = function() {
    $body.addClass('showMenu');
    // disable fullpage.js scrolling
    $.fn.fullpage.setAllowScrolling(false);
    $showMenuButton.addClass('active');
    $menuMask.addClass('mask-center');
    $menu.addClass('show');
    window.setTimeout(function() {
      $fpNav.hide();
      $menuMask.addClass('mask-right');
    }, menuAnimTime);
  };

  // Hide menu function
  var hideMenu = function() {
    $body.removeClass('showMenu');
    // enable fullpage.js scrolling
    $.fn.fullpage.setAllowScrolling(true);
    $showMenuButton.removeClass('active');
    $menuMask.removeClass('mask-right');
    window.setTimeout(function() {
      $menu.removeClass('show');
      $menuMask.removeClass('mask-center');
      $fpNav.show();
    }, menuAnimTime);
  };

  /* Add event listener */
  $showMenuButton.on('click', function() {
    if (!$body.hasClass('showMenu')) {
      showMenu();
    } else {
      hideMenu();
    }
  });

  /* Menu links */
  var $menuLinksUl = $menu.find('.menu-links-ul');
  $menuLinksUl.on('click', 'a', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var target = $(this).attr('href').split('#')[1];
    $.fn.fullpage.silentMoveTo(target);
    hideMenu();
  });

  /* ---------------------------------------------
   Contact Form
   --------------------------------------------- */
  var $form = $('form.mail-form');
  var $statusMassage = $form.find('.status-massage');
  $form.submit(function() {
    $statusMassage.find('*').remove();
    var hasError = false;
    $form.find('.form-controller').each(function() {
      if (jQuery.trim($(this).val()) === '') {
        var field = $(this).attr('name');
        $statusMassage.append('<span class="error">Please fill out ' + field + ' field.</span>');
        $(this).addClass('inputError');
        hasError = true;
      } else if ($(this).hasClass('email') && (this).attr('name') === 'email') {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(jQuery.trim($(this).val()))) {
          $statusMassage.append('<span class="error">You entered an invalid email.</span>');
          $(this).addClass('inputError');
          hasError = true;
        }
      }
    });
    if (!hasError) {
      var formInput = $(this).serialize();
      $.post($(this).attr('action'), formInput, function() {
        $statusMassage.find('*').remove();
        $statusMassage.append('' +
          '<span class="success">' +
          '<i class="icon ion-checkmark-round"></i>  ' +
          'Thank you. Your email was sent successfully.' +
          '</span>');
      });
    }
    return false;
  });

  // Defer images.
  function init() {
    var imgDefer = document.getElementsByTagName('img');
    for (var i = 0; i < imgDefer.length; i++) {
      if (imgDefer[i].getAttribute('data-src')) {
        imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
      }
    }
  }

  window.onload = init;

})(jQuery);
