// script.js - lazy-load with IntersectionObserver + blur-up
document.addEventListener('DOMContentLoaded', function () {
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

  if ('IntersectionObserver' in window) {
    let lazyObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let img = entry.target;
          // if inside picture, set src on img; the <source> already points to webp
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.addEventListener('load', function() {
            img.classList.add('loaded'); // removes blur via CSS
            img.classList.remove('blur');
          }, {once:true});
          lazyObserver.unobserve(img);
        }
      });
    }, {rootMargin: '200px 0px'}); // preload a bit before entering viewport

    lazyImages.forEach(function(img){
      lazyObserver.observe(img);
    });
  } else {
    // Fallback: load all
    lazyImages.forEach(function(img) {
      if (img.dataset.src) img.src = img.dataset.src;
      img.addEventListener('load', function() {
        img.classList.add('loaded');
        img.classList.remove('blur');
      }, {once:true});
    });
  }
});
