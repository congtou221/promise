function Promise(fn){
	var doList = [], failList = [], state = 'pending';

	var resolve = function(newValue){
		var state = 'fulfilled';
		setTimeout(function(){
			var value = newValue;

			for(var i = 0 ; i < doList.length ; i++){
				var temp = doList[i](value);
				if(temp instanceof Promise){
					var newP = temp;
					for(i++ ; i < doList.length ; i++){
						newP.then(doList[i] , failList[i]);
					}
					
				}else{
					value = temp;
				}
			}

		}, 0);
	}
	var reject = function(newValue){
		var state = 'rejected';

		setTimeOut(function(){
			var value = newValue;

			var tempRe = failList[0](value);
			if(tempRe instanceof Promise){
				var newP = tempRe;
				for(var i = 1; i < failList.length ; i++){
					newP.then(doList[i],failList[i]);
				}
			}else{
				value = tempRe;
				failList.shift();
				doList.shift();
				resolve(value);
			}
			
		}, 0);
	}
	this.then = function(done, fail){
		switch (state){
			case "pending":
				doList.push(done || null);
				failList.push(fail || null);
				return this;
				break;
			case "fullfilled":
				done();
				return this;
				break;
			case "rejected":
				fail();
				return this;
				break;
		}

	}

	fn(resolve, reject);
}