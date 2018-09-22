// console.log("start");
// setTimeout(function(){
	// console.log("delay");
// },11111);
// console.log("over");
// phantom.exit();
var system = require('system');
var page = require('webpage').create();   // 打开页面
var url='https://developer.apple.com/news/releases/';
// page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
// page.settings.userAgent='Mozilla/5.0(Macintosh;U;IntelMacOSX10_6_8;en-us)AppleWebKit/534.50(KHTML,likeGecko)Version/5.1Safari/534.50';
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20130101 Firefox/30.0';

page.onLoadFinished=function(status){
	console.log("onLoadFinished..");
};

page.onLoadStarted =function(status){
	console.log("onLoadStarted..");
};

page.open(url,function(status){
	
	if (status !== 'success') {  
        console.log('Unable to post!');  
    } else {  
		// window.setTimeout(function () {
			// page.render("test 2018-3-15.png");  //截图
			// console.log(page.content);
			// FileSave(page.content);
			
			// var theTitle=[];
			// saveToXls=saveToXls.replace(/.+?<table id="documentsTable">/g,"");
			
			// var theTitle=[];
			var theAT=page.evaluate(function(){
				return document.getElementsByClassName("article-title");
			});
			
			var theTitle=[];
			var theDate=[];
			var theText=[];
			var theContent='';
			
			for(i=0;i<theAT.length;i++){
				theTitle[i]=page.evaluate(function(ii){
					return document.getElementsByClassName("article-title")[ii].innerHTML;
				},i);
				
				theDate[i]=page.evaluate(function(ii){
					return document.getElementsByClassName("lighter  article-date")[ii].innerHTML;
				},i);
				
				theText[i]=page.evaluate(function(ii){
					return document.getElementsByClassName("article-text-wrapper")[ii].innerHTML;
				},i);
				
				// var a=theText[i].getElementsByClassName("lighter  article-date")[0].innerHTML;
				// var b=theText[i].getElementsByClassName("article-text")[0].innerHTML;
				
				theText[i]=theText[i].replace(/.+?<p class=.+?p>/g,"");
				theText[i]=theText[i].replace(/(^\s*)|(\s*$)/g, ""); 
				theText[i]=theText[i].replace(/<.+?>/g, "."); 
				theTitle[i]=theTitle[i].replace(/<.+?>/g, ""); 
				console.log((i+1)+": "+theTitle[i]);
				console.log(theDate[i]);
				console.log(theText[i]);
				
				theContent+=(i+1)+'..'+theTitle[i]+'\n';
				theContent+=theDate[i]+'\n';
				theContent+=theText[i]+'\n';
				// console.log('\n');
				// console.log(a);
				// console.log(b);
			}
			
			FileSave(theContent);
			phantom.exit();
		// }, 33333); 
    }
	// phantom.exit();
});

function FileSave(theContent){
	// var theNewContent=theContent.replace(/.+?<table id="documentsTable">/g,"");
	
	var fs = require('fs');
	var path = 'DeveloperNewsReleases.xls';
	fs.touch(path);
	fs.write(path,theContent,'w');
}

// <table id="documentsTable">