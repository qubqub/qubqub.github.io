const DOMReady = function (callback) {
  document.readyState === "interactive" ||
    document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

DOMReady( function () {
  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function elementDelayAnimation(_element, _transition, _ms, _extraMs = 0, _direction, _opacity) {
    if (_element) {
      _element.style.transition = _transition;
      _element.style.transitionDelay = ((_ms + _extraMs) * 0.001) + "s";
      _element.style.opacity = _opacity;
      _element.style.transform = `translate${_direction.toUpperCase()}(0%)`;
    }
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
      
      const _postTitle = document.querySelector(".main .post-single .post-header .post-title");
      elementDelayAnimation(_postTitle, "all 0.2s ease-in", 300, 0, "Y", "1");

      const _postDescription = document.querySelector(".main .post-single .post-header .post-description");
      elementDelayAnimation(_postDescription, "all 0.2s ease-in", 335, 0, "Y", "1");

      const _postMeta = document.querySelector(".main .post-single .post-header .post-meta");
      elementDelayAnimation(_postMeta, "all 0.2s ease-in", 370, 0, "Y", "1");

      const _seriesMain = document.querySelector(".main .post-single .series-main");
      elementDelayAnimation(_seriesMain, "all 0.2s ease-in", 400, 0, "Y", "1");

      // const _asideToc = document.querySelector(".main .post-single .toc-aside-wrapper");
      // elementDelayAnimation(_asideToc, "all 0.2s ease-in", 600, 0, "X", "1");

      const _toc = document.querySelector(".main .post-single .toc");
      elementDelayAnimation(_toc, "all 0.2s ease-in", 400, 0, "Y", "1");

      const _postContent = document.querySelector(".main .post-single .post-content");
      elementDelayAnimation(_postContent, "all 0.2s ease-in", 600, 0, "X", "1");

      const _postFooter = document.querySelector(".main .post-single .post-footer");
      elementDelayAnimation(_postFooter, "all 0.2s ease-in", 600, 0, "Y", "1");
      
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
      const _postHeader = document.querySelector(".page-header");
      elementDelayAnimation(_postHeader, "all 0.2s ease-out", 80, 0, "Y", "1");
      
      const _postEntry = document.querySelectorAll(".post-entry");
      if (_postEntry) {
        for (let i = 0; i < _postEntry.length; i++) {
          elementDelayAnimation(_postEntry[i], "all 0.2s ease-out", (i+1)*50, 120, "X", "1");
        }
      }
    }
  } else if (urlPathName.match(/^\/archives\/$/)) {
    const _archiveHeader = document.querySelector(".main .page-header");
    const _archivePosts = document.querySelectorAll(".archive-year .archive-month");
    const _archiveYearHeader = document.querySelectorAll(".archive-year .archive-year-header");
    const _archiveEntry = document.querySelectorAll(".main .archive-year .archive-month .archive-month-header .toggle");

    elementDelayAnimation(_archiveHeader, "all 0.3s ease-in-out", 0, 0, "Y", "1");

    if (_archiveYearHeader) {
      for (let i = 0; i < _archiveYearHeader.length; i++) {
        elementDelayAnimation(_archiveYearHeader[i], "all 0.3s ease-in-out", (i+1)*100, 300, "Y", "1");
      }
    }

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

      for (let i = 0; i < _archivePosts.length; i++) {
        elementDelayAnimation(_archivePosts[i].children[0], "all 0.3s ease-in-out", (i+1)*50, 700, "Y", "1");
        elementDelayAnimation(_archivePosts[i].children[1], "all 0.3s ease-in-out", (i+1)*50, 700, "X", "1");
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
            document.getElementById(_key).style.display = "block";
          }
        });
      }
    }
  } else if ( urlPathName.match(/^\/tags\/$/)||
              urlPathName.match(/^\/categories\/$/) ||
              urlPathName.match(/^\/series\/$/) ||
              urlPathName.match(/^\/chapter\/$/)) {
    const _termList = document.querySelectorAll(".main .terms-tags a");
    const _termHeader = document.querySelector(".main .page-header");
    elementDelayAnimation(_termHeader, "all 0.3s ease-in-out", 0, 0, "Y", "1");

    if (_termList) {
      let randomIndexArray = [];
      for (i=0; i<_termList.length; i++) {
        randomNum = Math.floor(Math.random() * _termList.length);
        if (randomIndexArray.indexOf(randomNum) === -1) {
          randomIndexArray.push(randomNum);
        } else {
          i--;
        }
      }
      
      for (let i = 0; i < randomIndexArray.length; i++) {
        elementDelayAnimation(_termList[randomIndexArray[i]], "all 0.2s ease-out", (i+1)*17, 300, "Y", "1");
      }
    }
  } else if ( urlPathName.match(/^\/posts\/$/) ||
              urlPathName.match(/^\/tags\/.+/) ||
              urlPathName.match(/^\/categories\/.+/) ||
              urlPathName.match(/^\/series\/.+/) ||
              urlPathName.match(/^\/chapter\/.+/)) {
    const _postHeader = document.querySelector(".page-header");
    elementDelayAnimation(_postHeader, "all 0.2s ease-out", 50, 0, "Y", "1");

    const _postEntry = document.querySelectorAll(".post-entry");
    if (_postEntry) {
      for (let i = 0; i < _postEntry.length; i++) {
        elementDelayAnimation(_postEntry[i], "all 0.2s ease-out", ((i+1)*50)+120, 120, "X", "1");
      }
    }
  } else if (urlPathName.match(/^\/search\/$/)) {
    const _searchHeader = document.querySelector(".main .page-header");
    elementDelayAnimation(_searchHeader, "all 0.3s ease-in-out", 400, 0, "Y", "1");

    const _searchInput = document.querySelector("#searchInput");
    if (_searchInput) {
      _searchInput.style.width = "100%";
    }
  } else if (urlPathName.match(/^\/series-list\/$/)) {
    const _seriesTitle = document.querySelector(".main .series-header .series-title");
    const _seriesDescription = document.querySelector(".main .series-header .series-description-wrapper .series-description");
    const _seriesSubDescriptions = document.querySelectorAll(".main .series-header .series-description-wrapper .series-sub-description-wrapper .series-sub-description");
    const _seriesEntry = document.querySelectorAll(".main .post-entry");
    
    elementDelayAnimation(_seriesTitle, "all 0.2s ease-out", 200, 0, "Y", "1");
    elementDelayAnimation(_seriesDescription, "all 0.2s ease-out", 400, 0, "Y", "1");

    if (_seriesSubDescriptions) {
      for (let i = 0; i < _seriesSubDescriptions.length; i++) {
        // elementDelayAnimation(_seriesSubDescriptions[i], "all 0.2s ease-out", (i+1)*250, 400, "X", "1");
        elementDelayAnimation(_seriesSubDescriptions[i], "all 0.2s ease-out", 250, 400, "X", "1");
      }
    }

    if (_seriesEntry) {
      for (let i = 0; i < _seriesEntry.length; i++) {
        elementDelayAnimation(_seriesEntry[i], "all 0.2s ease-out", (i+1)*100, 850, "X", "1");
      }
    }
  } else if ( urlPathName.match(/^\/collection\/$/)) {
    const _collectionTitle = document.querySelector(".main .collection-header .collection-title");
    const _collectionDescription = document.querySelector(".main .collection-header .collection-description");
    const _collectionEntry = document.querySelectorAll(".main .post-entry");

    elementDelayAnimation(_collectionTitle, "all 0.2s ease-out",200, 0, "Y", "1");
    elementDelayAnimation(_collectionDescription, "all 0.2s ease-out", 400, 0, "Y", "1");

    if (_collectionEntry) {
      for (let i = 0; i < _collectionEntry.length; i++) {
        elementDelayAnimation(_collectionEntry[i], "all 0.2s ease-out", (i+1)*80, 550, "X", "1");
      }
    }
  } else if (urlPathName === "/") {



  } else if (urlPathName.match(/^\/links\/$/)) {
    const _linkHeader = document.querySelector(".link-header");
    elementDelayAnimation(_linkHeader, "all 0.3s ease-in-out", 0, 0, "Y", "1");

    const _linkButtons = document.querySelectorAll(".links .button");
    if (_linkButtons) {
      for (let i = 0; i < _linkButtons.length; i++) {
        elementDelayAnimation(_linkButtons[i], "all 0.4s ease-in-out", (i+1)*100, 200, "X", "1");
      }
    }
  }
});