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

var CacheManager = global.CacheManager = function (storage){

	var name = '';

	if (Type.isString(storage) !== true){
		throw new TypeError('The name of storage needs to be a character string.');
	}

	name = storage.capitalize() + 'Storage';

	if (!CacheManager[name]){
		throw new TypeError('The storage ' + name + ' is not defined.');
	}
	this.storage = CacheManager[name];

}.implement({

	set: function(key, content, limit){
		var cacheTime = new Date(),
			cacheContent = null;

		if (Type.isNumber(limit) === false) {
			throw new TypeError('The earned hours of cash need to be milli seconds.');
		}

		cacheTime.setTime(cacheTime.getTime() + limit);

		cacheContent = JSON.encode({
			limit: cacheTime.getTime(),
			content: content
		});
		this.storage.setItem(key, cacheContent);
	},

	get: function(key){
		var cache = null,
			cacheContent = this.storage.getItem(key);

		if (!cacheContent){
			return null;
		}

		cache = JSON.decode(cacheContent);
 		cache = Object.merge(cache, {
 			key: key,
			storage: this
		});
		return new CacheManager.CacheContent(cache);
	},

	remove: function(key){
		this.storage.removeItem(key);
	},

	clear: function(){
		this.storage.clear();
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
			throw new TypeError('The key needs to be a character string.');
		}
		if (!content){
			throw new TypeError('The contents which cash carries out are empty.');
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
	},
	clear: function(){
		this._store = {};
	}
};

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
			if (this.getLimit() > new Date().getTime()){
				return false;
			} else {
				return true;
			}
		},

		destroy: function(){
			var key = this.getKey(),
				storage = this.getStorage();

			storage.removeItem(key);
		}
	});
};

}(this));