import { PlayerSkin, PlayerRotation } from "../index";

//playerMove
type SocketPlayerMove = { 
  x:number;
  y:number;
  rotation:number;
  teleport:boolean;
  //animation:string;
  scale:number;
  socketId:string;
  skin:PlayerSkin;
  scene:number;
  world:number;
};

//saveLastPosition
type SocketSaveLastPos = {
  x:number;
  y:number;
  rotation:PlayerRotation;
  world:number;
  skin:PlayerSkin;
}

//loginAttempt
type SocketLoginAttempt = {
  username:string;
  password:string;
};

//updatePlayerAnimation 
type SocketUpdatePlayerAnimation = {
  animation:string;
  skin:number;
  scene:number;
  world:number;
}

export type ListeSocket = 'playerMove' | 'saveLastPosition' | 'loginAttempt' | 'updatePlayerAnimation'

export type SocketPokemon<T extends ListeSocket> = 
T extends 'playerMove' ? SocketPlayerMove :
T extends 'saveLastPosition' ? SocketSaveLastPos :
T extends 'loginAttempt' ? SocketLoginAttempt :
T extends 'updatePlayerAnimation' ? SocketUpdatePlayerAnimation :
undefined;