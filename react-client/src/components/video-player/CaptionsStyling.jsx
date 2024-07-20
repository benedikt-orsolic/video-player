import { useMemo, useReducer } from "react";
import styles from "./Captions.module.css";

export default function CaptionsStyling(props) {
  const { videoTagClassNames } = props;
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const cuePseudoClassCssRule = useMemo(() => {
    return getCssRuleForCuePseudoElement("." + videoTagClassNames);
  }, []);

  const currentColor = cuePseudoClassCssRule.style.color;
  const currentBackground = cuePseudoClassCssRule.style["background-color"];
  const currentSize = parseInt(cuePseudoClassCssRule.style["font-size"]);

  const colorList = [
    "black",
    "white",
    "lightgray",
    "gray",
    "blue",
    "red",
    "yellow",
    "green",
    "orange",
  ];

  return (
    <div className={styles["captions-styling"]}>
      <h4 className={styles["captions-styling__header"]}>
        Set captions styling
      </h4>
      <table className={styles["captions-styling__body"]}>
        <tbody>
          <tr>
            <td>Text color: </td>
            <td>
              {colorList.map((color) => (
                <button
                  className={
                    styles["captions-styling__body__button"] +
                    `${color === currentColor ? " " + styles["active"] : ""}`
                  }
                  key={color}
                  onClick={() => {
                    cuePseudoClassCssRule.style.color = color;
                    forceUpdate();
                  }}
                >
                  {color}
                </button>
              ))}
            </td>
          </tr>
          <tr>
            <td>Background color: </td>
            <td>
              {colorList.map((color) => (
                <button
                  className={
                    styles["captions-styling__body__button"] +
                    `${
                      color === currentBackground ? " " + styles["active"] : ""
                    }`
                  }
                  key={color}
                  onClick={() => {
                    cuePseudoClassCssRule.style["background-color"] = color;
                    forceUpdate();
                  }}
                >
                  {color}
                </button>
              ))}
            </td>
          </tr>
          <tr>
            <td>Font size:</td>
            <td>
              <input
                onChange={(e) =>
                  (cuePseudoClassCssRule.style["font-size"] =
                    e.target.value + "px")
                }
                min="6"
                max="52"
                placeholder={currentSize}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function getCssRuleForCuePseudoElement(videoTagSelector) {
  let result = null;
  const selectorText = `${videoTagSelector}::cue`;

  outerLoop: for (const styleSheet of document.styleSheets) {
    for (const cssRule of styleSheet.cssRules) {
      if (cssRule.selectorText === selectorText) {
        result = cssRule;
        break outerLoop;
      }
    }
  }

  return result;
}
