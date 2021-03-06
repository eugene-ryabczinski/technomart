var overlay = document.querySelector(".overlay");
var modal = document.querySelectorAll(".modal");
var closeButton = document.querySelectorAll(".modal__close");

// Блок с картой
var mapLink = document.querySelector(".contacts__map-link");
var mapModal = document.querySelector(".modal-map");
if(typeof(mapModal) != "undefined" && mapModal !== null) {
	mapLink.addEventListener("click", function(evt) { 
		evt.preventDefault();
		mapModal.classList.add("modal--show");
		overlay.classList.add("overlay--show");
	});	
}

// Блок feedback
var contactsButton = document.querySelector(".contacts__button");
var feedbackModal = document.querySelector(".feedback");
if(typeof(feedbackModal) != "undefined" && feedbackModal !== null) {
	var feedbackForm = feedbackModal.querySelector(".feedback__form");
	var feedbackInputs = feedbackForm.querySelectorAll(".feedback__input");
	var feedbackName = feedbackModal.querySelector("[name=name]");
	var feedbackEmail = feedbackModal.querySelector("[name=email]");
	
	contactsButton.addEventListener("click", function(evt) { 
		evt.preventDefault();
		feedbackModal.classList.add("modal--show");
		overlay.classList.add("overlay--show");
		feedbackName.focus();
	});
	
	feedbackForm.addEventListener("submit", function(evt) {
		if (!feedbackName.value || !feedbackEmail.value) {
			evt.preventDefault();
			feedbackModal.classList.remove("modal--error");
			feedbackModal.offsetWidth = feedbackModal.offsetWidth;
			feedbackModal.classList.add("modal--error");
		}
	});		
}

// Поведение модальных окон? попробовать вынести в отдельный блок? вместе с механизмом оверлея?



// Механизм закрытия модальных окон при нажатии на крестик. так? навешиваем на все кнопки закрытия обработчик. Делаем при помощи замыкания. 
var modalClose = function (closeButton) {
	closeButton.addEventListener("click", function(evt) { 
		evt.preventDefault();
		for (var i=0; i < modal.length; i++) { 
			if (modal[i].classList.contains("modal--show")) { // Подумай, нужна ли эта проверка? Может без неё?
				modal[i].classList.remove("modal--show");
			} 
			modal[i].classList.remove("modal--error"); //м.б. тоже дать проверку?
		}
		overlay.classList.remove("overlay--show");
	});
}

for (var i=0; i < closeButton.length; i++) {
	modalClose(closeButton[i]);
}

// Механизм закрытия модальных окон при нажатии на esc
window.addEventListener("keydown", function(evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		for (var i=0; i < modal.length; i++) { 
			if (modal[i].classList.contains("modal--show")) {
				modal[i].classList.remove("modal--show");
			} 
			modal[i].classList.remove("modal--error"); //м.б. тоже дать проверку?
		}
		if (overlay.classList.contains("overlay--show")) {
			overlay.classList.remove("overlay--show");
		}		
	}		
});

// Механизм закрытия модальных окон при нажатии на overlay
overlay.addEventListener("click", function(evt) {
	evt.preventDefault();
	for (var i=0; i < modal.length; i++) { 
		if (modal[i].classList.contains("modal--show")) {
			modal[i].classList.remove("modal--show");
		} 
		modal[i].classList.remove("modal--error");
	}
	if (overlay.classList.contains("overlay--show")) {
		overlay.classList.remove("overlay--show");
	}		
});	

// Блок слайдера
var slides = document.querySelectorAll(".promo-slider__item");
if(typeof(slides) != "undefined" && slides !== null && slides.length !== 0) {
	var sliderControls = document.querySelectorAll(".slider-controls__arrow"); // в коде не используется. но пока оставь
	var sliderControlNext = document.querySelector(".slider-controls__arrow--next");
	var sliderControlPrevious = document.querySelector(".slider-controls__arrow--previous");
	var sliderToggles = document.querySelectorAll(".slider-toggles__button");
	var sliderCurrentIndex = 0;
	
	var changeSlide = function (index) {
		sliderCurrentIndex = index;
		console.log(index);
		for (var j=0; j < slides.length; j++) {
			if (j == sliderCurrentIndex) {
				slides[j].classList.add("promo-slider__item--show");
				sliderToggles[j].classList.add("slider-toggles__button--active");
			} else {
				slides[j].classList.remove("promo-slider__item--show");
				sliderToggles[j].classList.remove("slider-toggles__button--active");		
			}	
		}			
	}
	
	var moveIndex = function (slideSwitcher, index) {
		slideSwitcher.addEventListener("click", function(evt) {
			evt.preventDefault();
			changeSlide(index, slideSwitcher);
		});	
	}
	
	for (var i=0; i < sliderToggles.length; i++) { 
		moveIndex(sliderToggles[i], i);	
	}
	
	sliderControlNext.addEventListener("click", function(evt) {
		evt.preventDefault();
		if (sliderCurrentIndex < slides.length-1 ) {
			sliderCurrentIndex++;
		} else {
			sliderCurrentIndex=0;
		}
		changeSlide(sliderCurrentIndex);	
	});
	
	sliderControlPrevious.addEventListener("click", function(evt) {
		evt.preventDefault();
		if (sliderCurrentIndex > 0) {
			sliderCurrentIndex--;
		} else {
			sliderCurrentIndex=slides.length-1;
		}
		changeSlide(sliderCurrentIndex);
	});		
}

// Блок сервисы
var servicesList = document.querySelectorAll(".services-list__item");
if(typeof(servicesList) != "undefined" && servicesList !== null && slides.length !== 0) {
	var servicesTabs = document.querySelectorAll(".services-tab__button");
	var servicesCurrentIndex = 0;
	
	var servicesInit = function() {
		servicesTabs[servicesCurrentIndex].classList.add("services-tab__button--active");
		servicesList[servicesCurrentIndex].classList.add("services-list__item--show");
	}
	
	servicesInit();
	
	var changeServiceSlide = function (index) {
		for (var i=0; i < servicesTabs.length; i++) {
			if (i==index) {
				servicesTabs[i].classList.add("services-tab__button--active");
				servicesList[i].classList.add("services-list__item--show");
	
			} else {
				servicesTabs[i].classList.remove("services-tab__button--active");
				servicesList[i].classList.remove("services-list__item--show");
			}
		}	
	}
	
	var moveTabIndex = function (index, tab) {
		tab.addEventListener("click", function(evt) {
			evt.preventDefault();
			servicesCurrentIndex = index;
			changeServiceSlide(servicesCurrentIndex);
		});
	}
	
	for (var i=0; i < servicesTabs.length; i++) { 
		moveTabIndex(i, servicesTabs[i]);	
	}
		
}

// Блок купить 
var purchaseModal = document.querySelector(".purchase");
if(typeof(purchaseModal) != "undefined" && purchaseModal !== null) {
	var buttonBuy = document.querySelectorAll(".products__buy-button");
	var buttonContinueShopping = document.querySelectorAll(".purchase__button--continue-shopping");
	var buttonCheckout = document.querySelector(".purchase__button--checkout");
	
	var openPurchaseModal = function (buttonOpen) {
		buttonOpen.addEventListener("click", function(evt) {
			evt.preventDefault();
			purchaseModal.classList.add("modal--show");
			overlay.classList.add("overlay--show");
		});
	}
	
	for (var i=0; i < buttonBuy.length; i++) {
		openPurchaseModal(buttonBuy[i]);
	}
	
	// Вариант работы с nodelist без использования замыкания. Преобразуем коллекцию в массив, перебираем, вашем обработчик. Компактно!
	var buttonContinueShoppingArray = Array.prototype.slice.call(document.querySelectorAll(".purchase__button--continue-shopping"));
	
	buttonContinueShoppingArray.forEach(function(button, n) {
		button.addEventListener("click", function(evt) {
			purchaseModal.classList.remove("modal--show");
			overlay.classList.remove("overlay--show");
		});
	});
}