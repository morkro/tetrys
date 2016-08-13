(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var PACKAGE_VERSION = "1.0.0";

var cacheKey = 'TETRYS_CACHE-' + PACKAGE_VERSION;
var staticCacheItems = ['/', '/index.html', '/manifest.json', '/main.js', '/worker.js', '/main.css'];

/**
 * Adds static items to cache on installation.
 */
self.addEventListener('install', function (event) {
	event.waitUntil(caches.open(cacheKey).then(function (cache) {
		return cache.addAll(staticCacheItems);
	}).then(function () {
		return self.skipWaiting();
	}));
});

self.addEventListener('activate', function (event) {
	var cacheWhiteList = [cacheKey];
	event.waitUntil(caches.keys().then(function (keyList) {
		return Promise.all(keyList.map(function (key) {
			if (cacheWhiteList.indexOf(key) === -1) {
				return caches.delete(key);
			}
			return key;
		}));
	}));
	console.log('Activated', event);
});

/**
 * Returns the cached response.
 */
self.addEventListener('fetch', function (event) {
	event.respondWith(caches.match(event.request).then(function (res) {
		return res || fetch(event.request);
	}));
});

},{}]},{},[1]);
