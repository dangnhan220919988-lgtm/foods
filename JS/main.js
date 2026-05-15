// Main JavaScript for the restaurant menu website

let dishes = [];
let categories = ['tokbokki', 'gà sốt cay', 'kimbap', 'mì tương đen', 'lẩu kim chi', 'mì cay', 'chả cá xiên', 'hotdog', 'cơm trộn', 'gà sốt mật ong', 'khoai tây lắc', 'mì lạnh', 'bingsu dâu', 'cocca', 'trà tranh', 'nem chua rán'];

const categoryMap = {
    '1': 'Bánh mì',
    '2': 'Xôi',
    '3': 'Bún',
    '4': 'Phở'
};

document.addEventListener('DOMContentLoaded', function() {
    setupFilters();
    setupModal();
    setupContactForm();
    setupSectionNavigation();

    const viewMenuBtn = document.getElementById('view-menu-btn');
    if (viewMenuBtn) {
        viewMenuBtn.addEventListener('click', async () => {
            await loadData();
            showSection('menu');
        });
    }
});

function setupSectionNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('main > section');

    function showSection(id) {
        sections.forEach(section => {
            section.classList.toggle('section-hidden', section.id !== id);
        });

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').replace('#', '');
            link.classList.toggle('active-nav', targetId === id);
        });

        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', async function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            if (targetId === 'menu') {
                await loadData();
            }
            showSection(targetId);
        });
    });

    showSection('home');
}

async function loadData() {
    try {
        const apiDishes = await getDishes();
        dishes = apiDishes.map(dish => ({
            id: dish.id,
            name: dish.name || 'Món ăn',
            image: dish.image || 'https://via.placeholder.com/420x280?text=Ẩm+Thực',
            price: Number(dish.price) || 0,
            category: dish.category || 'Khác',
            description: dish.description || 'Mô tả đang cập nhật',
            available: dish.available !== false
        }));

        if (dishes.length === 0) {
            // Dữ liệu mẫu nếu API rỗng
            dishes = [
                { id: '1', name: 'Phở Bò', image: 'https://via.placeholder.com/420x280?text=Phở+Bò', price: 45000, category: 'Phở', description: 'Phở bò truyền thống với thịt bò tươi ngon.', available: true },
                { id: '2', name: 'Bún Bò Huế', image: 'https://via.placeholder.com/420x280?text=Bún+Bò+Huế', price: 50000, category: 'Bún', description: 'Bún bò Huế cay nồng, đậm đà hương vị.', available: true },
                { id: '3', name: 'Cơm Tấm Sườn', image: 'https://via.placeholder.com/420x280?text=Cơm+Tấm+Sườn', price: 55000, category: 'Cơm', description: 'Cơm tấm với sườn nướng và trứng ốp la.', available: true },
                { id: '4', name: 'Gỏi Cuốn', image: 'https://via.placeholder.com/420x280?text=Gỏi+Cuốn', price: 35000, category: 'Gỏi', description: 'Gỏi cuốn tươi mát với tôm và thịt.', available: true },
                { id: '5', name: 'Bánh Mì Thịt Nướng', image: 'https://via.placeholder.com/420x280?text=Bánh+Mì+Thịt+Nướng', price: 40000, category: 'Bánh mì', description: 'Bánh mì với thịt nướng và rau sống.', available: true },
                { id: '6', name: 'Xôi Gà', image: 'https://via.placeholder.com/420x280?text=Xôi+Gà', price: 45000, category: 'Xôi', description: 'Xôi dẻo thơm với gà luộc.', available: true },
                { id: '7', name: 'Bánh Xèo', image: 'https://via.placeholder.com/420x280?text=Bánh+Xèo', price: 60000, category: 'Bánh', description: 'Bánh xèo giòn tan với thịt và rau.', available: true },
                { id: '8', name: 'Trà Đá', image: 'https://via.placeholder.com/420x280?text=Trà+Đá', price: 15000, category: 'Đồ uống', description: 'Trà đá tươi mát.', available: true },
                { id: '9', name: 'Cà Phê Sữa Đá', image: 'https://via.placeholder.com/420x280?text=Cà+Phê+Sữa+Đá', price: 25000, category: 'Đồ uống', description: 'Cà phê sữa đá đậm đà.', available: true },
                { id: '10', name: 'Nước Mía', image: 'https://via.placeholder.com/420x280?text=Nước+Mía', price: 20000, category: 'Đồ uống', description: 'Nước mía ép tươi.', available: true },
                { id: '11', name: 'Sinh Tố Bơ', image: 'https://via.placeholder.com/420x280?text=Sinh+Tố+Bơ', price: 30000, category: 'Đồ uống', description: 'Sinh tố bơ thơm ngon.', available: true },
                { id: '12', name: 'Bánh Mì Pate', image: 'https://via.placeholder.com/420x280?text=Bánh+Mì+Pate', price: 35000, category: 'Bánh mì', description: 'Bánh mì với pate và rau.', available: true },
                { id: '13', name: 'Phở Gà', image: 'https://via.placeholder.com/420x280?text=Phở+Gà', price: 40000, category: 'Phở', description: 'Phở gà với thịt gà tươi.', available: true },
                { id: '14', name: 'Bún Riêu', image: 'https://via.placeholder.com/420x280?text=Bún+Riêu', price: 50000, category: 'Bún', description: 'Bún riêu cua với thịt và rau.', available: true },
                { id: '15', name: 'Cơm Chiên Dương Châu', image: 'https://via.placeholder.com/420x280?text=Cơm+Chiên+Dương+Châu', price: 55000, category: 'Cơm', description: 'Cơm chiên với hải sản và rau củ.', available: true }
            ];
        }

        populateCategories();
        displayDishes(dishes);
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        // Dữ liệu mẫu nếu API lỗi
        dishes = [
            { id: '1', name: 'Phở Bò', image: 'https://via.placeholder.com/420x280?text=Phở+Bò', price: 45000, category: 'Phở', description: 'Phở bò truyền thống với thịt bò tươi ngon.', available: true },
            { id: '2', name: 'Bún Bò Huế', image: 'https://via.placeholder.com/420x280?text=Bún+Bò+Huế', price: 50000, category: 'Bún', description: 'Bún bò Huế cay nồng, đậm đà hương vị.', available: true },
            { id: '3', name: 'Cơm Tấm Sườn', image: 'https://via.placeholder.com/420x280?text=Cơm+Tấm+Sườn', price: 55000, category: 'Cơm', description: 'Cơm tấm với sườn nướng và trứng ốp la.', available: true },
            { id: '4', name: 'Gỏi Cuốn', image: 'https://via.placeholder.com/420x280?text=Gỏi+Cuốn', price: 35000, category: 'Gỏi', description: 'Gỏi cuốn tươi mát với tôm và thịt.', available: true },
            { id: '5', name: 'Bánh Mì Thịt Nướng', image: 'https://via.placeholder.com/420x280?text=Bánh+Mì+Thịt+Nướng', price: 40000, category: 'Bánh mì', description: 'Bánh mì với thịt nướng và rau sống.', available: true },
            { id: '6', name: 'Xôi Gà', image: 'https://via.placeholder.com/420x280?text=Xôi+Gà', price: 45000, category: 'Xôi', description: 'Xôi dẻo thơm với gà luộc.', available: true },
            { id: '7', name: 'Bánh Xèo', image: 'https://via.placeholder.com/420x280?text=Bánh+Xèo', price: 60000, category: 'Bánh', description: 'Bánh xèo giòn tan với thịt và rau.', available: true },
            { id: '8', name: 'Trà Đá', image: 'https://via.placeholder.com/420x280?text=Trà+Đá', price: 15000, category: 'Đồ uống', description: 'Trà đá tươi mát.', available: true },
            { id: '9', name: 'Cà Phê Sữa Đá', image: 'https://via.placeholder.com/420x280?text=Cà+Phê+Sữa+Đá', price: 25000, category: 'Đồ uống', description: 'Cà phê sữa đá đậm đà.', available: true },
            { id: '10', name: 'Nước Mía', image: 'https://via.placeholder.com/420x280?text=Nước+Mía', price: 20000, category: 'Đồ uống', description: 'Nước mía ép tươi.', available: true },
            { id: '11', name: 'Sinh Tố Bơ', image: 'https://via.placeholder.com/420x280?text=Sinh+Tố+Bơ', price: 30000, category: 'Đồ uống', description: 'Sinh tố bơ thơm ngon.', available: true },
            { id: '12', name: 'Bánh Mì Pate', image: 'https://via.placeholder.com/420x280?text=Bánh+Mì+Pate', price: 35000, category: 'Bánh mì', description: 'Bánh mì với pate và rau.', available: true },
            { id: '13', name: 'Phở Gà', image: 'https://via.placeholder.com/420x280?text=Phở+Gà', price: 40000, category: 'Phở', description: 'Phở gà với thịt gà tươi.', available: true },
            { id: '14', name: 'Bún Riêu', image: 'https://via.placeholder.com/420x280?text=Bún+Riêu', price: 50000, category: 'Bún', description: 'Bún riêu cua với thịt và rau.', available: true },
            { id: '15', name: 'Cơm Chiên Dương Châu', image: 'https://via.placeholder.com/420x280?text=Cơm+Chiên+Dương+Châu', price: 55000, category: 'Cơm', description: 'Cơm chiên với hải sản và rau củ.', available: true }
        ];
        populateCategories();
        displayDishes(dishes);
    }
}

function populateCategories() {
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.innerHTML = '<option value="">Tất cả danh mục</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

function setupFilters() {
    document.getElementById('search').addEventListener('input', filterDishes);
    document.getElementById('category-filter').addEventListener('change', filterDishes);
    document.getElementById('price-filter').addEventListener('change', filterDishes);
}

function filterDishes() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const priceRange = document.getElementById('price-filter').value;

    const filtered = dishes.filter(dish => {
        const matchesSearch = dish.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || dish.category === category;
        let matchesPrice = true;

        if (priceRange === 'low') matchesPrice = dish.price < 100000;
        else if (priceRange === 'medium') matchesPrice = dish.price >= 100000 && dish.price <= 200000;
        else if (priceRange === 'high') matchesPrice = dish.price > 200000;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayDishes(filtered);
}

function displayDishes(dishList) {
    const menuList = document.querySelector('.menu-list');
    menuList.innerHTML = '';

    if (dishList.length === 0) {
        menuList.innerHTML = '<p class="empty-state">Không có món nào phù hợp.</p>';
        return;
    }

    dishList.forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.className = 'dish' + (dish.available ? '' : ' unavailable');
        dishDiv.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <h3>${dish.name}</h3>
            <p class="dish-category">${dish.category}</p>
            <p class="dish-price">${dish.price.toLocaleString('vi-VN')} VND</p>
            <button type="button" onclick="viewDetails('${dish.id}')">Xem Chi Tiết</button>
        `;
        menuList.appendChild(dishDiv);
    });
}

function setupModal() {
    const modal = document.getElementById('dish-modal');
    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = 'none';
    };
}

function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Yêu cầu của bạn đã được gửi. Chúng tôi sẽ liên hệ lại sớm nhất.');
            contactForm.reset();
        });
    }
}

function viewDetails(id) {
    const dish = dishes.find(d => String(d.id) === String(id));
    if (!dish) return;

    document.getElementById('modal-title').textContent = dish.name;
    document.getElementById('modal-image').src = dish.image;
    document.getElementById('modal-description').textContent = dish.description;
    document.getElementById('modal-price').textContent = `Giá: ${dish.price.toLocaleString('vi-VN')} VND`;
    document.getElementById('dish-modal').style.display = 'block';
}