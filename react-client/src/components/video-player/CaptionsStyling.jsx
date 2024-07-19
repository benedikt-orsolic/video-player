import { useMemo } from "react";

export default function CaptionsStyling(props) {
  const { videoTagClassNames } = props;
  const cuePseudoClassCssRule = useMemo(() => {
    return getCssRuleForCuePseudoElement("." + videoTagClassNames.join("."));
  }, []);
  const colorList = ["black", "white", "gray", "blue", "red", "yellow", "green", "orange"];
  return (
    <div>
      <h4>Set captions styling</h4>
      Text color:{" "}
      {colorList.map((color) => (
        <button
          onClick={() => {
            cuePseudoClassCssRule.style.color = color;
          }}
        >
          {color}
        </button>
      ))}
      <br />
      Background color:{" "}
      {colorList.map((color) => (
        <button
          onClick={() => {
            cuePseudoClassCssRule.style["background-color"] = color;
          }}
        >
          {color}
        </button>
      ))}
      <br />
      Font size:{" "}
      <input
        onChange={(e) =>
          (cuePseudoClassCssRule.style["font-size"] = e.target.value + "px")
        }
        min="6"
        max="52"
      />
    </div>
  );
}

function getCssRuleForCuePseudoElement(videoTagSelector) {
  let result = null;
  const selectorText = `${videoTagSelector}::cue`;

  console.log(selectorText);

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
