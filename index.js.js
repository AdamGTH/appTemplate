// 1. Przygotuj widoki dla poniższej strony:
// Założenia:
// - użyj systemu szablonów EJS
// - widoki trzymaj w folderze 'views'
// - przygotuj pliki 'header' i 'footer'
// - przygotuj layout o nazwie 'main'
// - przygotuj widoki 'home', 'contact', 'user'
// - pliki widoku trzymaj odpowiednia w folderach: partials, pages, layouts, errors
// - przygotuj plik CSS i wczytaj go w headerze; umieść w nim proste stylowanie aby mieć pewność, że działa
// - przygotuj plik JS i wczytaj go w stopce; umieść w nim console.log('Skrypty załadowane') aby mieć pewność, że działa
// - wstać przynajmniej 1 zdjęcie na stronę
// - pliki css, js i zdjęcia umieść odpowiedni w folderzach: css, js, img

const express = require("express");
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const app = express();

const users = [
  { id: 1, name: "Janek", email: "janek@gmail.com" },
  { id: 2, name: "Adam", email: "adam@gmail.com" },
  { id: 3, name: "Tomasz", email: "tomek@my.com" },
  { id: 4, name: "Dawid", email: "dawid@email.com" },
];

let akt = { sg: "dex", uz: "x", kt: "x" };

app.set("view engine", "ejs");

app.use(ejsLayouts);
app.set("layout", "./layouts/main");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Strona główna",
    akt: { sg: "dex", uz: "x", kt: "x" },
  });
});

app.get("/kontakt", (req, res) => {
  // wyrenderuj stronę kontaktu
  console.log(req.url);
  res.render("pages/contact", {
    title: "Kontakt",
    akt: { sg: "x", uz: "x", kt: "dex" },
  });
});

app.get("/profile/:id?", (req, res) => {
  const { id } = req.params;
  const user = users.find((x) => x.id === parseInt(id));
  if (user !== undefined) {
    // wyrenderuj profil użytkownika
    console.log(user);
    res.render("pages/user", {
      user: user.name,
      title: "Strona użytkownika",
      akt: { sg: "x", uz: "", kt: "x" },
    });
    // jeśli nie ma usera wyświetl taką informacje
  } else
    res.render("pages/users", {
      title: "Użytkownicy",
      akt: { sg: "x", uz: "dex", kt: "x" },
      users: users,
    });
});

app.get("*", (req, res) => {
  // wyrenderuj stronę 404
  res.render("errors/error", {
    layout: "layouts/mini",
    title: "Error 404",
    akt: { sg: "x", uz: "x", kt: "x" },
  });
});

app.listen(3000);
