$(document).ready(function() {
    $('.dropdown-title').hover(
        function() {
            $(this).siblings('.dropdown-content').addClass('dropdown-content_active');
            $(this).find('.dropdown-arrow').addClass('dropdown-arrow_active');
        },
        function() {
            $(this).siblings('.dropdown-content').removeClass('dropdown-content_active');
            $(this).find('.dropdown-arrow').removeClass('dropdown-arrow_active');
        });
    $('.dropdown-content').hover(
        function() {
            $(this).siblings('.dropdown-title').find('.dropdown-arrow').addClass('dropdown-arrow_active');
            $(this).addClass('dropdown-content_active');
        },
        function() {
            $(this).siblings('.dropdown-title').find('.dropdown-arrow').removeClass('dropdown-arrow_active');
            $(this).removeClass('dropdown-content_active');
        });
    $('.content-header__source-dropdown').click(function(event) {
      console.log(event.target.id);
      $(this).find('.dropdown-content').removeClass('dropdown-content_active');
        switch (event.target.id) {
            case "choose-library":
            case "choose-library-a":
                {
                    $('.content-header__library-source-wrapper').addClass("content-header__library-source-wrapper_active");
                    $('.content-header__url-source-wrapper').removeClass("content-header__url-source-wrapper_active");
                    $('#current-source').html("Source: Library");
                    break;
                }
            case "choose-url":
            case "choose-url-a":
                {
                    $('.content-header__library-source-wrapper').removeClass("content-header__library-source-wrapper_active");
                    $('.content-header__url-source-wrapper').addClass("content-header__url-source-wrapper_active");
                    $('#current-source').html("Source: Playlist URL");
                    break;
                }
            default:

        }

    })
    $('.content-header__library-source').click(function() {
        $('.content-header__library-source').removeClass("content-header__library-source_active");
        $(this).addClass("content-header__library-source_active");
    })
})
