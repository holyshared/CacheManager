/*
    Class.Cache - SessionStorage
*/
(function(){

var SessionIncluder = new Class({

    Cache: 'session',

    fetch: function(criteria){
        var cache = this.cache.get(criteria);
        if (cache && cache.isLimit() !== false) {
            return cache.getContent();
        }
        var content = {
            name: 'foo',
            age: 28
        };
        this.cache.set(criteria, content, 1 * 60 * 60 * 1000);

        return content;
    }

});

var CacheLimitChecker = new Class({

    Cache: 'session',

    cacheLimit: function(criteria){
        var cache = this.cache.get(criteria);
        if (cache && cache.isLimit() === true) {
            return true;
        }

        this.cache.set(criteria, {}, 100);
        return false;
    }

});

describe("Class.Cache - SessionStorage", function(){

    var cacheChecker = null, limitChecker = null;

    beforeEach(function() {
        window.sessionStorage.clear();
        cacheChecker = new SessionIncluder();
        limitChecker = new CacheLimitChecker();
    });

	it("equal", function(){
        var v1 = cacheChecker.fetch('name=foo&age=28');
        var v2 = cacheChecker.fetch('name=foo&age=28');

        expect(v1.name).toEqual(v2.name);
        expect(v1.age).toEqual(v2.age);
	});


    it("limit", function(){
        var v1 = limitChecker.cacheLimit('name=foo&age=28');
        var v2 = limitChecker.cacheLimit('name=foo&age=28');

        expect(v1).toEqual(false);
        expect(v2).toEqual(true);
    });


});

}());