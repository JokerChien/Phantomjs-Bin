// console.log("start");
// setTimeout(function(){
	// console.log("delay");
// },11111);
// console.log("over");
// phantom.exit();
var system = require('system');
var page = require('webpage').create();   // 打开页面
// var url='https://developer.apple.com/library/content/navigation/';
var url='http://www.sge.com.cn/xwzx/NewsCenter_sge';
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
console.log(page.settings.userAgent);

page.onLoadFinished=function(status){
	console.log("onLoadFinished");
};

page.onLoadStarted =function(status){
	console.log("onLoadStarted");
};

page.open(url,function(status){
	if (status !== 'success') {  
        console.log('Unable to post!');  
    } else {  
		window.setTimeout(function () {
			// page.render("system-status.png");  //截图
			// console.log(page.content);
			// var saveToXls=page.content;
			// saveToXls=saveToXls.replace(/.+?<table id="documentsTable">/g,"");
			// var outPut=page.evaluate(
				// function(){
					// return document.getElementById("lights-button-available").outerHTML;
				// }
			// )
			
			console.log(page.content);
			// document.getElementById("lights-button-available").onclick;
			
			// page.includeJs("http://code.jquery.com/jquery-2.2.4.min.js",function(){
			//	// evaluate执行JS
				// page.evaluate(function(){
					// $("button").click();
				// })
			// }
			console.log("Finish..");
			phantom.exit();
		}, 5000); 
    }
	// phantom.exit();
});



function FileSave(theContent){
	// var theNewContent=theContent.replace(/.+?<table id="documentsTable">/g,"");
	
	var fs = require('fs');
	var path = 'system-status.txt';
	fs.touch(path);
	fs.write(path,theContent,'w');
}

// <table id="documentsTable">