/*
*	Class
*	jQuery plug-in that provides several tools for building object oriented
*   JavaScript applications.
*	
*	Requires jQuery library (http://www.jquery.com)
*	
*	Taylan Pince (taylanpince at gmail dot com) - June 16, 2007
*/

(function($) {

    jQuery.extend({
    
        namespace : function(spaces) {
            var parent_space = window;
            var namespaces = spaces.split(".");

            for (var i = 0; i < namespaces.length; i++) {
                if (typeof parent_space[namespaces[i]] == "undefined") {
                    parent_space[namespaces[i]] = new Object();
                }

                parent_space = parent_space[namespaces[i]];
            }

            return parent_space;
        }
    
    });

    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\bSuper\b/ : /.*/;

    jQuery.Class = function() {
    
    };

    jQuery.Class.extend = function(prop) {
        var Super = this.prototype;
    
        initializing = true;
        var prototype = new this();
        initializing = false;
    
        for (var name in prop) {
            prototype[name] = typeof prop[name] == "function" && typeof Super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var tmp = this.Super;
                
                    this.Super = Super[name];
                
                    var ret = fn.apply(this, arguments);
                    this.Super = tmp;
                
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }
    
        function Class() {
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }
    
        Class.prototype = prototype;
    
        Class.constructor = Class;
    
        Class.extend = arguments.callee;
    
        return Class;
    };
    
    if (typeof Function.bind === 'undefined') {
    
        Function.prototype.bind = function(obj) { 
            var method = this;
        
            tmp = function() {
                return method.apply(obj, arguments);
            };
        
            return tmp;
        };
    
    }

    if (!Array.indexOf){
        Array.prototype.indexOf = function(obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == obj) {
                    return i;
                }
            }
        
            return -1;
        };
    }

})(jQuery);
