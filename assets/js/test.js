let test = {};
let testResults = {};
const numberOfTests = 10;

$(function() {
	$('.check-btn').on('click', function() {
		const $form = $('.form');
		const $answer = $form.find('.answer');
		const answer = $answer.val().trim();
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
		getNewTest();
	});
	
	setInterval(function() {
		updateTime();
	}, 5000);
	
	getNewTest();
	updateTime();
});

function checkAnswers() {
	const $messageContainer = $('.message-container');
	const $resultsList = $messageContainer.find('.results-list tbody');
	$resultsList.html('');
	const $grade = $('.test-grade');
	$grade.html('');
	$messageContainer.removeClass('hidden');
	$('.time').removeClass('hidden');
	$('.form').addClass('hidden');
	let rowStr;
	let correctAnswers = 0;
	for (let i = 1; i <= (numberOfTests + 1); i++) {
		if (i > numberOfTests) {
			if (correctAnswers === numberOfTests) {
				$grade.html('Bravo! Svi odgovori su bili tačni!');
			} else {
				$grade.html(`${correctAnswers} tačnih od ukupno ${numberOfTests} ${numberDeclension(numberOfTests, 'zadatka', 'zadatka', 'zadataka')}. Sledeći put će biti bolje!`);
			}
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
	$('.message-container, .time').addClass('hidden');
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
	for (let i = 1; i <= (numberOfTests + 1); i++) {
		if (i > numberOfTests) {
			$('.answer').focus();
			getNextTest();
		} else {
			test[i] = getTestItem();
		}
	}
}

function getTestItem() {
	const type = parseInt($('.type').val());
	const max2 = type > 10 ? type : 10;
	const number1 = Math.floor(Math.random() * (type + 1));
	const number2 = Math.floor(Math.random() * (max2 + 1));
	return {
		'number1': number1,
		'number2': number2,
		'answer': number1 * number2,
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
	$('.time').html(getTimeRs(false, true));
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
