import { Dialog, DialogContent } from "@/components/ui/dialog";
import DetailsDialogSkeleton from "./DetailsDialogSkeleton";
import { SiNasa, SiWikipedia, SiYoutube } from "react-icons/si";

interface LaunchDetail {
  image: string;
  name: string;
  status: string;
  rocketName: string;
  rocketType: string;
  details: string | null;
  articleLink: string | null;
  wikipediaLink: string | null;
  youtubeLink: string;
  flightNumber: number;
  missionName: string;
  manufacturer: string | null;
  nationality: string | null;
  launchDate: string;
  payloadType: string | null;
  orbit: string | null;
  launchSite: string;
}

interface DetailsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  launchDetail: LaunchDetail | null;
  loading: boolean;
}

const DetailsDialog = ({
  isOpen,
  setIsOpen,
  launchDetail,
  loading,
}: DetailsDialogProps) => {
  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95vw] max-w-2xl sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] max-h-[90vh] overflow-y-auto">
          <DetailsDialogSkeleton />
        </DialogContent>
      </Dialog>
    );
  }

  if (!launchDetail) {
    return null;
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-success-status-bg text-success-status-text";
      case "Failed":
        return "bg-failed-status-bg text-failed-status-text";
      case "Upcoming":
        return "bg-upcoming-status-bg text-upcoming-status-text";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatLaunchDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[95vw] max-w-2xl sm:w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] max-h-[90vh] overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {launchDetail.image ? (
              <img
                src={launchDetail.image}
                alt={launchDetail.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-lg"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {launchDetail.name}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusClass(
                  launchDetail.status
                )}`}
              >
                {launchDetail.status}
              </span>
            </div>
            <p className="text-gray-600 mb-2 truncate">
              {launchDetail.rocketName}
            </p>
            <div className="flex items-center gap-2">
              {launchDetail.articleLink && (
                <a
                  href={launchDetail.articleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <SiNasa className="w-4 h-4 text-gray-500" />
                </a>
              )}

              {launchDetail.youtubeLink && (
                <a
                  href={launchDetail.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <SiYoutube className="w-4 h-4" />
                </a>
              )}
              {launchDetail.wikipediaLink && (
                <a
                  href={launchDetail.wikipediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <SiWikipedia className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {launchDetail.details ||
              "No description available for this launch."}
            {launchDetail.wikipediaLink && (
              <a
                href={launchDetail.wikipediaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                Wikipedia
              </a>
            )}
          </p>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Flight Number
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0">
              {launchDetail.flightNumber}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Mission Name
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0 truncate">
              {launchDetail.missionName}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Rocket Type
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0">
              {launchDetail.rocketType || "Unknown"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Rocket Name
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0 truncate">
              {launchDetail.rocketName}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Manufacturer
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0">
              {launchDetail.manufacturer || "SpaceX"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Nationality
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0">
              {launchDetail.nationality || "SpaceX"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Launch Date
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0">
              {formatLaunchDate(launchDetail.launchDate)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Payload Type
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0">
              {launchDetail.payloadType || "Unknown"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Orbit
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0">
              {launchDetail.orbit || "Unknown"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Launch Site
            </span>
            <span className="text-gray-900 text-sm sm:text-base mt-1 sm:mt-0 truncate">
              {launchDetail.launchSite}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
