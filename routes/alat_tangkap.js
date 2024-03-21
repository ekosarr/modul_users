var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const ModelAlatTangkap = require("../model/model_alat_tangkap.js");

router.get("/", async function (req, res, next) {
  try {
    let rows = await ModelAlatTangkap.getAll();
    res.render("alat_tangkap/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/alat_tangkap");
  }
});

router.get("/create", function (req, res, next) {
  res.render("alat_tangkap/create", {
    nama_alat_tangkap: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_alat_tangkap } = req.body;
    let data = {
      nama_alat_tangkap,
    };
    await ModelAlatTangkap.Store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/alat_tangkap");
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await ModelAlatTangkap.getById(id);
    if (rows.length === 0) {
      throw new Error("Data alat_tangkap tidak ditemukan");
    }
    res.render("alat_tangkap/edit", {
      id: rows[0].id_alat_tangkap,
      nama_alat_tangkap: rows[0].nama_alat_tangkap,
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/alat_tangkap");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_alat_tangkap } = req.body;
    let data = {
      nama_alat_tangkap,
    };
    let updateSuccess = await ModelAlatTangkap.Update(id, data);
    if (updateSuccess) {
      req.flash("success", "Berhasil mengubah data");
    } else {
      req.flash("error", "Gagal mengubah data");
    }
    res.redirect("/alat_tangkap");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat mengubah data");
    res.redirect("/alat_tangkap");
  }
});

router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await ModelAlatTangkap.Delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/alat_tangkap");
});

module.exports = router;
