const KEY = '13b30df76de0172d03d948f4ffbca658';
// const URL = 'https://api.themoviedb.org/3/trending/all/day?';

function fetchApi(URL, search) {
  return fetch(
    `${URL}api_key=${KEY}&language=en-US&page=1&include_adult=false=quere&query=${search}`,
  ).then(res => {
    console.log(res, `add`);
    if (res.ok) {
      return res.json();
    }
  });
}
const apiFetch = { fetchApi };
export default apiFetch;
