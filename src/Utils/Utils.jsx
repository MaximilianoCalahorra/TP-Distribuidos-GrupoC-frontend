import { Roles } from "../constants/Roles";

export const handleNavigate = (userRol, navigate) => {
    switch (userRol) {
    case (Roles [0]):
      navigate("/users")
    break;
    case (Roles [1]):
      navigate("/inventories")
    break;
    case (Roles [2]):
      navigate("/solidarityEvents")
    break;
    case (Roles [3]):
      navigate("/solidarityEvents")
    break;
  }
}

export const toBase64 = (user, password) => {
  const raw = `${user}:${password}`;
  return btoa(raw);
}

// Convierte {seconds, nanos} -> Date
export const protoTsToDate = (ts) => {
  if (!ts) return null;
  const sec = Number(ts.seconds ?? 0);
  const ns  = Number(ts.nanos ?? 0);
  if (!Number.isFinite(sec) || !Number.isFinite(ns)) return null;
  return new Date(sec * 1000 + Math.floor(ns / 1e6));
}

// Formato custom dd/MM/yyyy HH:mm (24h)
export const formatProtoTimestamp = (ts) => {
  const d = protoTsToDate(ts);
  if (!d) return "";
  const pad = (n) => String(n).padStart(2, "0");
  const dd = pad(d.getDate());
  const mm = pad(d.getMonth() + 1);
  const yyyy = d.getFullYear();
  const HH = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${dd}/${mm}/${yyyy} ${HH}:${min}`;
}