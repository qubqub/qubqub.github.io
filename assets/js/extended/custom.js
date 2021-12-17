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

if (window.location.pathname.match(/^\/posts\/.+/)) {
  const urlSlug = window.location.pathname.match(/^(\/posts\/)([^/]+)/);
  if (urlSlug[2] !== "page") {
    const DOMReady = function (callback) {
      document.readyState === "interactive" ||
        document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
    };

    DOMReady( function () {
      if (document.querySelector(".main .post-single .post-header .post-title")) {
        sleep(200).then(() => {
          const _el = document.querySelector(".main .post-single .post-header .post-title");
          _el.style.opacity = "1";
          _el.style.transform = "translateY(0%)";
        });
      }

      if (document.querySelector(".main .post-single .post-header .post-description")) {
        sleep(235).then(() => {
          const _el = document.querySelector(".main .post-single .post-header .post-description");
          _el.style.opacity = "1";
          _el.style.transform = "translateY(0%)";
        });
      }

      if (document.querySelector(".main .post-single .post-header .post-meta")) {
        sleep(270).then(() => {
          const _el = document.querySelector(".main .post-single .post-header .post-meta");
          _el.style.opacity = "1";
          _el.style.transform = "translateY(0%)";
        });
      }

      if (document.querySelector(".main .post-single .series-main")) {
        sleep(300).then(() => {
          const _el = document.querySelector(".main .post-single .series-main");
          _el.style.opacity = "1";
          _el.style.transform = "translateY(0%)";
        });
      }

      if (document.querySelector(".main .post-single .toc")) {
        sleep(400).then(() => {
          const _el = document.querySelector(".main .post-single .toc");
          _el.style.opacity = "1";
          _el.style.transform = "translateY(0%)";
        });
      }

      if (document.querySelector(".main .post-single .post-content")) {
        sleep(700).then(() => {
          const _el = document.querySelector(".main .post-single .post-content");
          _el.style.opacity = "1";
          _el.style.transform = "translateX(0%)";
        });
      }

      if (document.querySelector(".main .post-single .post-footer")) {
        sleep(700).then(() => {
          const _el = document.querySelector(".main .post-single .post-footer");
          _el.style.opacity = "1";
          _el.style.transform = "translateY(0%)";
        });
      }

      document.querySelector("header.header").style.borderBottom = "none";
      const scrollUp = "scroll-up";
      const scrollDown = "scroll-down";
      const headerBottom = "header-bottom";
      let currentScroll = 0;
      const header = document.querySelector("header.header");
      const mainToc = document.querySelector(".main .post-single>.toc");
      const mainTocTop = mainToc?mainToc.offsetTop + mainToc.offsetParent.offsetTop - 1:0;
      const postHeaderEl = document.querySelector(".post-header");
      const tocIdList = [];

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

        if (localStorage.getItem("lock-aside-toc-"+window.location.pathname) === "true") {
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
            localStorage.setItem("lock-aside-toc-"+window.location.pathname, true);
            asideTocToggle.querySelector(".lock").classList.remove("hide");
            asideTocToggle.querySelector(".unlock").classList.add("hide");
            asideTocWrapper.classList.add("close");
            asideTocWrapper.classList.remove("open");
          } else {
            asideTocSummay.dataset.isLock = false;
            localStorage.setItem("lock-aside-toc-"+window.location.pathname, false);
            asideTocToggle.querySelector(".lock").classList.add("hide");
            asideTocToggle.querySelector(".unlock").classList.remove("hide");
            asideTocWrapper.classList.add("open");
            asideTocWrapper.classList.remove("close");
          }
        });
      }

      window.addEventListener("scroll", () => {
        let lastScroll = 0;
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
            if (tocEl.offsetTop + tocEl.offsetParent.offsetTop - 1 <= currentScroll) {
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
    });

    window.onload = function() {
      const _hljs = document.querySelectorAll(".post-content .highlight td:nth-child(2) pre code.hljs");
      for (let i = 0; i < _hljs.length; i++) {
        _hljs[i].style.width = "100%";
      }
    }
  } else {
    const postHeader = document.querySelector(".page-header");
    if (postHeader) {
      sleep(200).then(() => {
        postHeader.style.opacity = "1";
        postHeader.style.transform = "translateY(0%)";
      });
    }

    const postEntry = document.querySelectorAll(".post-entry");
    if (postEntry) {
      sleep(300).then(() => {
        for (let i = 0; i < postEntry.length; i++) {
          sleep((i+1)*100).then(() => {
            postEntry[i].style.opacity = "1";
            postEntry[i].style.transform = "translateX(0%)";
          });
        }
      });
    }
  }
} else if (window.location.pathname.match(/^\/archives\/$/)) {
  const archivePosts = document.querySelectorAll(".archive-year .archive-month");
  const archiveYearHeader = document.querySelectorAll(".archive-year .archive-year-header");
  const archiveEntry = document.querySelectorAll(".main .archive-year .archive-month .archive-month-header .toggle");

  if (archiveYearHeader) {
    sleep(300).then(() => {
      for (let i = 0; i < archiveYearHeader.length; i++) {
        sleep((i+1)*100).then(() => {
          archiveYearHeader[i].style.opacity = "1";
          archiveYearHeader[i].style.transform = "translateY(0%)";
        });
      }
    });
  }

  if (archivePosts) {
    for (let i = 0; i < archivePosts.length; i++) {
      if (localStorage.getItem("lock-archives-"+archivePosts[i].dataset.key) === "false") {
        archivePosts[i].querySelector(".archive-month-header .toggle").dataset.isLock = false;
        archivePosts[i].querySelector(".archive-month-header .toggle .lock").classList.add("hide");
      } else {
        archivePosts[i].querySelector(".archive-month-header .toggle").dataset.isLock = true;
        archivePosts[i].querySelector(".archive-month-header .toggle .unlock").classList.add("hide");
      }
    }

    sleep(700).then(() => {
      for (let i = 0; i < archivePosts.length; i++) {
        sleep((i+1)*50).then(() => {
          archivePosts[i].children[0].style.opacity = "1";
          archivePosts[i].children[0].style.transform = "translateY(0%)";
          archivePosts[i].children[1].style.opacity = "1";
          archivePosts[i].children[1].style.transform = "translateX(0%)";
        });
      }
    });
  }
  
  if (archiveEntry) {
    for (let i = 0; i < archiveEntry.length; i++) {

      archiveEntry[i].addEventListener("click", e => {
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

        console.log(_key);

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
} else if (window.location.pathname.match(/^\/tags\/$/)) {
  const termList = document.querySelectorAll(".terms-tags li");
  if (termList) {
    let randomIndexArray = [];
    for (i=0; i<termList.length; i++) {
      randomNum = Math.floor(Math.random() * termList.length);
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        i--;
      }
    }
    
    sleep(300).then(() => {
      for (let i = 0; i < randomIndexArray.length; i++) {
        sleep((i+1)*20).then(() => {
          termList[randomIndexArray[i]].children[0].style.opacity = "1";
          termList[randomIndexArray[i]].children[0].style.transform = "translateY(0%)";
        });
      }
    });
  }
} else if (window.location.pathname.match(/^\/search\/$/)) {
  const searchInput = document.querySelector("#searchInput");
  if (searchInput) {
    searchInput.style.width = "100%";
  }
} else if (window.location.pathname.match(/^\/series-list\/$/) ||
            window.location.pathname.match(/^\/collection\/$/) ||
            window.location.pathname.match(/^\/posts\/$/) ||
            window.location.pathname.match(/^\/tags\/.+/) ||
            window.location.pathname.match(/^\/categories\/.+/) ||
            window.location.pathname.match(/^\/series\/.+/) ||
            window.location.pathname.match(/^\/chapter\/.+/) ||
            window.location.pathname === "/") {

  if (document.querySelector(".page-header")) {
    sleep(200).then(() => {
      const postHeader = document.querySelector(".page-header");
      postHeader.style.opacity = "1";
      postHeader.style.transform = "translateY(0%)";
    });
  }
  
  if (document.querySelector(".post-entry")) {
    sleep(300).then(() => {
      const postEntry = document.querySelectorAll(".post-entry");
      for (let i = 0; i < postEntry.length; i++) {
        sleep((i+1)*100).then(() => {
          postEntry[i].style.opacity = "1";
          postEntry[i].style.transform = "translateX(0%)";
        });
      }
    });
  }
} else if (window.location.pathname.match(/^\/links\/$/)) {
  if (document.querySelector(".link-header")) { 
    sleep(300).then(() => {
      const linkHeader = document.querySelector(".link-header");
      linkHeader.style.opacity = "1";
      linkHeader.style.transform = "translateY(0%)";
    });
  }

  if (document.querySelectorAll(".links .button")) {
    sleep(700).then(() => {
      const linksButton = document.querySelectorAll(".links .button");
      for (let i = 0; i < linksButton.length; i++) {
        sleep((i+1)*100).then(() => {
          linksButton[i].style.opacity = "1";
          linksButton[i].style.transform = "translateX(0%)";
        });
      }
    });
  }
}