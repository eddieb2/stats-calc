const sortNums = (arr) => {
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
	let mean;

	const sum = findSum(nums);

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
	const { q1, q3 } = findQuartiles(nums);
	let IQR = q3 - q1;

	return IQR;
};

const findOutliers = (nums) => {
	const IQR = findIQR(nums);
	const { q1, q3 } = findQuartiles(nums);
	let outliers = [];
	let rule = 1.5 * IQR;

	nums.forEach((n) => {
		if (n < q1 - rule) {
			outliers.push(n);
		} else if (n > q3 + rule) {
			outliers.push(n);
		}
	});

	return outliers;
};

const findSum = (nums) => {
	let sum = 0;

	nums.forEach((n) => {
		sum += n;
	});

	return sum;
};

const calculator = (numsArray) => {
	// Sort
	const sortedNums = sortNums(numsArray);
	// Sum
	const sum = findSum(sortedNums);
	// Mode
	const mode = findMode(sortedNums);
	// Mean
	const mean = findMean(sortedNums);
	// Median
	const median = findMedian(sortedNums);
	// Min & Max
	const { min, max } = findMinMax(sortedNums);
	// Range
	const range = findRange(sortedNums);
	// Quartiles
	const quartiles = findQuartiles(sortedNums);
	// IQR
	const IQR = findIQR(sortedNums);
	// Outliers
	let outliers = findOutliers(sortedNums);
	outliers = outliers.length === 0 ? 'No outliers' : outliers;

	return {
		mode,
		mean,
		median,
		min,
		max,
		sum,
		range,
		quartiles,
		IQR,
		outliers,
		'Five-number Summary': { min, quartiles, max },
	};
};

console.log(
	calculator([
		1,
		1,
		7,
		8,
		17,
		18,
		21,
		27,
		42,
		45,
		45,
		46,
		46,
		54,
		57,
		78,
	])
);
