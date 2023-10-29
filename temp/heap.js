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

// Helper function to build a max heap
async function buildMaxHeap(array) {
    const n = array.length;

    for (let i = Math.floor(n / 2); i >= 0; i--) {
        await maxHeapify(array, i, n);
    }
}

// Helper function to maintain the max heap property
async function maxHeapify(array, i, heapSize) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    if (left < heapSize && array[left] > array[largest]) {
        largest = left;
    }

    if (right < heapSize && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        await swap(array, i, largest);
        await maxHeapify(array, largest, heapSize);
    }
}

async function heapSort() {
    const array = generateArray();
    const n = array.length;

    await buildMaxHeap(array);

    for (let i = n - 1; i > 0; i--) {
        await swap(array, 0, i);
        await maxHeapify(array, 0, i);
    }
}

