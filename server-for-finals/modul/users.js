const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'finals',
  user: 'root',
  password: 'root',
});

module.exports = class userDB {
  constructor() {
    pool.getConnection().then(
      conn => this.conn = conn,
    );
  }

  async readUsers(id = 0) {
    let query;
    if (id == 0) {
      query = `
    SELECT u.id, u.name, u.email, t.title
      FROM users AS u
        INNER JOIN titles AS t ON u.title=t.id;
  `;
    } else {
      query = `
      SELECT u.id, u.name, u.email, t.title
        FROM users AS u
          INNER JOIN titles AS t ON u.title=t.id
        WHERE u.id = ${id};
    `;
    }
    const result = await this.conn.query(query);
    return result;
  }


  async updateUser(updatedUser) {
    const query = `
    UPDATE users
    SET
    name='${updatedUser.name}',
    email='${updatedUser.email}',
    title=${updatedUser.title}
    WHERE id=${updatedUser.id}
    `;
    const result = await this.conn.query(query);
    return result;
  }

  async deleteUser(id) {
    const query = `
    DELETE FROM users WHERE id=${id};
    `;
    const result = await this.conn.query(query);
    return result;
  }

  async createUser(newUser) {
    const query = `
    INSERT INTO users (name, password, email, title)
    VALUES ('${newUser.name}', SHA1('${newUser.name}'), '${newUser.email}', ${newUser.title})
    `;
    const result = await this.conn.query(query);
    return result;
  }

  async getTitles() {
    const query = 'SELECT * FROM titles';
    const result = await this.conn.query(query);
    return result;
  }
};
