import _ from 'lodash';
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
    _.each(this.lines, line => {
      if (!line.match(/(\d+)+公里,等待(\d+)+分钟/)) {
        throw new Error('not match');
      }
    });
  }

  parseEntries() {
    this.entries = _.map(this.lines, line => {
      const [distance, time] = _.map(
        line.match(/(\d+)+公里,等待(\d+)+分钟/).slice(1, 3),
        s => parseInt(s, 10),
      );
      return { distance, time };
    });
  }

  calc() {
    this.entries = _.map(this.entries, entry => this.calculator.calc(entry));
  }

  toString() {
    return _.map(this.entries, each => `收费${each}元\n`).join('');
  }
}
