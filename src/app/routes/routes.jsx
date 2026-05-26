import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdicionarProduto from "../../pages/AdicionarProduto/AdicionarProduto";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/adicionar-produto"
          element={<AdicionarProduto />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;