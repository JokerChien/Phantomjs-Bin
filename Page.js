var page = require('webpage').create();   // 打开页面
console.log('the default user agent is:'+page.settings.userAgent);
page.settings.userAgent='Mozilla/5.0 (Windows NT 6.1; WOW64; rv:30.0) Gecko/20130101 Firefox/30.0';
var url='https://developer.apple.com/documentation?changes=latest_major';
page.open(url, function(status) {
	// 输出状态
	console.log("Status: " + status);
	if(status !== "success") {
    //如果状态为success,将整个page保存为hfly.jpg（也可以是png,pdf, gif）
    //page.render('hfly.jpg');
	console.log('Unalbe to access network');
	
	}else{
		//page.render('hfly.jpg');
		//这里要设成全局参数，因为要传递到函数里面去。

		// var ua=page.evaluate(function(){
			// return document.getElementsByClassName("category-list-item-elements changed changed-modified");
		// });
		// console.log("Modifier:"+ua.length);
		
		// var sss=[];	
		// for(var i=0;i<ua.length;i++){
			// sss[i]=page.evaluate(
				// function(ii){
					// return document.getElementsByClassName("category-list-item-elements changed changed-modified")[ii].getElementsByTagName("a")[0].innerHTML;
				// },i
			// );
		// }
		// console.log(sss);
		
		
		//modified added deprecated
		var ua=page.evaluate(function(){
			return document.getElementsByClassName("category-list-item-elements");
		});
		console.log(ua.length);
		
		var temp;
		var sss=[];
		var mod=[];
		var add=[];
		var dep=[];
		var com=[];
		for(var i=0;i<ua.length;i++){
			sss[i]=page.evaluate(
				function(ii){
					return document.getElementsByClassName("category-list-item-elements")[ii].outerHTML;
				},i
			);
			
			if(sss[i].indexOf("changed-modified")>-1){
				temp=page.evaluate(
					function(ii){
						return document.getElementsByClassName("category-list-item-elements")[ii].getElementsByTagName("a")[0].innerHTML;
					},i
				);
				mod.push(temp);
			}else if(sss[i].indexOf("changed-added")>-1){
				temp=page.evaluate(
					function(ii){
						return document.getElementsByClassName("category-list-item-elements")[ii].getElementsByTagName("a")[0].innerHTML;
					},i
				);
				add.push(temp);
			}else if(sss[i].indexOf("changed-deprecated")>-1){
				temp=page.evaluate(
					function(ii){
						return document.getElementsByClassName("category-list-item-elements")[ii].getElementsByTagName("a")[0].innerHTML;
					},i
				);
				dep.push(temp);
			}else{
				temp=page.evaluate(
					function(ii){
						return document.getElementsByClassName("category-list-item-elements")[ii].getElementsByTagName("a")[0].innerHTML;
					},i
				);
				com.push(temp);
			}
		}
		
		var theContent=url+"\n";
		theContent+="Modified:\t"+mod.length+"\n"+mod+"\n";
		theContent+="Added:\t"+add.length+"\n"+add+"\n";
		theContent+="Deprecated:\t"+dep.length+"\n"+dep+"\n";
		theContent+="Commen:\t"+com.length+"\n"+com+"\n";
		
		theContent=theContent.replace(/,/g,'\t');
		
		console.log(theContent);
		
		// console.log("Modified: "+mod.length);
		// console.log(mod);
		// console.log("Added: "+add.length);
		// console.log(add);
		// console.log("Deprecated: "+dep.length);
		// console.log(dep);
		// console.log("Commen: "+com.length);
		// console.log(com);
		
		// GetTheChangeList(page,"category-list-item-elements");
		// GetTheChangeList("category-list-item-elements changed changed-modified");
	}
	
	var fs = require('fs');
	var path = 'category-list-item-elements.xls';
	fs.touch(path);
	fs.write(path,theContent,'w')
	
	phantom.exit();
});	



function GetTheChangeList(page,theClassName){
	// console.log(theClassName);
	// page=page;
	var ua=page.evaluate(function(){
		return document.getElementsByClassName(theClassName);
	});
	
	
	
	// var sss=[];	
	// for(var i=0;i<ua.length;i++){
		// sss[i]=page.evaluate(
			// function(ii){
				// return document.getElementsByClassName(theClassName)[ii].getElementsByTagName("a")[0].innerHTML;
			// },i
		// );
	// }
	// console.log(sss);
	
}