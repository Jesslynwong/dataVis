import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { Progress, UploadFile } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ItemRenderProps {
  file: UploadFile;
  progress?: number;
  showProgress?: boolean;
}
export default function ItemRender({
  file,
  progress,
  showProgress,
}: ItemRenderProps) {
  const [isShowProgress, setIsShowProgress] = useState(showProgress);

  useEffect(() => {
    if (showProgress && progress === 100) {
      setTimeout(() => {
        setIsShowProgress(false);
      }, 400);
    }
  }, [progress]);

  return (
    <div>
      <ItemRenderWrapper>
        <div>{file.name}</div>
        <div>
          <ReloadOutlined />
        </div>
        <div>
          <DeleteOutlined />
        </div>
      </ItemRenderWrapper>
      {isShowProgress && (
        <Progress
          showInfo={false}
          percent={progress}
          percentPosition={{ align: "center", type: "outer" }}
          size="small"
          strokeColor="#bec0da"
        />
      )}
    </div>
  );
}

const ItemRenderWrapper = styled.div`
  display: flex;
`;
