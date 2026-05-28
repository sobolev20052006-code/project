document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = document.querySelectorAll(".image-card");
    const counterElem = document.getElementById("image-counter");
    const totalLikesElem = document.getElementById("total-likes");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const likeButtons = document.querySelectorAll(".like-btn");

    // 1. Считаем количество карточек на экране при загрузке
    if (counterElem) {
        counterElem.textContent = galleryItems.length;
    }

    // 2. Логика индивидуальных кликов и суммарного счетчика лайков
    let globalLikesCount = 0;

    likeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation(); // Отменяем всплытие события
            
            const heartIcon = button.querySelector("i");
            const countSpan = button.querySelector(".like-count");
            let cardLikes = parseInt(countSpan.textContent);

            if (heartIcon.classList.contains("far")) {
                // Ставим лайк
                heartIcon.classList.replace("far", "fas");
                cardLikes++;
                globalLikesCount++;
            } else {
                // Убираем лайк
                heartIcon.classList.replace("fas", "far");
                cardLikes--;
                globalLikesCount--;
            }

            countSpan.textContent = cardLikes;
            if (totalLikesElem) {
                totalLikesElem.textContent = globalLikesCount;
            }
        });
    });

    // 3. Динамическая фильтрация карточек по ролям
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Убираем класс активной кнопки у всех и добавляем текущей
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedFilter = button.getAttribute("data-filter");
            let visibleCards = 0;

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");
                
                if (selectedFilter === "all" || itemCategory === selectedFilter) {
                    item.style.display = "block";
                    visibleCards++;
                } else {
                    item.style.display = "none";
                }
            });

            // Обновляем счетчик количества карточек на экране
            if (counterElem) {
                counterElem.textContent = visibleCards;
            }
        });
    });
});