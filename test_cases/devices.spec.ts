import { test, devices } from '@playwright/test';

type fullInfo4Devices = {
  deviceName: string;
  viewport: string;
  userAgent: string;
  isMobile: string;
  hasTouch: string;
  deviceScaleFactor: string;
  defaultBrowserType: string;
};

test('Supported devices list in playwright', ({}) => {
  const supportedDevices = Object.keys(devices);
  let mobileDevices: string[] = [],
    desktops: string[] = [],
    fullInfo: fullInfo4Devices[] = [];
  supportedDevices.forEach((device) => {
    if (device.includes('Desktop')) {
      console.log(`🖥️ ${device}`);
      desktops.push(`${device}`);
    } else {
      console.log(`📱 ${device}`);
      mobileDevices.push(`${device}`);
    }
    fullInfo.push({
      deviceName: device.includes('Desktop') ? `🖥️ ${device}` : `📱 ${device}`,
      viewport: `${devices[device].viewport.width}*${devices[device].viewport.height}`,
      userAgent: `${devices[device].userAgent.substring(0, 50)}...`,
      isMobile: `${devices[device].isMobile}`,
      hasTouch: `${devices[device].hasTouch}`,
      deviceScaleFactor: `${devices[device].deviceScaleFactor}`,
      defaultBrowserType: `${devices[device].defaultBrowserType}`,
    });
    //console.log(
    // `userAgent:${devices[device].userAgent} isMobile:${devices[device].isMobile} hasTouch:${devices[device].hasTouch} deviceScaleFactor:${devices[device].deviceScaleFactor} defaultBrowserType:${devices[device].defaultBrowserType}`,
    //);
    // console.log(`${devices[device].viewport.width}*${devices[device].viewport.height}`);
  });
  console.log(`Mobile Devices count: ${mobileDevices.length / 2}`);
  console.table(fullInfo);
});
