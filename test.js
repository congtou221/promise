文／潘逸飞（简书作者）
原文链接：http://www.jianshu.com/p/473cd754311f
著作权归作者所有，转载请联系作者获得授权，并标注“简书作者”。

var p = new Promise(function(resolve){
    setTimeout(resolve, 100);
});
p.then(function(){console.log('success')},function(){console.log('fail')});