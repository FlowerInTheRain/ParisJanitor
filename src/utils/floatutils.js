export function floatToFraction(x) {
    const tolerance = 1.0E-3;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let negative = x < 0;
    let b = x = Math.abs(x);

    do {
        const a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(x - h1 / k1) > x * tolerance);

    return (negative ? -h1 : h1) + '/' + k1;
}