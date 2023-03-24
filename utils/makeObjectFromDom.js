class MakeObject {
  constructor(page) {
    this.page = page;
    this.table = this.page.querySelector('TABLE');
    this.result = [];
    this.period = this._getDates();
    this.columns = this.table.querySelectorAll('col');
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
          el.style['background-color'] === '#f8f2d8' ||
          el.style['background-color'] === '#rgb(248, 242, 216)'
      )
      .map((el) => el.selectorText);
  }

  _makeDateObject(string) {
    const dateArray = string.split('.').map((num) => Number(num));
    const date = new Date(dateArray.reduce((prev, next) => next + ' ' + prev));
    return date;
  }

  _makeObject() {
    const tableRows = Array.from(this.table.querySelectorAll('tr'));
    const rows = tableRows.slice(3, tableRows.length - 1);
    const namesSelectorArray = this._findNameRows();
    const nameFields = Array.from(
      rows.filter((el) =>
        namesSelectorArray.some((sel) => el.querySelector(sel))
      )
    );

    const getDetails = this._getDetails.bind(this);
    
    function _getSpots(el) {
      const res = [];
      let name = el.nextElementSibling;

      do {
        res.push(getDetails(name));
        name = name.nextElementSibling;
      } while (!nameFields.includes(name) && rows.includes(name));

      return res;
    }

    nameFields.forEach((el) => {
      const name = this._getChildElement(el);
      const spots = _getSpots(el);

      const obj = {
        name: name.textContent,
        period: this.period,
        spots: spots,
      };

      this.result.push(obj);
    });
  }

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
    let num = 0;
    if (!string) return num;
    num = string.replace(/,/g, '.');
    num = parseFloat(num.replace(/\s/g, ''));
    return num;
  }
}

module.exports = { MakeObject };
