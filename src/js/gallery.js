import cardMurkup from '../templates/filmGallery.hbs';
import { apiService, genres } from './servise/api';
import refs from './references';
import pagination from './pagination';
import { errorRequest, createMarkupLibrary } from './header';
import smile from '../images/sorry.png';

export default async function startPage() {
  await apiService.fetchGenre();
  fetchFilmography();
}
// ============================= Filmography rendering by request =============================
export async function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearFilmography();

  apiService.resetPage();

  if (apiService.query === '' || apiService.query.trim().length === 0) {
    fetchFilmography();
    errorRequest.classList.remove('is-hidden');
    document.querySelector('#pagination').innerHTML = ''; // hidden pagination completely
    // pagination.reset(1); //show one page instead of total ones
    return;
  }

  fetchFilmography();
}

export async function fetchFilmography() {
  const movies = await apiService.fetch(apiService.query);
  printFilmography(movies.results);
  pagination.reset(movies.total_results);

  if (movies.results.length === 0) {
    const markup = `<div class="library">
      <img class="sorry_img" src="./${smile}" alt="smile">
      </div>`;
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    document.querySelector('#pagination').innerHTML = '';
    errorRequest.classList.remove('is-hidden');

    return;
  }
}

export function clearFilmography() {
  refs.gallery.innerHTML = '';
}

export function printFilmography(movies) {
  refs.gallery.innerHTML = cardMurkup(movies);
}
