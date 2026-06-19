import crypto from "crypto";

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET ?? "dev-secret-change-me";
const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

interface TokenPayload {
  slug: string;
  exp: number;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
}

export function createDownloadToken(slug: string, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const exp = Date.now() + ttlSeconds * 1000;
  const payload: TokenPayload = { slug, exp };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(data);
  return `${data}.${signature}`;
}

export function verifyDownloadToken(token: string): TokenPayload | null {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  if (sign(data) !== signature) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf-8")
    ) as TokenPayload;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
