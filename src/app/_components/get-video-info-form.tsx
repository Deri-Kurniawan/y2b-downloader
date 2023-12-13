"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import React, { type FC } from "react";

const GetVideoInfoForm: FC = () => {
  const { data, mutate, isLoading, isError, error } =
    api.video.getInfo.useMutation();
  const [videoUrl, setVideoUrl] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    mutate({
      url: videoUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-4">
        <Input
          className={isLoading ? "hover:cursor-progress" : ""}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setVideoUrl(e.target.value);
          }}
          placeholder="YouTube Video URL"
          required
          disabled={isLoading}
        />
        <Button
          className={isLoading ? "hover:cursor-progress" : ""}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get Video"}
        </Button>
      </div>

      {!isLoading && isError && (
        <p className="pt-2 text-sm text-red-500">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
          {error?.message}
        </p>
      )}

      {!isLoading && data && (
        <div className="pt-4">
          <h3 className="scroll-m-20 pb-4 text-lg font-semibold tracking-tight">
            {data.videoInfo?.videoDetails.title}
          </h3>
          <div>
            <iframe
              className="aspect-video w-full"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${data.videoInfo?.videoDetails.videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="flex flex-col gap-2 py-4">
            {data.videoInfo?.formats.map((format, i) => (
              <div key={i} className="text-sm">
                <a
                  href={format.url}
                  download={`${data.videoInfo?.videoDetails.title}_${
                    format.qualityLabel
                  }.${format.mimeType?.split(";")[0]?.split("/")[1]}`}
                  className="text-blue-500 underline"
                >
                  {++i}. Download {format.mimeType?.split(";")[0]}{" "}
                  {!!format.qualityLabel && "|"} {format.qualityLabel}{" "}
                  {!!format.fps && `(${format.fps} fps)`}{" "}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default GetVideoInfoForm;
