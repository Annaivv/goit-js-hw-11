import axios from 'axios';
import { Notify } from 'notiflix';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30900325-2c40b95e1611f9496716f72a9&q';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = 1;
  }
  async fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    try {
      const data = await axios.get(url);
      this.totalPage = Math.ceil(data.data.totalHits / 40);
      if (this.totalPage <= this.page) {
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      this.page += 1;
      return data.data.hits;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
