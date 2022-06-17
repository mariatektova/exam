
document.addEventListener("DOMContentLoaded", function() {
    function initSlider(selector) {
        var slideTimer = null;

        let currentSlideIndex = 0;
        var slider = document.querySelector(selector);
        var slides = slider.querySelectorAll(".slide");

        var slidesWrap = document.createElement("div");
        slidesWrap.classList.add("slides_wrap");

        var slidesNav = document.createElement("div");
        slidesNav.classList.add("slides_nav");

        slider.innerHTML = null;
        slider.appendChild(slidesWrap);
        slider.appendChild(slidesNav);

        for (let i = 0; i < slides.length; i++) {
            var pointer = document.createElement("div");
            pointer.classList.add("slides_nav_pointer");
            pointer.addEventListener("click", function() {
                slideTo(i);
            });

            slidesNav.appendChild(pointer);
        }

        var getSlide = function(index) {
            return slides[getSlideIndex(index)];
        }

        var getSlideIndex = function(index) {
            if (index < 0) return slides.length - 1;
            if (index > slides.length - 1) return 0;
            return index;
        }

        var planSlideNext = function() {
            slideTimer = window.setTimeout(slideToNext, 2000);
        }

        var slideToNext = function() {
            slideTo(getSlideIndex(currentSlideIndex + 1));
        }

        var slideTo = function(index) {
            slidesWrap.innerHTML = null;

            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("slide-left");
                slides[i].classList.remove("slide-right");
                slides[i].classList.remove("slide-current");
            }

            currentSlideIndex = index;

            getSlide(currentSlideIndex - 1).classList.add("slide-left");
            getSlide(currentSlideIndex).classList.add("slide-current");
            getSlide(currentSlideIndex + 1).classList.add("slide-right");

            slidesWrap.appendChild(getSlide(currentSlideIndex - 1));
            slidesWrap.appendChild(getSlide(currentSlideIndex));
            slidesWrap.appendChild(getSlide(currentSlideIndex + 1));

            document.querySelector(".slides_nav_pointer-current")?.classList.remove("slides_nav_pointer-current");
            document.querySelector(`.slides_nav_pointer:nth-child(${currentSlideIndex + 1})`)?.classList.add("slides_nav_pointer-current");
        }

        slideTo(0);
    }

    initSlider("#mainSlider");
});








