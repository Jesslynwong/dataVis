/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-09-12 17:07:51
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-10 14:49:33
 * @FilePath: /dataVis/src/page/Upload/index.ts
 */

import logo from "../../assets/logo1.jpeg";

import {
  Button,
  UploadProps,
  message,
  Upload,
  UploadFile,
  Progress,
} from "antd";

import { supportedUploadExtension } from "../../config/configuration";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { UploadFileStatus } from "antd/es/upload/interface";
import ItemRender from "./ItemRender";

const { Dragger } = Upload;
const SerilizedFileExtension = supportedUploadExtension
  .map((v) => `.${v}`)
  .join(",");

export default function UploadDataSource() {
  const [draggerStatus, setDraggerStatus] = useState<UploadFileStatus>();

  const [progress, setProgress] = useState(0);

  const uploadProps: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    // showUploadList: false,
    listType: "text",
    disabled: draggerStatus === "uploading",
    beforeUpload(file, fileList) {
      console.log(">> beforeUpload, file ", file);
      console.log(">> beforeUpload, fileList", fileList);
      const { name } = file;
      if (!supportedUploadExtension.find((v) => name.endsWith(v))) {
        setDraggerStatus("removed");
        message.info(`Only support ${SerilizedFileExtension} to upload!`);
        return Upload.LIST_IGNORE;
      }
    },
    onChange({ file, event }) {
      if (file.status) {
        setDraggerStatus(file.status);
      }
      if (event) {
        setProgress(event.percent);
        if (event.percent === 100) {
          setTimeout(() => setProgress(0), 500);
        }
      }
    },
    itemRender(_, file, fileList) {
      const isNewOne = file === fileList[fileList.length - 1];
      console.log(">> progress: ", progress);
      return (
        <ItemRender file={file} showProgress={isNewOne} progress={progress} />
      );
    },
  };

  const mapStatusToColor = ({
    defaultColor,
    errorColor,
    removedColor,
    uploadingColor,
    doneColor,
  }: {
    defaultColor?: string;
    errorColor?: string;
    removedColor?: string;
    uploadingColor?: string;
    doneColor?: string;
  }) => {
    switch (draggerStatus) {
      //  'error' | 'done' | 'uploading' | 'removed';
      case "error":
        return errorColor ?? defaultColor;
      case "uploading":
        return uploadingColor ?? defaultColor;
      case "done":
        return doneColor ?? defaultColor;
      case "removed":
        return removedColor ?? defaultColor;
      default:
        return defaultColor;
    }
  };

  const isUploading = draggerStatus === "uploading";

  return (
    <div>
      <LogoWrapper>
        <StyledLogo />
      </LogoWrapper>

      <UploadWrapper>
        <DraggerWrapper>
          <Dragger
            {...uploadProps}
            style={{
              borderColor: mapStatusToColor({ defaultColor: "#bec0da" }),
              borderWidth: "2px",
            }}
          >
            <div>
              <Button
                loading={isUploading}
                icon={<UploadOutlined />}
                size="large"
                style={{
                  border: "none",
                  backgroundColor: mapStatusToColor({
                    defaultColor: "#bec0da",
                  }),
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                {isUploading
                  ? "uploading"
                  : "Click or drag file to this area to upload"}
              </Button>

              <div>
                <p
                  className="ant-upload-hint"
                  style={{
                    color: mapStatusToColor({ defaultColor: "#bec0da" }),
                  }}
                >
                  Support for an excel file upload with subfix "
                  {SerilizedFileExtension}
                  ".
                  <br />
                  Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </div>
            </div>
          </Dragger>
          <div></div>
        </DraggerWrapper>
      </UploadWrapper>

      <div>status: {draggerStatus}</div>
    </div>
  );
}

const DraggerWrapper = styled.div`
  width: 68%;
  height: 200px;
`;

const UploadWrapper = styled.section`
  display: flex;
  justify-content: center;
`;

const LogoWrapper = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: -68px;
  opacity: 0.6;
`;
const StyledLogo = styled.img.attrs({ src: logo, alt: "logo" })`
  width: 40%;
  cursor: pointer;
`;

const OnelineLayout = styled.div`
  display: flex;
  align-items: center;
`;
