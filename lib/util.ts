export function upperCase(s: string): string {
  s = String(s);
  if(s.length == 0) { return s; }
  return s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase();
}