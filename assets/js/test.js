let test = {};
let testResults = {};
const numberOfTests = 10;

$(function() {
	$('.check-btn').on('click', function() {
		const $form = $('.form');
		const $answer = $form.find('.answer');
		let answer = $answer.val();
		answer = answer.replace(/[^0-9]/, '');
		$answer.removeClass('error');
		if (answer === '') {
			$answer.addClass('error');
			return false;
		}
		const testId = $form.data('test-id');
		testResults[testId] = parseInt(answer);
		if (testId === numberOfTests) {
			checkAnswers();
		} else {
			$form.data('test-id', testId + 1);
			getNextTest();
		}
	});
	
	$('.answer').on('keyup', function(e) {
		if (e.keyCode === 13) {
			$('.check-btn').click();
		}
	});
	
	$('.new-test-btn').on('click', function() {
		getNewTest();
	});
	
	$('.type').on('change', function() {
		window.localStorage.setItem(`prefType_${operation}`, parseInt($(this).val()));
		getNewTest();
	});
	
	$('.menu-btn').on('click', function() {
		if ($(this).is('.toggled')) {
			$(this).removeClass('toggled');
			$('.wrapper').scrollLeft(1000);
		} else {
			$(this).addClass('toggled');
			$('.wrapper').scrollLeft(-1000);
		}
	});
	
	$('.tests-report-btn').on('click', function() {
		if ($(this).closest('.menu').length > 0) {
			$('.wrapper').scrollLeft(1000);
		}
		$('.message-container, .form').addClass('hidden');
		const $reportContainer = $('.report-container');
		$reportContainer.find('.date-span').html(getTimeRs(false));
		$reportContainer.removeClass('hidden');
		const $tbody = $('.report-table tbody');
		$tbody.html('');
		const localStorage = window.localStorage;
		const savedReportData = localStorage.getItem('testsReportData');
		const testsReportData = JSON.parse(savedReportData);
		let sortedData = testsReportData[operation].map(a => Object.assign({}, a));
		sortedData.sort(
			function(a, b) {
				if (a.percentage === b.percentage) {
					if (a.type === b.type) {
						return b.unix - a.unix;
					}
					return b.type - a.type;
				}
				return a.percentage > b.percentage ? -1 : 1;
			});
		let row;
		for (let i = 0; i < sortedData.length; i++) {
			row = sortedData[i];
			$tbody.append(`<tr><td>${row.correctAnswers}</td><td>${row.numberOfTests}</td><td>Do ${row.type}</td><td>${row.timestamp}</td></tr>`);
		}
	});
	
	checkTestsReportData();
	loadPrefType();
});

function loadPrefType() {
	const localStorage = window.localStorage;
	const prefType = localStorage.getItem(`prefType_${operation}`);
	if (prefType) {
		$('.type').val(prefType);
	}
	getNewTest();
}

function checkTestsReportData() {
	const localStorage = window.localStorage;
	const savedDate = localStorage.getItem('testDate');
	const currentDate = getDateStamp();
	if (savedDate !== currentDate) {
		localStorage.setItem('testDate', currentDate);
		const testsReportData = {};
		testsReportData[operation] = [];
		localStorage.setItem('testsReportData', JSON.stringify(testsReportData));
	} else {
		const savedReportData = localStorage.getItem('testsReportData');
		const objReportData = JSON.parse(savedReportData);
		
		if (!objReportData.hasOwnProperty(operation)) {
			objReportData[operation] = [];
			localStorage.setItem('testsReportData', JSON.stringify(objReportData));
		}
	}
}

function checkAnswers() {
	const $messageContainer = $('.message-container');
	const $resultsList = $messageContainer.find('.results-list tbody');
	$resultsList.html('');
	const $grade = $('.test-grade');
	$grade.html('');
	$messageContainer.removeClass('hidden');
	updateTime();
	$('.form, .report-container').addClass('hidden');
	let rowStr;
	let correctAnswers = 0;
	const type = parseInt($('.type').val());
	for (let i = 1; i <= (numberOfTests + 1); i++) {
		if (i > numberOfTests) {
			if (correctAnswers === numberOfTests) {
				$grade.html('Bravo! Svi odgovori su ti tačni!');
			} else {
				$grade.html(`${correctAnswers} ${numberDeclension(correctAnswers, 'tačan', 'tačna', 'tačnih')} od ukupno ${numberOfTests} ${numberDeclension(numberOfTests, 'zadatka', 'zadatka', 'zadataka')}. Sledeći put će biti bolje!`);
			}
			const localStorage = window.localStorage;
			const savedReportData = localStorage.getItem('testsReportData');
			const testsReportData = JSON.parse(savedReportData);
			testsReportData[operation].push({
				correctAnswers: correctAnswers,
				numberOfTests: numberOfTests,
				percentage: correctAnswers === 0 ? 0 :
					Math.round((correctAnswers / numberOfTests) * 100) / 100,
				timestamp: getTimeRs(false),
				unix: getUnixTimestamp(),
				type: type,
			});
			localStorage.setItem('testsReportData', JSON.stringify(testsReportData));
		} else {
			if (test[i].answer === testResults[i]) {
				rowStr = `<tr><td>${test[i].number1}</td><td>${operand}</td><td>${test[i].number2}</td><td>=</td><td class="correct">${testResults[i]}</td></tr>`;
				correctAnswers++;
			} else {
				rowStr = `<tr><td>${test[i].number1}</td><td>${operand}</td><td>${test[i].number2}</td><td>=</td><td><span class="incorrect">${testResults[i]}</span> <span class="right">${test[i].answer}</span></td></tr>`
			}
			$resultsList.append(rowStr);
		}
	}
}

function getNextTest() {
	const $form = $('.form');
	$form.removeClass('hidden');
	$('.message-container, .report-container').addClass('hidden');
	const testId = $form.data('test-id');
	const $task = $form.find('.task');
	const $answer = $form.find('.answer');
	$task.find('.number-1').html(test[testId].number1);
	$task.find('.number-2').html(test[testId].number2);
	$answer.val('');
	updateProgressIndicator();
	$answer.focus();
}

function getNewTest() {
	$('.form').data('test-id', 1);
	test = {};
	let hasZero = false;
	let newTestItem;
	for (let i = 1; i <= (numberOfTests + 1); i++) {
		if (i > numberOfTests) {
			$('.answer').focus();
			getNextTest();
		} else {
			newTestItem = getTestItem();
			if (inArrayObj(test, newTestItem)) {
				i--;
				continue;
			}
			if (operation === 'multiplication' && newTestItem.answer === 0) {
				if (!hasZero) {
					hasZero = true;
					test[i] = newTestItem;
				} else {
					i--;
				}
			} else {
				test[i] = newTestItem;
			}
		}
	}
}

function inArrayObj(collection, object) {
	const keys = Object.keys(collection);
	let row;
	for (let i = 0; i < keys.length; i++) {
		row = collection[parseInt(keys[i])];
		if (row.number1 === object.number1 && row.number2 === object.number2) {
			return true;
		}
	}
	
	return false;
}

function getTestItem() {
	const type = parseInt($('.type').val());
	let number1, number2, max, max2, product;
	let foundAnswer = false;
	switch (operation) {
		case 'addition':
			max = Math.floor(Math.random() * (type - 1)) + 2;
			number1 = Math.floor(Math.random() * (max - 1)) + 1;
			number2 = max - number1;
			return {
				'number1': number1,
				'number2': number2,
				'answer': max,
			}
		case 'subtraction':
			number1 = Math.floor(Math.random() * (type - 1)) + 2;
			number2 = Math.floor(Math.random() * (number1 - 1)) + 1;
			return {
				'number1': number1,
				'number2': number2,
				'answer': number1 - number2,
			}
		case 'multiplication':
			while (foundAnswer === false) {
				max2 = type > 10 ? type : 10;
				number1 = Math.floor(Math.random() * (type + 1));
				number2 = Math.floor(Math.random() * (max2 + 1));
				if (!(number1 === 0 && number2 === 0)) {
					foundAnswer = true;
				}
			}
			return {
				'number1': number1,
				'number2': number2,
				'answer': number1 * number2,
			}
		case 'division':
			while (foundAnswer === false) {
				number1 = Math.floor(Math.random() * type) + 1;
				number2 = Math.floor(Math.random() * type) + 1;
				product = number1 * number2;
				if (product <= type && !(type > 10 && (number1 === 1 || number2 === 1 || product === 1))) {
					foundAnswer = true;
				}
			}
			return {
				'number1': product,
				'number2': number1,
				'answer': number2,
			}
	}
}

/**
 * Returns the correct declension of a noun that is being counted. It is applicable to Serbian grammar.
 *
 * @param number
 * @param one       Numbers finishing with digit 1
 * @param two       Numbers finishing with digits 2-4
 * @param rest      All the rest variants
 * @returns {string}
 */
function numberDeclension(number, one, two, rest) {
	const numberText = number.toString();
	const numberTextLength = numberText.length;
	const ones = numberText.substring(numberTextLength - 1);
	const tens = numberText.substring(numberTextLength - 2, 1);
	if (ones === '1' && !(tens === '1' && numberTextLength > 1)) {
		return one;
	} else if (['2', '3', '4'].indexOf(ones) !== -1 && tens !== '1') {
		return two;
	} else {
		return rest;
	}
}

function updateProgressIndicator() {
	const testId = $('.form').data('test-id');
	$('.progress-indicator').html(`${testId}/${numberOfTests}`);
}

function updateTime() {
	$('.time').html(getTimeRs(false));
}

function getDateStamp() {
	const d = new Date();
	let day = d.getDate().toString();
	day = day.length === 1 ? '0' + day : day;
	let month = (d.getMonth() + 1).toString();
	month = month.length === 1 ? '0' + month : month;
	const year = d.getFullYear();
	
	return `${year}-${month}-${day}`
}

function getTimeRs(seconds = true, split = false) {
	const d = new Date();
	const hr = d.getHours();
	let min = d.getMinutes();
	if (min < 10) {
		min = '0' + min;
	}
	let sec = d.getSeconds();
	if (sec < 10) {
		sec = '0' + sec;
	}
	sec = seconds ? `:${sec}` : ''
	
	const day = d.getDate();
	const month = d.getMonth() + 1;
	const year = d.getFullYear();
	
	const splitStr = split ? '<br>' : ' ';
	
	return `${day}.${month}.${year}.${splitStr}${hr}:${min}${sec}`;
}

function getUnixTimestamp() {
	const d = new Date;
	
	return d.getTime();
}
