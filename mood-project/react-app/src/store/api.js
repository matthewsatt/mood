// Server validation errors look like "field : message"; only show the message
export const formatErrors = (errors = []) =>
  errors.map((error) => error.replace(/^\w+ : /, ""));

// fetch wrapper for the JSON API. Resolves to { data } or { errors }, never throws.
export async function request(url, { method = "GET", body } = {}) {
  let res;
  try {
    res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    return { errors: ["Network error. Check your connection and try again."] };
  }

  const data = await res.json().catch(() => null);
  if (res.ok) return { data };
  if (data && data.errors) return { errors: formatErrors(data.errors) };
  return { errors: ["Something went wrong. Please try again."] };
}
