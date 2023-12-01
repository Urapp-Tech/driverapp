type ObjectWithId = {
  id: string;
} & {
  [key: string]: unknown;
};

export function trackById(index: number, object: ObjectWithId) {
  return object.id || index;
}
