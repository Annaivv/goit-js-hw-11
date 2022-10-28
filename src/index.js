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
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
const imageApiService = new ImageApiService();

function onSearch(e) {
  e.preventDefault();
  imageApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  imageApiService.resetPage();
  imageApiService.fetchImages();
  e.currentTarget.reset();
}

function onLoadMore() {
  imageApiService.fetchImages();
}
