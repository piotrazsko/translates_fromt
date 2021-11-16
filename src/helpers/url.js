export function getDataFromUrl(str) {
  const res = {};
  const url = new URL("https://example.com" + str);
  const filter = new URLSearchParams(url.search);
  filter.forEach((item, value) => {
    // console.log(item);
    try {
      res[value] = item;
    } catch (e) {
      console.log(e);
    }
  });
  return res;
}
