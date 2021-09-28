import React from "react";
import ReactPlayer from "react-player/lazy";

type Props = {
  url?: string;
};

const VideoPlayer = ({ url }: Props) => {
  return (
    <div className="relative" style={{ paddingTop: "56.25%" }}>
      <ReactPlayer
        className="absolute top-0 left-0"
        url={url}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
};

export default VideoPlayer;
