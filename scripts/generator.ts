function hashStringToColor(name: string, version: number): { r: number; g: number; b: number } {
    let hash = 0;
  
    // Improved hashing algorithm
    for (let i = 0; i < name.length; i++) {
        hash = (hash * 31 + name.charCodeAt(i)) % 16777215;
    }

    let r = (hash >> 16) & 255;
    let g = (hash >> 8) & 255;
    let b = hash & 255;

    // Adjusting version-specific modifications (if needed)
    if (version === 1) {
        r = (r * 1.2) % 256;
        g = (g * 0.8) % 256;
        b = (b * 1.1) % 256;
    } else if (version === 2) {
        r = (r * 0.9) % 256;
        g = (g * 1.1) % 256;
        b = (b * 0.9) % 256;
    } else if (version === 3) {
        r = (r * 1.1) % 256;
        g = (g * 0.9) % 256;
        b = (b * 1.2) % 256;
    }

    // Ensure colors fall into expected categories
    if (r > g && r > b) {
        return { r: 255, g: 0, b: 0 }; // Red
    } else if (b > r && b > g) {
        return { r: 0, g: 0, b: 255 }; // Blue
    } else if (g > r && g > b) {
        return { r: 0, g: 255, b: 0 }; // Green
    } else {
        return { r: 128, g: 0, b: 128 }; // Default Purple
    }
}

export default function GetNameColor(name: string, version: number) {
    return hashStringToColor(name, version);
}
