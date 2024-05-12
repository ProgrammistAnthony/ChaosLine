const state = {
	modalOpen: false
};
const carouselList = document.querySelector('.galery__list');
const galeryItems = document.querySelectorAll('.galery__item');
const elems = Array.from(galeryItems);
const modalOverlay = document.createElement('div');
modalOverlay.classList.add('modal-overlay');
document.body.appendChild(modalOverlay);

const galery = document.querySelector('.galery'); // Получаем элемент с классом .galery

modalOverlay.addEventListener('click', function () {
	if (state.modalOpen) {
	  closeModal();
	}
});

carouselList.addEventListener('click', function (event) {
	const newActive = event.target.closest('.galery__item');

	if (!newActive) {
	  if (state.modalOpen) {
		closeModal();
	  }
	  return;
	};

	if (newActive.classList.contains('galery__item_active')) {
	  if (!state.modalOpen) {
		openModal(newActive);
	  } else {
		closeModal();
	  }
	} else {
	  update(newActive);
	}
});

function closeModal() {
	const current = elems.find(elem => elem.dataset.pos == 0);
	if (current) {
	  current.style.transform = '';
	}
	modalOverlay.style.display = 'none';
	galery.style.height = ''; // Сброс высоты при закрытии
	state.modalOpen = false;
}

function openModal(item) {
	item.style.transform = 'scale(1.5)';
	modalOverlay.style.display = 'block';
	galery.style.height = '120vh'; // Установка высоты при открытии
	state.modalOpen = true;
}

const update = function(newActive) {
	const newActivePos = newActive.dataset.pos;

	const current = elems.find(elem => elem.dataset.pos == 0);
	const prev = elems.find(elem => elem.dataset.pos == -1);
	const next = elems.find(elem => elem.dataset.pos == 1);
	const first = elems.find(elem => elem.dataset.pos == -2);
	const last = elems.find(elem => elem.dataset.pos == 2);

	current.classList.remove('galery__item_active');

	[current, prev, next, first, last].forEach(item => {
	  var itemPos = item.dataset.pos;
	  item.dataset.pos = getPos(itemPos, newActivePos);
	});

	newActive.classList.add('galery__item_active');
};

const getPos = function (current, active) {
	const diff = current - active;
	if (Math.abs(diff) > 2) {
	  return -current;
	}
	return diff;
};
