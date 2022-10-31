import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImageApiService from './api-service/image-api';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30900325-2c40b95e1611f9496716f72a9&q';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.input'),
  searchBtn: document.querySelector('.submit-btn'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
const imageApiService = new ImageApiService();

function onSearch(e) {
  e.preventDefault();
  clearGallery();
  imageApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (imageApiService.query === '') {
    return Notify.failure('Please type something');
  }
  imageApiService.resetPage();
  imageApiService
    .fetchImages()
    .then(createGalleryMarkup)
    .then(enableLoadMoreBtn);
  e.currentTarget.reset();
}

function onLoadMore() {
  imageApiService
    .fetchImages()
    .then(createGalleryMarkup)
    .then(enableLoadMoreBtn);
}

function createGalleryMarkup(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
      <a class="gallery__item" >
  <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${image.downloads}</b>
    </p>
  </div>
 
</div>`;
    })
    .join('');
  if (images.length === 0) {
    refs.gallery.innerHTML = '';

    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    refs.gallery.innerHTML = markup;
  }
  if (images.length !== 40) {
    refs.loadMoreBtn.classList.add('is-hidden');
    return Notify.failure(
      'We are sorry, but you have reached the end of search results.'
    );
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function enableLoadMoreBtn() {
  refs.loadMoreBtn.disabled = false;
  refs.loadMoreBtn.classList.remove('is-hidden');
}
