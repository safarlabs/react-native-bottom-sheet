const closestIndex = (arr: ReadonlyArray<number>, x: number) => {
  'worklet';
  return arr.reduce(
    (prev, curr, idx) =>
      Math.abs(curr - x) < Math.abs(arr[prev] - x) ? idx : prev,
    0
  );
};

export const snapPoint = (
  initialPoint: number,
  value: number,
  velocity: number,
  points: ReadonlyArray<number>
): number => {
  'worklet';
  const point = value + 0.2 * velocity;
  const deltas = points.map(p => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  const destination = points.filter(p => Math.abs(point - p) === minDelta)[0];
  if (destination > initialPoint && velocity > 0) {
    const index = closestIndex(points, initialPoint);
    return points[index - 1];
  }
  if (destination < initialPoint && velocity < 0) {
    const index = closestIndex(points, initialPoint);
    return points[index + 1];
  }
  return destination;
};
