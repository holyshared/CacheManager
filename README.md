
CacheManager
============================================

This library offers the cash function which uses localStorage newly added by HTML5, and sessionStorage.  
Cash can be used in very easy code.

How to use
--------------------------------------------

CacheManager is a cash class which can specify the storage to be used.  
The storage which can be used is as follows.

### Storage type

* local - **localStorage** is used.
* session - **sessionStorage** is used.
* hash - storage which uses hash is used.


### CacheManager

Acquisition of cash and cash can be used in a simple form as follows.  


A **set** method is used for caching.  
The argument is a milli second about the key of cash, the contents to cache, and the maintenance period of cash, and it makes it into turn.

	var user = {
		name: 'foo',
		age: 28
	};
	
	var cache = new CacheManager('hash');
	
	cache.set(user.name, user, 1 * 60 * 60 * 1000);

Conversely, a **get** method is used for acquiring the cached contents.  
The get method which uses the following method for acquiring the information on cash returns a **CacheManager.CacheContent** object.  

	var cache = cache.get(user.name);

#### CacheManager.CacheContent

* getKey - The key of cash is acquired. 
* getStorage - The used storage is acquired. 
* getLimit - The term of validity of cash is acquired by a time stamp.
* getContent - The cached contents are acquired.
* isLimit - true is returned when the term of validity of cash has passed. 
* destroy - Cash is destory. 

Screenshot
--------------------------------------------

