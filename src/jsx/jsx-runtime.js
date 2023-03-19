export const jsx = (tag, { children, ref, ...props }) => {
  if (tag === jsx) tag = document.createDocumentFragment();
  if (typeof tag === "function") return tag({ children, ref, ...props });
  else tag = document.createElement(tag);

  for (const key in props) {
    if (key in tag) tag[key] = props[key];
    else {
      // An attribute whose value is exactly false is not added to the dom.
      // undefined, null, 0, and "" (the empty string) values are still added.
      props[key] !== false && tag.setAttribute(key, props[key]);
    }
  }

  if (Array.isArray(children)) tag.append(...children);
  else {
    // If children are not undefined or null, append them. Children that are
    // false, 0, or "" (the empty string) are still added.
    children != undefined && tag.append(children);
  }

  ref?.(tag);
  return tag;
};

export const jsxs = jsx;
export const Fragment = jsx;
