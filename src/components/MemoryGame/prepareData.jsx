const PrepareData = (emojis, num) => {
    const half = num / 2;
    const emojisToUse = emojis.slice(0, num);
    const arr = Array.from({ length: half }, () => Array(half).fill(-1));
    // randomly place emojis
    let index = 0;
    let count = 0;
    while (index < emojisToUse.length) {
        // will revisit this logic later
        const row = Math.floor(Math.random() * (half));
        const col = Math.floor(Math.random() * (half));
        if (arr[row][col] == -1) {
            arr[row][col] = { label: emojisToUse[index], isOpen: false, isMatched: false };
            count++;
        }
        if (count == 2) {
            count = 0;
            index++;
        }
    }
    return arr;
}

function generateCards(totalCount, matchCount) {
    const numGroups = totalCount / matchCount;
    if (numGroups > emojis.length) {
        throw new Error('Not enough emojis');
    }

    const emojisList = emojis.slice(0, numGroups);
    const cards = Array.from({ length: numGroups }, () => null,).map((_, idx) => idx).map((idx) =>
        Array.from(
            { length: matchCount },
            () => emojisList[idx],
        ),
    ).flat();
    shuffle(cards);
    return cards;
}
export default PrepareData;