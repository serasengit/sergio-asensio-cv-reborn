export enum DeviceType {
    ExtraSmall = 'ExtraSmall',
    Small = 'Small',
    Medium = 'Medium',
    MediumLarge = 'MediumLarge',
    Large = 'Large',
    ExtraLarge = 'ExtraLarge',
    ExtraExtraLarge = 'ExtraExtraLarge',
    UltraWide = 'UltraWide',
}

export enum DeviceMinWidth {
    ExtraSmall = 360, // Phones (small) - base size
    Small = 480, // Phones (large)
    Medium = 600, // Small tablets
    MediumLarge = 768, // Tablets (portrait)
    Large = 960, // Tablets (landscape) or small laptops
    ExtraLarge = 1280, // Laptops and desktops
    ExtraExtraLarge = 1440, // Large desktops
    UltraWide = 1920, // Full HD and ultra-wide monitors
}

// Function which returns the device type in which the app is being used (browser width is sent as parameter to calculate it)
export function getDevice(width: number): DeviceType {
    if (width >= DeviceMinWidth.UltraWide) {
        return DeviceType.UltraWide;
    } else if (width >= DeviceMinWidth.ExtraExtraLarge) {
        return DeviceType.ExtraExtraLarge;
    } else if (width >= DeviceMinWidth.ExtraLarge) {
        return DeviceType.ExtraLarge;
    } else if (width >= DeviceMinWidth.Large) {
        return DeviceType.Large;
    } else if (width >= DeviceMinWidth.MediumLarge) {
        return DeviceType.MediumLarge;
    } else if (width >= DeviceMinWidth.Medium) {
        return DeviceType.Medium;
    } else if (width >= DeviceMinWidth.Small) {
        return DeviceType.Small;
    } else {
        return DeviceType.ExtraSmall;
    }
}

export function isDeviceSmallerThan(size: DeviceType, target: DeviceType): boolean {
    return (DeviceMinWidth[size] ?? 0) <= (DeviceMinWidth[target] ?? 0);
}

export function isDeviceGreaterThan(size: DeviceType, target: DeviceType): boolean {
    return (DeviceMinWidth[size] ?? 0) >= (DeviceMinWidth[target] ?? 0);
}
