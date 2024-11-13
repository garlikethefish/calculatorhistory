let currentInput = '';
let history = JSON.parse(localStorage.getItem('history')) || []; // localStorage stores history data as array in browser, or if no data to store then history just as empty array

function appendToDisplay(value) {
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    document.getElementById('display').value = '';
}

function calculate() {
    try {
        const result = eval(currentInput); // eval executes variable in paranthesis as code, so in this case evaluates math
        if (result !== undefined) { //if result exists
            addToHistory(`${currentInput} = ${result}`);
            currentInput = result.toString();
            document.getElementById('display').value = result;
        }
    } catch (e) { //error handling
        document.getElementById('display').value = 'Error';
    }
}

function addToHistory(entry) {
    history.push(entry); // push adds entry to the end of the array: history
    localStorage.setItem('history', JSON.stringify(history)); //stringify converts array to string so that can be stored in localhistory: only accepts string values
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';

    history.forEach((entry, index) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        
        historyItem.innerHTML = `
            <span>${entry}</span>
            <button onclick="deleteHistoryItem(${index})">Dzēst</button>
        `;
        historyContainer.appendChild(historyItem);
    });
}

function deleteHistoryItem(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistoryDisplay();
}

function clearHistory() {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    updateHistoryDisplay();
}

// initial load of history
updateHistoryDisplay();