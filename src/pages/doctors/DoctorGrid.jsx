import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";

const DoctorGrid = ({ doctors }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const currentDoctors = doctors.slice(startIndex, endIndex);

  // Reset to first page when doctors change
  useEffect(() => {
    setCurrentPage(1);
  }, [doctors]);

  const goToPage = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No doctors found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {" "}
      {/* Doctor Grid with Scroll Bar */}
      <div className="max-h-[800px] overflow-y-auto custom-scrollbar pr-2 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-primary-900 dark:hover:text-primary-400"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && goToPage(page)}
              disabled={page === "..."}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-primary-500 text-white"
                  : page === "..."
                  ? "bg-transparent text-gray-400 cursor-default"
                  : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-primary-900 dark:hover:text-primary-400"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-primary-900 dark:hover:text-primary-400"
            }`}
          >
            Next
          </button>
        </div>
      )}
      {/* Results Info */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-14">
        Showing {startIndex + 1}-{Math.min(endIndex, doctors.length)} of{" "}
        {doctors.length} doctors
        {totalPages > 1 && (
          <span className="ml-2">
            (Page {currentPage} of {totalPages})
          </span>
        )}
      </div>
    </div>
  );
};

export default DoctorGrid;
