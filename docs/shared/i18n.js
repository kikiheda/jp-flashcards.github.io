// docs/shared/i18n.js
const LANG_KEY = "app_lang"; // 'en' or 'zh'

export function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "en" || saved === "zh") return saved;

  // Default: if browser language starts with zh => zh, else en
  const nav = (navigator.language || "").toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}

export function setLang(lang) {
  if (lang !== "en" && lang !== "zh") return;
  localStorage.setItem(LANG_KEY, lang);
}

// Redirect to the correct folder if user is in the wrong one.
// Example: if you are in /en/ but stored lang is zh -> go /zh/
export function enforceFolderLang() {
  const lang = getLang();
  const path = window.location.pathname;

  const isInEn = path.includes("/en/");
  const isInZh = path.includes("/zh/");

  // If opened root project URL, send to preferred language
  if (!isInEn && !isInZh) {
    window.location.replace(path.endsWith("/") ? `${path}${lang}/` : `${path}/${lang}/`);
    return;
  }

  if (lang === "en" && isInZh) window.location.replace(path.replace("/zh/", "/en/"));
  if (lang === "zh" && isInEn) window.location.replace(path.replace("/en/", "/zh/"));
}

export function switchLang() {
  const current = getLang();
  const next = current === "en" ? "zh" : "en";
  setLang(next);

  const path = window.location.pathname;
  if (path.includes("/en/")) window.location.href = path.replace("/en/", "/zh/");
  else if (path.includes("/zh/")) window.location.href = path.replace("/zh/", "/en/");
  else window.location.href = `${path.endsWith("/") ? path : path + "/"}${next}/`;
}
