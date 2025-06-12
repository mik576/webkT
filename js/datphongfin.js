// js/datphongfin.js
document.addEventListener("DOMContentLoaded", function () {
    // Lấy đúng input
    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");
    const guestField = document.getElementById("guestField");
    const guestDisplay = document.getElementById("guestsDisplay");
    const form = document.getElementById("searchForm");

    // 1) Khởi tạo Flatpickr cho startDate
    let endDatePicker = null;
    if (startInput) {
        flatpickr(startInput, {
            dateFormat: "d/m/Y",
            minDate: "today",
            locale: "vi",
            onChange: function (selectedDates) {
                if (selectedDates.length > 0) {
                    // enable endInput
                    if (endInput) {
                        endInput.removeAttribute("disabled");
                        const minEnd = selectedDates[0];
                        if (!endDatePicker) {
                            endDatePicker = flatpickr(endInput, {
                                dateFormat: "d/m/Y",
                                minDate: minEnd,
                                locale: "vi",
                            });
                        } else {
                            endDatePicker.set("minDate", minEnd);
                        }
                    }
                }
            }
        });
    }
    // 2) Khởi tạo Flatpickr cho endDate (disabled ban đầu)
    if (endInput) {
        endInput.setAttribute("disabled", "disabled");
        // endDatePicker sẽ được khởi tạo trong onChange của startPicker
    }

    // 3) Popup guest controls
    if (guestField && guestDisplay) {
        // Tạo container popup nếu chưa có
        const gc = document.createElement("div");
        gc.className = "guest-controls";
        // style cơ bản có thể gán ở CSS, ở đây assume CSS đã có .guest-controls {position:absolute; display:none; ...}
        guestField.style.position = "relative";
        guestField.appendChild(gc);
        gc.innerHTML = `
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span>Người lớn:</span>
            <div>
              <button type="button" class="btn btn-sm btn-outline-secondary minus" data-target="adults">–</button>
              <span id="adultsCount" class="mx-2">2</span>
              <button type="button" class="btn btn-sm btn-outline-secondary plus" data-target="adults">+</button>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between mb-2">
            <span>Trẻ em:</span>
            <div>
              <button type="button" class="btn btn-sm btn-outline-secondary minus" data-target="children">–</button>
              <span id="childrenCount" class="mx-2">0</span>
              <button type="button" class="btn btn-sm btn-outline-secondary plus" data-target="children">+</button>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <span>Phòng:</span>
            <div>
              <button type="button" class="btn btn-sm btn-outline-secondary minus" data-target="rooms">–</button>
              <span id="roomsCount" class="mx-2">1</span>
              <button type="button" class="btn btn-sm btn-outline-secondary plus" data-target="rooms">+</button>
            </div>
          </div>
        `;
        guestDisplay.addEventListener("click", function (e) {
            e.stopPropagation();
            gc.style.display = (gc.style.display === "block" ? "none" : "block");
        });
        document.addEventListener("click", function (e) {
            if (!guestField.contains(e.target)) {
                gc.style.display = "none";
            }
        });
        gc.querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", function () {
                const t = this.dataset.target;
                const span = document.getElementById(t + "Count");
                let v = parseInt(span.textContent, 10);
                if (this.classList.contains("plus")) v++;
                else v = Math.max(v - 1, t === "rooms" ? 1 : 0);
                span.textContent = v;
                // Cập nhật hiển thị
                const a = document.getElementById("adultsCount").textContent;
                const c = document.getElementById("childrenCount").textContent;
                const r = document.getElementById("roomsCount").textContent;
                guestDisplay.value = `${a} người lớn, ${c} trẻ em, ${r} phòng`;
            });
        });
    }

    // 4) Bắt sự kiện submit
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const result = {
                startDate: startInput ? startInput.value : "",
                endDate: endInput ? endInput.value : "",
                guests: guestDisplay ? guestDisplay.value : ""
            };
            console.log(result);
            // Thực hiện tìm kiếm hoặc AJAX tiếp theo...
        });
    }
});
