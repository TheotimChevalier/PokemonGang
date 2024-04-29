class SocketEvent {
  On = {
    DeleteSelf: 'deleteself',
    InitPlayerRequest: 'initPlayerRequest',
    PlayerMoved: 'playerMoved',
    PlayerDisconnected: 'playerDisconnected',
    UpdatePlayerAnimationPlayer: 'updatePlayerAnimationPlayer'
  };

  Emit = {
    InitPlayer: 'initPlayer',
    PlayerMove: 'playerMove',
    SaveLastPosition: 'saveLastPosition',
    UpdatePlayerAnimation: 'updatePlayerAnimation'
  };
};

export { SocketEvent };