import React from "react";

const Switch = ({ id, checked, onCheckedChange }: { id?: string; checked?: boolean; onCheckedChange?: (checked: boolean) => void }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={e => onCheckedChange && onCheckedChange(e.target.checked)}
    style={{ width: 40, height: 20 }}
  />
);

export { Switch };
