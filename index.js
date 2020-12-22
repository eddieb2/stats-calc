const sortnums = (arr) => {
	let nums = arr;

	nums.sort((a, b) => {
		return a - b;
	});

	return nums;
};

const findMode = (nums) => {
	let occurence;
	let mode = null;
	let hash = {};

	// Adds all numbers and occurence to the hash
	for (let i = 0; i < nums.length; i++) {
		if (!(nums[i] in hash)) {
			hash[nums[i]] = 1;
			continue;
		}

		if (nums[i] in hash) {
			hash[nums[i]] += 1;
		}
	}

	// Calculate mode
	let initialOccurence = hash[nums[0]];
	let loopCount = 0;

	for (let i in hash) {
		if (loopCount == 0) {
			occurence = hash[i];
			mode = parseInt(i);
			loopCount++;
			continue;
		}

		if (hash[i] > occurence) {
			occurence = hash[i];
			mode = parseInt(i);
		}

		loopCount += 1;
	}

	loopCount = 0;

	// Checks all numbers for identical occurences -> no mode.
	for (let i in hash) {
		if (hash[i] != initialOccurence) {
			break;
		}

		loopCount++;

		if (loopCount == nums.length) {
			mode = null;
		}
	}

	if (mode == null) {
		mode = 'There is no mode.';
	}

	return {
		Occurrences: occurence,
		Mode: mode,
	};
};

const findMean = (nums) => {
	let sum = 0;
	let mean;

	nums.forEach((num) => {
		sum += num;
	});

	mean = sum / nums.length;

	return mean;
};

const findMedian = (nums) => {
	let median;

	// odd
	if (nums.length % 2 !== 0) {
		median = nums[Math.ceil(nums.length / 2) - 1];
	}

	// even
	if (nums.length % 2 === 0) {
		let midPoint = nums.length / 2 - 1;
		median = (nums[midPoint] + nums[midPoint + 1]) / 2;
	}

	return median;
};

const findMinMax = (nums) => {
	let min = nums[0];
	let max = nums[nums.length - 1];

	return {
		min,
		max,
	};
};

const findRange = (nums) => {
	const minMax = findMinMax(nums);
	const range = minMax.max - minMax.min;

	return range;
};

const findQuartiles = (nums) => {
	let q1, q2, q3;

	// odd
	if (nums.length % 2 !== 0) {
		let midPoint = Math.floor(nums.length / 2);

		q1 = findMedian(nums.slice(0, midPoint));
		q2 = findMedian(nums);
		q3 = findMedian(nums.slice(midPoint + 1));
	}

	// even
	if (nums.length % 2 === 0) {
		let midPoint = nums.length / 2;

		q1 = findMedian(nums.slice(0, midPoint));
		q2 = findMedian(nums);
		q3 = findMedian(nums.slice(midPoint));
	}

	return {
		q1,
		q2,
		q3,
	};
};

const findIQR = (nums) => {
	const quartiles = findQuartiles(nums);
	let IQR = (quartiles.q3 = quartiles.q1);

	return IQR;
};

const findOutliers = () => {
	return null;
};

let sorted = sortnums([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(findMode(sorted));
console.log(findMean(sorted));
console.log(findMedian(sorted));
console.log(findMinMax(sorted));
console.log(findRange(sorted));
console.log(findQuartiles(sorted));
console.log(findIQR(sorted));
