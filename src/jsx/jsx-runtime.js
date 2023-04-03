export const jsx = (tag, props) => {
  if (tag == jsx) tag = document.createDocumentFragment();
  else if (typeof tag == "function") return tag(props);
  else tag = document.createElement(tag);

  const { children, ref, ...otherProps } = props;

  for (const key in otherProps) {
    if (key in tag) tag[key] = otherProps[key];
    else if ((otherProps[key] ?? false) !== false) {
      // An attribute whose value is undefined, null, or false is not added to
      // the dom. 0, and "" (the empty string) values are still added.
      tag.setAttribute(key, otherProps[key]);
    }
  }

  // Any children which are undefined or null are excluded
  tag.append(...[].concat(children ?? []).filter((v) => v != undefined));

  ref?.(tag);
  return tag;
};

export const jsxs = jsx;
export const Fragment = jsx;
