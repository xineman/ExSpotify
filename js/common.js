$(document).ready(function() {
  $('.header__dropdown-title').hover(function() {
    $(this).siblings('.header__dropdown-content').toggleClass('header__dropdown-content_active');
    $(this).find('.header__dropdown-arrow').toggleClass('header__dropdown-arrow_active');
  });
  $('.header__dropdown-content').hover(function() {
    $(this).siblings('.header__dropdown-title').find('.header__dropdown-arrow').toggleClass('header__dropdown-arrow_active');
    $(this).toggleClass('header__dropdown-content_active');
  });
})
