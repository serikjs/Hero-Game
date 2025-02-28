export interface TileOptions {
    type?: string;
    passable?: boolean;
    description?: string;
}

export interface DisplayData {
    backgroundImage: string; // Путь к фоновому изображению
    icon?: string; // Путь к SVG-иконке (опционально)
}