import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./core/layout/Header";
import { Home } from "./features/home";
import { PublishersList } from "./features/publishers";
import { BooksList, BookForm } from "./features/books";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publishers" element={<PublishersList />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/create" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
