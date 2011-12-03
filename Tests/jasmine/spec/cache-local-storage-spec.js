/*
    Class.Cache - LocalStorage
*/
(function(){

var LocalIncluder = new Class({

    Cache: 'local',

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

describe("Class.Cache - LocalStorage", function(){

    var cacher = null;

    beforeEach(function() {
        cacher = new LocalIncluder();
    });

	it("equal", function(){
        var v1 = cacher.fetch('name=foo&age=28');
        var v2 = cacher.fetch('name=foo&age=28');

        expect(v1.name).toEqual(v2.name);
        expect(v1.age).toEqual(v2.age);
	});

});

}());