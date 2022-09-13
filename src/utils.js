export function computeYRatio(height, max, min) {
    return (max - min) / height;
}

export function computeXRatio(width, length) {
    return width / (length - 2);
}

export function toDate(timestamp) {
    const shortMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(timestamp);
    return `${shortMonths[date.getMonth()]} ${date.getDate()}`;
}

export function isOver(mouse, x, length, dWidth) {
    if (!mouse) {
        return false;
    }
    const width = dWidth / length;
    return Math.abs(x - mouse.x) < width / 2;
}

export function line(ctx, coords, { color }) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    for (const [x, y] of coords) {
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.closePath();
}

export function circle(ctx, [x, y], color, circleRadius) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = "#fff";
    ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

export function computeBoundaries({ columns, types }) {
    let min;
    let max;

    columns.forEach((col) => {
        if (types[col[0]] !== "line") {
            return;
        }
        if (typeof min !== "number") min = col[1];
        if (typeof max !== "number") max = col[1];
        if (min > col[1]) min = col[1];
        if (max < col[1]) max = col[1];

        for (let i = 2; i < col.length; i++) {
            if (min > col[i]) min = col[i];
            if (max < col[i]) max = col[i];
        }
    });

    return [min, max];
}

export function css(el, styles = {}) {
    Object.assign(el.style, styles);
}

export function toCoords(xRatio, yRatio, DPI_HEIGHT, PADDING, yMin) {
    return (col) =>
        col
            .map((y, i) => [
                Math.floor((i - 1) * xRatio),
                Math.floor(DPI_HEIGHT - PADDING - (y - yMin) / yRatio),
            ])
            .filter((_, i) => i !== 0);
}
