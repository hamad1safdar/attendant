function getLastEntryByNumber(array, prefix) {
    // Capitalize the first letter of the prefix
    const capitalizedPrefix = prefix.toUpperCase();

    // Filter the array based on the provided prefix
    const filteredArray = array.filter((obj) => obj.id.startsWith(prefix));

    // If the filtered array is empty, return the default entry with "000"
    if (filteredArray.length === 0) {
        return { id: `${capitalizedPrefix}-000` };
    }

    // Sort the filtered array based on the number in the ID
    filteredArray.sort((a, b) => {
        const numA = parseInt(a.id.split('-')[1]);
        const numB = parseInt(b.id.split('-')[1]);
        return numA - numB;
    });

    // Return the last entry
    return filteredArray[filteredArray.length - 1];
}

// Example usage:
const arrayOfObjects = [
    { id: 'se-000' },
    { id: 'm-001' },
    { id: 'se-002' },
    { id: 'm-002' },
    // Add more objects as needed
];

const lastSE = getLastEntryByNumber(arrayOfObjects, 'se');
const lastM = getLastEntryByNumber(arrayOfObjects, 'm');
const emptyArray = [];

const lastEmptySE = getLastEntryByNumber(emptyArray, 'se');
const lastEmptyM = getLastEntryByNumber(emptyArray, 'm');

console.log("Last 'se' entry:", lastSE);
console.log("Last 'm' entry:", lastM);
console.log("Last 'se' entry from empty array:", lastEmptySE);
console.log("Last 'm' entry from empty array:", lastEmptyM);
