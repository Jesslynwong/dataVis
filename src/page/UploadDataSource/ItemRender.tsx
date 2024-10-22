import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Progress, UploadFile } from "antd";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface ItemRenderProps {
  file: UploadFile;
  progress?: number;
  showProgress?: boolean;
  filenameColor?: string;
  slot?: React.ReactNode;
  onEyeClick?: MouseEventHandler<HTMLSpanElement>;
  onDelete?: MouseEventHandler<HTMLSpanElement>;
}
export default function ItemRender({
  file,
  progress,
  showProgress,
  filenameColor,
  slot,
  onDelete,
  onEyeClick,
}: ItemRenderProps) {
  const isProcessingSuccess = file.response?.response?.status === "succeed";

  return (
    <div>
      <ItemRenderWrapper>
        <FileNameWrapper style={{ color: filenameColor }}>
          <span style={{ marginRight: "4px" }}>{slot}</span>
          {file.name}
        </FileNameWrapper>
        <IconWrapper>
          {onEyeClick && isProcessingSuccess && (
            <Hover>
              <EyeOutlined
                style={{ color: "cadetblue", cursor: "pointer" }}
                alt="Check Statistic"
                title="Check Statistic"
                onClick={onEyeClick}
              />
            </Hover>
          )}
          {onDelete && (
            <Hover>
              <DeleteOutlined
                style={{ color: "orangered", cursor: "pointer" }}
                alt="Delete"
                title="Delete"
                onClick={onDelete}
              />
            </Hover>
          )}
        </IconWrapper>
      </ItemRenderWrapper>
      {showProgress && (
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

const Hover = styled.div`
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

const FileNameWrapper = styled.div`
  opacity: 0.6;
  cursor: pointer;
  font-weight: 500;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const ItemRenderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
