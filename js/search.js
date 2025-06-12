document.addEventListener('DOMContentLoaded', () => {
    // 1) Autocomplete Địa điểm: create dropdown dynamically
    const locationInput = document.getElementById('location');
    const locField = document.getElementById('locationField');
    const dropdown = document.createElement('div');
    dropdown.className = 'location-dropdown';
    dropdown.style.display = 'none';
    locField.style.position = 'relative';
    locField.appendChild(dropdown);

    const cities = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Nha Trang', 'Đà Lạt'];
    function renderCities(list) {
        dropdown.innerHTML = list.map(c => `<div class="location-item">${c}</div>`).join('');
        dropdown.style.display = list.length ? 'block' : 'none';
        dropdown.querySelectorAll('.location-item').forEach(el => {
            el.addEventListener('click', () => {
                locationInput.value = el.textContent;
                dropdown.style.display = 'none';
            });
        });
    }
    locationInput.addEventListener('input', () => {
        const q = locationInput.value.toLowerCase();
        renderCities(cities.filter(c => c.toLowerCase().includes(q)));
    });
    locationInput.addEventListener('focus', () => renderCities(cities));
    document.addEventListener('click', e => {
        if (e.target !== locationInput && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });



    // 3) Guest dropdown: create dynamically
    const guestDisplay = document.getElementById('guestsDisplay');
    const guestField = document.getElementById('guestField');
    const gc = document.createElement('div');
    gc.className = 'guest-controls';
    guestField.style.position = 'relative';
    guestField.appendChild(gc);

    gc.innerHTML = `
  <div class="guest-row"><span>Người lớn:</span>
    <button type="button" class="minus" data-target="adults">-</button>
    <span id="adultsCount">2</span>
    <button type="button" class="plus" data-target="adults">+</button>
  </div>
  <div class="guest-row"><span>Trẻ em:</span>
    <button type="button" class="minus" data-target="children">-</button>
    <span id="childrenCount">0</span>
    <button type="button" class="plus" data-target="children">+</button>
  </div>
  <div class="guest-row"><span>Phòng:</span>
    <button type="button" class="minus" data-target="rooms">-</button>
    <span id="roomsCount">1</span>
    <button type="button" class="plus" data-target="rooms">+</button>
  </div>
`;
    gc.style.display = 'none';

    guestDisplay.addEventListener('click', e => {
        e.stopPropagation();
        gc.style.display = gc.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', e => {
        if (!guestField.contains(e.target)) gc.style.display = 'none';
    });

    gc.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const t = btn.dataset.target;
            const span = document.getElementById(t + 'Count');
            let v = parseInt(span.textContent, 10);
            if (btn.classList.contains('plus')) v++;
            else v = Math.max(v - 1, t === 'rooms' ? 1 : 0);
            span.textContent = v;
            // update display
            const a = document.getElementById('adultsCount').textContent;
            const c_ = document.getElementById('childrenCount').textContent;
            const r = document.getElementById('roomsCount').textContent;
            guestDisplay.value = `${a} người lớn, ${c_} trẻ em, ${r} phòng`;
        });
    });

    // 4) Submit
    document.getElementById('searchForm').addEventListener('submit', e => {
        e.preventDefault();
        console.log({ location: locationInput.value, dateRange: dateInput.value, guests: guestDisplay.value });
    });
});

const dateInput = document.getElementById('dateRange');

flatpickr(dateInput, {
    mode: 'range',
    dateFormat: 'd/m/Y',
    minDate: 'today',
    onChange: function (selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
            const [start, end] = selectedDates;
            const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

            // Format lại ngày
            const startStr = instance.formatDate(start, "d/m/Y");
            const endStr = instance.formatDate(end, "d/m/Y");

            // Ghi lại giá trị vào input
            dateInput.value = `${startStr} đến ${endStr} (${nights} đêm)`;
        }
    }
});



