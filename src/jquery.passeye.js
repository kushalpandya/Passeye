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
                passwordFieldAttrObj = {},
                passeyeEl,
                passeyeContainerEl,
                plainTextEl,
                fnShowPassword,
                fnHidePassword,
                hideFlag = true;

            passeyeEl = $('<span />', {
                            'class': config.passeyeCls,
                            'css': {
                                'visibility': 'hidden'
                            }
                        }).html(config.eyecon);

            passeyeContainerEl = $('<span />', {
                                    'class': config.cls
                                });

            // Iterate over attributes of this Password field and collect all attributes.
            $(this).each(function () {
                $.each(this.attributes, function () {
                    if (this.specified) {
                        passwordFieldAttrObj[this.name] = this.value;
                    }
                });
            });

            passwordFieldAttrObj.type = 'text'; // Set type to text to construct textbox with similar attributes.

            plainTextEl =   $("<input />", passwordFieldAttrObj);

            /*** We now have the basic requirements ready to enable Passeye. ***/
            parentEl.append(passeyeContainerEl);    // Insert Parent Container.
            $(this).remove();                       // Remove original Password field.
            passeyeContainerEl.append(me);          // Put referenced Password field into container.
            if (config.rtl) {                         // Add Passeye.
                me.before(passeyeEl);
            }
            else {
                me.after(passeyeEl);
            }

            /**
             * Method to toggle from Password field to plain-text field.
             */
            fnShowPassword = function () {
                var passwordField = me,
                    passwordText;

                if (passwordField.val().length) {
                    passwordText = passwordField.val();
                    passwordField.remove();

                    if (config.rtl) {
                        $(this).after(plainTextEl);
                    }
                    else {
                        $(this).before(plainTextEl);
                    }

                    plainTextEl.val(passwordText);
                    hideFlag = false;
                }
            };

            /**
             * Method to toggle from plaing-text field to Password field.
             */
            fnHidePassword = function () {
                if (!hideFlag) {
                    if (plainTextEl.val().length) {
                        var passwordText = plainTextEl.val();
                        plainTextEl.remove();

                        if (config.rtl) {
                            $(this).after(me);
                        }
                        else {
                            $(this).before(me);
                        }

                        me.val(passwordText);
                        hideFlag = true;
                    }
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
            me.parent().on('keyup', 'input[type="password"]', function () {
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