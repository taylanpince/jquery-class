
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
