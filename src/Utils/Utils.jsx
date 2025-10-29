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

export const formatProtoTimestampForInput = (ts) => {
  const d = protoTsToDate(ts);
  if (!d) return "";
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const HH = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
};

export const getFilteredUsers = (users, userAutenticated) => {
  return users.filter((user)=> user.nombreUsuario != userAutenticated)
}

export const authUserIsPresent = (members, nombreUsuario) => {
  return members.some (member => member.nombreUsuario === nombreUsuario)
}

export const disableTransfer = (inventories, items) => {
  return items.every(item => {
    return inventories.find(inv =>
      inv.categoria === item.categoria &&
      inv.descripcion === item.descripcion &&
      inv.cantidad > 0
    );
  });
}
export const getInventoriesSelected = (inventories, items) => {
  return inventories.filter(inv =>
    inv.cantidad > 0 &&
    items.some(item =>
      item.categoria === inv.categoria &&
      item.descripcion === inv.descripcion
    )
  );
}

export const getInventoryAmount = (inventories, item) => {
  console.log(inventories, item)
  return inventories.find(inv =>  inv?.categoria === item?.categoria && inv?.descripcion === item?.descripcion)
}

export const getMonth = (mes) => {
  let parsedMonth;
  switch (mes) {
    case 1: parsedMonth = "Enero"
    break;
    case 2: parsedMonth = "Febrero"
    break;
    case 3: parsedMonth = "Marzo"
    break;
    case 4: parsedMonth = "Abril"
    break;
    case 5: parsedMonth = "Mayo"
    break;
    case 6: parsedMonth = "Junio"
    break;
    case 7: parsedMonth = "Julio"
    break;
    case 8: parsedMonth = "Agosto"
    break;
    case 9: parsedMonth = "Septiembre"
    break;
    case 10: parsedMonth = "Octubre"
    break;
    case 11: parsedMonth = "Noviembre"
    break;
    case 12: parsedMonth = "Diciembre"
    break;
  }
  return parsedMonth;
}

export const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}