export function getMediaCategory(
  mediaType: string | null
): "image" | "video" | null {
  if (!mediaType) {
    return null;
  }

  // 1. Try to categorize by MIME type directly
  if (mediaType.startsWith("image/")) {
    return "image";
  }
  if (mediaType.startsWith("video/")) {
    return "video";
  }

  // 2. If not a direct MIME type, try to parse as a URL
  try {
    const url = new URL(mediaType);
    const extension = url.pathname.split(".").pop()?.toLowerCase();

    if (extension) {
      if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
        return "image";
      }
      if (["mp4", "webm", "ogg"].includes(extension)) {
        return "video";
      }
    }
  } catch (e) {
    // mediaType was not a valid URL, continue to return null
  }

  return null;
}
