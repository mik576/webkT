document.addEventListener("DOMContentLoaded", function () {
    // Lấy danh sách button lọc và các card
    const buttons = document.querySelectorAll("#activitiesSection .btn-group .btn");
    const cards = document.querySelectorAll("#activitiesSection .activity-card");

    // Hàm filter để hiển thị card theo category
    function filterSelection(category) {
        cards.forEach((card) => {
            if (category === "all") {
                card.classList.add("show");
            } else {
                if (card.getAttribute("data-category") === category) {
                    card.classList.add("show");
                } else {
                    card.classList.remove("show");
                }
            }
        });
    }

    // Khởi tạo: show hết (category = "all")
    filterSelection("all");

    // Thêm sự kiện cho từng nút
    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Bỏ class active của tất cả button
            buttons.forEach((b) => b.classList.remove("active"));
            // Gán active cho button được click
            this.classList.add("active");

            // Lấy giá trị lọc từ data-filter
            const filterValue = this.getAttribute("data-filter");
            filterSelection(filterValue);
        });
    });
});
