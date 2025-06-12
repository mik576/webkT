// ===== JavaScript Next / Prev cho vùng .promo-slider =====

// Lấy DOM elements
const slider = document.getElementById('promoSlider');
const prevBtnEl = document.getElementById('prevBtn');
const nextBtnEl = document.getElementById('nextBtn');

// Hàm tính số px cần cuộn mỗi lần (width của .promo-slider-wrapper)
function getScrollAmount() {
    return slider.parentElement.clientWidth;
}

// Khi bấm Next, cuộn sang phải 1 “view”
nextBtnEl.addEventListener('click', () => {
    const amount = getScrollAmount();
    slider.scrollBy({ left: amount, behavior: 'smooth' });
});

// Khi bấm Prev, cuộn sang trái 1 “view”
prevBtnEl.addEventListener('click', () => {
    const amount = getScrollAmount();
    slider.scrollBy({ left: -amount, behavior: 'smooth' });
});

// Tùy chọn: ẩn nút Prev khi ở đầu, ẩn nút Next khi ở cuối
function updateNavButtons() {
    const scrollLeft = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    // Ẩn Prev nếu đang ở đầu
    if (scrollLeft <= 0) {
        prevBtnEl.style.display = 'none';
    } else {
        prevBtnEl.style.display = 'block';
    }
    // Ẩn Next nếu đang ở cuối
    if (scrollLeft >= maxScroll) {
        nextBtnEl.style.display = 'none';
    } else {
        nextBtnEl.style.display = 'block';
    }
}

// Cập nhật lần đầu sau khi DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    updateNavButtons();
});

// Cập nhật khi slider có sự kiện scroll
slider.addEventListener('scroll', () => {
    updateNavButtons();
});

// Cập nhật khi resize window (scrollWidth / clientWidth thay đổi)
window.addEventListener('resize', () => {
    updateNavButtons();
});


function scrollSlider(direction) {
    const slider = document.getElementById("slider");
    // Lấy một .location-card để biết chiều rộng + gap
    const card = slider.querySelector(".location-card");
    if (!card) return;

    // Tổng khoảng cách cần scroll = width card + margin-right
    // margin-right của .location-card được đặt là 16px trong CSS => 16
    const gap = 16;
    const scrollAmount = card.offsetWidth + gap;

    slider.scrollBy({
        left: scrollAmount * direction,
        behavior: "smooth"
    });
}

// trang chu noi luu tru 

const carousel = document.querySelector('#destinationsCarousel');
const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: false,
    wrap: false
});

// js cua html dat phong 

document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "/img/diadiem/danang.png",
        "/img/diadiem/danang.png",
        "/img/diadiem/danang.png",
        "/img/diadiem/danang.png",
        "/img/diadiem/danang.png",
        "/img/diadiem/danang.png",
        "/img/diadiem/danang.png",
        "/img/diadiem/danang.png",
        "/img/diadiem/danang.png"
    ];

    const maxThumbs = 6;
    const thumbnailContainer = document.getElementById("thumbnailContainer");
    const moreImagesContainer = document.getElementById("moreImagesContainer");

    images.forEach((src, index) => {
        if (index < maxThumbs) {
            const col = document.createElement("div");
            col.className = "col-2";
            const img = document.createElement("img");
            img.src = src;
            img.alt = `Thumbnail ${index + 1}`;
            img.className = "hotel-thumb-img w-100 rounded object-fit-cover";
            img.addEventListener("click", () => {
                document.getElementById("mainImage").src = src;
            });
            col.appendChild(img);
            thumbnailContainer.appendChild(col);
        }

        // Tạo ảnh trong modal
        const modalCol = document.createElement("div");
        modalCol.className = "col-md-3";
        const modalImg = document.createElement("img");
        modalImg.src = src;
        modalImg.className = "w-100 rounded object-fit-cover";
        modalImg.alt = `Ảnh ${index + 1}`;
        modalCol.appendChild(modalImg);
        moreImagesContainer.appendChild(modalCol);
    });

    if (images.length > maxThumbs) {
        const moreCount = images.length - maxThumbs;
        const moreCol = document.createElement("div");
        moreCol.className = "col-2 thumb-more position-relative";
        const moreImg = document.createElement("img");
        moreImg.src = images[maxThumbs];
        moreImg.className = "hotel-thumb-img w-100 rounded object-fit-cover";
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.textContent = `+${moreCount} ảnh`;
        moreCol.appendChild(moreImg);
        moreCol.appendChild(overlay);
        moreCol.addEventListener("click", () => {
            const modal = new bootstrap.Modal(document.getElementById("galleryModal"));
            modal.show();
        });
        thumbnailContainer.appendChild(moreCol);
    }
});
