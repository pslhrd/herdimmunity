export function lerp(start, end, t) {
	return start * (1 - t) + end * t;
}

export function lerpPrecise(start, end, t, limit = 0.001) {
	const v = start * (1 - t) + end * t;
	return Math.abs(end - v) < limit ? end : v;
}

export function damp(a, b, smoothing, dt) {
	return lerp(a, b, 1 - Math.exp(-smoothing * 0.05 * dt));
}

export function dampPrecise(a, b, smoothing, dt, limit) {
	return lerpPrecise(a, b, 1 - Math.exp(-smoothing * 0.05 * dt), limit);
}

export function map(value, start1, stop1, start2, stop2) {
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

export function clampedMap(value, start1, stop1, start2, stop2) {
	const v = start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
	return Math.max(start2, Math.min(stop2, v));
}