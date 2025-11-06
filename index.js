/* empty css                      */import{S as u,i as l}from"./assets/vendor-CePATv9e.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const c=document.querySelector(".form"),s=document.querySelector(".gallery"),f=new u(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),m=o=>o.map(({webformatURL:a,largeImageURL:r,tags:n,likes:e,views:t,comments:i,downloads:d})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img
            class="gallery-image"
            src="${a}"
            alt="${n}"
          />
          <div class="img-data">
            <div class="data-values">Likes <p>${e}</p></div>
            <div class="data-values">Views <p>${t}</p></div>
            <div class="data-values">Comments <p>${i}</p></div>
            <div class="data-values">Downloads <p>${d}</p></div>
          </div>
        </a>
      </li>`).join("");c.addEventListener("submit",o=>{o.preventDefault(),s.innerHTML='<span class="loader"></span>';const a=c.elements.searchInput.value.trim();if(a.length===0)return s.innerHTML="",l.error({message:"Empty field"});fetch(`https://pixabay.com/api/?key=14990931-ad4ebe1f82b0ac4449d9d4609&q=${a}&image_type=photo&orientation=horizontal&safesearch=false`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(({hits:r})=>{if(r.length===0)return s.innerHTML="",l.error({message:"❌ Sorry, there are no images matching your search query. Please try again!"});s.innerHTML=m(r),f.refresh()}).catch(r=>{s.innerHTML="",l.error({message:`Request failed: ${r.message}`})}).finally(()=>c.reset())});
//# sourceMappingURL=index.js.map
