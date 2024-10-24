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
  Spin,
  ConfigProvider,
} from "antd";

import { supportedUploadExtension } from "../../config/configuration";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import { UploadFileStatus } from "antd/es/upload/interface";
import ItemRender from "./ItemRender";
import { UploadRef } from "antd/es/upload/Upload";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../App";
import { jsonizeData } from "../../utils";
import LoadingLogo from "../../components/LoadingLogo";

const host = "http://120.26.49.230:7777";

const { Dragger } = Upload;
const SerilizedFileExtension = supportedUploadExtension
  .map((v) => `.${v}`)
  .join(",");

export default function UploadDataSource() {
  const [draggerStatus, setDraggerStatus] = useState<UploadFileStatus>();

  const [progress, setProgress] = useState(0);

  const [isUploadingWithAnimation, setIsUploadingWithAnimation] =
    useState(false);

  const [processingUid, setProcessingUid] = useState<string | null>(null);

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
      navigate(`/report/${uid}`);
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
      const isNewOne = file === fileList[fileList.length - 1];
      const filenameColor = mapStatusToColor({
        errorColor: "#ff7875",
        doneColor:
          file.response?.response?.status === "succeed"
            ? "lightseagreen"
            : file.response?.response?.status === "error"
            ? "#ff7875"
            : undefined,
        defaultColor: "#10a3ff",
        status: currentFile.status,
      });
      return (
        <ItemRender
          file={file}
          showProgress={isNewOne && isUploadingWithAnimation}
          progress={progress}
          filenameColor={filenameColor}
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
      action: `${host}/FileHanddler`,
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
              setProcessingUid(file.uid);
            }, 300);
          } else if (file.status === "error") {
            setTimeout(() => {
              setIsUploadingWithAnimation(false);
            }, 300);
          }
        }
        if (event) {
          setProgress(event.percent);
          if (event.percent === 100) {
            setTimeout(() => setProgress(0), 400);
          }
        }
      },
      data(file) {
        return { file_uid: file.uid };
      },
    }),
    [draggerStatus, fl, itemRender, setFl]
  );
  const loadReport = async () => {
    // todo: need to handle empty excel file while fetch api will return 400.
    const rawRes = await fetch(
      `${host}/upload_and_process?file_uid=${processingUid}`
    );
    const matchFile = fl.find((file) => file.uid === processingUid);
    if (!matchFile) {
      return message.error("Unexpected error!");
    }
    const response: { json_report: string; json_source: string } =
      await rawRes.json();

    if (rawRes.status === 200) {
      response.json_report = jsonizeData(response.json_report);
      response.json_source = jsonizeData(response.json_source);
      matchFile.response = {
        ...(matchFile.response ?? {}),
        response,
      };
      goCheckReport(matchFile.uid);
    } else {
      matchFile.response = {
        ...(matchFile.response ?? {}),
        response,
      };
    }
    setProcessingUid(null);
  };

  useEffect(() => {
    if (processingUid !== null) {
      loadReport();
    }
  }, [processingUid]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryBorder: "#bec0da",
          colorBorder: "#bec0da",
          colorPrimaryHover: "#8a92da",
        },
      }}
    >
      <Wrapper>
        <LogoWrapper>
          <StyledLogo />
        </LogoWrapper>

        <DraggerWrapper>
          <Dragger
            ref={inputController}
            {...uploadProps}
            style={{
              borderWidth: "2px",
            }}
          >
            <div>
              <StyledButton
                loading={isUploadingWithAnimation}
                icon={<UploadOutlined style={{ fontSize: "24px" }} />}
                size="large"
              >
                {isUploadingWithAnimation
                  ? "uploading"
                  : "Click or drag file to this area to upload"}
              </StyledButton>

              <div>
                <p
                  className="ant-upload-hint"
                  style={{
                    color: mapStatusToColor({ defaultColor: "#a0a2ba" }),
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
      </Wrapper>

      <Spin
        spinning={processingUid !== null}
        fullscreen
        indicator={
          <>
            <LoadingLogo />
          </>
        }
      />
    </ConfigProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const DraggerWrapper = styled.section`
  width: 68%;
  height: 240px;
  min-width: 200px;
  > span {
    > div:nth-of-type(1):hover {
      background-color: rgba(199, 199, 199, 0.2);
    }

    > div:nth-of-type(2) > div:hover {
      background-color: rgba(199, 199, 199, 0.2);
    }
  }
`;

const LogoWrapper = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledLogo = styled.div`
  margin-bottom: -48px;
  margin-top: 48px;
  width: 500px;
  height: 400px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  background-image: url(${logo});
`;

const StyledButton = styled(Button)`
  border: none;
  background-color: #bec0da;
  color: white;
  font-weight: bolder;
  padding: 24px 36px;
`;
