class PlayerControls {
  public readonly up: string;
  public readonly down: string;
  public isUpPressed: boolean = false;
  public isDownPressed: boolean = false;

  constructor(up: string, down: string) {
    this.up = up;
    this.down = down;
  }
}

export default PlayerControls;
