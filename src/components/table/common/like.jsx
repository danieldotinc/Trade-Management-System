import React, { Component } from "react";

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.movie.liked) classes += "-broken";
  return (
    <i
      className={classes}
      onClick={() => props.onClick(props.movie)}
      style={{ cursor: "pointer", verticalAlign: "bottom" }}
    />
  );
};

export default Like;
