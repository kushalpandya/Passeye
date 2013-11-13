/**
 *  jQuery Passeye Plugin
 *  
 *  A plugin to show a small password reveal button beside the Password field, like in Windows 8.
 *  (c) 2013 http://doublslash.com
 *  GPLv3
 */

(function (factory) {
    'use strict';

    /**
     * Enable Module System to support CommonJS.
     * courtesy: SO <http://stackoverflow.com/a/11890239/414749>
     */
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory;
    } else {
        // Globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';
    $.fn.passeye = function (config) {
        var defaultConfig = {};

        /*** Default config options that Passeye provides. ***/
        defaultConfig = {
            eyecon: '&#9737;',              // Valid HTML character to use as icon to reveal password on Mousedown.
            rtl: false,                     // Set this flag to True for to make sure Passeye confirms with RTL paradigms.
            cls: 'passeye-password-field',  // CSS class to apply parent container (span) of Password field with Passeye.
            passeyeCls: 'passeye-btn'       // CSS class for Passeye element.
        };

        config = $.extend(defaultConfig, config);

        return this.each(function () {
            var me = $(this),
                parentEl = $(this).parent(),
                passeyeEl,
                passeyeContainerEl,
                fnShowPassword,
                fnHidePassword;

            // Passeye Element Object.
            passeyeEl = $('<span />', {
                            'class': config.passeyeCls,
                            'css': {
                                'visibility': 'hidden'
                            }
                        }).html(config.eyecon);

            // Parent Container which keeps Password input box and Passeye.
            passeyeContainerEl = $('<span />', {
                                    'class': config.cls
                                });

            parentEl.append(passeyeContainerEl);    // Insert Parent Container.
            $(this).remove();                       // Remove original Password field.
            passeyeContainerEl.append(me);          // Put referenced Password field into container.
            if (config.rtl) {                       // Add Passeye based on RTL settings.
                me.before(passeyeEl);
            }
            else {
                me.after(passeyeEl);
            }

            /**
             * Method to toggle from Password field to plain-text field.
             */
            fnShowPassword = function () {
                if (me.val().length) {
                    me.attr('type', 'text');
                }
            };

            /**
             * Method to toggle from plaing-text field to Password field.
             */
            fnHidePassword = function () {
                if (me.val().length) {
                    me.attr('type', 'password');
                }
            };

            /**
             * Attach Mousedown Listener to Show password.
             */
            passeyeEl.on('mousedown', fnShowPassword);

            /**
             * Attach Mouseup Listener to Hide password.
             */
            passeyeEl.on('mouseup', fnHidePassword);

            /**
             * Dragging mouse away from Passeye keeps the password visible since Mouseup is never fired.
             * So take care of that with Mouseleave event. 
             */
            passeyeEl.on('mouseleave', fnHidePassword);

            /**
             * Attach keyup listener to toggle Passeye for password input.
             */
            me.on('keyup', function () {
                if ($(this).val().length) {
                    passeyeEl.css('visibility', 'visible');
                }
                else {
                    passeyeEl.css('visibility', 'hidden');
                }
            });
        });
    };
}));