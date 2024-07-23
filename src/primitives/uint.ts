class UInt {
  private _value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Value must be an unsigned integer');
    }

    this._value = value;
  }

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    if (value < 0) {
      throw new Error('Value must be an unsigned integer');
    }

    this._value = value;
  }
}

export default UInt;
