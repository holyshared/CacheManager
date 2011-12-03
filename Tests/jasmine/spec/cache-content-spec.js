describe("CacheContent", function() {

	it("storage is equal", function(){
		var cache = new CacheManager.CacheContent({
			storage: CacheManager.HashStorage
		});
		expect(cache.getStorage()).toEqual(CacheManager.HashStorage);
	});

	it("key is equal", function() {
		var cache = new CacheManager.CacheContent({
			key: 'foo'
		});
		expect(cache.getKey()).toEqual('foo');
	});

	it("limit is equal", function() {
		var cache = new CacheManager.CacheContent({
			limit: 1000
		});
		expect(cache.getLimit()).toEqual(1000);
	});

	it("content is equal", function() {
		var content = { name: 'foo' }
		var cache = new CacheManager.CacheContent({
			content: content
		});
		expect(cache.getContent()).toEqual(content);
	});

	it("limit is valid", function() {
		var cache = null;

		cache = new CacheManager.CacheContent({
			limit: new Date().getTime()
		});
		expect(cache.isLimit()).toEqual(true);

		cache = new CacheManager.CacheContent({
			limit: new Date().getTime() + (1 * 60 * 60 * 1000)
		});
		expect(cache.isLimit()).toEqual(false);
	});

	it("destroy", function() {

		var cache = null;

		cache = new CacheManager.CacheContent({
			key: 'foo',
			storage: CacheManager.HashStorage,
			limit: new Date().getTime() + (1 * 60 * 60 * 1000)
		});

		cache.destroy();

		expect(CacheManager.HashStorage.getItem('foo')).toEqual(null);
	});

});