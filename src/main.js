'use strict';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const buildGalleryMarkup = hits =>
  hits
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

form.addEventListener('submit', evt => {
  evt.preventDefault();
  gallery.innerHTML = '<span class="loader"></span>';
  const inputField = form.elements.searchInput.value.trim();

  if (inputField.length === 0) {
    gallery.innerHTML = '';
    return iziToast.error({
      message: 'Empty field',
    });
  }

  fetch(
    `https://pixabay.com/api/?key=14990931-ad4ebe1f82b0ac4449d9d4609&q=${inputField}&image_type=photo&orientation=horizontal&safesearch=false`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(({ hits }) => {
      if (hits.length === 0) {
        gallery.innerHTML = '';
        return iziToast.error({
          message:
            '❌ Sorry, there are no images matching your search query. Please try again!',
        });
      }
      gallery.innerHTML = buildGalleryMarkup(hits);
      lightbox.refresh();
    })
    .catch(error => {
      gallery.innerHTML = '';
      iziToast.error({ message: `Request failed: ${error.message}` });
    })
    .finally(() => form.reset());
});
