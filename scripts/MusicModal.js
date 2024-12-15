document.addEventListener('DOMContentLoaded', function() {
    // DOM Element Selections
    const musicButton = document.getElementById('musicButton');
    const musicModal = document.getElementById('musicModal');
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevTrackBtn = document.getElementById('prevTrack');
    const nextTrackBtn = document.getElementById('nextTrack');
    const repeatBtn = document.getElementById('repeatBtn');
    const trackImage = document.getElementById('trackImage');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const playlist = document.querySelector('.playlist');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');

    // Track Collection (Enhanced with more details)
    const tracks = [
        {
            title: "New York Jazz Lounge",
            artist: "Jazz and Blues Experience",
            src: "music/Jazz.mp3",
            image: "images/music/jazz.jpg"
        },
        {
            title: "Coding Flow",
            artist: "Programming Sounds",
            src: "path/to/coding_track.mp3",
            image: "path/to/coding_track_image.jpg"
        },
        {
            title: "Ambient Focus",
            artist: "Concentration Vibes",
            src: "path/to/ambient_track.mp3",
            image: "path/to/ambient_track_image.jpg"
        }
    ];

    // State Management
    let currentTrackIndex = 0;
    let isPlaying = false;
    let repeatMode = 0; // 0: No Repeat, 1: Repeat One, 2: Repeat All

    // Modal Initialization
    function initializeMusicModal() {
        if (musicButton && musicModal) {
            musicButton.addEventListener('click', function() {
                const modalInstance = new bootstrap.Modal(musicModal);
                modalInstance.show();
            });
        }
    }

    // Track Loading Function
    function loadTrack(index) {
        const track = tracks[index];
        
        musicPlayer.src = track.src;
        trackImage.src = track.image || 'default_track_image.jpg';
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;

        // Update playlist active state
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    // Play/Pause Functionality
    function togglePlayPause() {
        if (isPlaying) {
            musicPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            musicPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    // Navigation Functions
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) musicPlayer.play();
    }

    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) musicPlayer.play();
    }

    // Repeat Mode Toggle
    function toggleRepeat() {
        repeatMode = (repeatMode + 1) % 3;
        updateRepeatButton();
    }
    
    function updateRepeatButton() {
        switch(repeatMode) {
            case 0: // No repeat
                repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
                repeatBtn.classList.remove('active');
                break;
            case 1: // Repeat One
                repeatBtn.innerHTML = `
                    <i class="fas fa-redo"></i>
                    <span class="repeat-badge">1</span>
                `;
                repeatBtn.classList.add('active');
                break;
            case 2: // Repeat All
                repeatBtn.innerHTML = `
                    <i class="fas fa-redo"></i>
                    <span class="repeat-badge">∞</span>
                `;
                repeatBtn.classList.add('active');
                break;
        }
    }

    // Progress Bar and Time Update
    function updateProgressBar() {
        const progress = (musicPlayer.currentTime / musicPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;

        // Update time displays
        currentTimeEl.textContent = formatTime(musicPlayer.currentTime);
        durationEl.textContent = formatTime(musicPlayer.duration);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Track End Handling
    function handleTrackEnd() {
        switch(repeatMode) {
            case 0: // No repeat
                if (currentTrackIndex < tracks.length - 1) nextTrack();
                break;
            case 1: // Repeat One
                musicPlayer.currentTime = 0;
                musicPlayer.play();
                break;
            case 2: // Repeat All
                nextTrack();
                break;
        }
    }

    // Playlist Creation
    function createPlaylist() {
        tracks.forEach((track, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.classList.add('playlist-item');
            playlistItem.innerHTML = `
                <img src="${track.image}" alt="${track.title}">
                <div>
                    <h6>${track.title}</h6>
                    <p>${track.artist}</p>
                </div>
            `;
            playlistItem.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                if (!isPlaying) togglePlayPause();
            });
            playlist.appendChild(playlistItem);
        });
    }

    // Event Listeners
    function setupEventListeners() {
        playPauseBtn.addEventListener('click', togglePlayPause);
        nextTrackBtn.addEventListener('click', nextTrack);
        prevTrackBtn.addEventListener('click', prevTrack);
        repeatBtn.addEventListener('click', toggleRepeat);

        musicPlayer.addEventListener('timeupdate', updateProgressBar);
        musicPlayer.addEventListener('ended', handleTrackEnd);
    }

    // Initialization
    function init() {
        initializeMusicModal();
        createPlaylist();
        loadTrack(currentTrackIndex);
        setupEventListeners();
    }

    // Start the music player
    init();
});

document.addEventListener('DOMContentLoaded', function() {
    const musicModal = document.getElementById('musicModal');
    const musicPlayer = document.getElementById('musicPlayer');

    // Ensure complete modal closure
    musicModal.addEventListener('hidden.bs.modal', function () {
        // Do NOT pause the music when modal is closed
        // Remove any backdrop manually
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }

        // Ensure body scroll and padding are reset
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    });
});