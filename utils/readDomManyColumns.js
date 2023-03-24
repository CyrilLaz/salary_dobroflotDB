class ManyColumns {
  constructor(object) {
    this.object = object;
    this.result = [];
    this.period = object.period
  }

  createArray() {
    const tableRows = Array.from(this.object.table.rows);
    const rows = tableRows.slice(3);
    const namesSelectorArray = this._findNameRows();
    const { length } = this.object.columns;
    for (let col = 0; col < length - 2; col = col + 8) {
      for (let index = 0; index < rows.length; index++) {
        const column = Array.from(rows[index].cells).slice(col, col + 8);

        if (!column[0].textContent) {
          break;
        }
        const isNameRow = namesSelectorArray.some((sel) =>
          sel
            .toUpperCase()
            .includes(column[0].tagName + '.' + column[0].className)
        );

        let obj = { spots: [], period: this.period };
        if (isNameRow) {
          obj.name = column[0].textContent;
          this.result.push(obj);
        } else {
          this.result[this.result.length - 1].spots.push(
            this._getDetails(column)
          );
        }
      }
    }
    return this.result;
  }

  _getChildElement(el) {
    return el.firstElementChild;
  }

  getTime() {
    return this.object.getTime()
  }
  _getDetails(el) {
    return {
      name: el[0].textContent,
      ktu: this._makeNumberFromString(el[1].textContent),
      hours: this._makeNumberFromString(el[2].textContent),
      accrual: this._makeNumberFromString(el[3].textContent),
      bonus: this._makeNumberFromString(el[4].textContent),
      fine: this._makeNumberFromString(el[5].textContent),
    };
  }

  _findNameRows() {
    return this.object._findNameRows();
  }

  _makeNumberFromString(string) {
    return this.object._makeNumberFromString(string);
  }
}

module.exports = ManyColumns;
