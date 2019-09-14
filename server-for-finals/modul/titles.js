const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'finals',
  user: 'root',
  password: 'root',
});

module.exports = class titleDB {
  constructor() {
    pool.getConnection().then(
      conn => this.conn = conn,
    );
  }

  async readTitles(id = 0) {
    let query;
    if (id == 0) {
      query = `
      SELECT * FROM titles;
      `;
    } else {
      query = `
      SELECT * FROM titles WHERE id=${id};
      `;
    }
    const result = await this.conn.query(query);
    return result;
  }

  async createTitle(name) {
    const query = `
    INSERT INTO titles (title)
    VALUES ('${name}');
    `;
    const result = await this.conn.query(query);
    return result;
  }

  async updateTitle(name, id) {
    const query = `
    UPDATE titles
    SET title='${name}'
    WHERE id=${id};
    `;
    const result = await this.conn.query(query);
    return result;
  }

  async deleteTitle(id) {
    const query = `
    DELETE FROM titles
    WHERE id=${id};
    `;
    const result = await this.conn.query(query);
    return result;
  }
};
