// Admin JavaScript for managing dishes and categories

let dishes = JSON.parse(localStorage.getItem('dishes')) || [
    { id: 1, name: 'tokbokki', category: 'Món chính', price: 65000, description: 'Bánh gạo cay nước sốt', image: 'img/tokbokki.jpg', available: true },
    { id: 2, name: 'gà sốt cay', category: 'Món chính', price: 120000, description: 'Gà nướng sốt cay', image: 'img/ga-sot-cay.jpg', available: true },
    { id: 3, name: 'kimbap', category: 'Khai vị', price: 45000, description: 'Cuộn cơm Hàn Quốc', image: 'img/kimbap.jpg', available: true },
    { id: 4, name: 'mì tương đen', category: 'Món chính', price: 75000, description: 'Mì tương đen đậm đà', image: 'img/mi-tuong-den.jpg', available: true },
    { id: 5, name: 'lẩu kim chi', category: 'Món chính', price: 400000, description: 'Lẩu cay kim chi', image: 'img/lau-kim-chi.jpg', available: true },
    { id: 6, name: 'mì cay', category: 'Món chính', price: 100000, description: 'Mì Hàn Quốc cay nồn', image: 'img/mi-cay.jpg', available: true },
    { id: 7, name: 'chả cá xiên', category: 'Khai vị', price: 40000, description: 'Chả cá nướng xiên', image: 'img/cha-ca-xien.jpg', available: true },
    { id: 8, name: 'hotdog', category: 'Khai vị', price: 50000, description: 'Bánh hotdog', image: 'img/hotdog.jpg', available: true },
    { id: 9, name: 'cơm trộn', category: 'Món chính', price: 95000, description: 'Cơm trộn Hàn Quốc', image: 'img/com-tron.jpg', available: true },
    { id: 10, name: 'gà sốt mật ong', category: 'Món chính', price: 130000, description: 'Gà sốt mật ong thơm ngon', image: 'img/ga-sot-mat-ong.jpg', available: true },
    { id: 11, name: 'khoai tây lắc', category: 'Khai vị', price: 45000, description: 'Khoai tây lắc nước', image: 'img/khoai-tay-lac.jpg', available: true },
    { id: 12, name: 'mì lạnh', category: 'Khai vị', price: 90000, description: 'Mì lạnh tươi mát', image: 'img/mi-lanh.jpg', available: true },
    { id: 13, name: 'bingsu dâu', category: 'Tráng miệng', price: 70000, description: 'Bingsu dâu tây', image: 'img/bingsu-dau.jpg', available: true },
    { id: 14, name: 'trà chanh', category: 'Đồ uống', price: 25000, description: 'Trà tranh tươi', image: 'img/tra-tranh.jpg', available: true },
    { id: 15, name: 'nem chua rán', category: 'Khai vị', price: 45000, description: 'Nem chua chiên giòn', image: 'img/nem-chua-ran.jpg', available: true }
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