try {
  $(window).on('load', function () {
    let $preloader = $('#page-preloader'),
        $spinner   = $('#spinner');
    $spinner.fadeOut();
    $preloader.delay(100).fadeOut('slow');
  });
} catch(e) {
  let $preloader = $('#page-preloader'),
      $spinner = $('#spinner');
  $spinner.fadeOut();
  $preloader.delay(100).fadeOut('slow');
}