    
    if (typeof Function.bind === 'undefined') {
    
        Function.prototype.bind = function(obj) { 
            var method = this;
        
            tmp = function() {
                return method.apply(obj, arguments);
            };
        
            return tmp;
        };
    
    }
