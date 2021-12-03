if (window.location.pathname.startsWith("/post/")) {
    const mainToc = document.querySelector(".main .post-single>.toc");
    const tocIdList = [];
    document.addEventListener("DOMContentLoaded", () => {
        const mainTocTop = mainToc?mainToc.offsetTop:0;
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
                for (let i = 0; i < tocIdList.length; i++) {
                    let tocEl = document.getElementById(tocIdList[i]);
                    if (tocEl.offsetTop <= currentScroll) {
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
                    if (nextEl !== null && window.pageYOffset >= curEl.offsetTop && window.pageYOffset < nextEl.offsetTop) {
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
        const _mainTocTop = mainToc?mainToc.offsetTop:0;
        if (_mainTocTop < window.pageYOffset) {
            const _toc = document.querySelectorAll(".main .toc.aside .inner ul>li");
            for (let i = 0; i < tocIdList.length; i++) {
                let curEl = document.getElementById(tocIdList[i]);
                let nextEl = document.getElementById(tocIdList[i+1]);
                if (nextEl !== null && window.pageYOffset >= curEl.offsetTop && window.pageYOffset < nextEl.offsetTop) {
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
        if (_el.style.display==="none") {
            _toggleEl.innerText = "▼";
            _el.style.display = "block";
        } else if (_el.style.display==="block" || _el.style.display==="") {
            _toggleEl.innerText = "▶";
            _el.style.display = "none";
        }
    }
}
