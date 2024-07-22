import React from "react";

export default function AnnotationsControl(props: { toggle: () => void }) {
  return (
    <span
      onClick={props.toggle}
      className="material-symbols-outlined"
    >
      campaign
    </span>
  );
}
