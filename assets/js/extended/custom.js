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

document.getElementById("menu-trigger").addEventListener("click", e => {
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
    function series_toggle (_this, series) {
      const _el = document.querySelector(".post-single .series-main .series-list");
      if (_el.style.display==="none" || _el.style.display==="") {
        localStorage.setItem("lock-series-"+series, false);
        _this.innerText = "🔓";
        _el.style.display = "block";
      } else if (_el.style.display==="block") {
        localStorage.setItem("lock-series-"+series, true);
        _this.innerText = "🔒";
        _el.style.display = "none";
      }
    }
    
    const mainToc = document.querySelector(".main .post-single>.toc");
    const tocIdList = [];
  
    const DOMReady = function (callback) {
      document.readyState === "interactive" ||
        document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
    };
  
    DOMReady( function () {
      if (document.querySelector(".post-title")) {
        sleep(200).then(() => {
          document.querySelector(".post-title").style.opacity = "1";
          document.querySelector(".post-title").style.transform = "translateY(0%)";
        });
      }
  
      if (document.querySelector(".series-main")) {
        sleep(200).then(() => {
          document.querySelector(".series-main").style.opacity = "1";
          document.querySelector(".series-main").style.transform = "translateY(0%)";
        });
      }
  
      if (document.querySelector(".post-content")) {
        sleep(600).then(() => {
          document.querySelector(".post-content").style.opacity = "1";
          document.querySelector(".post-content").style.transform = "translateX(0%)";
        });
      }
  
      document.querySelector("header.header").style.borderBottom = "none";
      const scrollUp = "scroll-up";
      const scrollDown = "scroll-down";
      const headerBottom = "header-bottom";
      let selEl = null;
      let lastSelEl = null;
      let lastScroll = 0;
      let currentScroll = 0;
      const tocDetails = document.querySelector(".main .toc.aside details");
      const header = document.querySelector("header.header");
      const tocNode = document.querySelector(".main .toc");
      const mainTocTop = mainToc?mainToc.offsetTop + mainToc.offsetParent.offsetTop - 1:0;
      const postHeaderEl = document.querySelector(".post-header");
  
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
  
      if (tocNode !== null) {
        const tocClone = tocNode.cloneNode(true);
        tocClone.classList.add("aside");
  
        const tocList = tocClone.querySelectorAll(".inner ul>li");
  
        for (let i = 0; i < tocList.length; i++) {
          tocIdList[i] = decodeURI(tocList[i].firstElementChild.hash.substring(1));
        }
  
        if (mainTocTop < window.pageYOffset) {
          tocClone.classList.add("reveal");
        } else if(mainTocTop >= window.pageYOffset) {
          tocClone.classList.add("hide");
        }
  
        const _n = tocClone.querySelector("details summary .details");
        const _m = document.createElement("span");
        let _o = null;
  
        if (localStorage.getItem("lock-aside-toc-"+window.location.pathname) === "true") {
          tocClone.querySelector("details").removeAttribute("open");
          _o = document.createTextNode("🔒");
        } else {
          tocClone.querySelector("details").setAttribute("open", "");
          _o = document.createTextNode("🔓");
        }
  
        _m.appendChild(_o);
        _m.classList.add("tocLock");
        _n.prepend(_m);
  
        tocClone.querySelector("details summary").addEventListener("click", e => {
          if (e.target.querySelector(".tocLock") === null) {
            if (e.target.innerText === "🔓") {
              localStorage.setItem("lock-aside-toc-"+window.location.pathname, true);
              e.target.innerText = "🔒";
            } else {
              localStorage.setItem("lock-aside-toc-"+window.location.pathname, false);
              e.target.innerText = "🔓";
            }
          } else {
            if (e.target.querySelector(".tocLock").innerText === "🔓") {
              localStorage.setItem("lock-aside-toc-"+window.location.pathname, true);
              e.target.querySelector(".tocLock").innerText = "🔒";
            } else {
              localStorage.setItem("lock-aside-toc-"+window.location.pathname, false);
              e.target.querySelector(".tocLock").innerText = "🔓";
            }
          }
        });
  
        tocNode.parentNode.insertBefore(tocClone, tocNode.nextSibling);
      }
  
      const asideToc = document.querySelector(".main .toc.aside");
      
      window.addEventListener("scroll", () => {
        currentScroll = window.pageYOffset;
        updateScrollProgressBar();
  
        if (currentScroll <= 0) {
          if (!header.classList.contains(scrollUp) || header.classList.contains(headerBottom)) {
            header.classList.remove(headerBottom);
            header.classList.remove(scrollDown);
            header.classList.add(scrollUp);
            return;
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
        
        if (tocNode !== null) {
          if (mainTocTop < currentScroll && asideToc.classList.contains("hide")) {
            asideToc.classList.remove("hide");
            asideToc.classList.add("reveal");
          } else if(mainTocTop >= currentScroll && asideToc.classList.contains("reveal")) {
            asideToc.scrollTop = 0;
            asideToc.classList.remove("reveal");
            asideToc.classList.add("hide");
          }
          
          const allSelEl = asideToc.querySelectorAll(".inner ul>li");
          let elIndex = null;
          let tocEl = null;
  
          tocIdList.map((tocId, idx) => {
            tocEl = document.getElementById(tocId);
            if (tocEl.offsetTop + tocEl.offsetParent.offsetTop - 1 <= currentScroll) {
              selEl = allSelEl[idx];
              elIndex = idx;
            }
          });
  
          // for (let i = 0; i < tocIdList.length; i++) {
          //   tocEl = document.getElementById(tocIdList[i]);
          //   if (tocEl.offsetTop + tocEl.offsetParent.offsetTop - 1 <= currentScroll) {
          //     selEl = allSelEl[i];
          //     elIndex = i;
          //   }
          // }
          
          if (elIndex !== null) {
            let scrollEnd = Math.ceil(currentScroll + window.innerHeight) >= document.body.scrollHeight;
            if (scrollEnd) {
              for (let i = 0; i < allSelEl.length; i++) {
                if (!allSelEl[i].classList.contains("selected")) continue;
                allSelEl[i].classList.remove("selected");
              }
              allSelEl[tocIdList.length-1].classList.add("selected");
              lastSelEl = allSelEl[tocIdList.length-1];
            } else {
              if (selEl === lastSelEl && elIndex > 0) {
                lastScroll = currentScroll;
                return;
              }
  
              for (let i = 0; i < allSelEl.length; i++) {
                if (!allSelEl[i].classList.contains("selected")) continue;
                allSelEl[i].classList.remove("selected");
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
            if (asideToc.querySelector(".selected") === null) {
              lastScroll = currentScroll;
              return;
            }
            for (let i = 0; i < allSelEl.length; i++) {
              if (!allSelEl[i].classList.contains("selected")) continue;
              allSelEl[i].classList.remove("selected");
            }
          }
        }
  
        lastScroll = currentScroll;
      });
  
      if (tocDetails !== null) {
        const observer = new MutationObserver((mutationList, observer) => {
          if (mutationList[0].oldValue !== null) return;
          for (let i = 0; i < tocIdList.length; i++) {
            let curEl = document.getElementById(tocIdList[i]);
            let nextEl = document.getElementById(tocIdList[i+1]);
            if (nextEl !== null &&
                  window.pageYOffset >= (curEl.offsetTop + curEl.offsetParent.offsetTop - 1) &&
                  window.pageYOffset < (nextEl.offsetTop + nextEl.offsetParent.offsetTop - 1)) {
              let scrollEnd = Math.ceil(window.pageYOffset + window.innerHeight) >= document.body.scrollHeight;
              if (asideToc.querySelectorAll(".inner ul>li")[i+1].classList.contains("selected")) {
                asideToc.querySelectorAll(".inner ul>li")[i+1].classList.remove("selected");
              }
              
              if (scrollEnd) {
                asideToc.querySelectorAll(".inner ul>li")[tocIdList.length-1].classList.add("selected");
                asideToc.scrollTop = (tocIdList.length-1) * 20;
              } else {
                asideToc.querySelectorAll(".inner ul>li")[i].classList.add("selected");
                asideToc.scrollTop = i * 20;
              }
            }
          }
        });
        observer.observe(tocDetails, { attributes: true, attributeOldValue: true, attributeFilter: [ "open" ] });
      }
    });
  
    window.onload = function() {
      const _hljs = document.querySelectorAll(".post-content .highlight td:nth-child(2) pre code.hljs");
      for (let i = 0; i < _hljs.length; i++) {
        _hljs[i].style.width = "100%";
      }
      const _mainTocTop = mainToc?mainToc.offsetTop + mainToc.offsetParent.offsetTop - 1:0;
      if (_mainTocTop < window.pageYOffset) {
        const _toc = document.querySelectorAll(".main .toc.aside .inner ul>li");
        for (let i = 0; i < tocIdList.length; i++) {
          let curEl = document.getElementById(tocIdList[i]);
          let nextEl = document.getElementById(tocIdList[i+1]);
          if (nextEl !== null &&
                window.pageYOffset >= (curEl.offsetTop + curEl.offsetParent.offsetTop - 1) &&
                window.pageYOffset < (nextEl.offsetTop + nextEl.offsetParent.offsetTop - 1)) {
            if (_toc[i+1] !== null) _toc[i+1].classList.remove("selected");
            _toc[i].classList.add("selected");
            document.querySelector(".main .toc.aside").scrollTop = i * 20;
          }
        }
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
  function archives_toggle (elId, _this) {
    const _el = document.getElementById(elId);
    const _toggleEl = _this.querySelector(".toggle");   
    if (_el.style.display==="none" || _el.style.display==="") {
      localStorage.setItem("lock-archives-"+elId, false);
      _toggleEl.innerText = "📂";
      _el.style.display = "block";
    } else if (_el.style.display==="block") {
      localStorage.setItem("lock-archives-"+elId, true);
      _toggleEl.innerText = "📁";
      _el.style.display = "none";
    }
  }

  const archivePosts = document.querySelectorAll(".archive-year .archive-month");
  const archiveYearHeader = document.querySelectorAll(".archive-year .archive-year-header");

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