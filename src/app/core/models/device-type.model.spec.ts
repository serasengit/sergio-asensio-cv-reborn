import { DeviceMinWidth, DeviceType, getDevice, isDeviceGreaterThan, isDeviceSmallerThan } from './device-type.model';

describe('device-type.model', () => {
    it('maps widths to device types', () => {
        expect(getDevice(DeviceMinWidth.UltraWide)).toBe(DeviceType.UltraWide);
        expect(getDevice(DeviceMinWidth.ExtraExtraLarge)).toBe(DeviceType.ExtraExtraLarge);
        expect(getDevice(DeviceMinWidth.ExtraLarge)).toBe(DeviceType.ExtraLarge);
        expect(getDevice(DeviceMinWidth.Large)).toBe(DeviceType.Large);
        expect(getDevice(DeviceMinWidth.MediumLarge)).toBe(DeviceType.MediumLarge);
        expect(getDevice(DeviceMinWidth.Medium)).toBe(DeviceType.Medium);
        expect(getDevice(DeviceMinWidth.Small)).toBe(DeviceType.Small);
        expect(getDevice(DeviceMinWidth.Small - 1)).toBe(DeviceType.ExtraSmall);
    });

    it('checks smaller-than comparisons', () => {
        expect(isDeviceSmallerThan(DeviceType.Small, DeviceType.Medium)).toBeTrue();
        expect(isDeviceSmallerThan(DeviceType.Large, DeviceType.Medium)).toBeFalse();
    });

    it('checks greater-than comparisons', () => {
        expect(isDeviceGreaterThan(DeviceType.Large, DeviceType.Medium)).toBeTrue();
        expect(isDeviceGreaterThan(DeviceType.Small, DeviceType.Medium)).toBeFalse();
    });
});
