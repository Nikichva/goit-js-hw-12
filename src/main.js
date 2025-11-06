'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const myApiKey = '14990931-ad4ebe1f82b0ac4449d9d4609';
const form = document.querySelector('.form');
const bottomOfGallery = document.querySelector('.bottomOfGallery');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

// Controls the page number
let page = 1;
// Controls the number of images in the gallery
let perPage = 40;

form.addEventListener('submit', async evt => {
  try {
    gallery.innerHTML = '';
    bottomOfGallery.innerHTML = '';
    page = 1;
    evt.preventDefault();
    gallery.insertAdjacentHTML('beforeend', '<span class="loader"></span>');
    const inputField = form.elements.searchInput.value.trim();

    if (inputField.length === 0) {
      gallery.innerHTML = '';
      return iziToast.error({
        message: 'Empty field',
      });
    }

    const images = await fetchImages(inputField);
    const { hits } = images;

    if (hits.length === 0) {
      document.querySelector('.loader').remove();
      return iziToast.error({
        message:
          '❌ Sorry, there are no images matching your search query. Please try again!',
      });
    }

    renderImages(hits);
    bottomOfGallery.insertAdjacentHTML(
      'beforeend',
      '<button name="loadMoreBtn">Load more</button>'
    );
    return addMoreImages(inputField);
  } catch (error) {
    gallery.innerHTML = '';
    iziToast.error({ message: `Request failed: ${error.message}` });
  } finally {
    form.reset();
  }
});

async function fetchImages(inputField) {
  const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: myApiKey,
      q: inputField,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      per_page: perPage,
      page: page,
    },
  });
  return response.data;
}

function renderImages(hits) {
  document.querySelector('.loader').remove();
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
          <div class="img-data">
            <div class="data-values">Likes <p>${likes}</p></div>
            <div class="data-values">Views <p>${views}</p></div>
            <div class="data-values">Comments <p>${comments}</p></div>
            <div class="data-values">Downloads <p>${downloads}</p></div>
          </div>
        </a>
      </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

async function addMoreImages(inputField) {
  const loadMoreBtn = document.querySelector('button[name="loadMoreBtn"]');

  loadMoreBtn.addEventListener('click', async () => {
    try {
      bottomOfGallery.insertAdjacentHTML(
        'beforeend',
        '<span class="loader"></span>'
      );
      page += 1;

      const images = await fetchImages(inputField);
      const { hits, totalHits } = images;
      const totalPages = Math.ceil(totalHits / perPage);
      if (page > totalPages) {
        bottomOfGallery.innerHTML = '';
        return iziToast.info({
          position: 'topRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }

      renderImages(hits);

      let elem = document.querySelector('.gallery-item');
      let rect = elem.getBoundingClientRect();
      const { width } = rect;
      window.scrollBy({ top: width * 2, behavior: 'smooth' });
    } catch (error) {
      gallery.innerHTML = '';
      iziToast.error({ message: `Request failed: ${error.message}` });
    }
  });
}
