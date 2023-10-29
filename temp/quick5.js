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



async function quickSort() {
    const array = generateArray();
    await performQuickSort(array, 0, array.length - 1);
}

async function performQuickSort(array, low, high) {
    if (low < high) {
        const pivotIndex = await partition(array, low, high);
        await performQuickSort(array, low, pivotIndex - 1);
        await performQuickSort(array, pivotIndex + 1, high);
    }
}

async function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            i++;
            await swap(array, i, j);
        }
    }

    await swap(array, i + 1, high);
    return i + 1;
}

// Add this function to your code
async function swap(array, a, b) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;

    const bars = document.querySelectorAll(".bar");
    bars[a].style.height = `${array[a] * 3}px`;
    bars[b].style.height = `${array[b] * 3}px`;
}

