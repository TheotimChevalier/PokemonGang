
import { PlayerRotation } from "../types/enum";



export const playerInitConfig = {
  x: 14,
  y: 30,
  rotation: PlayerRotation.DOWN
};

/*
function ipv6ToNumeric(ipv6Address: string): bigint {
  // Supprime les parties potentielles d'adresse de port et découpe les parties
  const [ipWithoutPort] = ipv6Address.split(']');
  const parts = ipWithoutPort.split(':');

  // Convertit chaque partie en un nombre hexadécimal
  const hexNumbers = parts.map(part => parseInt(part, 16));

  // Concatène les parties pour obtenir une chaîne hexadécimale complète
  const hexString = hexNumbers.map(num => num.toString(16).padStart(4, '0')).join('');

  // Convertit la chaîne hexadécimale en un nombre BigInt
  return BigInt('0x' + hexString);
}

import os from 'os';

export function getWifiIpAddress() {
  const interfaces = os.networkInterfaces();

  const wifiInterface = Object.values(interfaces).find((iface) => {
    return iface!.find((details) => details.family === 'IPv4' && details.internal === false && details.mac !== '00:00:00:00:00:00');
  });

  const wifiIpAddress = wifiInterface && wifiInterface[0] && wifiInterface[0].address;

  if(!wifiIpAddress) return false;
  console.log(wifiIpAddress)
  return wifiIpAddress;
}*/