const prompt = require('prompt-sync')();
const ROW = 3;
const COL = 3;

const symbolsCount = {
    'A': 2,
    'B': 4,
    'C': 6,
    'D': 8
}

const symbolsValue = {
    'A': 5,
    'B': 4,
    'C': 3,
    'D': 2
}


const deposit = ()=>{
   while(true){ 
    const amount = prompt('Enter the amount to deposit: ');
    const amountNum = parseFloat(amount);

        if(isNaN(amountNum) || amountNum <= 0){
        console.log('Invalid deposit amount. Please try again.');
        }else{
        return amountNum;
        }
    }
}

const getNumberOfLines = () => {

    while(true){
    const lines = prompt('Enter the number of lines to bet on (1-3): ');
    const NumberOfLines = parseInt(lines);
    if(isNaN(NumberOfLines) || NumberOfLines < 1 || NumberOfLines > 3){
        console.log('Invalid number of lines. Please enter a number between 1 and 3.');
    }else{
        return NumberOfLines;
    }
    }
}

const getBetAmount = (balance, numberOfLines) => {
    while(true){
        const bet = prompt('Enter the bet amount per line: ');
        const betAmount = parseFloat(bet);
        if(isNaN(betAmount) || betAmount <= 0 || betAmount > balance/numberOfLines){
            console.log(`Invalid bet amount. Try again.`);
        }else{
            return betAmount;
        }
    }
}

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(symbolsCount)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

        const reels = [[],[],[]];
        for(let i = 0; i < COL; i++){
            const reelSymbols = [...symbols];
            for(let j = 0; j < ROW; j++){
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
            }
        }
        return reels;
    }

const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROW; i++){
        const row = [];
        for(let j = 0; j < COL; j++){
            row.push(reels[j][i]);
        }
        rows.push(row);
    }
    return rows;
}

const printRows = (rows) => {
for(const row of rows){
    let rowString = "";
    for(const [i, symbol] of row.entries()){
        rowString += symbol;
        if(i != row.length - 1){
            rowString += ' | '; 
        }
    }
    console.log(rowString);
}
}

const getWinnings = (rows, betAmount, numberOfLines) => {
    let winnings = 0;
    for(let row = 0; row < numberOfLines; row++){
        const symbols = rows[row]; 
        let allSame = true;
        for(const symbol of symbols){
            if(symbol !== symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += betAmount * symbolsValue[symbols[0]];
        }
    }
    return winnings;
}
    
const game = () => {
let balance = deposit();

while(true){
console.log("You currently have a balance of R" + balance.toString());
const numberOfLines = getNumberOfLines();
const betAmount = getBetAmount(balance, numberOfLines);
balance -= betAmount * numberOfLines;
const reels = spin();
const rows = transpose(reels);
printRows(rows);   
const winnings = getWinnings(rows, betAmount, numberOfLines);
balance += winnings;
console.log("You won, R"+ winnings.toString());

if(balance <= 0){
    console.log("You have no money left.");
    break;
}
const playAgain = prompt('Do you want to play again? (y/n): ');
if(playAgain.toLowerCase() != 'y')break;
}
}

game();