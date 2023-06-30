import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  console.log('db: ', menuItems);
  db.transaction((tx) => {
    let sqlStatement =
      'insert into menuitems (name, price, description, image, category) values ';
    let sqlArg = [];
    for (let i = 0; i < menuItems.length; i++) {
      if (i === menuItems.length - 1) {
        sqlStatement += '(?,?,?,?,?)';
      } else {
        sqlStatement += '(?,?,?,?,?),';
      }
      sqlArg.push(
        String(menuItems[i].name),
        String(menuItems[i].price),
        String(menuItems[i].description),
        String(menuItems[i].image),
        String(menuItems[i].category)
      );
    }

    tx.executeSql(sqlStatement, sqlArg);
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from menuitems where name like ? and (category = ? or category = ? or category = ?)',
        [`%${query}%`, ...activeCategories],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    }, reject);
  });
}
