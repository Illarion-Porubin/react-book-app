import React from "react";
import s from "./Loader.module.scss";
import ReactLoading from 'react-loading';

export const Loader:React.FC = () => {
  return (
    <div className={`${s.loader} ${s.flex}`}>
      <ReactLoading type={`spin`} color={`#ed553b`} height={'200px'} width={'200px'} />
    </div>
  );
};
