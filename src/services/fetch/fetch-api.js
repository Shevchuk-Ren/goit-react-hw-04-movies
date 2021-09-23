const KEY = '13b30df76de0172d03d948f4ffbca658';
// const URL = 'https://api.themoviedb.org/3/trending/all/day?';
const page = 1;

function fetchApi(URL) {
  return fetch(`${URL}api_key=${KEY}&language=en-US`).then(res => {
    console.log(res);
    if (res.ok) {
      return res.json();
    }
  });
}
const apiFetch = { fetchApi };
export default apiFetch;
