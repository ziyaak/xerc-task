document.addEventListener('DOMContentLoaded', function() {
    let operationNameInp = document.getElementById("operationName")
    let operationAmountInp = document.getElementById("operationAmount")
    let operationSaveBtn = document.querySelector(".save-btn")
    let operationList = document.getElementById("operationList")
    let profitBox = document.getElementById("profitValue")
    let lossBox = document.getElementById("lossValue")
    let balanceBox = document.getElementById("balanceValue")
    let totalAmount = 0
    let profitAmount = 0;
    let lossAmount = 0;

    function handleOperation() {
        let userOperationNameText = operationNameInp.value;
        let userOperationAmount = operationAmountInp.value;
        let operationClassName = userOperationAmount < 0 ? "loss-box" : "profit-box";

        if(userOperationAmount < 0) {
            lossAmount += Math.abs(parseFloat(userOperationAmount))
            lossBox.textContent = `$${lossAmount.toFixed(2)}`
        }else {
            profitAmount += parseFloat(userOperationAmount);
            profitBox.textContent = `$${profitAmount.toFixed(2)}`
        }

        totalAmount = profitAmount - lossAmount

        balanceBox.textContent = `$${totalAmount.toFixed(2)}`

        operationList.innerHTML += `
            <li class="operation-item ${operationClassName}">
                <button class="remove-btn" onclick="removeOperation(this)">X</button>
                <span>${userOperationNameText}</span>
                <span>${userOperationAmount}$</span>
            </li>
        `
        operationNameInp.value = "";
        operationAmountInp.value = "";
    }

    function removeOperation(button) {
        let listItem = button.parentNode;
        let amount = parseFloat(listItem.children[2].textContent);
        if (amount < 0) {
            lossAmount -= Math.abs(amount);
            lossBox.textContent = `$${lossAmount.toFixed(2)}`
        } else {
            profitAmount -= amount;
            profitBox.textContent = `$${profitAmount.toFixed(2)}`
        }
        totalAmount = profitAmount - lossAmount;
        balanceBox.textContent = `$${totalAmount.toFixed(2)}`
        listItem.parentNode.removeChild(listItem);
    }

    operationSaveBtn.addEventListener("click", handleOperation)
});
