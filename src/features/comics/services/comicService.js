import AxiosClient from "../../../core/services/AxiosClient";

const VOLUMES_RESOURCE = "/volumes";
const ISSUES_RESOURCE = "/issues";

const searchVolumes = async (searchParam) => {
  const response = await AxiosClient.get(
    `${VOLUMES_RESOURCE}/search?query=${encodeURIComponent(searchParam)}`, // Encode query so spaces and special characters are safe inside the URL.
  );
  return response.data;
};

const searchIssuesByVolumeId = async (volumeId) => {
  const response = await AxiosClient.get(
    `${ISSUES_RESOURCE}/search?volumeId=${volumeId}`,
  );
  return response.data;
};

const saveIssue = async (issueData) => {
  const response = await AxiosClient.post(ISSUES_RESOURCE, issueData);
  return response.data;
};

const comicService = {
  searchVolumes,
  searchIssuesByVolumeId,
  saveIssue,
};

export default comicService;
