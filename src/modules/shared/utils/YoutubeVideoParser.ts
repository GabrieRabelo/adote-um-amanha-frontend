function getVideoID(url: string | null): string | null {
  if (!url) {
    return null;
  }
  const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : null;
}

function toEmbeddedVideo(url: string | null): string | null {
  if (!url) {
    return null;
  }
  const id = getVideoID(url);
  if (!id) {
    return null;
  }
  return `https://www.youtube.com/embed/${id}`;
}

export default {
  getVideoID,
  toEmbeddedVideo,
};
