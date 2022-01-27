# Matematika
Series of automatically generated tests in calculus

![GitHub](https://img.shields.io/github/license/DavidSili/matematika)

## Description
This is a simple app intended to help elementary school students learn basic calculus. IMHO one of the best ways to learn something (after the basics are grasped) is through testing. To me as a parent it solved a big chore of continually making and checking tests for my kids. The app is designed primarily to be used on the handheld devices.

## Features:
- The app so far has 4 basic calculus operations: addition, subtraction, multiplication and division (all of which are only positive, whole numbers).
- Each test is constructed out of 10 questions.
- After the test is finished, a review of correct and wrong answers is shown
- The student may choose both different operations, and different types of tests (i.e. only numbers up to 5)
- At any time the student may choose to view the daily report of all the tests that (s)he has taken during the day. This feature serves the purpose both por personal information, and also may be used by the parent/teacher if they require it as an assignment (by sending them screenshots).

## The development process
The project is the epitome of the MVP principle. It started as simple .html and .js files intended to provide my daughter with multiplication of numbers up to 5.

As time passed and other parents gave me feedback, I've added other operations. Since my daughter was sending 10 screenshots (and thus spamming my Viber) I've implemented the daily review page. I have decided to use local storage to keep the track of the tests' results (since I did not want to keep anything on the backend).

I have also noticed that only using random numbers would make tests very easy (i.e. in multiplications test sometimes there would be even 8 questions with 0 as the answer), so I've added some more restrictions on which questions would be valid.

Version 1.0 was written in PHP with the brains of the app in javascript. The project is currently being rewritten in React.js 

## Planned updates
- internationalization (at the moment it is available only in Serbian)
- Add fractions with same 4 operations
- Improve handheld experience (regarding the use of side menu)

## [DEMO](http://davidsili.com/matematika/)

## How to install
Installation instructions in React.js pending.

## How to use
1. After landing on the starting page (url should point to the folder where it is deployed) chose which operation you would like to be tested on.
2. You may immediately start working on a test, or you may change the type of the test ("Vrsta testa") in which case the test will restart with the new settings.
3. For each question you need to input the answer in the available field right from "=" and press the next button ("Sledeći", or hit the enter key/button).
4. After you've repeated this step 10 times, you will be given a report of this test.
5. You may try again ("Ponovi test"), or view the daily report ("Pregled testova")
6. (On handheld devices) At any time you may open the side menu by swiping right, or by clicking on the horizontal bars button in the top left corner of the page.

## How to contribute to the project
If you would like to contribute, you are more than welcome. After the internationalization is implemented this would be one of the best ways to help. Also, if you implement some other operations, it would also be helpful.
