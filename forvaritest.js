function box(){
    var arr = [];
    for(var i=0;i<5;i++){
        arr[i] = (function(num){                    //自我执行，并传参(将匿名函数形成一个表达式)(传递一个参数)
            return num;                            //这里的num写什么都可以                    
        })(i);                                    //这时候这个括号里面的i和上面arr[i]的值是一样的都是取自for循环里面的i                            
    }                                            
    return arr;
}
//alert(box());                                
//alert(box()[1]);
//alert(box().length);                            
for(i in box()){
		console.log(box()[i]);
}

phantom.exit();
