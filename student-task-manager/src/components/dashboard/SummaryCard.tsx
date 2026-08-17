import React from "react";
import "./SummaryCard.css";

interface SummaryCardProps {
	title: string;
	value: number;
	icon?: string;
	variant?: "default" | "warning" | "info" | "success" | "danger";
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
	title,
	value,
	icon,
	variant = "default",
}) => {
	return (
		<div className={`summary-card summary-card--${variant}`}>
			{icon && <div className="summary-card-icon">{icon}</div>}
			<div className="summary-card-content">
				<div className="summary-card-title">{title}</div>
				<div className="summary-card-value">{value}</div>
			</div>
		</div>
	);
};
