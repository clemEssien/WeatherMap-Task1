/*
 *
 * jQuery Loading State Buttons
 * --------------------------------------------------------------
 *
   * Licensed under The MIT License
 *
 * @version        1.0
 * @since          2015-09-12
 * @author         Emre Çetiner
 * @documentation  http://www.emrecetiner.com.tr/jQuery/loadingstatebuttons
 *
 */

; (function ($) {

    var methods = {
        init: function (settings) {
            return this.each(function () {

                this.opt = $.extend({}, $.fn.loadState.defaults, settings);

                var self = this,
                    that = $(this);

                var $type = self.opt.type;

                var $closeTime = self.opt.closeTime;


                that.click(function () {
                    var text = that.attr("data-loading-text");
                    var oldText = that.html();
                    if ($type === "disable") {
                        that.attr("disabled", "disabled").html(text);
                        setTimeout(function () {
                            that.removeAttr("disabled", "disabled").html(oldText);
                        }, $closeTime);
                    }else if ($type === "loader") {
                        var loaderImagePath = "assets/img/loader.gif";
                        that.addClass("loader").html(text+"<img src="+ loaderImagePath +">");
                        setTimeout(function () {
                            that.removeClass("loader").html(oldText);
                        }, $closeTime);
                    }else if ($type === "fill-horizontal") {
                        that.append("<span class='progress-inner'></span>");
                        that.find(".progress-inner").animate({
                            "width":"100%"
                        },$closeTime);
                        setTimeout(function () {
                            that.find(".progress-inner").remove();
                        }, $closeTime);
                    }
                });


            });
        }
    };

    $.fn.loadState = function () {
        return methods.init.apply(this, arguments);
    };

    $.fn.loadState.defaults = {
        type: "disable",
        closeTime: 4000
    };

})(jQuery);