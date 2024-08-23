let headingAlignment = 'center';
let headingColor = '#030712';

// update poster
const updatePoster = () => {
	const heading = document.getElementById('heading').value;
	const imagePreview = document.getElementById('imagePreview').querySelector('img');
	const description = document.getElementById('description').value;

	const poster = document.getElementById('poster');
	poster.innerHTML = '';

	if (heading) {
		const headingElement = document.createElement('h2');
		headingElement.className = 'text-4xl';
		headingElement.style.textAlign = headingAlignment;
		headingElement.style.color = headingColor;
		headingElement.innerText = heading;
		poster.appendChild(headingElement);
	}

	if (imagePreview) {
		const imageElement = imagePreview.cloneNode(true);
		imageElement.className = 'w-full';
		poster.appendChild(imageElement);
	}

	if (description) {
		const descriptionElement = document.createElement('p');
		descriptionElement.className = '';
		descriptionElement.innerText = description;
		poster.appendChild(descriptionElement);
	}
}

// on input changes
document.getElementById('heading').addEventListener('input', updatePoster);
document.getElementById('description').addEventListener('input', updatePoster);
document.getElementById('imageUpload').addEventListener('change', function(event) {
	const file = event.target.files[0];
	const imagePreview = document.getElementById('imagePreview');
	imagePreview.innerHTML = '';

	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			const imgElement = document.createElement('img');
			imgElement.src = e.target.result;
			imgElement.className = 'w-full';
			imagePreview.appendChild(imgElement);

			updatePoster();
		};
		reader.readAsDataURL(file);
	} else {
		updatePoster();
	}
});

// Download poster image
document.getElementById('downloadPoster').addEventListener('click', function() {
	const posterElement = document.getElementById('poster');
	const link = document.createElement('a');
	link.download = 'poster.png';

	const padding = 20;
	const posterRect = posterElement.getBoundingClientRect();

	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	canvas.width = posterRect.width + padding * 2;
	canvas.height = posterRect.height + padding * 2;

	// Set the background
	context.fillStyle = "#FFFFFF";
	context.fillRect(0, 0, canvas.width, canvas.height);

	let yOffset = padding + 20; // Start with padding + some initial top margin

	// Draw the heading
	const headingElement = posterElement.querySelector('h2');
	if (headingElement) {
		context.font = "36px Arial";
		context.fillStyle = headingColor;
		context.textAlign = headingAlignment;
		let xPosition = padding;
		if (headingAlignment === "center") {
			xPosition = canvas.width / 2;
		} else if (headingAlignment === "right") {
			xPosition = canvas.width - padding;
		}
		context.fillText(headingElement.innerText, xPosition, yOffset);
		yOffset += 20;
	}

	// Draw the image
	const imageElement = posterElement.querySelector('img');
	if (imageElement) {
		const img = new Image();
		img.src = imageElement.src;
		img.onload = function() {
			const imgWidth = canvas.width - padding * 2;
			const imgHeight = (img.height / img.width) * imgWidth;
			context.drawImage(img, padding, yOffset, imgWidth, imgHeight);
			yOffset += imgHeight + 30;

			// Draw the description
			const descriptionElement = posterElement.querySelector('p');
			if (descriptionElement) {
				context.font = "18px Arial";
				context.fillStyle = "#555555";
				context.textAlign = "left";
				context.fillText(descriptionElement.innerText, padding, yOffset);
			}

			link.href = canvas.toDataURL('image/png');
			link.click();
		};
	} else {
		// If there's no image, just draw the description
		const descriptionElement = posterElement.querySelector('p');
		if (descriptionElement) {
			context.font = "18px Arial";
			context.fillStyle = "#555555";
			context.textAlign = "left";
			context.fillText(descriptionElement.innerText, padding, yOffset);
		}

		link.href = canvas.toDataURL('image/png');
		link.click();
	}
});

// changed heading position
const changePosition = (position) => {
	headingAlignment = position;
	updatePoster();
}

// change heading color
const changeColor = (color) => {
	headingColor = color;
	updatePoster();
};

// element hide show
const headingContainer = document.getElementById("headingContainer");
const imageContainer = document.getElementById("imageContainer");
const descriptionContainer = document.getElementById("descriptionContainer");
const headingButton = document.getElementById("headingButton");
const imageButton = document.getElementById("imageButton");
const descriptionButton = document.getElementById("descriptionButton");
const itemButtons = document.getElementById("itemButtons");

const toggleShow = (item) => {
	if (item === "heading") {
		console.log("heading click");
		headingContainer.classList.toggle("hidden");
		headingButton.classList.toggle("hidden");
	} else if (item === "image") {
		console.log("image click");
		imageContainer.classList.toggle("hidden");
		imageButton.classList.toggle("hidden");
	} else {
		console.log("description click");
		descriptionContainer.classList.toggle("hidden");
		descriptionButton.classList.toggle("hidden");
	}

	if (headingButton.classList.contains("hidden") && imageButton.classList.contains("hidden") && descriptionButton.classList.contains("hidden")) {
		itemButtons.classList.add("hidden");
	} else {
		itemButtons.classList.remove("hidden");
	}
}
