/*
---
name: CacheManager

description: 

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Core
  - Core/String
  - Core/Object
  - Core/Type
  - Core/JSON

provides:
  - CacheManager
  - CacheManager.CacheContent
  - CacheManager.LocalStorage
  - CacheManager.SessionStorage
  - CacheManager.HashStorage
...
*/

(function(global){

/**
 * CacheManager
 */
var CacheManager = global.CacheManager = function (storage){

	this.storage = storage;

}.implement({


    /*

        Example: 

        var content = {
            name: 'foo',
            age: 28,
            email: 'foo@example.com'
        };
        cacheManager.set('name=foo&age=28', content);
        cacheManager.set('name=foo&age=28', content, 1 * 60 * 60 * 1000);

    */
    set: function(key, content, limit){
        var cacheTime = new Date(),
            cacheContent = null;

        if (Type.isNumber(limit) === false) {
            throw new TypeError('cache limit invalid.');
        }

        cacheTime.setTime(cacheTime.getTime() + limit);

        cacheContent = JSON.encode({
            limit: cacheTime.getTime(),
            content: content
        });
        this.storage.setItem(key, cacheContent);
    },

    /*

        Example:

        var cache = cacheManager.get('name=foo&age=28');
        if (cache.isLimit() === true) {
            //remove a cache content
            cache.destory();
        }

    */
    get: function(key){
        var cache = null,
            cacheContent = this.storage.getItem(key);

        if (!cacheContent) {
            return null;
        }

        cache = JSON.decode(cacheContent);
        cache = Object.merge(cache, {
            key: key,
            storage: this
        });

		return new CacheManager.CacheContent(cache);
    }

});

//localStorage alias name
CacheManager.LocalStorage = global.localStorage;

//sessionStorage alias name
CacheManager.SessionStorage = global.sessionStorage;

CacheManager.HashStorage = {
	_store: {},
	setItem: function(key, content){
		if (!Type.isString(key)){
			throw new TypeError('invalid key');
		}
		if (!content){
			throw new TypeError('content is not empty');
		}
		this._store[key] = content;
	},
	getItem: function(key){
        if (!this._store[key]){
		    return null;
		}
		return this._store[key];
	},
	removeItem: function(key){
		delete this._store[key];
	}
};


/*

Example:

var content = CacheContent({
	storage: storage,
	key: 'name=foo&age=28',
    limit: 1 * 60 * 60 * 1000 + new Date().getTime(),
    content: {
        foo: 'foo',
        bar: 'bar'
    }
});

content.getKey();
content.getStorage();
content.getLimit()
content.getContent();
content.isLimit();
content.destory();

*/

CacheManager.CacheContent = function (properties){

    var instance = this, getter = null;

	//generate getter methods
    Object.each(properties, function(value, key){
        getter = 'get' + key.capitalize();
		instance[getter] = function(){
			return properties[key];
		};
    });

	Object.merge(instance, {
		
	    isLimit: function(){
	        if (instance.limit > new Date().getTime()){
	            return false;
	        } else {
	            return true;
	        }
	    },

	    destroy: function(){
	        instance.storage.removeItem(instance.key);
	    }
		
	});

};

}(this));