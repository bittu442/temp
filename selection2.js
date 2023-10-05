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
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.className = "bar";
        arrayContainer.appendChild(bar);
    });
}

async function selectionSort() {
    const array = generateArray();

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        await swap(array, i, minIndex);
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
}
