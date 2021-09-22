const KEY = '13b30df76de0172d03d948f4ffbca658';
const URL = 'https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>';
const page = 1;

function fetchApi() {
  return fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
}
const apiFetch = { fetchApi };
export default apiFetch;
