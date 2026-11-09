let input= document.getElementById("inputBox");
let buttons = document.querySelectorAll("input[type='button']");

let string= "";
let arr= Array.from(buttons);
arr.forEach(button => {
    button.addEventListener("click", (e) => {
        // Change innerHTML to value here:
        if (e.target.value == "=") {
            string = eval(string);
            input.value = string;
        }    
        else if (e.target.value == "AC") {
            string = "";
            input.value = string;
        } 
        else if (e.target.value == "DE") {
            string = string.substring(0, string.length - 1);
            input.value = string;
        }
        else {
            string += e.target.value; // And here!
            input.value = string;
        }
    });
});