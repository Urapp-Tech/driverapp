type ObjectWithId = Record<string, any> & { id: string };

export function trackById(index: number, object: ObjectWithId) {
  return object.id || index;
}
