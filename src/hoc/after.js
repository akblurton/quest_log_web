import React, { useEffect, useState } from "react";
const after = (time = 500) => (Component) => {
  const result = (props) => {
    const [render, setRender] = useState(false);
    useEffect(() => {
      const id = setTimeout(() => setRender(true), time);
      return () => clearTimeout(id);
    }, []);

    if (render) {
      return <Component {...props} />;
    }

    return null;
  };

  result.displayName = `after(${Component.displayName || Component.name})`;
  return result;
};

export default after;
