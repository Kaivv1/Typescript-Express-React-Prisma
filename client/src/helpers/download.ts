import axios from "axios";

export const downloadFile = (url: string, title: string) => {
  axios
    .get(url, { responseType: "blob" })
    .then((res) => res.data)
    .then((blob: Blob) => {
      const blobType = blob.type.split("/").at(1);
      const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${title}.${blobType}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    });
};

export const open = (url: string) => {
  if (!url) return;
  window.open(url);
};
