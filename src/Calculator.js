export default class Calculator {
  constructor() {
    this.rules = [
      () => 6,
      ({ distance }) => (distance > 2 ? (distance - 2) * 0.8 : 0),
      ({ distance }) => (distance > 8 ? (distance - 8) * 0.4 : 0),
      ({ time }) => time * 0.25,
    ];
  }

  calc({ distance, time }) {
    this.entry = { distance, time };
    this.checkType().checkRange();
    const f = this.rules.reduce((s, rule) => s + rule({ distance, time }), 0);
    return Math.round(f);
  }

  checkType() {
    if (!Number.isInteger(this.entry.distance)) throw new TypeError();
    if (!Number.isInteger(this.entry.time)) throw new TypeError();
    return this;
  }

  checkRange() {
    if (this.entry.distance <= 0 || this.entry.time < 0) {
      throw new Error();
    }
    return this;
  }
}
