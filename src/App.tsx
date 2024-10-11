/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-09-12 14:49:09
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-10 14:47:46
 * @FilePath: /dataVis/src/App.tsx
 */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadDataSource from "./page/UploadDataSource";
import Statistics from "./page/Statistics";
import Ideas from "./page/Ideas";
import MainLayout from "./page/MainLayout";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<UploadDataSource />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="ideas" element={<Ideas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
