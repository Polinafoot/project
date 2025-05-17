let editIndex = -1; // Глобальная переменная для отслеживания редактирования

// Добавление или обновление товара в вишлист
function addItem() {
    const itemName = document.getElementById("itemInput").value.trim();
    const itemLink = document.getElementById("itemLink").value.trim();
    const itemImage = document.getElementById("itemImage").value.trim();
    const itemDescription = document.getElementById("itemDescription").value.trim();
    const itemCategory = document.getElementById("itemCategory").value.trim();

    if (!itemName) {
        alert("Введите название товара.");
        return;
    }

    const wishlist = getWishlist();

    const newItem = {
        name: itemName,
        link: itemLink,
        image: itemImage,
        description: itemDescription,
        category: itemCategory
    };

    if (editIndex === -1) {
        // Добавление нового товара
        wishlist.push(newItem);
    } else {
        // Обновление существующего товара
        wishlist[editIndex] = newItem;
        editIndex = -1;
        document.getElementById("addButton").textContent = "Добавить";
    }

    saveWishlist(wishlist);
    renderWishlist();
    clearInputFields();
}

// Очистка полей ввода формы
function clearInputFields() {
    document.getElementById("itemInput").value = "";
    document.getElementById("itemLink").value = "";
    document.getElementById("itemImage").value = "";
    document.getElementById("itemDescription").value = "";
    document.getElementById("itemCategory").value = "";
}

// Получаем список товаров из LocalStorage
function getWishlist() {
    const wishlistData = localStorage.getItem("wishlist");
    try {
        return wishlistData ? JSON.parse(wishlistData) : [];
    } catch (error) {
        console.error("Ошибка при разборе данных вишлиста:", error);
        localStorage.removeItem("wishlist"); // Очистить поврежденные данные
        return [];
    }
}

// Сохраняем список товаров в LocalStorage
function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Отображаем список товаров на странице
function renderWishlist() {
    const list = document.getElementById("itemList");
    list.innerHTML = "";
    const wishlist = getWishlist();

    wishlist.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.className = "wishlist-item";
        listItem.innerHTML = `
            <h3>${item.name}</h3>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">Перейти к товару</a>
            <p>${item.description}</p>
            <img src="${item.image}" alt="${item.name}" style="max-width: 100px;">
            <p><em>Категория: ${item.category}</em></p>
            <button onclick="editItem(${index})">Редактировать</button>
            <button onclick="deleteItem(${index})">Удалить</button>
        `;
        list.appendChild(listItem);
    });
}

// Удаление товара из списка
function deleteItem(index) {
    const wishlist = getWishlist();
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    renderWishlist();

    // Если мы в режиме редактирования текущего удаленного элемента — сбросим
    if (editIndex === index) {
        editIndex = -1;
        clearInputFields();
        document.getElementById("addButton").textContent = "Добавить";
    }
}

// Редактирование товара — заполнение формы значениями выбранного товара
function editItem(index) {
    const wishlist = getWishlist();
    const item = wishlist[index];

    document.getElementById("itemInput").value = item.name;
    document.getElementById("itemLink").value = item.link;
    document.getElementById("itemImage").value = item.image;
    document.getElementById("itemDescription").value = item.description;
    document.getElementById("itemCategory").value = item.category;

    document.getElementById("addButton").textContent = "Обновить";
    editIndex = index;
}

// Анимация при загрузке страницы — плавное появление блока .hero и отрисовка списка
window.onload = function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = 0;
        setTimeout(() => {
            hero.style.transition = 'opacity 1s';
            hero.style.opacity = 1;
        }, 100);
    }

    renderWishlist();
};

// Обработка клика по ссылке "Мой вишлист" — вывод alert
const wishlistLink = document.querySelector('.wishlist-link');
if (wishlistLink) {
    wishlistLink.addEventListener('click', function(event) {
        alert('Вы переходите на страницу с вашим вишлистом!');
    });
}

// Новый слушатель — логируем все клики по странице для проверки (если нужно, можно удалить)
document.addEventListener('click', function(event) {
    console.log('Клик произошёл! Элемент:', event.target);
});
