(function() {
    // Locations with detailed information
    const LOCATIONS = {
        tudublinMap: {
            id: 'tudublinMap',
            location: { lat: 53.2910794, lng: -6.3634551 },
            title: 'TU Dublin, Tallaght Campus',
            address: 'Blessington Rd, Tallaght, Dublin 24, D24 FKT9',
            icon: 'flag-ireland'
        },
        stmcMap: {
            id: 'stmcMap',
            location: { lat: 53.3190422, lng: -6.2165584 },
            title: "St. Michael's College",
            address: 'Ailesbury Rd, Dublin 4, D04 A373',
            icon: 'flag-ireland'
        },
        iomMap: {
            id: 'iomMap',
            location: { lat: 53.2859562, lng: -6.4444983 },
            title: 'Citywest Convention Centre',
            address: 'Garter Ln, Saggart, Co. Dublin',
            icon: 'flag-ireland'
        },
        ukraineEmbassyMap: {
            id: 'ukraineEmbassyMap',
            location: { lat: 53.3305596, lng: -6.2364009 },
            title: 'Embassy of Ukraine',
            address: '16 Elgin Rd, Ballsbridge, Dublin 4, D04 NY31',
            icon: 'flag-ukraine'
        },
        himnaziiaMap: {
            id: 'himnaziiaMap',
            location: { lat: 50.476342, lng: 30.3951234 },
            title: "Himnaziya Prem'yer Kyiv",
            address: '3 Mriyi Street, Kyiv, Ukraine, 04128',
            icon: 'flag-ukraine'
        }
    };

    function createCustomInfoWindow(map, marker, location) {
        // Create a custom info window with styling
        const infoWindowContent = document.createElement('div');
        infoWindowContent.style.cssText = `
            background-color: #2c2c2c; 
            color: #fff; 
            padding: 15px; 
            border-radius: 8px; 
            max-width: 250px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        `;

        const titleElement = document.createElement('h6');
        titleElement.style.cssText = `
            color: #ffcc00; 
            margin-bottom: 10px; 
            border-bottom: 2px solid #444; 
            padding-bottom: 5px;
        `;
        titleElement.textContent = location.title;

        const addressElement = document.createElement('p');
        addressElement.style.cssText = `
            margin: 0; 
            font-size: 0.9rem;
        `;
        addressElement.innerHTML = `
            <i class="fas fa-map-marker-alt" style="color: #ffcc00; margin-right: 10px;"></i>
            ${location.address}
        `;

        infoWindowContent.appendChild(titleElement);
        infoWindowContent.appendChild(addressElement);

        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
            maxWidth: 300
        });

        // Open info window automatically when map loads
        infoWindow.open({
            map: map,
            anchor: marker,
            shouldFocus: true
        });

        // Reopen on marker click
        marker.addListener('click', () => {
            infoWindow.open({
                map: map,
                anchor: marker,
                shouldFocus: true
            });
        });

        return infoWindow;
    }

    function createCustomMarker(map, location) {
        // Create a custom marker with Advanced Marker Element
        try {
            // Create marker pin
            const markerPin = document.createElement('div');
            markerPin.style.cssText = `
                width: 30px;
                height: 30px;
                background-color: #ffcc00;
                border-radius: 50%;
                border: 3px solid #2c2c2c;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            `;

            // Create marker with unique Map ID
            const marker = new google.maps.marker.AdvancedMarkerElement({
                position: location.location,
                map: map,
                title: location.title,
                content: markerPin
            });

            // Add flag marker to the modal
            const modalElement = document.getElementById(`${location.id}LocationModal`);
            if (modalElement) {
                const flagMarker = document.createElement('div');
                flagMarker.classList.add('map-flag-marker', location.icon);
                modalElement.querySelector('.modal-content').appendChild(flagMarker);
            }

            // Create and return info window (which will auto-open)
            createCustomInfoWindow(map, marker, location);

            return marker;
        } catch (error) {
            console.error('Advanced Marker creation failed:', error);
            
            // Fallback to traditional marker if Advanced Marker fails
            try {
                const fallbackMarker = new google.maps.Marker({
                    position: location.location,
                    map: map,
                    title: location.title,
                    animation: google.maps.Animation.DROP
                });

                createCustomInfoWindow(map, fallbackMarker, location);
                return fallbackMarker;
            } catch (fallbackError) {
                console.error('Fallback marker creation failed:', fallbackError);
                return null;
            }
        }
    }

    function initializeMap(elementId) {
        const location = LOCATIONS[elementId];
        if (!location) {
            console.error(`Location not found for ${elementId}`);
            return;
        }

        const mapElement = document.getElementById(elementId);
        if (!mapElement) {
            console.error(`Map element not found: ${elementId}`);
            return;
        }

        // Map configuration with unique Map ID
        const mapOptions = {
            zoom: 15,
            center: location.location,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            mapId: `map_${elementId}_${Date.now()}`, // Unique Map ID
            styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }
            ]
        };

        // Create map
        const map = new google.maps.Map(mapElement, mapOptions);

        // Create custom marker
        const marker = createCustomMarker(map, location);

        // Store location data for modal use
        mapElement.dataset.lat = location.location.lat;
        mapElement.dataset.lng = location.location.lng;

        return { map, marker };
    }

    function initializeMapsAndModals() {
        console.log("🗺️ Initializing Maps and Modals");

        // Initialize all maps
        Object.keys(LOCATIONS).forEach(initializeMap);

        // Modal map handling
        document.querySelectorAll('[id$="LocationModal"]').forEach(modal => {
            modal.addEventListener('shown.bs.modal', (e) => {
                const mapElement = e.target.querySelector('.google-map');
                if (!mapElement) return;

                const mapId = mapElement.id.replace('Map', '');
                const location = LOCATIONS[mapId];

                if (location) {
                    const map = new google.maps.Map(mapElement, {
                        zoom: 15,
                        center: location.location,
                        mapTypeControl: false,
                        streetViewControl: false,
                        mapId: `modal_map_${mapId}_${Date.now()}` // Unique Modal Map ID
                    }); const marker = createCustomMarker(map, location);
                    // Automatically open the info window for the modal map
                    createCustomInfoWindow(map, marker, location);
                }
            });
        });
    }

    // Advanced Initialization Strategy
    function initializeGoogleMaps() {
        console.log("🌐 Checking Google Maps Initialization");

        // Check if Google Maps and Advance Marker are available
        if (window.google && 
            window.google.maps && 
            window.google.maps.Map && 
            window.google.maps.marker && 
            window.google.maps.marker.AdvancedMarkerElement) {
            
            console.log("✅ Google Maps Fully Loaded");
            initializeMapsAndModals();
        } else {
            console.warn("⏳ Google Maps not fully loaded, retrying...");
            setTimeout(initializeGoogleMaps, 500);
        }
    }

    // Trigger initialization
    document.addEventListener('DOMContentLoaded', initializeGoogleMaps);
})();