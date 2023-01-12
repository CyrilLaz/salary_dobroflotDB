class Refactor {
  constructor(page, scheme) {
    this.page = page;
    this.table = this.page.querySelector('TABLE');
    this.tableRows=Array.from(this.table.querySelectorAll('tr'));
    this.result = [];
    this.numberPage = numberPage;
    this.scheme = scheme;
    this.rows = this.tableRows.slice(3,this.tableRows.length-1);
    this.namesSelectorArray = this._findNameRows();

    this.nameFields = Array.from(
      this.rows.filter((el) =>
        this.namesSelectorArray.some((sel) => el.querySelector(sel))
      )
    );
  }
  
  _getInfo() {
    const infoArray = this.table
      .querySelector('.R0C0 span')
      .textContent.replace(/\s/g, ' ')
      .split(' ');
    const period = [
      this._makeDateObject(infoArray[2]),
      this._makeDateObject(infoArray[4]),
    ];
    const department = this.scheme.department;
    const brigade = this.scheme.brigade;
    return { period, department, brigade };
  }

  createObject() {

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
    const info = this._getInfo();
    this.nameFields.forEach((el) => {
      const firstChild = this._getChildElement(el);
      const spots = this._getSpots(el);

      //const details = {info,spots};
      const obj = {
        name: firstChild.textContent,
        login: this._makeLoginFromName(firstChild.textContent),
        details: {
          brigade: info.brigade,
          department: info.department,
        },
      };
      obj.details.period = info.period;
      obj.details.spots = spots;

      this.result.push(obj);
      // this.result[firstChild.textContent] = this._getSpots(el);
    });
  }

  _makeLoginFromName(name) {
    return name.split(' ', 1)[0];
  }

  _getSpots(el) {
    const res = [];
    let spot = el.nextElementSibling;

    do {
      res.push(this._getDetails(spot));
      spot = spot.nextElementSibling;
    } while (!this.nameFields.includes(spot) && this.rows.includes(spot));

    return res;
  }

  //_checkspot(el)
  _getChildElement(el) {
    return el.firstElementChild;
  }

  _getDetails(el) {
    const res = {};
    const num = el.querySelectorAll('span');
    res.spot = this._getChildElement(el).textContent;
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

module.exports = { Refactor: Refactor };
