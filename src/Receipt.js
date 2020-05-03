import fs from 'fs';
import path from 'path';
import os from 'os';
import Calculator from './Calculator';

export default class Receipt {
  constructor(dataFile) {
    this.dataFile = dataFile;
    this.calculator = new Calculator();
  }

  parse() {
    const filepath = path.join('./src/fixtures', this.dataFile);
    this.lines = fs.readFileSync(filepath, 'utf-8').split(os.EOL);
    this.validate();
    this.parseEntries();
    this.calc();
    return this;
  }

  validate() {
    this.lines.forEach(each => {
      if (!each.match(/\d+公里,等待\d+分钟/)) {
        throw new Error('not match');
      }
    });
  }

  parseEntries() {
    this.entries = [];
    const re = /^(\d+)公里,等待(\d+)分钟$/;
    this.lines.forEach(line => {
      const [d, t] = line.match(re).slice(1, 3);
      this.entries.push({ distance: parseInt(d, 10), time: parseInt(t, 10) });
    });
  }

  calc() {
    this.entries = this.entries.map(each => this.calculator.calc(each));
  }

  toString() {
    return this.entries.map(each => `收费${each}元\n`).join('');
  }
}
