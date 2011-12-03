/*
	CacheManager - LocalStorage
*/
(function(){

describe("CacheManager.LocalStorage", function(){

    var cacheManager = null;

    beforeEach(function(){
		cacheManager = new CacheManager('local');
    });

	it("equal", function(){

		var content = {
			name: 'foo',
			age: 28
		};

		cacheManager.set('name=foo&age=28', content, 1 * 60 * 60 * 1000);

        var cache = cacheManager.get('name=foo&age=28'),
        	cacheContent = cache.getContent();

        expect(content.name).toEqual(cacheContent.name);
        expect(content.age).toEqual(cacheContent.age);

	});


    it("limit", function(){

		var cache = null,
			cacheContent = null,
			content = {};

		content = { name: 'foo', age: 28 };

		cache = cacheManager.get('name=foo&age=20');

        expect(cache).toEqual(null);


		cacheManager.set('name=foo&age=20', content, 0);

        cache = cacheManager.get('name=foo&age=20');

        expect(cache.isLimit()).toEqual(true);

	});


	it("remove", function(){

		var cache = null,
			content = {};

		content = { name: 'foo', age: 28 };

		cacheManager.set('name=foo&age=20', content, 60000);

		cacheManager.remove('name=foo&age=20');

        cache = cacheManager.get('name=foo&age=20');

        expect(cache).toEqual(null);

	});



	it("clear", function(){

		var cache = null,
			content = {};

		content = { name: 'foo', age: 28 };

		cacheManager.set('name=foo&age=20', content, 60000);

		cacheManager.clear();

        cache = cacheManager.get('name=foo&age=20');

        expect(cache).toEqual(null);

	});

});

}());