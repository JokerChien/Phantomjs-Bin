var page = require('webpage').create();   // 打开页面
console.log('the default user agent is:'+page.settings.userAgent);
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20130101 Firefox/30.0';
var url='https://developer.apple.com/news/';
page.open(url, function(status) {	// 输出状态
	
	console.log("Status: " + status);
	if(status !== "success") {
		//page.render('hfly.jpg');	//如果状态为success,将整个page保存为hfly.jpg（也可以是png,pdf, gif）
		console.log('Unalbe to access network');
	}else{
		var theTitle=[];
		var theTextDate=[];
		var theText=[];
		
		for(var i=0;i<10;i++){
			theTitle[i]=page.evaluate(
				function(ii){
					return document.getElementsByClassName("article-title")[ii].getElementsByTagName("h2")[0].innerHTML;
				},i
			);
			
			theTextDate[i]=page.evaluate(
				function(ii){
					return document.getElementsByClassName("article-text-wrapper")[ii].getElementsByTagName("p")[0].innerHTML;
				},i
			);
			
			theText[i]=page.evaluate(
				function(ii){
					return document.getElementsByClassName("article-text")[ii].getElementsByTagName("p")[0].innerHTML;
				},i
			);
			
			//把P模块中带A的模块用innerHtml替换掉outerhtml
			var getATag=page.evaluate(
				function(ii){
					return document.getElementsByClassName("article-text")[ii].getElementsByTagName("p")[0].getElementsByTagName("a");
				},i
			);
			
			var theHrefTextOfOuterHtml=[];
			var theHrefTextOfInnerHtml=[];
			for(var j=0;j<getATag.length;j++){
				theHrefTextOfOuterHtml[j]=page.evaluate(
					function(ii,jj){
						return document.getElementsByClassName("article-text")[ii].getElementsByTagName("p")[0].getElementsByTagName("a")[jj].outerHTML;
					},i,j
				);
				
				theHrefTextOfInnerHtml[j]=page.evaluate(
					function(ii,jj){
						return document.getElementsByClassName("article-text")[ii].getElementsByTagName("p")[0].getElementsByTagName("a")[jj].innerHTML;
					},i,j
				);
				
				theText[i]=theText[i].replace(theHrefTextOfOuterHtml[j],theHrefTextOfInnerHtml[j]);
			}
		}
		
		// console.log(theText);
		// console.log(theTitle);
		// console.log(theTextDate);
		// console.log(theText);
		//console.log(theHrefTextOfOuterHtml);
		//console.log(theHrefTextOfInnerHtml);
		// console.log(theTextDate);
		
		var theContent=url+'\n';
		for(i in theTitle){
		
			theContent+='\n'+theTitle[i]+'\n';
			theContent+=theTextDate[i]+'\n';
			theContent+=theText[i]+'\n';
		}
		// console(title.length);
		
		console.log(theContent);
	}
	
	// var fs = require('fs');
	// var path = 'category-list-item-elements.xls';
	// fs.touch(path);
	// fs.write(path,theContent,'w')
	
	phantom.exit();
});	

