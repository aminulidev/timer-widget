function updatePoster() {
	const heading = document.getElementById('heading').value;
	const imagePreview = document.getElementById('imagePreview').querySelector('img');
	const description = document.getElementById('description').value;

	const poster = document.getElementById('poster');
	poster.innerHTML = '';

	if (heading) {
		const headingElement = document.createElement('h2');
		headingElement.className = 'text-4xl font-bold mb-4';
		headingElement.innerText = heading;
		poster.appendChild(headingElement);
	}

	if (imagePreview) {
		const imageElement = imagePreview.cloneNode(true);
		imageElement.className = 'w-full mb-4';
		poster.appendChild(imageElement);
	}

	if (description) {
		const descriptionElement = document.createElement('p');
		descriptionElement.className = '';
		descriptionElement.innerText = description;
		poster.appendChild(descriptionElement);
	}
}

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
			imgElement.className = 'w-full rounded';
			imagePreview.appendChild(imgElement);

			updatePoster();
		};
		reader.readAsDataURL(file);
	} else {
		updatePoster();
	}
});

document.getElementById('downloadPoster').addEventListener('click', function() {
	const posterElement = document.getElementById('poster');
	const link = document.createElement('a');
	link.download = 'poster.png';

	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	const posterRect = posterElement.getBoundingClientRect();
	canvas.width = posterRect.width;
	canvas.height = posterRect.height;

	context.fillStyle = "#FFFFFF";
	context.fillRect(0, 0, canvas.width, canvas.height);

	let yOffset = 20;

	const headingElement = posterElement.querySelector('h2');
	if (headingElement) {
		context.font = "24px Arial";
		context.fillStyle = "#000000";
		context.textAlign = "center";
		context.margingTop = "12px";
		context.fillText(headingElement.innerText, canvas.width / 2, yOffset);
		yOffset += 40;
	}

	const imageElement = posterElement.querySelector('img');
	if (imageElement) {
		const img = new Image();
		img.src = imageElement.src;
		img.onload = function() {
			const imgWidth = canvas.width;
			const imgHeight = (img.height / img.width) * imgWidth;
			context.drawImage(img, 0, yOffset, imgWidth, imgHeight);
			yOffset += imgHeight + 20;

			// After drawing the image, draw the description (if any)
			const descriptionElement = posterElement.querySelector('p');
			if (descriptionElement) {
				context.font = "18px Arial";
				context.fillStyle = "#555555";
				context.textAlign = "center";
				context.margingTop = "20px";
				context.fillText(descriptionElement.innerText, canvas.width / 2, yOffset);
			}

			link.href = canvas.toDataURL('image/png');
			link.click();
		};
	} else {
		const descriptionElement = posterElement.querySelector('p');
		if (descriptionElement) {
			context.font = "18px Arial";
			context.fillStyle = "#555555";
			context.textAlign = "center";
			context.fillText(descriptionElement.innerText, canvas.width / 2, yOffset);
		}

		link.href = canvas.toDataURL('image/png');
		link.click();
	}
});