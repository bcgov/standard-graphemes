import { Label, ProgressBar as RACProgressBar } from "react-aria-components";
import type { ProgressBarProps as RACProgressBarProps } from "react-aria-components";

import "./ProgressBar.css";

interface ProgressBarProps extends RACProgressBarProps {
  label?: string;
}

export default function ProgressBar({ label, ...props }: ProgressBarProps) {
  return (
    <RACProgressBar {...props}>
      {({ percentage, valueText }) => (
        <>
          <Label>{label ? label : "Loading..."}</Label>
          <span className="value">{valueText}</span>
          <div className="bar">
            <div className="fill" style={{ width: percentage + "%" }} />
          </div>
        </>
      )}
    </RACProgressBar>
  );
}
