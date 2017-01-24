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
            case "choose-popular":
                {

                    $('#current-source').html("Source: Popular");
                    $(this).find('.dropdown-content').removeClass('dropdown-content_active');
                    break;
                }
            default:

        }
    })
    $('.content-header__library-source').click(function(event) {
        if ($(this).attr('id') != 'choose-url') {
            $('.content-header__library-source').removeClass("content-header__library-source_active");
            $(this).addClass("content-header__library-source_active");
        }
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
            case "choose-url":
                $('.content-header__library-source-wrapper').removeClass("content-header__library-source-wrapper_active");
                $('.content-header__url-source-wrapper').addClass("content-header__url-source-wrapper_active");
                break;
            default:

        }
    });
    $('.main-section__playlist-summary').click(function(event) {
        $('.main-section__playlist-summary').removeClass("main-section__playlist-summary_active");
        $(this).addClass('main-section__playlist-summary_active');
    });
    $('.main-section__song-row').click(function(event) {
        $(this).find('.main-section__song-checkbox').trigger('change');
    });
    $('.main-section__song-checkbox').change(function(event) {
        if ($(this).is(':checked')) {
            $(this).prop('checked', false);
            if (!$('.main-section__songs').hasClass('main-section__songs_only'))
                $('.main-section__playlist-summary_active').find('.main-section__playlists-checkbox').prop('checked', false);
        } else {
            $(this).prop("checked", true);
            if (!$('.main-section__songs').hasClass('main-section__songs_only') && isAllSongsChecked())
                $('.main-section__playlist-summary_active').find('.main-section__playlists-checkbox').prop('checked', true);
        }
    });
    $('.main-section__playlists-checkbox').click(function(event) {
        event.stopPropagation();
    });
    $('.main-section__playlists-checkbox').change(function(event) {
        if ($(this).parent().hasClass('main-section__playlist-summary_active'))
            if ($(this).prop("checked"))
                $('.main-section__song-checkbox').prop("checked", true);
            else $('.main-section__song-checkbox').prop("checked", false);
    });
    $('#open-url-btn').click(function(event) {
        $('.main-section__playlists-list').addClass("main-section__playlists-list_hidden");
        $('.main-section__songs').addClass('main-section__songs_only');
    });
    $('#cancel-url-btn').click(function(event) {
        $('.content-header__library-source-wrapper').addClass("content-header__library-source-wrapper_active");
        $('.content-header__url-source-wrapper').removeClass("content-header__url-source-wrapper_active");
        if (!$('#choose-songs').hasClass('content-header__library-source_active')) {
            $('.main-section__playlists-list').removeClass("main-section__playlists-list_hidden");
            $('.main-section__songs').removeClass('main-section__songs_only');
        }
    });
})

function isAllSongsChecked() {
    var isTrue = true;
    $songs = $('.main-section__song-checkbox');
    $songs.each(function() {
        if (!$(this).prop("checked")) {
            return isTrue = false;
        }
    })
    return isTrue;
}
