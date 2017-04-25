var App = function () {

    this.init = function () {

    };

    this.scrollToEl = function (el, offset, duration) {
        var $el = !( el instanceof jQuery ) ? $(el) : el;
        el = $el.length ? $el : $('body');
        offset = offset || -120;
        duration = duration || 1000;
        $('html, body').stop().animate({
            scrollTop: el.offset().top+offset
        }, duration);
    };

};
