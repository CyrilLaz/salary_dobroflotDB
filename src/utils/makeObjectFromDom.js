class MakeObject {
  constructor(page, numberPage, scheme) {
    this.page = page;
    this.table = this.page.querySelector('TABLE');
    this.tableRows = Array.from(this.table.querySelectorAll('tr'));
    this.result = [];
    this.numberPage = numberPage;
    this.scheme = scheme;
    this.rows = this.tableRows.slice(3, this.tableRows.length - 1);
    this.namesSelectorArray = this._findNameRows();

    this.nameFields = Array.from(
      this.rows.filter((el) =>
        this.namesSelectorArray.some((sel) => el.querySelector(sel))
      )
    );
    this.period = this._getDates();
  }

  _getDates() {
    const infoArray = this.table
      .querySelector('.R0C0 span')
      .textContent.replace(/\s/g, ' ')
      .split(' ');
    const period = {
      from: this._makeDateObject(infoArray[2]),
      till: this._makeDateObject(infoArray[4]),
    };
    return period;
  }

  createArray() {
    this._makeObject();
    //this._getInfo();
    return this.result;
  }

  _findNameRows() {
    const array = [];
    for (let i of this.page.styleSheets[0].cssRules) {
      array.push(i);
    }

    return array
      .filter(
        (el) =>
          el.cssText.includes('#f8f2d8') ||
          el.cssText.includes('rgb(248, 242, 216)')
      )
      .map((el) => el.selectorText);
  }

  _makeDateObject(string) {
    const dateArray = string.split('.').map((num) => Number(num));
    const date = new Date(dateArray.reduce((prev, next) => next + ' ' + prev));
    return date;
  }

  _makeObject() {
    this.nameFields.forEach((el) => {
      const name = this._getChildElement(el);
      const spots = this._getSpots(el);

      const obj = {
        name: name.textContent,
      };
      obj.period = this.period;
      obj.spots = spots;

      this.result.push(obj);
    });
  }

  _getSpots(el) {
    const res = [];
    let name = el.nextElementSibling;

    do {
      res.push(this._getDetails(name));
      name = name.nextElementSibling;
    } while (!this.nameFields.includes(name) && this.rows.includes(name));

    return res;
  }

  //_checkspot(el)
  _getChildElement(el) {
    return el.firstElementChild;
  }

  _getDetails(el) {
    const res = {};
    const num = el.querySelectorAll('span');
    res.name = this._getChildElement(el).textContent;
    res.ktu = this._makeNumberFromString(num[0].textContent);
    res.hours = this._makeNumberFromString(num[1].textContent);
    res.accrual = this._makeNumberFromString(num[2].textContent);
    res.bonus = this._makeNumberFromString(num[3].textContent);
    res.fine = this._makeNumberFromString(num[4].textContent);
    return res;
  }

  _makeNumberFromString(string) {
    let num = string.replace(/,/g, '.');
    num = parseFloat(num.replace(/\s/g, ''));
    if (!string) num = 0;
    return num;
  }
}

module.exports = { MakeObject };
