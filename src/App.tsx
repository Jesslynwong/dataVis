/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-09-12 14:49:09
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-10 14:47:46
 * @FilePath: /dataVis/src/App.tsx
 */
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadDataSource from "./page/UploadDataSource";
import Statistics from "./page/Statistics";
import Ideas from "./page/Ideas";
import Report from "./page/Report";
import { UploadFile } from "antd";

type IGlobalContext<T> = {
  fileList: T[];
  setFileList: Dispatch<SetStateAction<T[]>>;
};
const GlobalContext = createContext<IGlobalContext<UploadFile>>({
  fileList: [],
  setFileList: () => undefined,
});

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <GlobalContext.Provider value={{ fileList, setFileList }}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<UploadDataSource />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="ideas" element={<Ideas />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default App;
