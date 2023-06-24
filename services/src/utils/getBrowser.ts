import puppeteer, { Browser } from 'puppeteer';

const MAX_RETRY_COUNT = 3;
const RETRY_DELAY_BASE = 1000;

export default async function getBrowser(): Promise<Browser | Error> {
  let retryCount = 0;

  while (retryCount <= MAX_RETRY_COUNT) {
    try {
      const browser = await puppeteer.launch();
      return browser;
    } catch (error: any) {
      if (error.message.includes('Failed to launch the browser process')) {
        console.log('Rate limit reached. Retrying...');
        const delay = Math.pow(2, retryCount) * RETRY_DELAY_BASE;
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        return new Error(error);
      }
    }
  }

  throw new Error('Maximum retry count exceeded. Unable to launch browser.');
}
