// Admin JavaScript for managing dishes and categories

let dishes = JSON.parse(localStorage.getItem('dishes')) || [
    { id: 1, name: 'Gà sốt cay', category: 'Món chính', price: 50000, description: 'Phở bò truyền thống', image: 'img/pho.jpg', available: true },
    { id: 2, name: 'Mì lạnh', category: 'Khai vị', price: 30000, description: 'Gỏi cuốn tươi ngon', image: 'img/goi.jpg', available: true },
    { id: 3, name: 'Bánh ', category: 'Tráng miệng', price: 25000, description: 'Bánh flan kem ngon', image: 'img/flan.jpg', available: false },
    { id: 4, name: 'Cà Phê Sữa Đá', category: 'Đồ uống', price: 20000, description: 'Cà phê sữa đá Việt Nam', image: 'img/cafe.jpg', available: true }
];

let categories = JSON.parse(localStorage.getItem('categories')) || ['Món chính', 'Khai vị', 'Tráng miệng', 'Đồ uống'];

document.addEventListener('DOMContentLoaded', function() {
    loadAdminData();
    setupForms();
});

function loadAdminData() {
    displayDishes();
    displayCategories();
    populateCategorySelect();
}

function displayDishes() {
    const dishManagement = document.querySelector('.dish-management');
    dishManagement.innerHTML = '';
    dishes.forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.className = 'dish';
        dishDiv.innerHTML = `
            <h3>${dish.name}</h3>
            <p>Danh mục: ${dish.category}</p>
            <p>Giá: ${dish.price.toLocaleString()} VND</p>
            <p>Trạng thái: ${dish.available ? 'Còn phục vụ' : 'Hết phục vụ'}</p>
            <button onclick="editDish(${dish.id})">Sửa</button>
            <button onclick="deleteDish(${dish.id})">Xóa</button>
            <button onclick="toggleAvailability(${dish.id})">${dish.available ? 'Tắt' : 'Bật'}</button>
        `;
        dishManagement.appendChild(dishDiv);
    });
    saveData();
}

function displayCategories() {
    const categoryList = document.querySelector('.category-list');
    categoryList.innerHTML = '';
    categories.forEach((cat, index) => {
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `
            <span>${cat}</span>
            <button onclick="deleteCategory(${index})">Xóa</button>
        `;
        categoryList.appendChild(catDiv);
    });
    saveData();
}

function populateCategorySelect() {
    const select = document.getElementById('dish-category');
    select.innerHTML = '<option value="">Chọn danh mục</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function setupForms() {
    document.getElementById('add-dish-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('dish-name').value;
        const category = document.getElementById('dish-category').value;
        const price = parseInt(document.getElementById('dish-price').value);
        const description = document.getElementById('dish-description').value;
        const image = document.getElementById('dish-image').value;
        const available = document.getElementById('dish-available').checked;

        const newDish = {
            id: Date.now(),
            name,
            category,
            price,
            description,
            image,
            available
        };
        dishes.push(newDish);
        displayDishes();
        hideAddDishForm();
        this.reset();
    });
}

function showAddDishForm() {
    document.getElementById('dish-form').style.display = 'block';
}

function hideAddDishForm() {
    document.getElementById('dish-form').style.display = 'none';
}

function editDish(id) {
    // Simple edit - in real app, populate form
    alert('Chức năng sửa chưa triển khai đầy đủ.');
}

function deleteDish(id) {
    dishes = dishes.filter(d => d.id !== id);
    displayDishes();
}

function toggleAvailability(id) {
    const dish = dishes.find(d => d.id === id);
    if (dish) {
        dish.available = !dish.available;
        displayDishes();
    }
}

function addCategory() {
    const newCat = document.getElementById('new-category').value.trim();
    if (newCat && !categories.includes(newCat)) {
        categories.push(newCat);
        displayCategories();
        populateCategorySelect();
        document.getElementById('new-category').value = '';
    }
}

function deleteCategory(index) {
    categories.splice(index, 1);
    displayCategories();
    populateCategorySelect();
}

function saveData() {
    localStorage.setItem('dishes', JSON.stringify(dishes));
    localStorage.setItem('categories', JSON.stringify(categories));
}