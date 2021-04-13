import React, { FC, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

export interface WrapperDivProps {
  width?: number;
  height?: number;
}

export interface ContentDivProps {
  animation: Any;
  duration: number;
}

export interface TextPProps {
  height: number;
}

const Wrapper = styled.div<WrapperDivProps>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  height: ${(props) => (props.height ? `${props.height}px` : '44px')};
  overflow: hidden;
  display: flex;
`;

const Content = styled.div<ContentDivProps>`
  overflow: hidden;
  animation: ${(props) => (props.animation ? props.animation : '')}
    ${(props) => props.duration}s linear infinite;
  margin-right: auto;
  margin-left: 22px;
`;

const Text = styled.p<TextPProps>`
  line-height: ${(props) => (props.height ? `${props.height}px` : '30px')};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  text-shadow: grey 0.1em 0.1em 0.2em;
`;

interface NoticeBoardProps {
  stepDuration: number;
  height?: number;
  className: string;
  width?: number;
  textClassName?: string;
  dataSource: string[];
}

const NoticeBoard: FC<NoticeBoardProps> = (props) => {
  const {
    stepDuration = 1000,
    height = 30,
    textClassName,
    width,
    dataSource,
    className
  } = props;
  const [dataSourceL, setDataSourceL] = useState(dataSource);
  const [keyframesValue, setKeyframesValue] = useState('');

  const getStepLen = () => {
    return dataSource.length * 2;
  };

  const getDuration = () => {
    return (dataSource.length * stepDuration) / 1000;
  };

  const getScrollKeyFrames = () => {
    if (keyframesValue) {
      return keyframes`
        ${keyframesValue}
      `;
    }
    return null;
  };

  const handleDataSource = () => {
    return new Promise((resolve, reject) => {
      if (dataSource.length > 0) {
        setDataSourceL(dataSource.concat(dataSource[0]));
      }
    });
  };

  const createKeyFrames = () => {
    const per = 100 / getStepLen();
    let offset = 0;
    const cssStr: string[] = [];
    for (let i = 0; i <= getStepLen(); i++) {
      const even = i % 2 === 0;
      if (i !== 0 && even) {
        offset += height;
      }
      const v = `
        ${i * per}% {
          margin-top: -${offset}px
        }
      `;
      cssStr.push(v);
    }
    const css = cssStr.join('');
    setKeyframesValue(css);
  };

  useEffect(() => {
    handleDataSource();
    if (dataSourceL.length >= 2) {
      createKeyFrames();
    }
  }, []);

  return (
    <div>
      <Wrapper width={width} height={height} className={className}>
        <Content
          animation={getStepLen() > 2 ? getScrollKeyFrames() : null}
          duration={getDuration()}
        >
          {dataSourceL.map((item: string, index: number) => (
            <Text
              height={height}
              className={textClassName}
              key={`${index}-${item}`}
            >
              {item}
            </Text>
          ))}
        </Content>
      </Wrapper>
    </div>
  );
};

export default NoticeBoard;
