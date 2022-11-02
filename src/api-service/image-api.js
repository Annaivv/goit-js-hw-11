import axios from 'axios';
import { Notify } from 'notiflix';
import LoadMoreBtn from '../js/load-more-btn';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30900325-2c40b95e1611f9496716f72a9&q';
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more' });

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
      this.totalPages = Math.ceil(data.data.totalHits / 40);
      if (this.totalPages <= this.page && data.data.totalHits !== 0) {
        loadMoreBtn.hide();
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      if (this.page === 1 && data.data.totalHits !== 0) {
        Notify.info(`Hooray! We found ${data.data.totalHits} images.`);
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
