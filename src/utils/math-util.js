function randInt(upper_bound, min) {
    min = typeof min !== 'undefined' ? min : 0;
    return min + Math.floor(Math.random() * upper_bound);
}

export default { randInt };
