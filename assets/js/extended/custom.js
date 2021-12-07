if (window.location.pathname.startsWith("/post/")) {
  const mainToc = document.querySelector(".main .post-single>.toc");
  const tocIdList = [];

  const DOMReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
  };

  DOMReady( function () {	
    const mainTocTop = mainToc?mainToc.offsetTop + mainToc.offsetParent.offsetTop - 1:0;
    const header = document.querySelector("header.header");
    const tocNode = document.querySelector(".main .toc");
    if (tocNode !== null) {
      const tocClone = tocNode.cloneNode(true);
      tocClone.classList.add("aside");
      tocClone.querySelector("details").setAttribute("open", "");
      const tocList = tocClone.querySelectorAll(".inner ul>li");
  
      for (let i = 0; i < tocList.length; i++) {
        tocIdList[i] = decodeURI(tocList[i].querySelector("a").getAttribute("href").substring(1));
      }
      
      if (mainTocTop < window.pageYOffset) {
        tocClone.classList.add("reveal");
      } else if(mainTocTop >= window.pageYOffset) {
        tocClone.classList.add("hide");
      }

      const _n = tocClone.querySelector("details summary .details");
      const _m = document.createElement("span");
      const _o = document.createTextNode("🔓");
      _m.appendChild(_o);
      _m.classList.add("tocLock");
      _n.prepend(_m);

      tocClone.querySelector("details summary").addEventListener("click", e => {
        if (e.target.querySelector(".tocLock") === null) {
          if (e.target.innerText === "🔓") {
            e.target.innerText = "🔒";
          } else {
            e.target.innerText = "🔓";
          }
        } else {
          if (e.target.querySelector(".tocLock").innerText === "🔓") {
            e.target.querySelector(".tocLock").innerText = "🔒";
          } else {
            e.target.querySelector(".tocLock").innerText = "🔓";
          }
        }
      });

      tocNode.parentNode.insertBefore(tocClone, tocNode.nextSibling);
    }

    const asideToc = document.querySelector(".main .toc.aside");
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let selEl = null;
    let lastSelEl = null;
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (tocNode !== null) {
        if(mainTocTop >= currentScroll && asideToc.classList.contains("reveal")) {
          asideToc.scrollTop = 0;
          asideToc.classList.remove("reveal");
          asideToc.classList.add("hide");
        }
      }

      if (currentScroll <= 0 && !header.classList.contains(scrollUp)) {
        header.classList.remove(scrollDown);
        header.classList.add(scrollUp);
        return;
      }

      if (currentScroll <= 10) {
        header.classList.remove(scrollUp);
        return;
      }

      if (currentScroll > 80) {
        if (currentScroll > lastScroll && !header.classList.contains(scrollDown)) {
          // down
          header.classList.remove(scrollUp);
          header.classList.add(scrollDown);
        } else if (currentScroll < lastScroll && header.classList.contains(scrollDown)) {
          // up
          header.classList.remove(scrollDown);
          header.classList.add(scrollUp);
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
        for (let i = 0; i < tocIdList.length; i++) {
          tocEl = document.getElementById(tocIdList[i]);
          if (tocEl.offsetTop + tocEl.offsetParent.offsetTop - 1 <= currentScroll) {
            selEl = allSelEl[i];
            elIndex = i;
          }
        }
        
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
            if (selEl === lastSelEl && elIndex > 0) return;
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
          if (asideToc.querySelector(".selected") === null) return;
          for (let i = 0; i < allSelEl.length; i++) {
            if (!allSelEl[i].classList.contains("selected")) continue;
            allSelEl[i].classList.remove("selected");
          }
        }
      }

      lastScroll = currentScroll;
    });

    const tocDetails = document.querySelector(".main .toc.aside details");
    if (tocDetails !== null) {
      const observer = new MutationObserver((mutationList, observer) => {
        if (mutationList[0].oldValue !== null) return;
        for (let i = 0; i < tocIdList.length; i++) {
          let curEl = document.getElementById(tocIdList[i]);
          let nextEl = document.getElementById(tocIdList[i+1]);
          if (nextEl !== null && window.pageYOffset >= curEl.offsetTop + curEl.offsetParent.offsetTop - 1 && window.pageYOffset < nextEl.offsetTop + nextEl.offsetParent.offsetTop - 1) {
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
    const _mainTocTop = mainToc?mainToc.offsetTop + mainToc.offsetParent.offsetTop - 1:0;
    if (_mainTocTop < window.pageYOffset) {
      const _toc = document.querySelectorAll(".main .toc.aside .inner ul>li");
      for (let i = 0; i < tocIdList.length; i++) {
        let curEl = document.getElementById(tocIdList[i]);
        let nextEl = document.getElementById(tocIdList[i+1]);
        if (nextEl !== null && window.pageYOffset >= curEl.offsetTop + curEl.offsetParent.offsetTop - 1 && window.pageYOffset < nextEl.offsetTop + nextEl.offsetParent.offsetTop - 1) {
          if (_toc[i+1] !== null) _toc[i+1].classList.remove("selected");
          _toc[i].classList.add("selected");
          document.querySelector(".main .toc.aside").scrollTop = i * 20;
        }
      }
    }
  }
} else if (window.location.pathname.startsWith("/archives/")) {
  function layer_toggle (elId, _this) {
    const _el = document.getElementById(elId);
    const _toggleEl = _this.querySelector(".toggle");   
    if (_el.style.display==="none" || _el.style.display==="") {
      _toggleEl.innerText = "📂";
      _el.style.display = "block";
    } else if (_el.style.display==="block") {
      _toggleEl.innerText = "📁";
      _el.style.display = "none";
    }
  }
}