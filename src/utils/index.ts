/**
 * 过滤空字段
 */
export function filterNotEmpty(o?: any) {
  if (o) {
    o = Object.fromEntries(
      Object.entries(o).filter(
        ([_, value]) =>
          value !== null &&
          value !== undefined &&
          (typeof value !== "string" || value.trim() !== "")
      )
    );
  }
  return o;
}
