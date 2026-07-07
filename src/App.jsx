import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./core/layout/Header";
import { Home } from "./features/home";
import { PublishersList } from "./features/publishers";
import { BooksList, BookForm } from "./features/books";
import { AuthorsPagination } from "./features/authors";
import SortPublishers from "./features/publishers/components/SortPublishers";
import UserContext from "./core/userContext";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import SearchVolumes from "./features/comics/components/SearchVolumes";
import SearchIssues from "./features/comics/components/SearchIssues";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="publishers/sort" element={<SortPublishers />} />
            <Route path="/publishers" element={<PublishersList />} />
            <Route path="/books" element={<BooksList />} />
            <Route
              path="/books/create"
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/books/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["Editor"]}>
                  <BookForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volumes/search"
              element={
                <ProtectedRoute allowedRoles={["Editor"]}>
                  <SearchVolumes />
                </ProtectedRoute>
              }
            />

            <Route
              path="/volumes/:volumeId/issues"
              element={
                <ProtectedRoute allowedRoles={["Editor"]}>
                  <SearchIssues />
                </ProtectedRoute>
              }
            />
            <Route path="/authors/pagination" element={<AuthorsPagination />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
