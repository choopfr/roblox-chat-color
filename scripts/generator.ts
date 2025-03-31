class Color {
    public r: number;
    public g: number;
    public b: number;
    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

const CHAT_COLORS_BY_VERSION = [
    [
        new Color(196, 40, 28), // Bright red
        new Color(13, 105, 172), // Bright blue
        new Color(39, 70, 45), // Earth green
        new Color(107, 50, 124) // Bright violet
    ],
    [
        new Color(253, 41, 67), // Fake Persimmon
        new Color(1, 162, 255), // Fake Cyan
        new Color(2, 184, 87), // Fake Dark Green
        new Color(107, 50, 124) // Bright violet
    ],
    [
        new Color(253, 41, 67), // Fake Persimmon
        new Color(1, 162, 255), // Fake Cyan
        new Color(2, 184, 87), // Fake Dark Green
        new Color(180, 128, 255) // Alder
    ]
];

function ComputeNameValue(username: string): number {
    let value = 0;
    for (let index = 0; index < username.length; index++) {
        let charCode = username.charCodeAt(index);
        if ((username.length - index) % 4 >= 2) {
            charCode = -charCode;
        }
        value += charCode;
    }
    return value;
}

export default function GetNameColor(username: string, version: number): Color | null {
    const chatColors = CHAT_COLORS_BY_VERSION[version ? version - 1 : CHAT_COLORS_BY_VERSION.length - 1];
    const nameValue = ComputeNameValue(username);
    const colorIndex = Math.abs(nameValue) % chatColors.length;
    return chatColors[colorIndex] || null;
}
