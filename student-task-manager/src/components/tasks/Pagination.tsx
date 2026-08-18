import React from "react";
import "./Pagination.css";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);

			let start = Math.max(2, currentPage - 1);
			let end = Math.min(totalPages - 1, currentPage + 1);

			if (start > 2) pages.push("...");

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (end < totalPages - 1) pages.push("...");
			pages.push(totalPages);
		}

		return pages;
	};

	if (totalPages <= 1) return null;

	return (
		<nav className="pagination" aria-label="Task pagination">
			<button
				className="pagination-btn"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label="Previous page"
			>
				Previous
			</button>

			{getPageNumbers().map((page, index) =>
				typeof page === "number" ? (
					<button
						key={index}
						className={`pagination-btn ${currentPage === page ? "active" : ""}`}
						onClick={() => onPageChange(page)}
						aria-current={currentPage === page ? "page" : undefined}
						aria-label={`Page ${page}`}
					>
						{page}
					</button>
				) : (
					<span key={index} className="pagination-ellipsis">
						…
					</span>
				),
			)}

			<button
				className="pagination-btn"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label="Next page"
			>
				Next
			</button>
		</nav>
	);
};
