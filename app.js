class Animal {
    constructor(name, imageUrl, location, size) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.location = location;
        this.size = size;
    }

    validate() {
        return this.name && this.imageUrl && this.location && !isNaN(this.size) && this.size > 0;
    }
}

class AnimalTable {
    constructor(tableName) {
        this.tableName = tableName;
        this.animals = [];
    }

    addAnimal(animal) {
        if (this.animals.some(a => a.name === animal.name)) {
            alert('Duplicate animal name is not allowed');
            return false;
        }
        if (!animal.validate()) {
            alert('Invalid animal data');
            return false;
        }
        this.animals.push(animal);
        return true;
    }

    deleteAnimal(name) {
        this.animals = this.animals.filter(a => a.name !== name);
    }

    editAnimal(name, newAnimal) {
        const index = this.animals.findIndex(a => a.name === name);
        if (index !== -1) {
            this.animals[index] = newAnimal;
        }
    }

    sortByName() {
        this.animals.sort((a, b) => a.name.localeCompare(b.name));
    }

    sortByLocation() {
        this.animals.sort((a, b) => a.location.localeCompare(b.location));
    }

    sortBySize() {
        this.animals.sort((a, b) => a.size - b.size);
    }

    getAnimals() {
        return this.animals;
    }
}

// Sample Data
const bigCats = [
    new Animal("Tiger", "assets/tiger.jpg", "Asia", 10),
    new Animal("Lion", "assets/lion.jpg", "Africa", 8),
    new Animal("Leopard", "assets/leopard.jpg", "Africa and Asia", 5),
    new Animal("Cheetah", "assets/cheetah.jpg", "Africa", 5),
    new Animal("Caracal", "assets/caracal.jpg", "Africa", 3),
    new Animal("Jaguar", "assets/jaguar.jpg", "Amazon", 5),
];

const dogs = [
    new Animal("Rottweiler", "assets/rottweiler.jpg", "Germany", 2),
    new Animal("German Shepard", "assets/germanshepherd.jpg", "Germany", 2),
    new Animal("Labrador", "assets/labrador.jpg", "UK", 2),
    new Animal("Alabai", "assets/alabai.jpg", "Turkey", 2),
];

const bigFish = [
    new Animal("Humpback Whale", "assets/humpbackwhale.jpg", "Atlantic Ocean", 15),
    new Animal("Killer Whale", "assets/killerwhale.jpg", "Atlantic Ocean", 12),
    new Animal("Tiger Shark", "assets/tigershark.jpg", "Ocean", 8),
    new Animal("Hammerhead Shark", "assets/hammerheadshark.jpg", "Ocean", 8),
];

// Instantiate tables
const bigCatsTable = new AnimalTable('Big Cats');
const dogsTable = new AnimalTable('Dogs');
const bigFishTable = new AnimalTable('Big Fish');

// Add sample data to tables
bigCats.forEach(cat => bigCatsTable.addAnimal(cat));
dogs.forEach(dog => dogsTable.addAnimal(dog));
bigFish.forEach(fish => bigFishTable.addAnimal(fish));

// Render Tables
function renderTable(table, tableId) {
    const tbody = document.getElementById(`${tableId}-tbody`);
    tbody.innerHTML = '';
    table.getAnimals().forEach(animal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="${tableId === 'big-fish' ? 'big-fish-name' : 'animal-name'}">${animal.name}</td>
            <td><img src="${animal.imageUrl}" width="50" height="50" alt="${animal.name}"></td>
            <td>${animal.location}</td>
            <td>${animal.size} ft</td>
            <td>
                <button class="btn btn-warning btn-sm" style="background-color: #007bff; color: white; border: none; padding: 10px 15px; margin-right: 5px; cursor: pointer; border-radius: 5px;" onclick="editAnimal('${animal.name}', '${tableId}')">Edit</button>
                <button class="btn btn-danger btn-sm" style="background-color: #007bff; color: white; border: none; padding: 10px 15px; margin-right: 5px; cursor: pointer; border-radius: 5px;" onclick="deleteAnimal('${animal.name}', '${tableId}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

renderTable(bigCatsTable, 'big-cats');
renderTable(dogsTable, 'dogs');
renderTable(bigFishTable, 'big-fish');

// Add Animal Functionality
document.getElementById('add-animal-big-cats').addEventListener('click', () => {
    const newName = prompt("Enter animal name:");
    const newLocation = prompt("Enter animal location:");
    const newSize = parseFloat(prompt("Enter animal size (ft):"));
    const newImage = prompt("Enter image URL:");

    if (newName && newLocation && !isNaN(newSize) && newSize > 0 && newImage) {
        const newAnimal = new Animal(newName, newImage, newLocation, newSize);
        bigCatsTable.addAnimal(newAnimal);
        renderTable(bigCatsTable, 'big-cats');
    } else {
        alert("Invalid input! Please provide valid animal details.");
    }
});

document.getElementById('add-animal-dogs').addEventListener('click', () => {
    const newName = prompt("Enter animal name:");
    const newLocation = prompt("Enter animal location:");
    const newSize = parseFloat(prompt("Enter animal size (ft):"));
    const newImage = prompt("Enter image URL:");

    if (newName && newLocation && !isNaN(newSize) && newSize > 0 && newImage) {
        const newAnimal = new Animal(newName, newImage, newLocation, newSize);
        dogsTable.addAnimal(newAnimal);
        renderTable(dogsTable, 'dogs');
    } else {
        alert("Invalid input! Please provide valid animal details.");
    }
});

document.getElementById('add-animal-big-fish').addEventListener('click', () => {
    const newName = prompt("Enter animal name:");
    const newLocation = prompt("Enter animal location:");
    const newSize = parseFloat(prompt("Enter animal size (ft):"));
    const newImage = prompt("Enter image URL:");

    if (newName && newLocation && !isNaN(newSize) && newSize > 0 && newImage) {
        const newAnimal = new Animal(newName, newImage, newLocation, newSize);
        bigFishTable.addAnimal(newAnimal);
        renderTable(bigFishTable, 'big-fish');
    } else {
        alert("Invalid input! Please provide valid animal details.");
    }
});


// Delete animal
function deleteAnimal(name, tableId) {
    let table;
    switch (tableId) {
        case 'big-cats': table = bigCatsTable; break;
        case 'dogs': table = dogsTable; break;
        case 'big-fish': table = bigFishTable; break;
    }
    table.deleteAnimal(name);
    renderTable(table, tableId);
}

// Edit animal
function editAnimal(name, tableId) {
    let table;
    switch (tableId) {
        case 'big-cats': table = bigCatsTable; break;
        case 'dogs': table = dogsTable; break;
        case 'big-fish': table = bigFishTable; break;
    }
    const newName = prompt("Enter new name:", name);
    const newLocation = prompt("Enter new location:", "New Location");
    const newSize = parseInt(prompt("Enter new size (ft):", "100"));
    const newImage = prompt("Enter new image URL:", "new_image.jpg");

    const newAnimal = new Animal(newName, newImage, newLocation, newSize);
    table.editAnimal(name, newAnimal);
    renderTable(table, tableId);
}

// Sorting Functionality
document.getElementById('sort-by-name-big-cats').addEventListener('click', () => {
    bigCatsTable.sortByName();
    renderTable(bigCatsTable, 'big-cats');
});

document.getElementById('sort-by-location-big-cats').addEventListener('click', () => {
    bigCatsTable.sortByLocation();
    renderTable(bigCatsTable, 'big-cats');
});

document.getElementById('sort-by-size-big-cats').addEventListener('click', () => {
    bigCatsTable.sortBySize();
    renderTable(bigCatsTable, 'big-cats');
});

document.getElementById('sort-by-name-dogs').addEventListener('click', () => {
    dogsTable.sortByName();
    renderTable(dogsTable, 'dogs');
});

document.getElementById('sort-by-location-dogs').addEventListener('click', () => {
    dogsTable.sortByLocation();
    renderTable(dogsTable, 'dogs');
});

document.getElementById('sort-by-size-dogs').addEventListener('click', () => {
    dogsTable.sortBySize();
    renderTable(dogsTable, 'dogs');
});

document.getElementById('sort-by-name-big-fish').addEventListener('click', () => {
    bigFishTable.sortByName();
    renderTable(bigFishTable, 'big-fish');
});

document.getElementById('sort-by-location-big-fish').addEventListener('click', () => {
    bigFishTable.sortByLocation();
    renderTable(bigFishTable, 'big-fish');
});

document.getElementById('sort-by-size-big-fish').addEventListener('click', () => {
    bigFishTable.sortBySize();
    renderTable(bigFishTable, 'big-fish');
});