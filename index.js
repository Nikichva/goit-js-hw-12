/* empty css                      */import{S as h,i as l,a as v}from"./assets/vendor--xm-24FX.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const b="14990931-ad4ebe1f82b0ac4449d9d4609",p=document.querySelector(".form"),c=document.querySelector(".bottomOfGallery"),i=document.querySelector(".gallery"),L=new h(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});let d=1,f=40;p.addEventListener("submit",async s=>{try{i.innerHTML="",c.innerHTML="",d=1,s.preventDefault(),i.insertAdjacentHTML("beforeend",'<span class="loader"></span>');const r=p.elements.searchInput.value.trim();if(r.length===0)return i.innerHTML="",l.error({message:"Empty field"});const o=await g(r),{hits:a}=o;return a.length===0?(document.querySelector(".loader").remove(),l.error({message:"❌ Sorry, there are no images matching your search query. Please try again!"})):(y(a),c.insertAdjacentHTML("beforeend",'<button name="loadMoreBtn">Load more</button>'),M(r))}catch(r){i.innerHTML="",l.error({message:`Request failed: ${r.message}`})}finally{p.reset()}});async function g(s){return(await v.get("https://pixabay.com/api/",{params:{key:b,q:s,image_type:"photo",orientation:"horizontal",safesearch:!1,per_page:f,page:d}})).data}function y(s){document.querySelector(".loader").remove();const r=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:n,comments:u,downloads:m})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img
            class="gallery-image"
            src="${o}"
            alt="${e}"
          />
          <div class="img-data">
            <div class="data-values">Likes <p>${t}</p></div>
            <div class="data-values">Views <p>${n}</p></div>
            <div class="data-values">Comments <p>${u}</p></div>
            <div class="data-values">Downloads <p>${m}</p></div>
          </div>
        </a>
      </li>`).join("");i.insertAdjacentHTML("beforeend",r),L.refresh()}async function M(s){document.querySelector('button[name="loadMoreBtn"]').addEventListener("click",async()=>{try{c.insertAdjacentHTML("beforeend",'<span class="loader"></span>'),d+=1;const o=await g(s),{hits:a,totalHits:e}=o,t=Math.ceil(e/f);if(d>t)return c.innerHTML="",l.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."});y(a);let u=document.querySelector(".gallery-item").getBoundingClientRect();const{width:m}=u;window.scrollBy({top:m*2,behavior:"smooth"})}catch(o){i.innerHTML="",l.error({message:`Request failed: ${o.message}`})}})}
//# sourceMappingURL=index.js.map
