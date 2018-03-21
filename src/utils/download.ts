

export const download = (
  url: string,
  fileName: string = url.substring(url.lastIndexOf("/") + 1)
) => {

  let link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

}