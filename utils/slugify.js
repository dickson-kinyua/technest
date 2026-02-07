export function generateSlug(title) {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w\-]+/g, '') // remove special chars
    .replace(/\-\-+/g, '-'); // replace multiple - with single -
}
