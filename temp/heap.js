
const arrayContainer = document.getElementById("arrayContainer");

function generateArray() {
    arrayContainer.innerHTML = "";
    const arraySizeInput = document.getElementById("arraySize");
    const arraySize = parseInt(arraySizeInput.value);
    const manualInput = document.getElementById("manualInput").value.trim();

    let array;

    if (manualInput) {
        array = manualInput.split(',').map(num => parseInt(num));
        if (array.length !== arraySize) {
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.textContent = "Error: Manually entered array size does not match specified size.";
            return;
        }
    } else {
        array = generateRandomArray(arraySize);
    }

    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "";

    renderArray(array);
    return array;
}

function renderArray(array) {
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        bar.className = "bar";
        arrayContainer.appendChild(bar);
    });
}

async function bubbleSort() {
    const array = generateArray();
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1);
            }
        }
    }
}

async function heapSort() {
    const array = generateArray();
    const n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }

    // One by one extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
        await swap(array, 0, i); // Move current root to end
        await heapify(array, i, 0); // Call max heapify on the reduced heap
    }
}

async function heapify(array, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        await swap(array, i, largest);
        await heapify(array, n, largest);
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

    const tempText = bars[a].textContent;
    bars[a].textContent = bars[b].textContent;
    bars[b].textContent = tempText;
}
