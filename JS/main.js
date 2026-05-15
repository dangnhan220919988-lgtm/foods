// Main JavaScript for the restaurant menu website

let dishes = [];
let categories = ['tokbokki', 'gà sốt cay', 'kimbap', 'mì tương đen', 'lẩu kim chi', 'mì cay', 'chả cá xiên', 'hotdog', 'cơm trộn', 'gà sốt mật ong', 'khoai tây lắc', 'mì lạnh', 'bingsu dâu', 'cocca', 'trà tranh', 'nem chua rán'];

const categoryMap = {
    monChinh: 'món chính',
    drink: 'đồ uống',
    dessert: 'tráng miệng'
};

function showSection(id) {
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.main-nav a');

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
                { id: '1', name: 'Tokbokki', image: 'https://via.placeholder.com/420x280?text=Tokbokki', price: 65000, category: 'Khác', description: 'Bánh gạo cay Hàn Quốc', available: true },
                { id: '2', name: 'Gà sốt cay', image: 'https://via.placeholder.com/420x280?text=Gà+sốt+cay', price: 120000, category: 'Khác', description: 'Gà nướng sốt cay đặc biệt', available: true },
                { id: '3', name: 'Kimbap', image: 'https://via.placeholder.com/420x280?text=Kimbap', price: 45000, category: 'Khác', description: 'Cuộn cơm với rau xanh và thịt', available: true },
                { id: '4', name: 'Mì tương đen', image: 'https://via.placeholder.com/420x280?text=Mì+tương+đen', price: 75000, category: 'Khác', description: 'Mì Hàn Quốc sốt tương đen', available: true },
                { id: '5', name: 'Lẩu kim chi', image: 'https://via.placeholder.com/420x280?text=Lẩu+kim+chi', price: 400000, category: 'Khác', description: 'Lẩu cay nước dùng kim chi', available: true },
                { id: '6', name: 'Mì cay hải sản Hàn Quốc', image: 'https://via.placeholder.com/420x280?text=Mì+cay+hải+sản', price: 100000, category: 'Khác', description: 'Mì cay với hải sản tươi', available: true },
                { id: '7', name: 'Chả cá xiên', image: 'https://via.placeholder.com/420x280?text=Chả+cá+xiên', price: 40000, category: 'Khác', description: 'Chả cá nướng trên xiên', available: true },
                { id: '8', name: 'Hotdog phô mai Hàn Quốc', image: 'https://via.placeholder.com/420x280?text=Hotdog+phô+mai', price: 50000, category: 'Khác', description: 'Hotdog nhân phô mai chiên giòn', available: true },
                { id: '9', name: 'Cơm trộn Bibimbap', image: 'https://via.placeholder.com/420x280?text=Bibimbap', price: 95000, category: 'Khác', description: 'Cơm trộn các loại rau và thịt', available: true },
                { id: '10', name: 'Gà mật ong', image: 'https://via.placeholder.com/420x280?text=Gà+mật+ong', price: 130000, category: 'Khác', description: 'Gà nướng sốt mật ong thơm', available: true },
                { id: '11', name: 'Khoai tây lắc phô mai', image: 'https://via.placeholder.com/420x280?text=Khoai+tây+lắc', price: 45000, category: 'Khác', description: 'Khoai tây chiên lắc phô mai', available: true },
                { id: '12', name: 'Mì lạnh Hàn Quốc', image: 'https://via.placeholder.com/420x280?text=Mì+lạnh', price: 90000, category: 'Khác', description: 'Mì lạnh sốt cay đặc biệt', available: true },
                { id: '13', name: 'Bingsu dâu', image: 'https://via.placeholder.com/420x280?text=Bingsu+dâu', price: 70000, category: 'Khác', description: 'Tuyết mịn dâu tươi mát', available: true },
                { id: '14', name: 'Trà chanh', image: 'https://via.placeholder.com/420x280?text=Trà+chanh', price: 25000, category: 'Khác', description: 'Trà ấm pha với chanh tươi', available: true },
                { id: '15', name: 'Nem chua rán', image: 'https://via.placeholder.com/420x280?text=Nem+chua+rán', price: 50000, category: 'Khác', description: 'Nem chua cuốn rau sống chiên', available: true }
            ];
        }

        populateCategories();
        displayDishes(dishes);
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        // Dữ liệu mẫu nếu API lỗi
        dishes = [
            { id: '1', name: 'Tokbokki', image: 'https://via.placeholder.com/420x280?text=Tokbokki', price: 65000, category: 'Khác', description: 'Bánh gạo cay Hàn Quốc', available: true },
            { id: '2', name: 'Gà sốt cay', image: 'https://via.placeholder.com/420x280?text=Gà+sốt+cay', price: 120000, category: 'Khác', description: 'Gà nướng sốt cay đặc biệt', available: true },
            { id: '3', name: 'Kimbap', image: 'https://via.placeholder.com/420x280?text=Kimbap', price: 45000, category: 'Khác', description: 'Cuộn cơm với rau xanh và thịt', available: true },
            { id: '4', name: 'Mì tương đen', image: 'https://via.placeholder.com/420x280?text=Mì+tương+đen', price: 75000, category: 'Khác', description: 'Mì Hàn Quốc sốt tương đen', available: true },
            { id: '5', name: 'Lẩu kim chi', image: 'https://via.placeholder.com/420x280?text=Lẩu+kim+chi', price: 400000, category: 'Khác', description: 'Lẩu cay nước dùng kim chi', available: true },
            { id: '6', name: 'Mì cay hải sản Hàn Quốc', image: 'https://via.placeholder.com/420x280?text=Mì+cay+hải+sản', price: 100000, category: 'Khác', description: 'Mì cay với hải sản tươi', available: true },
            { id: '7', name: 'Chả cá xiên', image: 'https://via.placeholder.com/420x280?text=Chả+cá+xiên', price: 40000, category: 'Khác', description: 'Chả cá nướng trên xiên', available: true },
            { id: '8', name: 'Hotdog phô mai Hàn Quốc', image: 'https://via.placeholder.com/420x280?text=Hotdog+phô+mai', price: 50000, category: 'Khác', description: 'Hotdog nhân phô mai chiên giòn', available: true },
            { id: '9', name: 'Cơm trộn Bibimbap', image: 'https://via.placeholder.com/420x280?text=Bibimbap', price: 95000, category: 'Khác', description: 'Cơm trộn các loại rau và thịt', available: true },
            { id: '10', name: 'Gà mật ong', image: 'https://via.placeholder.com/420x280?text=Gà+mật+ong', price: 130000, category: 'Khác', description: 'Gà nướng sốt mật ong thơm', available: true },
            { id: '11', name: 'Khoai tây lắc phô mai', image: 'https://via.placeholder.com/420x280?text=Khoai+tây+lắc', price: 45000, category: 'Khác', description: 'Khoai tây chiên lắc phô mai', available: true },
            { id: '12', name: 'Mì lạnh Hàn Quốc', image: 'https://via.placeholder.com/420x280?text=Mì+lạnh', price: 90000, category: 'Khác', description: 'Mì lạnh sốt cay đặc biệt', available: true },
            { id: '13', name: 'Bingsu dâu', image: 'https://via.placeholder.com/420x280?text=Bingsu+dâu', price: 70000, category: 'Khác', description: 'Tuyết mịn dâu tươi mát', available: true },
            { id: '14', name: 'Trà chanh', image: 'https://via.placeholder.com/420x280?text=Trà+chanh', price: 25000, category: 'Khác', description: 'Trà ấm pha với chanh tươi', available: true },
            { id: '15', name: 'Nem chua rán', image: 'https://via.placeholder.com/420x280?text=Nem+chua+rán', price: 50000, category: 'Khác', description: 'Nem chua cuốn rau sống chiên', available: true }
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
        dishDiv.style.cursor = 'pointer';
        dishDiv.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <h3>${dish.name}</h3>
            <p class="dish-category">${dish.category}</p>
            <p class="dish-price">${dish.price.toLocaleString('vi-VN')} VND</p>
            <button type="button" class="btn-view-details">Xem Chi Tiết</button>
        `;
        
        // Thêm sự kiện click cho toàn bộ thẻ
        dishDiv.addEventListener('click', (e) => {
            e.preventDefault();
            viewDetails(dish.id);
        });
        
        menuList.appendChild(dishDiv);
    });
}

function setupModal() {
    const modal = document.getElementById('dish-modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Đóng modal khi nhấn Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Xử lý nút + và - cho số lượng
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const quantityInput = document.getElementById('quantity-input');
    
    if (qtyMinus) {
        qtyMinus.addEventListener('click', function() {
            const value = parseInt(quantityInput.value) || 1;
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
    }
    
    if (qtyPlus) {
        qtyPlus.addEventListener('click', function() {
            const value = parseInt(quantityInput.value) || 1;
            quantityInput.value = value + 1;
        });
    }
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
    document.getElementById('modal-category').textContent = `Danh mục: ${dish.category}`;
    document.getElementById('modal-price').textContent = `${dish.price.toLocaleString('vi-VN')} VND`;
    document.getElementById('modal-availability').textContent = dish.available ? 'Còn hàng' : 'Hết hàng';
    document.getElementById('modal-availability').className = dish.available ? 'status available' : 'status unavailable';
    
    // Reset quantity
    const quantityInput = document.getElementById('quantity-input');
    if (quantityInput) {
        quantityInput.value = 1;
    }
    
    // Reset add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.disabled = !dish.available;
        addToCartBtn.onclick = () => addToCart(dish);
    }
    
    document.getElementById('dish-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function addToCart(dish) {
    const quantityInput = document.getElementById('quantity-input');
    const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
    
    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Kiểm tra xem món ăn đã có trong giỏ hàng chưa
    const existingItem = cart.find(item => item.id === dish.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            quantity: quantity,
            image: dish.image
        });
    }
    
    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Thông báo thành công
    alert(`Đã thêm ${quantity} ${dish.name} vào giỏ hàng!`);
    
    // Đóng modal
    document.getElementById('dish-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}