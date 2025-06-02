const https = require('https');
const fs = require('fs');
const path = require('path');

// Create videos directory if it doesn't exist
const videoDir = path.join(__dirname, '../assets/videos');
if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
}

// Sample video URL (a free-to-use café ambiance video)
const videoUrl = 'https://cdn.pixabay.com/vimeo/328483731/cafe-23837.mp4?width=1280&hash=8c1c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c';

// Download the video
const videoPath = path.join(videoDir, 'cafe-ambience.mp4');
const file = fs.createWriteStream(videoPath);

https.get(videoUrl, (response) => {
    response.pipe(file);
    
    file.on('finish', () => {
        file.close();
        console.log('Video downloaded successfully!');
    });
}).on('error', (err) => {
    fs.unlink(videoPath, () => {}); // Delete the file if there's an error
    console.error('Error downloading video:', err);
}); 