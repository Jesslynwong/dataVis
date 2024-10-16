/*
 * @Author: Jesslynwong jesslynwjx@gmail.com
 * @Date: 2024-09-12 17:07:51
 * @LastEditors: Jesslynwong jesslynwjx@gmail.com
 * @LastEditTime: 2024-10-10 14:49:33
 * @FilePath: /dataVis/src/page/Upload/index.ts
 */

import logo from "../../assets/logo1.jpeg";

import { Button, UploadProps, message, Upload } from "antd";

import { supportedUploadExtension } from "../../config/configuration";
import styled from "styled-components";
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { createRef, useCallback, useMemo, useState } from "react";
import { UploadFileStatus } from "antd/es/upload/interface";
import ItemRender from "./ItemRender";
import { UploadRef } from "antd/es/upload/Upload";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../App";

const { Dragger } = Upload;
const SerilizedFileExtension = supportedUploadExtension
  .map((v) => `.${v}`)
  .join(",");

export default function UploadDataSource() {
  const [draggerStatus, setDraggerStatus] = useState<UploadFileStatus>();

  const [progress, setProgress] = useState(0);

  const [isUploadingWithAnimation, setIsUploadingWithAnimation] =
    useState(false);

  const { fileList: fl, setFileList: setFl } = useGlobalContext();

  const inputController = createRef<UploadRef>();

  const navigate = useNavigate();

  const mapStatusToColor = useCallback(
    ({
      defaultColor,
      errorColor,
      removedColor,
      uploadingColor,
      doneColor,
      status = draggerStatus,
    }: {
      defaultColor?: string;
      errorColor?: string;
      removedColor?: string;
      uploadingColor?: string;
      doneColor?: string;
      status?: UploadFileStatus;
    }) => {
      switch (status) {
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
    },
    [draggerStatus]
  );

  const goCheckReport = useCallback(
    (uid: string) => {
      navigate(`/report?fl=${uid}`);
    },
    [navigate]
  );

  const itemRender = useCallback<NonNullable<UploadProps["itemRender"]>>(
    (_, file, fileList) => {
      const currentIndex = fileList.indexOf(file);
      const currentFile = ~currentIndex ? fileList[currentIndex] : null;
      if (!currentFile) {
        return null;
      }
      const isCurrentSuccess = currentFile.status === "done";
      const isCurrentFailed = currentFile.status === "error";
      const isNewOne = file === fileList[fileList.length - 1];
      const filenameColor = mapStatusToColor({
        errorColor: "red",
        doneColor: "lightseagreen",
        status: currentFile.status,
      });
      return (
        <ItemRender
          file={file}
          showProgress={isNewOne && isUploadingWithAnimation}
          progress={progress}
          filenameColor={filenameColor}
          slot={
            isCurrentSuccess ? (
              <CheckOutlined
                style={{ color: filenameColor, width: "10px", stroke: "2px" }}
              />
            ) : isCurrentFailed ? (
              <CloseOutlined
                style={{ color: filenameColor, width: "10px", stroke: "2px" }}
              />
            ) : undefined
          }
          onDelete={() =>
            setFl(fileList.filter((v) => v !== fileList[currentIndex]))
          }
          onEyeClick={
            isCurrentSuccess ? () => goCheckReport(currentFile.uid) : undefined
          }
        />
      );
    },
    [goCheckReport, isUploadingWithAnimation, mapStatusToColor, progress, setFl]
  );

  const uploadProps: UploadProps = useMemo(
    () => ({
      name: "file",
      action: "http://120.26.49.230:7777/FileHanddler",
      listType: "text",
      itemRender,
      disabled: draggerStatus === "uploading",
      fileList: fl,
      beforeUpload(file) {
        const { name } = file;
        if (!supportedUploadExtension.find((v) => name.endsWith(v))) {
          setDraggerStatus("removed");
          message.info(`Only support ${SerilizedFileExtension} to upload!`);
          return Upload.LIST_IGNORE;
        }
      },
      onChange({ file, event, fileList }) {
        setFl(fileList);

        if (file.status) {
          setDraggerStatus(file.status);
          if (file.status === "uploading") {
            setIsUploadingWithAnimation(true);
          } else if (file.status === "done") {
            setTimeout(() => {
              setIsUploadingWithAnimation(false);
            }, 300);
            setTimeout(() => {
              goCheckReport(file.uid);
            }, 400);
          } else if (file.status === "error") {
            setTimeout(() => {
              setIsUploadingWithAnimation(false);
            }, 300);
            setTimeout(() => {
              goCheckReport(file.uid);
            }, 400);
          }
        }
        if (event) {
          setProgress(event.percent);
          if (event.percent === 100) {
            setTimeout(() => setProgress(0), 400);
          }
        }
      },
    }),
    [draggerStatus, fl, goCheckReport, itemRender, setFl]
  );

  return (
    <div>
      <LogoWrapper>
        <StyledLogo />
      </LogoWrapper>

      <UploadWrapper>
        <DraggerWrapper>
          <Dragger
            ref={inputController}
            {...uploadProps}
            style={{
              borderColor: mapStatusToColor({ defaultColor: "#bec0da" }),
              borderWidth: "2px",
            }}
          >
            <div>
              <Button
                loading={isUploadingWithAnimation}
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
                {isUploadingWithAnimation
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
        </DraggerWrapper>
      </UploadWrapper>
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
