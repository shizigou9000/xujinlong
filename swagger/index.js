'use strict';

var app=require('../../app');
var fs=require('fs');
var express=require('express');
var proxy = require('express-http-proxy');
var url = require('url');
//console.log(location.hash);
app.all('*', function(req,res,next){
	console.log(req.url);
	//console.log(__dirname+'\\test\\index.txt');
	//fs.writeFileSync(__dirname+'\\test\\index.txt','xjl');
	var vmurl=req.url;
	//proxy.web(req,res);
	app.use(req.url,proxy('http://localhost:10030',{
		parseReqBody: false,
		forwardPath: function(preq, pres) {
			return vmurl;
		},
		intercept: function(rsp, data, req, res, callback) {
			data = data.toString('utf8');
			if(data!==''){
				fs.writeFileSync(__dirname+'\\test\\index.css',data);
			}
			callback(null, data);
		}
	}));
	next();
	//console.log(req.hash);
	//console.log(url.parse(req.url));
	//app.use(express.static('public'));
	//app.use(express.static('D:/mypro/common_web/dist'));
	
})