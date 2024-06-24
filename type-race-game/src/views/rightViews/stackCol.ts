import {
  SKElement,
  LayoutMethod,
  Size,
} from "simplekit/imperative-mode";

// use a factory function so I can add props later, like a "gap"
export function makeStackColLayout(): LayoutMethod {
  return (
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[]
  ) => {
    return stackColLayout(boundsWidth, boundsHeight, elements);
  };
}

// places elements in a vertical stack
export function stackColLayout(
  boundsWidth: number,
  _boundsHeight: number,
  elements: SKElement[]
): Size {
  const newBounds: Size = { width: 0, height: 0 };

  let y = 0;

  elements.forEach((el, _i) => {
    // set the element position
    el.x = 0;
    el.y = y;

    // optional fill width
    if (el.fillWidth) {
      el.widthLayout = boundsWidth;
    }

    // next row
    y += el.heightLayout;

    // update bounds that were actually used
    newBounds.width = Math.max(newBounds.width, el.widthLayout);
    newBounds.height = Math.max(
      newBounds.height,
      y + el.heightLayout
    );
  });

  return newBounds;
}
