const map = L.map('map').setView([16.0, 107.0], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

const cities = {
    hanoi: {
        coords: [21.0285, 105.8542],
        name: 'Ханой',
        description: 'Столица с тысячелетней историей: старые кварталы, университеты и тихие озёра.',
        image: 'images/map-pins/hanoi-oldquarter-street.jpg',
        link: 'cities.html#hanoi'
    },
    hcmc: {
        coords: [10.8231, 106.6297],
        name: 'Хошимин',
        description: 'Бывший Сайгон — деловой и культурный мотор страны.',
        image: 'images/map-pins/hcmc-night-streets.jpg',
        link: 'cities.html#hcmc'
    },
    danang: {
        coords: [16.0544, 108.2022],
        name: 'Дананг',
        description: 'Прибрежный город с широкими пляжами и портом.',
        image: 'images/map-pins/danang-dragon-bridge-night.jpg',
        link: 'cities.html#danang'
    },
    hue: {
        coords: [16.4637, 107.5909],
        name: 'Хюэ',
        description: 'Город династии Нгуен — культурная жемчужина и объект ЮНЕСКО.',
        image: 'images/map-pins/hue-imperial-palace.jpg',
        link: 'cities.html#hue'
    },
    nhatrang: {
        coords: [12.2388, 109.1967],
        name: 'Нячанг',
        description: 'Популярный пляжный город — дайвинг, острова и спа.',
        image: 'images/map-pins/nhatrang-beach-boats.jpg',
        link: 'cities.html#nhatrang'
    },
    muine: {
        coords: [10.9333, 108.1000],
        name: 'Муйне',
        description: 'Песчаные дюны, ветровые виды спорта и спокойная прибрежная атмосфера.',
        image: 'images/map-pins/muine-sand-dunes-sunset.jpg',
        link: 'cities.html#muine'
    },
    sapa: {
        coords: [22.3364, 103.8438],
        name: 'Сапа',
        description: 'Горный район с туманными террасами и культурой народов Hmong и Dao.',
        image: 'images/map-pins/sapa-rice-terraces-fog.jpg',
        link: 'cities.html#sapa'
    }
};

const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
        <div style="
            background: linear-gradient(135deg, #DA4453, #89216B);
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 4px 15px rgba(218, 68, 83, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        "></div>
    `,
    iconSize: [35, 35]
});

Object.keys(cities).forEach(cityKey => {
    const city = cities[cityKey];
    const marker = L.marker(city.coords, { icon: customIcon }).addTo(map);
    
    marker.bindTooltip(city.name, {
        permanent: false,
        direction: 'top',
        className: 'city-tooltip'
    });
    
    marker.on('click', () => {
        showCityInfo(city);
    });
});

function showCityInfo(city) {
    const infoCard = document.getElementById('city-info');
    const cityImg = document.getElementById('city-img');
    const cityName = document.getElementById('city-name');
    const cityDesc = document.getElementById('city-description');
    const cityLink = document.getElementById('city-link');
    
    cityImg.src = city.image;
    cityImg.alt = city.name;
    cityName.textContent = city.name;
    cityDesc.textContent = city.description;
    cityLink.href = city.link;
    
    infoCard.classList.remove('hidden');
    setTimeout(() => {
        infoCard.classList.add('active');
    }, 10);
}

document.querySelector('.close-btn').addEventListener('click', () => {
    const infoCard = document.getElementById('city-info');
    infoCard.classList.remove('active');
    setTimeout(() => {
        infoCard.classList.add('hidden');
    }, 300);
});

document.getElementById('city-info').addEventListener('click', (e) => {
    if (e.target.id === 'city-info') {
        document.querySelector('.close-btn').click();
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.8;
        }
    }
    
    .city-tooltip {
        background: rgba(26, 26, 26, 0.9) !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 8px 15px !important;
        font-weight: 600 !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
    }
    
    .leaflet-tooltip-top:before {
        border-top-color: rgba(26, 26, 26, 0.9) !important;
    }
`;
document.head.appendChild(style);