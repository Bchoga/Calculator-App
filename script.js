document.addEventListener('DOMContentLoaded', () => {

    // get calculator elements
    const screen = document.getElementById('output');
    const inputBtns = document.getElementById('inputBtns');
    const outputBtns = document.getElementById('outputBtns');
    const outputWrapper = document.getElementById('outputWrapper');
    const blinker = outputWrapper.getElementsByTagName('span')[0];
    const themeSwitch = document.getElementById('themeSwitch');

    //add eventListeners to calculator elements
    // We dont need event listener on the screen

    // lets add an array that we can push pressed values
    let inputValArray = [];
    let tempResult = 0;
    let finalResult = 0;
    let clearScreenOnNextInput = false;

    inputBtns.addEventListener('click', (event) => {

        if (!blinker.classList.contains('blinking-cursor')) {
            blinker.classList.add('blinking-cursor');
        }

        if (event.target.tagName === 'BUTTON') {
            const value = event.target.textContent;

            if (clearScreenOnNextInput) {
                screen.value = "";
                clearScreenOnNextInput = false;
            }
            if (event.target.id === 'DEL') {
                inputValArray.pop();
                screen.value = inputValArray.join('');
            }
            else {
                inputValArray.push(value);
                screen.value = inputValArray.join('');
            }
        }
    });


    outputBtns.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const value = event.target.id;
            if (value === 'RESET') {
                reset();
            }

            if (value === '=') {
                evaluate();
            }
        }
    });


    function evaluate() {
        let processedArray = processInput();
        if (!processedArray) {
            return;
        }
        const processedArraySize = processedArray.length;
        tempResult = processedArray[0];
        let index = 0;
        while (index < processedArraySize - 1) {
            let operatorList = "x/+-";
            let currentValue = processedArray[index];
            if (operatorList.includes(currentValue)) {
                //multiplication
                if (currentValue === 'x') {
                    //multiply tempResult with the next value
                    tempResult = tempResult * processedArray[index + 1];
                }
                //division
                else if (currentValue === '/') {
                    //divide tempResult with the next value
                    tempResult = tempResult / processedArray[index + 1];
                }
                //addition
                else if (currentValue === '+') {
                    //add tempResult with the next value
                    tempResult = tempResult + processedArray[index + 1];
                }
                //subtraction
                else if (currentValue === '-') {
                    //subtract next value from tempResult
                    tempResult = tempResult - processedArray[index + 1];
                }
            }
            index++;
        }

        finalResult = tempResult;
        reset();
        screen.value = finalResult;
        clearScreenOnNextInput = true;
    }

    function processInput() {
        let processedArray = [];
        const inputArraySize = inputValArray.length;
        //empty input
        if (inputArraySize === 0) {
            return false;
        }
        //invalid input
        if ("*/+-".includes(inputValArray[inputArraySize - 1])) {
            //INPUT ERROR
            reset();
            screen.value = "INPUT ERROR!";
            // remove blinking cursor
            blinker.classList.remove('blinking-cursor');
            return false;
        }
        //check if first character is a sign
        let firstNumisNegative = false;
        if ('+-'.includes(inputValArray[0])) {
            if (inputValArray[0] === '-') {
                firstNumisNegative = true;
            }
            inputValArray.shift();
        }
        //split numbers using operators
        let currentNum = [];
        for (let index = 0; index < inputArraySize; index++) {
            if ('x/+-'.includes(inputValArray[index])) {
                if (currentNum.length > 0) {
                    //push num
                    processedArray.push(parseFloat(currentNum.join('')));
                    //push operator
                    processedArray.push(inputValArray[index]);
                }
                //clear current num for next num
                currentNum.length = 0;
            }
            else {
                currentNum.push(inputValArray[index]);
            }
        }
        // push the last num
        if (currentNum.length > 0) {
            processedArray.push(parseFloat(currentNum.join('')));
        }

        if (firstNumisNegative) {
            processedArray[0] *= -1;
        }
        return processedArray;
    }

    function reset() {
        screen.value = "";
        inputValArray.length = 0;
        tempResult = 0;
        prevOperator = null;
    }

    themeSwitch.addEventListener('click', (event) => {
        const theme1Btn = document.getElementById('theme1Btn');
        const theme2Btn = document.getElementById('theme2Btn');
        const theme3Btn = document.getElementById('theme3Btn');

        if (theme1Btn.checked) {
            // apply theme 1
            document.body.classList.remove('theme1');
            document.body.classList.remove('theme2');
            document.body.classList.remove('theme3');
            document.body.classList.add('theme1');

        }
        else if (theme2Btn.checked) {
            // apply theme 2
            document.body.classList.remove('theme1');
            document.body.classList.remove('theme2');
            document.body.classList.remove('theme3');
            document.body.classList.add('theme2');
        }
        else if (theme3Btn.checked) {
            // apply theme 3
            document.body.classList.remove('theme1');
            document.body.classList.remove('theme2');
            document.body.classList.remove('theme3');
            document.body.classList.add('theme3');
        }
    })

});