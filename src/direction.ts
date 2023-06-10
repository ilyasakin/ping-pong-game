class Direction {
  private _value: number = 0;

  constructor(value?: number) {
    if (!value) return;
    this.value = value;
  }

  public get value() {
    return this._value;
  }

  public set value(value: number) {
    if (value % 1 !== 0) {
      throw new Error('Direction must be an integer');
    }

    if (value < 0 || value > 360) {
      throw new Error('Direction must be between 0 and 360');
    }

    if (value === 360) {
      this._value = 0;
    }

    if (import.meta.env.DEV) {
      console.log(`Direction set to ${value}`);
    }

    this._value = value;
  }
}

export default Direction;
