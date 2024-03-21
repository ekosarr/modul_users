const { Store } = require("express-session");
const connection = require("../config/database");

class Model_Kapal {
    static async getAll() {
        return new Promise((resolve, reject) => {
          const query = `
            SELECT kapal.*, pemilik.nama_pemilik, alat_tangkap.nama_alat_tangkap, dpi.nama_dpi
            FROM kapal
            INNER JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik
            INNER JOIN alat_tangkap ON kapal.id_alat_tangkap = alat_tangkap.id_alat_tangkap
            INNER JOIN dpi ON kapal.id_dpi = dpi.id_dpi
            ORDER BY kapal.id_kapal DESC
          `;
          connection.query(query, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }
    
      static async Store(Data) {
        return new Promise((resolve, reject) => {
          connection.query("INSERT INTO kapal SET ?", Data, function (err, result) {
            if (err) {
              reject(err);
              console.log(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
      static async getById(id) {
        return new Promise((resolve, reject) => {
          connection.query("SELECT * FROM kapal WHERE id_kapal = ?", id, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }
    
      static async Update(id, Data) {
        return new Promise((resolve, reject) => {
          connection.query("UPDATE kapal SET ? WHERE id_kapal = ?", [Data, id], function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
      static async Delete(id) {
        return new Promise((resolve, reject) => {
          connection.query("DELETE FROM kapal WHERE id_kapal = ?", id, function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    }    

module.exports = Model_Kapal;
