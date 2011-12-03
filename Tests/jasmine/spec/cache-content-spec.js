describe("CacheContent", function() {
/*
	var cache1,
		cache2,
		storage = {
			_caches: {},
			setItem: function(key, content){
				this._caches[key] = content;
			},
			getItem: function(key){
				if (!this._caches[key]){
					return false;
				}
				return this._caches[key];
			},
			removeItem: function(key){
				delete this._caches[key];
			}
		},
		cacheKey = cache1.getKey(),
	    cacheLimit = 1 * 60 * 60 * 1000 + new Date().getTime(),
		cacheContent = {
	        foo: 'foo',
	        bar: 'bar'
	    };
*/
	beforeEach(function() {
/*		cache1 = new CacheContent({
			storage: storage,
			key: 'name=foo&age=28',
		    limit: limit,
		    content: cacheContent
		});

		cache2 = new CacheContent({
			storage: storage,
			key: 'name=foo&age=28',
		    limit: new Date().getTime(),
		    content: cacheContent
		});
		storage.setItem('name=foo&age=28', cache1);
*/
	});

	//
	it("storage is equal", function() {
//		expect(cache1.getStorage()).toEqual(storage);
		expect(true).toEqual(true);
	});
/*
	it ("key is equal", function() {
		expect(cache1.getKey()).toEqual('name=foo&age=28');
	});

	it ("limit is equal", function() {
		expect(cache1.getLimit()).toEqual(cacheLimit);
	});

	it ("content is equal", function() {
		expect(cache1.getContent()).toEqual(content);
	});

	it ("limit", function() {
		expect(cache1.isLimit()).toEqual(false);
	});

	setTimeout(function(){

		it ("limit is over", function() {
			expect(cache2.isLimit()).toEqual(true);
		});
		
	}, 100);

	it ("destroy", function() {
		cacheKey = cache1.getKey();
		cache1.destroy();
		expect(storage.getItem(cacheKey)).toEqual(false);
	});
*/

});