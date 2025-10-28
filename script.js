// FitFusion Landing Page - Optimized JavaScript
(function () {
	"use strict";

	// Cache DOM elements
	const DOM = {
		menuToggle: null,
		navLinks: null,
		pricingToggle: null,
		monthlyPrices: null,
		yearlyPrices: null,
		filterBtns: null,
		classCards: null,
	};

	// Initialize DOM elements
	function cacheDOMElements() {
		DOM.menuToggle = document.querySelector(
			".menu-toggle"
		);
		DOM.navLinks =
			document.querySelector(".nav-links");
		DOM.pricingToggle =
			document.querySelector(".toggle");
		DOM.monthlyPrices = document.querySelectorAll(
			".monthly-price"
		);
		DOM.yearlyPrices = document.querySelectorAll(
			".yearly-price"
		);
		DOM.filterBtns = document.querySelectorAll(
			".filter-btn"
		);
		DOM.classCards = document.querySelectorAll(
			".class-card"
		);
	}

	// Mobile Menu Toggle
	function initMobileMenu() {
		if (!DOM.menuToggle || !DOM.navLinks) return;

		const toggleMenu = () => {
			DOM.menuToggle.classList.toggle("active");
			DOM.navLinks.classList.toggle("active");
		};

		const closeMenu = () => {
			DOM.menuToggle.classList.remove("active");
			DOM.navLinks.classList.remove("active");
		};

		// Toggle menu
		DOM.menuToggle.addEventListener(
			"click",
			toggleMenu
		);

		// Close menu when clicking links
		DOM.navLinks
			.querySelectorAll("a")
			.forEach((link) => {
				link.addEventListener("click", closeMenu);
			});

		// Close menu when clicking outside
		document.addEventListener("click", (e) => {
			if (
				!DOM.menuToggle.contains(e.target) &&
				!DOM.navLinks.contains(e.target)
			) {
				closeMenu();
			}
		});
	}

	// Pricing Toggle
	function initPricingToggle() {
		if (!DOM.pricingToggle) return;

		DOM.pricingToggle.addEventListener(
			"click",
			() => {
				DOM.pricingToggle.classList.toggle(
					"active"
				);
				const isYearly =
					DOM.pricingToggle.classList.contains(
						"active"
					);

				DOM.monthlyPrices.forEach(
					(el) =>
						(el.style.display = isYearly
							? "none"
							: "block")
				);
				DOM.yearlyPrices.forEach(
					(el) =>
						(el.style.display = isYearly
							? "block"
							: "none")
				);
			}
		);
	}

	// Class Filters
	function initClassFilters() {
		if (
			DOM.filterBtns.length === 0 ||
			DOM.classCards.length === 0
		)
			return;

		DOM.filterBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				// Update active button
				DOM.filterBtns.forEach((b) =>
					b.classList.remove("active")
				);
				btn.classList.add("active");

				const filter = btn.dataset.category;

				// Filter classes
				DOM.classCards.forEach((card) => {
					const shouldShow =
						filter === "all" ||
						card.dataset.category === filter;
					card.style.display = shouldShow
						? "block"
						: "none";
				});
			});
		});
	}

	// Smooth Scroll
	function initSmoothScroll() {
		document
			.querySelectorAll('a[href^="#"]')
			.forEach((anchor) => {
				anchor.addEventListener(
					"click",
					function (e) {
						const href =
							this.getAttribute("href");
						if (href === "#") return;

						e.preventDefault();
						const target =
							document.querySelector(href);

						if (target) {
							target.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						}
					}
				);
			});
	}

	// Scroll Animations (Intersection Observer)
	function initScrollAnimations() {
		const animatedElements =
			document.querySelectorAll(
				".step-card, .class-card, .testimonial, .pricing-card"
			);

		if (animatedElements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.style.opacity = "1";
						entry.target.style.transform =
							"translateY(0)";
						observer.unobserve(entry.target); // Stop observing once animated
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -50px 0px",
			}
		);

		// Set initial state and observe
		animatedElements.forEach((el) => {
			el.style.opacity = "0";
			el.style.transform = "translateY(20px)";
			el.style.transition =
				"opacity 0.6s ease, transform 0.6s ease";
			observer.observe(el);
		});
	}

	// Initialize all features
	function init() {
		cacheDOMElements();
		initMobileMenu();
		initPricingToggle();
		initClassFilters();
		initSmoothScroll();
		initScrollAnimations();
	}

	// Run when DOM is ready
	if (document.readyState === "loading") {
		document.addEventListener(
			"DOMContentLoaded",
			init
		);
	} else {
		init();
	}
})();
