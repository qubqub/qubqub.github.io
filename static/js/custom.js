if (window.location.pathname.startsWith("/post/")) {
    window.addEventListener("load", () => {
        const postContentTop = document.querySelector(".main div.post-content").offsetTop;
        const tocNode = document.querySelector(".main .toc");
        const tocIdList = [];
        if (tocNode !== null) {
            const tocClone = tocNode.cloneNode(true);
            tocClone.classList.add("aside");
            const tocList = tocClone.querySelectorAll(".inner ul>li");
        
            for (let i = 0; i < tocList.length; i++) {
                tocList[i].classList.add("toc-non-select");
                tocIdList[i] = decodeURI(tocList[i].querySelector("a").getAttribute("href"));
            }

            if (postContentTop < window.pageYOffset) {
                tocClone.classList.add("toc-reveal");
            } else if(postContentTop >= window.pageYOffset) {
                tocClone.classList.add("toc-hide");
            }

            tocNode.parentNode.insertBefore(tocClone, tocNode.nextSibling);
        }

        let lastScroll = 0;
        const header = document.querySelector("header.header");
        const scrollUp = "scroll-up";
        const scrollDown = "scroll-down";

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 5) {
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
                if (postContentTop < currentScroll && asideToc.classList.contains("toc-hide")) {
                    asideToc.classList.remove("toc-hide");
                    asideToc.classList.add("toc-reveal");
                } else if(postContentTop >= currentScroll && asideToc.classList.contains("toc-reveal")) {
                    asideToc.classList.remove("toc-reveal");
                    asideToc.classList.add("toc-hide");
                }
        
                let selEl = null;
                const allSelEl = asideToc.querySelectorAll(".inner ul>li");
                for (let i = 0; i < tocIdList.length; i++) {
                    let tocEl = document.querySelector(tocIdList[i]);
                    if (tocEl.offsetTop <= currentScroll) {
                        selEl = allSelEl[i];
                    }
                }
                
                if (selEl !== null) {
                    for (let i = 0; i < allSelEl.length; i++) {
                        allSelEl[i].classList.remove("toc-select");
                    }
                    selEl.classList.add("toc-select");
                }
            }

            lastScroll = currentScroll;
        });
    });
}