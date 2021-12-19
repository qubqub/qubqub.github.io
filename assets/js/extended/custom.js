const DOMReady = function (callback) {
  document.readyState === "interactive" ||
    document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

DOMReady( function () {
  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  if (window.innerWidth < 769) {
    if (!document.getElementById("menu").classList.contains("hidden")) {
      document.getElementById("menu").classList.add("hidden");
      document.getElementById("menu").classList.remove("reveal");
    }
  } else {
    if (document.getElementById("menu").classList.contains("hidden")) {
      document.getElementById("menu").classList.add("reveal");
      document.getElementById("menu").classList.remove("hidden");
    }
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth < 769) {
      if (!document.getElementById("menu").classList.contains("hidden")) {
        document.getElementById("menu").classList.add("hidden");
        document.getElementById("menu").classList.remove("reveal");
      }
    } else {
      if (document.getElementById("menu").classList.contains("hidden")) {
        document.getElementById("menu").classList.add("reveal");
        document.getElementById("menu").classList.remove("hidden");
      }
    }
  }, true);

  document.getElementById("menu-trigger").addEventListener("click", () => {
    if (window.innerWidth < 769) {
      if (document.getElementById("menu").classList.contains("hidden")) {
        document.getElementById("menu").classList.add("reveal");
        document.getElementById("menu").classList.remove("hidden");
      } else {
        document.getElementById("menu").classList.add("hidden");
        document.getElementById("menu").classList.remove("reveal");
      }
    }
  });

  let urlPathName = "";
  if (window.location.pathname.match(/^\/.{2}\//)) {
    let urlSulg = window.location.pathname.match(/^\/(.{2})(\/.*)$/)
    let urlContryCode = urlSulg[1];
    urlPathName = urlSulg[2];
  } else {
    urlPathName = window.location.pathname;
  }

  if (urlPathName.match(/^\/posts\/.+/)) {
    const urlSlug = urlPathName.match(/^(\/posts\/)([^/]+)/);
    if (urlSlug[2] !== "page") {
      const scrollUp = "scroll-up";
      const scrollDown = "scroll-down";
      const headerBottom = "header-bottom";
      let currentScroll = 0;
      const header = document.querySelector("header.header");
      const mainToc = document.querySelector(".main .post-single>.toc");
      const mainTocTop = mainToc?mainToc.offsetTop + mainToc.offsetParent.offsetTop - 1:0;
      const postHeaderEl = document.querySelector(".post-header");
      const tocIdList = [];
      header.style.borderBottom = "none";
      
      function updateScrollProgressBar () {
        let scrollHeight = _root.scrollHeight - heightInViewport(_progressbar) - window.innerHeight;
        let scrollPosition = currentScroll;
        let scrollPercentage = scrollPosition / scrollHeight * 100;
        _progressbar.style.width = scrollPercentage + "%";
      }

      function heightInViewport (el) {
        var elH = el.offsetHeight,
          H = document.body.offsetHeight,
          r = el.getBoundingClientRect(),
          t = r.top,
          b = r.bottom;
        return Math.max(0, t > 0 ? Math.min(elH, H - t) : Math.min(b, H));
      }

      const _root = document.querySelector("html");
      const _body = document.querySelector("body");
      const progressEl = document.createElement("div");
      progressEl.classList.add("progress-bar-container__progress");
      _body.prepend(progressEl);

      const _progressbar = document.querySelector(".progress-bar-container__progress");
      const _config = { childList: true, subtree: true, characterData: true, attributes: true };
      new MutationObserver(updateScrollProgressBar).observe(_progressbar, _config);

      const asideToc = document.querySelector(".main .toc-aside");
      let asideTocSummay = null;
      let asideTocWrapper = null;
      let asideTocToggle = null;
      let asideTocList = null;
      if (asideToc) {
        asideTocSummay = document.querySelector(".main .toc-aside-summary");
        asideTocWrapper = asideToc.querySelector(".inner-wrapper");
        asideTocToggle = asideTocSummay.querySelector(".toggle");
        asideTocList = asideToc.querySelectorAll(".inner-wrapper .inner ul>li");

        if (localStorage.getItem("lock-aside-toc-"+urlPathName) === "true") {
          asideTocSummay.dataset.isLock = true;
          asideTocWrapper.classList.add("close");
          asideTocToggle.querySelector(".unlock").classList.add("hide");
        } else {
          asideTocSummay.dataset.isLock = false;
          asideTocWrapper.classList.add("open");
          asideTocToggle.querySelector(".lock").classList.add("hide");
        }

        for (let i = 0; i < asideTocList.length; i++) {
          tocIdList[i] = decodeURI(asideTocList[i].firstElementChild.hash.substring(1));
        }

        if (mainTocTop === 0) {
          mainTocTop = (postHeaderEl.offsetHeight + postHeaderEl.offsetTop + postHeaderEl.offsetParent.offsetTop - 1);
        }

        if (mainTocTop < window.pageYOffset) {
          asideToc.classList.remove("hide");
          asideToc.classList.add("reveal");
          asideTocSummay.classList.remove("hide");
        } else if(mainTocTop >= window.pageYOffset) {
          asideToc.classList.add("hide");
        }

        asideTocSummay.addEventListener("click", () => {
          if (asideTocSummay.dataset.isLock === "false") {
            asideTocSummay.dataset.isLock = true;
            localStorage.setItem("lock-aside-toc-"+urlPathName, true);
            asideTocToggle.querySelector(".lock").classList.remove("hide");
            asideTocToggle.querySelector(".unlock").classList.add("hide");
            asideTocWrapper.classList.add("close");
            asideTocWrapper.classList.remove("open");
          } else {
            asideTocSummay.dataset.isLock = false;
            localStorage.setItem("lock-aside-toc-"+urlPathName, false);
            asideTocToggle.querySelector(".lock").classList.add("hide");
            asideTocToggle.querySelector(".unlock").classList.remove("hide");
            asideTocWrapper.classList.add("open");
            asideTocWrapper.classList.remove("close");
          }
        });
      }
      let lastScroll = 0;
      window.addEventListener("scroll", () => {
        currentScroll = window.pageYOffset;
        updateScrollProgressBar();

        if (currentScroll <= 0) {
          if (!header.classList.contains(scrollUp) || header.classList.contains(headerBottom)) {
            header.classList.remove(headerBottom);
            header.classList.remove(scrollDown);
            header.classList.add(scrollUp);
          }
        } else {
          if (!header.classList.contains(headerBottom)) {
            header.classList.add(headerBottom);
          }
        }

        const postHeaderOffsetHeight = (postHeaderEl.offsetHeight + postHeaderEl.offsetTop + postHeaderEl.offsetParent.offsetTop - 1);

        if (currentScroll > postHeaderOffsetHeight) {
          if (currentScroll > lastScroll) {
            // down
            if (header.classList.contains(scrollUp)) {
              header.classList.remove(scrollUp);
              header.classList.add(scrollDown);
              if (document.getElementById("menu").classList.contains("reveal")) {
                document.getElementById("menu").classList.remove("reveal");
                document.getElementById("menu").classList.add("hidden");
              }
            }
          } else if (currentScroll < lastScroll) {
            // up
            if (header.classList.contains(scrollDown)) {
              header.classList.remove(scrollDown);
              header.classList.add(scrollUp);
            }
          }
        }
        
        if (asideToc) {
          const scrollEnd = Math.ceil(currentScroll + window.innerHeight) >= document.body.scrollHeight;

          if (mainTocTop < currentScroll && asideToc.classList.contains("hide")) {
            asideToc.classList.remove("hide");
            asideToc.classList.add("reveal");
            asideTocSummay.classList.remove("hide");
          } else if(mainTocTop >= currentScroll && asideToc.classList.contains("reveal")) {
            asideToc.scrollTop = 0;
            asideToc.classList.remove("reveal");
            asideToc.classList.add("hide");
            asideTocSummay.classList.add("hide");
          }

          let selEl = null;
          let lastSelEl = null;
          let elIndex = null;
          let tocEl = null;
          tocIdList.map((tocId, idx) => {
            tocEl = document.getElementById(tocId);
            const tocElRect = tocEl.getBoundingClientRect();
            const relativeTop = tocElRect.top;
            if (currentScroll + relativeTop -1 <= currentScroll) {
              selEl = asideTocList[idx];
              elIndex = idx;
            }
          });

          if (elIndex !== null) {
            if (scrollEnd) {
              for (let i = 0; i < asideTocList.length; i++) {
                if (!asideTocList[i].classList.contains("selected")) continue;
                asideTocList[i].classList.remove("selected");
              }
              asideTocList[tocIdList.length-1].classList.add("selected");
              lastSelEl = asideTocList[tocIdList.length-1];
            } else {
              if (selEl === lastSelEl && elIndex > 0) {
                lastScroll = currentScroll;
                return;
              }

              for (let i = 0; i < asideTocList.length; i++) {
                if (!asideTocList[i].classList.contains("selected")) continue;
                asideTocList[i].classList.remove("selected");
              }
              selEl.classList.add("selected");
              lastSelEl = selEl;
            }

            if (elIndex !== null) {
              asideToc.scroll({
                behavior: 'smooth',
                top: elIndex * 20
              });
            }
          } else {
            if (scrollEnd) {
              asideTocList[tocIdList.length-1].classList.add("selected");
              lastSelEl = asideTocList[tocIdList.length-1];
            } else {
              if (asideToc.querySelector(".selected") === null) {
                lastScroll = currentScroll;
                return;
              }
              for (let i = 0; i < asideTocList.length; i++) {
                if (!asideTocList[i].classList.contains("selected")) continue;
                asideTocList[i].classList.remove("selected");
              }
            }
          }
        }
        lastScroll = currentScroll;
      });

      window.onload = function() {
        const _hljs = document.querySelectorAll(".post-content .highlight td:nth-child(2) pre code.hljs");
        for (let i = 0; i < _hljs.length; i++) {
          _hljs[i].style.width = "100%";
        }
      }
    } else { // page



    }
  } else if (urlPathName.match(/^\/archives\/$/)) {
    const _archivePosts = document.querySelectorAll(".archive-year .archive-month");
    const _archiveEntry = document.querySelectorAll(".main .archive-year .archive-month .archive-month-header .toggle");

    if (_archivePosts) {
      for (let i = 0; i < _archivePosts.length; i++) {
        if (localStorage.getItem("lock-archives-"+_archivePosts[i].dataset.key) === "false") {
          _archivePosts[i].querySelector(".archive-month-header .toggle").dataset.isLock = false;
          _archivePosts[i].querySelector(".archive-month-header .toggle .lock").classList.add("hide");
        } else {
          _archivePosts[i].querySelector(".archive-month-header .toggle").dataset.isLock = true;
          _archivePosts[i].querySelector(".archive-month-header .toggle .unlock").classList.add("hide");
        }
      }
    }
    
    if (_archiveEntry) {
      for (let i = 0; i < _archiveEntry.length; i++) {
        _archiveEntry[i].addEventListener("click", e => {
          let _key = null;
          let _el = null;
          if (e.target.parentNode.dataset.key) {
            _key = e.target.parentNode.dataset.key;
            _el = e.target.parentNode;
          } else if (e.target.parentNode.parentNode.dataset.key) {
            _key = e.target.parentNode.parentNode.dataset.key;
            _el = e.target.parentNode.parentNode;
          } else if (e.target.parentNode.parentNode.parentNode.dataset.key) {
            _key = e.target.parentNode.parentNode.parentNode.dataset.key;
            _el = e.target.parentNode.parentNode.parentNode;
          }

          if (_el.querySelector(".toggle").dataset.isLock === "false") {
            localStorage.setItem("lock-archives-"+_key, true);
            _el.querySelector(".toggle").dataset.isLock = true;
            _el.querySelector(".toggle .unlock").classList.add("hide");
            _el.querySelector(".toggle .lock").classList.remove("hide");
            document.getElementById(_key).style.display = "none";
          } else {
            localStorage.setItem("lock-archives-"+_key, false);
            _el.querySelector(".toggle").dataset.isLock = false;
            _el.querySelector(".toggle .lock").classList.add("hide");
            _el.querySelector(".toggle .unlock").classList.remove("hide");
            document.getElementById(_key).style.animationDelay = "0s";
            document.getElementById(_key).style.display = "block";
          }
        });
      }
    }
  } else if ( urlPathName.match(/^\/tags\/$/)||
              urlPathName.match(/^\/categories\/$/) ||
              urlPathName.match(/^\/series\/$/) ||
              urlPathName.match(/^\/chapter\/$/)) {
    

    
  } else if ( urlPathName.match(/^\/posts\/$/) ||
              urlPathName.match(/^\/tags\/.+/) ||
              urlPathName.match(/^\/categories\/.+/) ||
              urlPathName.match(/^\/series\/.+/) ||
              urlPathName.match(/^\/chapter\/.+/)) {
    

    
  } else if (urlPathName.match(/^\/search\/$/)) {
    


  } else if (urlPathName.match(/^\/series-list\/$/)) {
    


  } else if ( urlPathName.match(/^\/collection\/$/)) {
    


  } else if (urlPathName === "/") {



  } else if (urlPathName.match(/^\/links\/$/)) {
    


  }
});