import React from "react";

const Checkbox = ({ id, checked, onCheckedChange }: { id?: string; checked?: boolean; onCheckedChange?: (checked: boolean) => void }) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={e => onCheckedChange && onCheckedChange(e.target.checked)}
  />
);

export { Checkbox };
