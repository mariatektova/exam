
document.addEventListener("DOMContentLoaded", function() {
    function initSlider(selector) {
        let slideTimer = null;

        let currentSlideIndex = 0;
        let slider = document.querySelector(selector);
        let slides = slider.querySelectorAll(".slide");

        let slidesWrap = document.createElement("div");
        slidesWrap.classList.add("slides_wrap");

        let slidesNav = document.createElement("div");
        slidesNav.classList.add("slides_nav");

        slider.innerHTML = null;
        slider.appendChild(slidesWrap);
        slider.appendChild(slidesNav);

        for (let i = 0; i < slides.length; i++) {
            let pointer = document.createElement("div");
            pointer.classList.add("slides_nav_pointer");
            pointer.addEventListener("click", function() {
                slideTo(i);
            });

            slidesNav.appendChild(pointer);
        }

        let getSlide = function(index) {
            return slides[getSlideIndex(index)];
        }

        let getSlideIndex = function(index) {
            if (index < 0) return slides.length - 1;
            if (index > slides.length - 1) return 0;
            return index;
        }

        let planSlideNext = function() {
            slideTimer = window.setTimeout(slideToNext, 2000);
        }

        let slideToNext = function() {
            slideTo(getSlideIndex(currentSlideIndex + 1));
        }

        let slideTo = function(index) {
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


		const slider = document.querySelector(".teamSlider");
		const sliderContainer = slider.querySelectorAll(".slider_container");
		slider.innerHTML = null;
		let currentSlide = 0;
		const slideItemsCount = 4;
		const slidesCount = Math.ceil(sliderContainer.length / slideItemsCount);

		const slideInner = document.createElement("div");
		slideInner.classList.add("slide_inner");

		const getSlideIndex = function(index) {
			if (index < 0) return slidesCount - 1;
			if (index > slidesCount - 1) return 0;
			return index;
		}

		const drawSlide = function(index, side = 1) {
			const div = document.createElement("div");

			for (let i = index * slideItemsCount; i < (index + 1) * slideItemsCount; i++) {
				div.append(sliderContainer[i]);
			}

			if (side > 0) {
				slideInner.append(div);
			} else {
				slideInner.prepend(div);
			}
		}

		const slideLeft = function() {
			slider.classList.add("sliding_left");
			currentSlide = getSlideIndex(currentSlide + 1);
			drawSlide(currentSlide, 1);
			window.setTimeout(function() {
				slider.classList.remove("sliding_left");
				slideInner.innerHTML = null;
				drawSlide(currentSlide, 1);
			}, 600);
		}

		const slideRight = function() {
			slider.classList.add("sliding_right");
			currentSlide = getSlideIndex(currentSlide - 1);
			drawSlide(currentSlide, -1);
			window.setTimeout(function(){
				slider.classList.remove("sliding_right");
				slideInner.innerHTML = null;
				drawSlide(currentSlide, -1);
			}, 600);
		}

		const prevButton = document.createElement("button");
		prevButton.innerHTML = "назад";
		prevButton.classList.add("prev_btn");
		slider.appendChild(prevButton);
		prevButton.addEventListener("click", slideRight);

		const slideWrap = document.createElement("div");
		slideWrap.classList.add("slide_wrap");
		slider.appendChild(slideWrap);

		slideWrap.appendChild(slideInner);

		const nextButton = document.createElement("button");
		nextButton.innerHTML = "вперед";
		nextButton.classList.add("next_btn");
		slider.appendChild(nextButton);
		nextButton.addEventListener("click", slideLeft);

		drawSlide(currentSlide);
	
});
