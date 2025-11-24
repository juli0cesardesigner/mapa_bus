// Configuration
const BUS_CONFIG = {
    totalSeats: 40,
    seatsPerRow: 4,
    storageKey: 'busSeatingData'
};

// State management
let busState = {
    passengers: [],
    selectedSeat: null
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderSeats();
    setupEventListeners();
    updateUI();
});

/**
 * Create and render bus seats grid
 */
function renderSeats() {
    const seatsGrid = document.getElementById('seatsGrid');
    seatsGrid.innerHTML = '';

    for (let i = 1; i <= BUS_CONFIG.totalSeats; i++) {
        const seat = createSeatElement(i);
        seatsGrid.appendChild(seat);
    }
}

/**
 * Create individual seat element
 */
function createSeatElement(seatNumber) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.textContent = seatNumber;
    seat.dataset.seatNumber = seatNumber;

    // Determine seat status
    const passenger = busState.passengers.find(p => p.seat === seatNumber);
    if (passenger) {
        seat.classList.add('seat-occupied');
        seat.title = `Ocupado: ${passenger.name}`;
    } else {
        seat.classList.add('seat-available');
        seat.title = 'Clique para selecionar';
    }

    // Check if seat is selected
    if (busState.selectedSeat === seatNumber) {
        seat.classList.add('seat-selected');
    }

    // Add click event listener
    seat.addEventListener('click', () => selectSeat(seatNumber));

    return seat;
}

/**
 * Handle seat selection
 */
function selectSeat(seatNumber) {
    // Check if seat is already occupied
    const isOccupied = busState.passengers.some(p => p.seat === seatNumber);
    if (isOccupied) {
        showNotification('Este assento já está ocupado!', 'warning');
        return;
    }

    // Toggle seat selection
    if (busState.selectedSeat === seatNumber) {
        busState.selectedSeat = null;
    } else {
        busState.selectedSeat = seatNumber;
    }

    updateSeatSelect();
    renderSeats();
}

/**
 * Update seat select dropdown with available seats
 */
function updateSeatSelect() {
    const seatSelect = document.getElementById('seatSelect');
    
    // Clear options except the first one
    seatSelect.innerHTML = '<option value="">Selecione um assento</option>';
    
    // Add available seats as options
    for (let i = 1; i <= BUS_CONFIG.totalSeats; i++) {
        const isOccupied = busState.passengers.some(p => p.seat === i);
        if (!isOccupied) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Assento ${i}`;
            seatSelect.appendChild(option);
        }
    }
    
    // Set the selected value
    seatSelect.value = busState.selectedSeat || '';
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    const addPassengerBtn = document.getElementById('addPassengerBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const searchInput = document.getElementById('searchInput');
    const passengerName = document.getElementById('passengerName');
    const seatSelect = document.getElementById('seatSelect');

    addPassengerBtn.addEventListener('click', addPassenger);
    clearAllBtn.addEventListener('click', clearAllPassengers);
    searchInput.addEventListener('input', filterPassengers);
    passengerName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addPassenger();
        }
    });
    
    // Add event listener to seat select dropdown
    seatSelect.addEventListener('change', (e) => {
        const selectedSeatNumber = parseInt(e.target.value);
        if (selectedSeatNumber) {
            busState.selectedSeat = selectedSeatNumber;
            renderSeats();
        }
    });
    
    // Initialize seat select dropdown
    updateSeatSelect();
}

/**
 * Add a new passenger
 */
function addPassenger() {
    const nameInput = document.getElementById('passengerName');
    const seatSelect = document.getElementById('seatSelect');

    const name = nameInput.value.trim();
    const seat = parseInt(seatSelect.value);

    // Validation
    if (!name) {
        showNotification('Por favor, insira o nome do passageiro', 'warning');
        nameInput.focus();
        return;
    }

    if (!busState.selectedSeat) {
        showNotification('Por favor, selecione um assento no mapa', 'warning');
        return;
    }

    // Check if seat is already occupied
    const isOccupied = busState.passengers.some(p => p.seat === busState.selectedSeat);
    if (isOccupied) {
        showNotification('Este assento já está ocupado!', 'warning');
        return;
    }

    // Create passenger object
    const passenger = {
        id: Date.now(),
        name: name,
        seat: busState.selectedSeat,
        addedAt: new Date().toLocaleString('pt-BR')
    };

    // Add to state
    busState.passengers.push(passenger);

    // Reset form
    nameInput.value = '';
    seatSelect.value = '';
    busState.selectedSeat = null;

    // Update UI
    saveData();
    renderSeats();
    renderPassengers();
    updateUI();
    updateSeatSelect();

    showNotification(`Passageiro "${name}" adicionado ao assento ${passenger.seat}!`, 'success');
    nameInput.focus();
}

/**
 * Remove a passenger
 */
function removePassenger(passengerId) {
    const passenger = busState.passengers.find(p => p.id === passengerId);
    if (passenger) {
        busState.passengers = busState.passengers.filter(p => p.id !== passengerId);
        saveData();
        renderSeats();
        renderPassengers();
        updateUI();
        showNotification(`Passageiro "${passenger.name}" removido!`, 'info');
    }
}

/**
 * Render passengers list
 */
function renderPassengers(passengers = busState.passengers) {
    const passengerList = document.getElementById('passengerList');
    const passengerCount = document.getElementById('passengerCount');

    passengerCount.textContent = passengers.length;

    if (passengers.length === 0) {
        passengerList.innerHTML = '<li class="empty-message">Nenhum passageiro cadastrado</li>';
        return;
    }

    passengerList.innerHTML = passengers.map(passenger => `
        <li class="passenger-item">
            <div class="passenger-info">
                <div class="passenger-name">${escapeHtml(passenger.name)}</div>
                <div class="passenger-seat">
                    Assento: <span class="passenger-seat-number">${passenger.seat}</span>
                </div>
            </div>
            <button class="btn-remove" onclick="removePassenger(${passenger.id})">
                Remover
            </button>
        </li>
    `).join('');
}

/**
 * Filter passengers by search term
 */
function filterPassengers(event) {
    const searchTerm = event.target.value.toLowerCase();

    if (!searchTerm) {
        renderPassengers();
        return;
    }

    const filtered = busState.passengers.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.seat.toString().includes(searchTerm)
    );

    renderPassengers(filtered);
}

/**
 * Clear all passengers
 */
function clearAllPassengers() {
    if (busState.passengers.length === 0) {
        showNotification('Não há passageiros para remover', 'info');
        return;
    }

    if (confirm('Tem certeza que deseja remover todos os passageiros? Esta ação não pode ser desfeita.')) {
        busState.passengers = [];
        busState.selectedSeat = null;

        saveData();
        renderSeats();
        renderPassengers();
        updateUI();

        showNotification('Todos os passageiros foram removidos!', 'info');
    }
}

/**
 * Update UI stats and counts
 */
function updateUI() {
    const occupiedCount = busState.passengers.length;
    const availableCount = BUS_CONFIG.totalSeats - occupiedCount;

    document.getElementById('occupiedCount').textContent = occupiedCount;
    document.getElementById('availableCount').textContent = availableCount;
}

/**
 * Save data to localStorage
 */
function saveData() {
    try {
        localStorage.setItem(BUS_CONFIG.storageKey, JSON.stringify(busState.passengers));
    } catch (error) {
        console.error('Erro ao salvar dados:', error);
    }
}

/**
 * Load data from localStorage
 */
function loadData() {
    try {
        const savedData = localStorage.getItem(BUS_CONFIG.storageKey);
        if (savedData) {
            busState.passengers = JSON.parse(savedData);
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        busState.passengers = [];
    }
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
    `;

    // Set background color based on type
    const colors = {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
    };
    notification.style.background = colors[type] || colors.info;

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
