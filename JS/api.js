const API_URL = 'https://69fd350730ad0a6fd1c09323.mockapi.io/api/v1/dishes';

// Hàm lấy tất cả món ăn
async function getDishes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dishes = await response.json();
        return dishes;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách món ăn:', error);
        throw error;
    }
}

// Hàm lấy một món ăn theo ID
async function getDish(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dish = await response.json();
        return dish;
    } catch (error) {
        console.error(`Lỗi khi lấy món ăn với ID ${id}:`, error);
        throw error;
    }
}

// Hàm tạo món ăn mới
async function createDish(dish) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newDish = await response.json();
        return newDish;
    } catch (error) {
        console.error('Lỗi khi tạo món ăn mới:', error);
        throw error;
    }
}

// Hàm cập nhật món ăn
async function updateDish(id, dish) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedDish = await response.json();
        return updatedDish;
    } catch (error) {
        console.error(`Lỗi khi cập nhật món ăn với ID ${id}:`, error);
        throw error;
    }
}

// Hàm xóa món ăn
async function deleteDish(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return true; // Xóa thành công
    } catch (error) {
        console.error(`Lỗi khi xóa món ăn với ID ${id}:`, error);
        throw error;
    }
}

// Hàm tìm kiếm món ăn theo category
async function getDishesByCategory(category) {
    try {
        const dishes = await getDishes();
        return dishes.filter(dish => dish.category === category);
    } catch (error) {
        console.error(`Lỗi khi tìm kiếm món ăn theo category ${category}:`, error);
        throw error;
    }
}

// Hàm tìm kiếm món ăn theo tên
async function searchDishesByName(name) {
    try {
        const dishes = await getDishes();
        return dishes.filter(dish => dish.name.toLowerCase().includes(name.toLowerCase()));
    } catch (error) {
        console.error(`Lỗi khi tìm kiếm món ăn theo tên ${name}:`, error);
        throw error;
    }
}