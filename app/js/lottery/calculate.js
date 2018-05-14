class Calculate{
	// 计算注数
	computeCount(active, play_name) {
		let count = 0;
		// play_list map类型
		const exist = this.play_list.has(playname);
		// 生成一个长度为active的数组 并填充
		const arr = new Array(active).fill('0');
		if(exist && play_name.at(0) === 'r') {
			// combine 是一个静态方法
			count = Calculate.combine(arr, play_name.split('')[1])
		}
		return count;
	}

	// 组合运算
	static combine(arr, size) {
		let allResult = [];
		(function f(arr, size, result) {
			let arrLen = arr.length;
			if(size > arrLen) {
				return;
			}
			if(size === arrLen) {
				allResult.push([].concat(result,arr));
			} else {
				for(let i=0;i<arrLen;i++) {
					let newResult = [].concat(result);
					newResult.push(arr[i]);
					if(size === 1) {
						arrResult.push(newResult);
					} else {
						let newArr = [].concat(arr);
						newArr.splice(0, i+1);
						f(newArr, size-1, newResult);
					}
				}
			}
		})(arr, size, [])
	}
}