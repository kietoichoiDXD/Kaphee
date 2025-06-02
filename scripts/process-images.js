const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Create output directories if they don't exist
const outputDirs = ['assets/images/menu', 'assets/images/gallery', 'assets/images/icons'];
outputDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Image processing configurations
const configs = {
    menu: {
        width: 800,
        height: 600,
        fit: 'cover',
        quality: 80,
        effects: {
            vintage: true,
            sharpen: true
        }
    },
    gallery: {
        width: 1200,
        height: 800,
        fit: 'cover',
        quality: 85,
        effects: {
            vintage: true,
            blur: 0.3
        }
    },
    icons: {
        width: 200,
        height: 200,
        fit: 'contain',
        quality: 90,
        effects: {
            sharpen: true
        }
    }
};

// Process a single image
async function processImage(inputPath, outputPath, config) {
    try {
        let pipeline = sharp(inputPath)
            .resize(config.width, config.height, {
                fit: config.fit,
                position: 'center'
            });

        // Apply effects
        if (config.effects.vintage) {
            pipeline = pipeline
                .modulate({
                    brightness: 1.1,
                    saturation: 0.8
                })
                .tint('#8B4513');
        }

        if (config.effects.sharpen) {
            pipeline = pipeline.sharpen();
        }

        if (config.effects.blur) {
            pipeline = pipeline.blur(config.effects.blur);
        }

        // Save the processed image
        await pipeline
            .jpeg({
                quality: config.quality,
                progressive: true
            })
            .toFile(outputPath);

        console.log(`Processed: ${outputPath}`);
    } catch (error) {
        console.error(`Error processing ${inputPath}:`, error);
    }
}

// Process all images in a directory
async function processDirectory(inputDir, outputDir, config) {
    const files = glob.sync(path.join(inputDir, '*.{jpg,jpeg,png}'));
    
    for (const file of files) {
        const filename = path.basename(file);
        const outputPath = path.join(outputDir, filename);
        await processImage(file, outputPath, config);
    }
}

// Main function to process all images
async function processAllImages() {
    console.log('Starting image processing...');

    // Process menu images
    await processDirectory(
        'assets/images/menu/raw',
        'assets/images/menu',
        configs.menu
    );

    // Process gallery images
    await processDirectory(
        'assets/images/gallery/raw',
        'assets/images/gallery',
        configs.gallery
    );

    // Process icons
    await processDirectory(
        'assets/images/icons/raw',
        'assets/images/icons',
        configs.icons
    );

    console.log('Image processing completed!');
}

// Run the script
processAllImages().catch(console.error); 