export type Options = {
  expires?: number | Date
  maxAge?: number
  path?: string
  domain?: string
  secure?: boolean
  samesite?: 'lax' | 'strict' | 'none'
}

const daysPower = 24 * 60 * 60 * 1000;

function getExpirationDateStr(value: number | Date): string {
  if (typeof value !== 'number') {
    return value.toUTCString();
  }

  return new Date(Date.now() + value * daysPower).toUTCString();
}

export function getCookie(name: string): string | undefined {
  const cookieStrings = document.cookie.split(/;\s*/);
  const cookies = cookieStrings.reduce<Record<string, string>>((sum, cookie) => {
    const [cookieName, value] = cookie.split('=');

    return {
      ...sum,
      [cookieName]: decodeURIComponent(value),
    };
  }, {});

  return cookies[name];
}

export function setCookie(name: string, value: string, options: Options = {}): void {
  const cookieString = [
    `${name}=${encodeURIComponent(value)}`,
    `path=${options.path}`,
    options.domain ? `domain=${options.domain}` : undefined,
    options.maxAge ? `max-age=${options.maxAge}` : undefined,
    options.expires ? `expires=${getExpirationDateStr(options.expires)}` : undefined,
    options.secure ? 'secure' : undefined,
    options.samesite ? `samesite=${options.samesite}` : undefined,
  ].filter((el: string | undefined) => !!el).join('; ');

  document.cookie = cookieString;
}

export function removeCookie(name: string) {
  document.cookie = `${name}=;expires=${new Date(0).toUTCString()};max-age=-99999999`;
}