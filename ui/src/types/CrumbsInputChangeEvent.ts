import type React from "react";

export interface CrumbsInputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
	originalTarget: HTMLInputElement;
}
