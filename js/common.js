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
        switch (event.target.id) {
            case "choose-library":
                {
                    $('.content-header__library-source-wrapper').addClass("content-header__library-source-wrapper_active");
                    $('.content-header__url-source-wrapper').removeClass("content-header__url-source-wrapper_active");
                    $('#current-source').html("Source: Library");
                    $(this).find('.dropdown-content').removeClass('dropdown-content_active');
                    if (!$('#choose-songs').hasClass('content-header__library-source_active')) {
                        $('.main-section__playlists-list').removeClass("main-section__playlists-list_hidden");
                        $('.main-section__songs').removeClass('main-section__songs_only');
                    }
                    break;
                }
            case "choose-url":
                {
                    $('.content-header__library-source-wrapper').removeClass("content-header__library-source-wrapper_active");
                    $('.content-header__url-source-wrapper').addClass("content-header__url-source-wrapper_active");
                    $('#current-source').html("Source: Playlist URL");
                    $(this).find('.dropdown-content').removeClass('dropdown-content_active');
                    $('.main-section__playlists-list').addClass("main-section__playlists-list_hidden");
                    $('.main-section__songs').addClass('main-section__songs_only');
                    break;
                }
            default:

        }
    })
    $('.content-header__library-source').click(function(event) {
        $('.content-header__library-source').removeClass("content-header__library-source_active");
        $(this).addClass("content-header__library-source_active");
        switch (this.id) {
            case "choose-playlists":
            case "choose-albums":
                {
                    $('.main-section__playlists-list').removeClass("main-section__playlists-list_hidden");
                    $('.main-section__songs').removeClass('main-section__songs_only');
                    break;
                }
            case "choose-songs":
                {
                    $('.main-section__playlists-list').addClass("main-section__playlists-list_hidden");
                    $('.main-section__songs').addClass('main-section__songs_only');
                    break;
                }
            default:

        }
    })
})
