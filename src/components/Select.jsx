import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId;
  return (
    <>
      {label && <label htmlFor={id}></label>}
      <select name="" id={id} className={className} {...props} ref={ref}>
        {options?.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </>
  );
};

export default React.forwardRef(Select)
