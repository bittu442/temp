const arrayContainer = document.getElementById("arrayContainer");

function generateArray() {
    arrayContainer.innerHTML = "";
    const arraySizeInput = document.getElementById("arraySize");
    const arraySize = parseInt(arraySizeInput.value);
    const manualInput = document.getElementById("manualInput").value.trim();

    let array;

    if (manualInput) {
        // Use manually entered values if provided
        array = manualInput.split(',').map(num => parseInt(num));
        if (array.length !== arraySize) {
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.textContent = "Error: Manually entered array size does not match specified size.";
            return;
        }
    } else {
        // Generate a random array if no manual input
        array = generateRandomArray(arraySize);
    }

    // Clear any previous error message
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "";

    renderArray(array);
    return array;
}



function renderArray(array) {
    arrayContainer.innerHTML = ""; // Clear the previous content
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.className = "bar";
        bar.textContent = value; // Display the array value within the bar
        arrayContainer.appendChild(bar);
    });
}



async function insertionSort() {
    const array = generateArray();
    const length = array.length;

    for (let i = 1; i < length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            await swap(array, j, j + 1);
            j--;
        }

        array[j + 1] = key;
    }
}

async function swap(array, a, b) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;

    const bars = document.querySelectorAll(".bar");
    bars[a].style.height = `${array[a] * 3}px`;
    bars[b].style.height = `${array[b] * 3}px`;

    // Swap the text content as well
    const tempText = bars[a].textContent;
    bars[a].textContent = bars[b].textContent;
    bars[b].textContent = tempText;
}
