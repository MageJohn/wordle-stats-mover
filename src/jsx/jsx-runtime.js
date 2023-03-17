export const jsx = (tag, { children, ref, ...props }) => {
  let el;
  if (typeof tag === "string") {
    el = document.createElement(tag);

    for (const key in props) {
      if (key in el) {
        el[key] = props[key];
      } else {
        if ((props[key] ?? false) === false) {
          el.removeAttribute(key);
        } else {
          el.setAttribute(key, props[key]);
        }
      }
    }

    if (children instanceof Array) {
      el.append(...children);
    } else if (children) {
      el.append(children);
    }

    ref?.(el);
  }

  if (typeof tag === "function") {
    el = tag({ children, ...props });
  }

  return el;
};

export const jsxs = jsx;

export const Fragment = ({ children }) => {
  const el = document.createDocumentFragment();
  if (children instanceof Array) {
    el.append(...children);
  } else if (!children) {
    el.append(children);
  }
};
