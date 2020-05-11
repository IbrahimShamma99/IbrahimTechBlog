import styled from 'styled-components';
import React from 'react';

const Tag = styled.span`
  display: inline-block;
  border-radius: 6px;
  font-size: 13px;
  font-weight: bolder;
  font-family: Helvetica, Arial, sans-serif;
  padding: 2px 5px 3px;
  border-radius: 2px;
  background: ${props => props.theme.main};
  color: ${props => props.theme.secondary};
  margin-left: 2px;
  height: 30px;
`;
Tag.defaultProps = {
  theme: {
    main: '#FFA7C4',
    secondary: '#000000',
  },
};

const indieTheme = {
  main: '#FFFF00',
  secondary: '#000000',
};

const brightTheme = {
  main: '#32CD32',
  secondary: '#000000',
};

const reactTheme = {
  main: '#00ffff',
  secondary: '#000000',
};

const flameTheme = {
  main: '#ff0200',
  secondary: '#000000',
};

const TagComponent = props => {
  console.log('props=', props);
  switch (props.index) {
    case 0:
      return <Tag> {props.tag.concat(` `)}</Tag>;
    case 1:
      return <Tag theme={indieTheme}> {props.tag.concat(` `)}</Tag>;
    case 2:
      return <Tag theme={brightTheme}>{props.tag.concat(` `)} </Tag>;
    case 3:
      return <Tag theme={reactTheme}>{props.tag.concat(` `)} </Tag>;
    case 4:
      return <Tag theme={flameTheme}>{props.tag.concat(` `)} </Tag>;
    default:
      return <Tag> {props.tag.concat(` `)}</Tag>;
  }
};

export default TagComponent;
