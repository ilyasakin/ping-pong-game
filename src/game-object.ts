abstract class GameObject {
  /**
   * The update method is called every frame.
   * It is supposed to update the game object's state.
   *
   * While it *could* modify the global game state,
   * it is not supposed to do so.
   */
  public abstract update(): void;
}

export default GameObject;
