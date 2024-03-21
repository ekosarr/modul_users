var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const ModelPemilik = require("../model/model_pemilik.js");

router.get("/", async function (req, res, next) {
  try {
    let rows = await ModelPemilik.getAll();
    res.render("pemilik/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/pemilik");
  }
});

router.get("/create", function (req, res, next) {
  res.render("pemilik/create", {
    nama_pemilik: "",
    alamat: "",
    no_hp: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_pemilik, alamat, no_hp } = req.body;
    let data = {
      nama_pemilik,
      alamat,
      no_hp,
    };
    await ModelPemilik.Store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/pemilik");
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await ModelPemilik.getById(id);
    res.render("pemilik/edit", {
      id: rows[0].id_pemilik,
      nama_pemilik: rows[0].nama_pemilik,
      alamat: rows[0].alamat,
      no_hp: rows[0].no_hp,
    });
  } catch (error) {
    req.flash("error", error.message);
    console.log(error);
    res.redirect("/pemilik");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_pemilik, alamat, no_hp } = req.body;
    let data = {
      nama_pemilik,
      alamat,
      no_hp,
    };
    let updateSuccess = await ModelPemilik.Update(id, data);
    if (updateSuccess) {
      req.flash("success", "Berhasil mengubah data");
    } else {
      req.flash("error", "Gagal mengubah data");
    }
    res.redirect("/pemilik");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat mengubah data");
    res.redirect("/pemilik");
  }
});

router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await ModelPemilik.Delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/pemilik");
});

module.exports = router;
