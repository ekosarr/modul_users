var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const ModelDpi = require("../model/model_dpi.js");

router.get("/", async function (req, res, next) {
  try {
    let rows = await ModelDpi.getAll();
    res.render("dpi/index", {
      data: rows,
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/dpi");
  }
});

router.get("/create", function (req, res, next) {
  res.render("dpi/create", {
    nama_dpi: "",
    luas: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_dpi, luas } = req.body;
    let data = {
      nama_dpi,
      luas,
    };
    await ModelDpi.Store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/dpi");
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await ModelDpi.getById(id);
    if (rows.length === 0) {
      throw new Error("Data dpi tidak ditemukan");
    }
    res.render("dpi/edit", {
      id: rows[0].id_dpi,
      nama_dpi: rows[0].nama_dpi,
      luas: rows[0].luas,
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/dpi");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_dpi, luas, no_hp } = req.body;
    let data = {
      nama_dpi,
      luas,
    };
    let updateSuccess = await ModelDpi.Update(id, data);
    if (updateSuccess) {
      req.flash("success", "Berhasil mengubah data");
    } else {
      req.flash("error", "Gagal mengubah data");
    }
    res.redirect("/dpi");
  } catch (err) {
    req.flash("error", "Terjadi kesalahan saat mengubah data");
    res.redirect("/dpi");
  }
});

router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  await ModelDpi.Delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/dpi");
});

module.exports = router;
