if (window.location.pathname.startsWith("/post/")) {
    window.addEventListener("load", () => {
        // const postContentTop = document.querySelector(".main div.post-content").offsetTop;
        const mainTocTop = document.querySelector(".main .post-single>.toc").offsetTop;
        const tocNode = document.querySelector(".main .toc");
        const tocIdList = [];
        if (tocNode !== null) {
            const tocClone = tocNode.cloneNode(true);
            tocClone.classList.add("aside");

            tocClone.querySelector("details").setAttribute("open", "");

            const tocList = tocClone.querySelectorAll(".inner ul>li");
        
            for (let i = 0; i < tocList.length; i++) {
                tocList[i].classList.add("toc-non-select");
                tocIdList[i] = decodeURI(tocList[i].querySelector("a").getAttribute("href"));
            }
            
            if (mainTocTop < window.pageYOffset) {
                tocClone.classList.add("reveal");
            } else if(mainTocTop >= window.pageYOffset) {
                tocClone.classList.add("hide");
            }

            tocNode.parentNode.insertBefore(tocClone, tocNode.nextSibling);
        }

        let lastScroll = 0;
        const header = document.querySelector("header.header");
        const scrollUp = "scroll-up";
        const scrollDown = "scroll-down";
        let selEl = null;
        let lastSelEl = null;

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 10) {
                header.classList.remove(scrollUp);
                return;
            }

            if (currentScroll > 100) {
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
                const asideToc = document.querySelector(".main .toc.aside");
                if (mainTocTop < currentScroll && asideToc.classList.contains("hide")) {
                    asideToc.classList.remove("hide");
                    asideToc.classList.add("reveal");
                    
                } else if(mainTocTop >= currentScroll && asideToc.classList.contains("reveal")) {
                    asideToc.classList.remove("reveal");
                    asideToc.classList.add("hide");
                }
                
                const allSelEl = asideToc.querySelectorAll(".inner ul>li");
                let elIndex = null;
                for (let i = 0; i < tocIdList.length; i++) {
                    let tocEl = document.querySelector(tocIdList[i]);
                    if (tocEl.offsetTop <= currentScroll) {
                        selEl = allSelEl[i];
                        elIndex = i;
                    }
                }
                
                if (elIndex !== null) {
                    let scrollEnd = Math.ceil(currentScroll + window.innerHeight) >= document.body.scrollHeight;

                    if (scrollEnd) {
                        for (let i = 0; i < allSelEl.length; i++) {
                            allSelEl[i].classList.remove("toc-select");
                        }
                        allSelEl[tocIdList.length-1].classList.add("toc-select");
                        lastSelEl = allSelEl[tocIdList.length-1];
                    } else {
                        if ((selEl !== null && lastSelEl !== null) && selEl === lastSelEl) {
                            return;
                        }

                        for (let i = 0; i < allSelEl.length; i++) {
                            allSelEl[i].classList.remove("toc-select");
                        }
                        selEl.classList.add("toc-select");
                        lastSelEl = selEl;
                    }

                    if (elIndex !== null) {
                        asideToc.scrollTop = (elIndex) * 20;
                    }
                } else {
                    if (asideToc.querySelector(".toc-select") === null) {
                        return;
                    }
                    for (let i = 0; i < allSelEl.length; i++) {
                        allSelEl[i].classList.remove("toc-select");
                    }
                }
            }

            lastScroll = currentScroll;
        });
    });
}
