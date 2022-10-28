import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30900325-2c40b95e1611f9496716f72a9&q';

export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImages() {
    console.log(this);
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    axios.get(url).then(data => {
      this.page += 1;
    });
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
