window.addEventListener("load", () => {
	const elHours = document.querySelector(".hours");
	const elMinutes = document.querySelector(".minutes");
	const elSeconds = document.querySelector(".seconds");

	let timeLeft = {
		hours: 0,
		minutes: 0,
		seconds: 0
	};

	let totalSeconds = 0;

	let futureDate = new Date(2021, 12, 25, 20, 00, 00);

	function init() {
		totalSeconds = Math.floor((futureDate - Date.now()) / 1000);
		setTimeLeft();
		let interval = setInterval(() => {
			if (totalSeconds <= 0) {
				clearInterval(interval);
			}
			countTime();
		}, 1000);
	}

	function countTime() {
		if (totalSeconds > 2678400) {
			--timeLeft.seconds;
			if (timeLeft.minutes >= 0 && timeLeft.seconds < 0) {
				timeLeft.seconds = 59;
				--timeLeft.minutes;
				if (timeLeft.hours >= 0 && timeLeft.minutes < 0) {
					timeLeft.minutes = 59;
					--timeLeft.hours;
				}
			}
			--totalSeconds;
		} else {
			timeLeft.seconds = 0;
			timeLeft.minutes = 0;
			timeLeft.hours = 0;
		}
		console.log(totalSeconds)
		printTime();
	}

	function printTime() {
		animateFlip(elHours, timeLeft.hours);
		animateFlip(elMinutes, timeLeft.minutes);
		animateFlip(elSeconds, timeLeft.seconds);
	}

	function animateFlip(element, value) {
		const valueInDom = element.querySelector(".bottom-back").innerText;
		const currentValue = value < 10 ? "0" + value : "" + value;

		if (valueInDom === currentValue) return;

		element.querySelector(".top-back span").innerText = currentValue;
		element.querySelector(".bottom-back span").innerText = currentValue;

		gsap.to(element.querySelector(".top"), 0.7, {
			rotationX: "-180deg",
			transformPerspective: 300,
			ease: Quart.easeOut,
			onComplete: function () {
				element.querySelector(".top").innerText = currentValue;
				element.querySelector(".bottom").innerText = currentValue;
				gsap.set(element.querySelector(".top"), { rotationX: 0 });
			}
		});

		gsap.to(element.querySelector(".top-back"), 0.7, {
			rotationX: 0,
			transformPerspective: 300,
			ease: Quart.easeOut,
			clearProps: "all"
		});
	}

	function setTimeLeft() {
		timeLeft.hours = Math.floor((totalSeconds / (60 * 60)) % 24);
		timeLeft.minutes = Math.floor((totalSeconds / 60) % 60);
		timeLeft.seconds = Math.floor(totalSeconds % 60);
	}

	init();
});