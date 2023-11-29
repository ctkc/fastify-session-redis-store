type CookieOptions = {
  originalMaxAge: number | null;
  maxAge?: number;
  expires?: Date | null;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  secure?: boolean | "auto";
  sameSite?: boolean | "lax" | "strict" | "none";
};

export class Cookie {
  originalMaxAge: number | null;
  _expires: Date | null;
  httpOnly: boolean;
  path: string;
  domain: string | null;
  secure: boolean | "auto" | null;
  sameSite: boolean | "lax" | "strict" | "none" | null;

  constructor(cookieOptions?: CookieOptions) {
    const originalMaxAge =
      cookieOptions?.originalMaxAge ?? cookieOptions?.maxAge ?? null;
    this.path = cookieOptions?.path ?? "/";
    this.secure = cookieOptions?.secure ?? null;
    this.sameSite = cookieOptions?.sameSite ?? null;
    this.domain = cookieOptions?.domain ?? null;
    this.httpOnly = cookieOptions?.httpOnly ?? true;
    this._expires = null;
    this.originalMaxAge = null;

    if (originalMaxAge) {
      this.maxAge = originalMaxAge;
    } else if (cookieOptions?.expires) {
      this.expires = new Date(cookieOptions.expires);
      this.originalMaxAge = null;
    } else {
      this.originalMaxAge = originalMaxAge;
    }

    // if (this.secure === 'auto') {
    //   if (isConnectionSecure(request)) {
    //     this.secure = true
    //   } else {
    //     this.sameSite = 'lax'
    //     this.secure = false
    //   }
    // }
  }

  set expires(date) {
    this._expires = date;
  }

  get expires() {
    return this._expires;
  }

  set maxAge(ms: number) {
    this.expires = new Date(Date.now() + ms);
    // we force the same originalMaxAge to match old behavior
    this.originalMaxAge = ms;
  }

  get maxAge(): number | undefined {
    if (this.expires instanceof Date) {
      return this.expires.valueOf() - Date.now();
    }

    return undefined;
  }

  toJSON() {
    return {
      expires: this._expires,
      originalMaxAge: this.originalMaxAge,
      sameSite: this.sameSite,
      secure: this.secure,
      path: this.path,
      httpOnly: this.httpOnly,
      domain: this.domain,
    };
  }
}
