class Hasher {
  constructor(bcrypt, salt) {
    this._bcrypt = bcrypt;
    this._salt = salt;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._salt);
  }

  async compare(password, hashedPassword) {
    const res = await this._bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new Error("invalid credentials");
    }
  }
}

export default Hasher;
