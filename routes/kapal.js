var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const Model_Kapal = require("../model/model_kapal.js");

router.get("/", async function (req, res, next) {
  try {
    let rows = await Model_Kapal.getAll();
    res.render("kapal/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/kapal");
  }
});

router.get("/create", function (req, res, next) {
  res.render("kapal/create", {
    nama_kapal: "",
    id_pemilik: "",
    id_dpi: "",
    id_alat_tangkap: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
    let data = {
      nama_kapal,
      id_pemilik,
      id_dpi,
      id_alat_tangkap,
    };
    await Model_Kapal.Store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/kapal");
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await Model_Kapal.getById(id);
    if (rows.length === 0) {
      throw new Error("Data kapal tidak ditemukan");
    }
    res.render("kapal/edit", {
      id: rows[0].id_kapal,
      nama_kapal: rows[0].nama_kapal,
      id_pemilik: rows[0].id_pemilik,
      id_dpi: rows[0].id_dpi,
      id_alat_tangkap: rows[0].id_alat_tangkap,
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/kapal");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
    let data = {
      nama_kapal,
      id_pemilik,
      id_dpi,
      id_alat_tangkap,
    };
    let updateSuccess = await Model_Kapal.Update(id, data);
    if (updateSuccess) {
      req.flash("success", "Berhasil mengubah data");
    } else {
      req.flash("error", "Gagal mengubah data");
    }
    res.redirect("/kapal");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat mengubah data");
    res.redirect("/kapal");
  }
});

router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await Model_Kapal.Delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/kapal");
});

module.exports = router;
