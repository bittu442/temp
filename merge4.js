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

/* function generateArray() {
    arrayContainer.innerHTML = "";
    const array = [];
    for (let i = 0; i < 20; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.className = "bar";
        arrayContainer.appendChild(bar);
        array.push(value);
    }
    return array;
} */


/*function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
    }
    return array;
}*/

function renderArray(array) {
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.className = "bar";
        arrayContainer.appendChild(bar);
    });
}




async function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Visualize the split
    renderArray(left, right);

    const leftSorted = await mergeSort(left);
    const rightSorted = await mergeSort(right);

    // Visualize the merge
    renderArray(leftSorted, rightSorted);

    return merge(leftSorted, rightSorted);
}

async function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }

        // Visualize the merge step with a delay
        await new Promise((resolve) => setTimeout(resolve, 50));
        renderArray(result);
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

// Call mergeSort() with your array to start the sorting process.

