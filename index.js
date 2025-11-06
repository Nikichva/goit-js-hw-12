/* empty css                      */import{S as v,i,a as b}from"./assets/vendor--xm-24FX.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const L="14990931-ad4ebe1f82b0ac4449d9d4609",m=document.querySelector(".form"),c=document.querySelector(".bottomOfGallery"),l=document.querySelector(".gallery"),M=new v(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});let d=1,f=40,p="";m.addEventListener("submit",async n=>{try{if(l.innerHTML="",c.innerHTML="",d=1,n.preventDefault(),l.insertAdjacentHTML("beforeend",'<span class="loader"></span>'),p=m.elements.searchInput.value.trim(),p.length===0)return l.innerHTML="",i.error({message:"Empty field"});const r=await g(),{hits:o,totalHits:a}=r;return o.length===0?(document.querySelector(".loader").remove(),i.error({message:"❌ Sorry, there are no images matching your search query. Please try again!"})):(y(o),a<=f?(c.innerHTML="",i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(c.insertAdjacentHTML("beforeend",'<button name="loadMoreBtn">Load more</button>'),H()))}catch(r){l.innerHTML="",i.error({message:`Request failed: ${r.message}`})}finally{m.reset()}});async function g(){return(await b.get("https://pixabay.com/api/",{params:{key:L,q:p,image_type:"photo",orientation:"horizontal",safesearch:!1,per_page:f,page:d}})).data}function y(n){document.querySelector(".loader").remove();const r=n.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:s,comments:u,downloads:h})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img
            class="gallery-image"
            src="${o}"
            alt="${e}"
          />
          <div class="img-data">
            <div class="data-values">Likes <p>${t}</p></div>
            <div class="data-values">Views <p>${s}</p></div>
            <div class="data-values">Comments <p>${u}</p></div>
            <div class="data-values">Downloads <p>${h}</p></div>
          </div>
        </a>
      </li>`).join("");l.insertAdjacentHTML("beforeend",r),M.refresh()}async function H(){document.querySelector('button[name="loadMoreBtn"]').addEventListener("click",async()=>{try{c.insertAdjacentHTML("beforeend",'<span class="loader"></span>'),d+=1;const r=await g(),{hits:o,totalHits:a}=r;y(o);const e=Math.ceil(a/f);if(d>=e)return c.innerHTML="",i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."});let s=document.querySelector(".gallery-item").getBoundingClientRect();const{height:u}=s;window.scrollBy({top:u*2,behavior:"smooth"})}catch(r){l.innerHTML="",i.error({message:`Request failed: ${r.message}`})}})}
//# sourceMappingURL=index.js.map
