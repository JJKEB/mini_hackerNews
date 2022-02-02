import React from 'react';

const SectionHead = (props) => {
  const { title, children } = props;
  return (
    <>
      <h2>{title}</h2>
      <span className="tool">{children}</span>
    </>
  );
};

export default SectionHead;
