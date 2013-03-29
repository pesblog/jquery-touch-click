/**
 * jQuery touch click - v1.0 - 4/22/2012
 * https://github.com/pesblog/jquery-touch-click
 *
 * Copyright (c) 2012 "pesblog" Noritak Baba
 * Licensed under the MIT licenses.
 */

// About: Examples
// https://github.com/pesblog/jquery-touch-click/blob/master/examples/index.html

;(function ( $, window, undefined ) {

    var pluginName = 'touchClick';
    var defaults = {
        className: 'active',
        moveForgiveness: 15, //distance in pixels that the touch/mouse can move and still be considered a click
        callback: function(){} //removed console.log from default callback to avoid potential issue with versions of IE < 8.
    };

    var isTouch = ('ontouchend' in window);
    var touchstartEvent = isTouch ? 'touchstart.'+pluginName : 'mousedown.'+pluginName;
    var touchmoveEvent = isTouch ? 'touchmove.'+pluginName : 'mousemove.'+pluginName;
    var touchendEvent = isTouch ? 'touchend.'+pluginName : 'mouseup.'+pluginName;

    function Plugin( element, className, callback, context ) {
        this.element = element;
        if (typeof className === 'function'){
            this.options = {};
            this.options.className = defaults.className;
            this.options.callback = className;
            this.options.context = callback;
        } else {
            this.options = {
                className: className || defaults.className,
                callback: callback || defaults.callback,
                context: context
            };
        }
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        var self = this;
        var $element = $(self.element);
        var className = self.options.className;
        var callback = self.options.callback;
        var context = self.options.context || self.element;
        var moveForgiveness = self._defaults.moveForgiveness;
        $element
            .bind(touchstartEvent, function(e) {
                if(isTouch || e.which === 1) //only react to left click
                {
                    this.touchClickStart = true;
                    //Get the position of the touchStart
                    if(isTouch)	{
                        this.pos = {pageX: e.originalEvent.touches[0].pageX,pageY: e.originalEvent.touches[0].pageY};
                    }else{
                        this.pos = {pageX:e.pageX,pageY:e.pageY};
                    }
                    e.preventDefault();
                    $element.addClass( className );
                }
            })
            .bind(touchmoveEvent, function(e) {
                if ( this.touchClickStart ) {
                    //get the new position. Note: only checks the first finger to touch the screen.
                    var currentPosition = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
                    window.lastTouch = e;
                    //if new position is outside of the moveForgiveness "box"...
                    if(currentPosition.pageX > this.pos.pageX + moveForgiveness || currentPosition.pageX < this.pos.pageX - moveForgiveness || currentPosition.pageY > this.pos.pageY + moveForgiveness || currentPosition.pageY < this.pos.pageY - moveForgiveness){
                        //...cancel the potential touchclick action
                        this.touchClickStart = undefined;
                        $element.removeClass( className );
                    }
                }
            })
            .bind(touchendEvent, function(e) {
                var dom = context || this;
                if ( this.touchClickStart ) {
                    this.touchClickStart = undefined;
                    $element.removeClass( className );
                    setTimeout(function(){
                        $.proxy(callback, dom)(e)
                    }, 0);
                }
            });
        //allow touchclick to be triggered with $('#elem').touchClick();
        this.element.touchClick = function()
        {
            var dom = context || this.element;
            $.proxy(callback, dom)();
        }
    };

    $.fn[pluginName] = function ( className, callback ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                       new Plugin( this, className, callback ));
            }
        });
    };

})( jQuery, window );
