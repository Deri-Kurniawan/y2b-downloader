"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, type FC } from "react";

const GetVideoInfoForm: FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data, mutate, isLoading, isError, error } =
    api.video.getInfo.useMutation();
  const [videoUrl, setVideoUrl] = useState(() => {
    const url = params.get("url");
    return url ?? "";
  });

  const [preSubmit] = useState(() => {
    return !!params.get("url");
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    router.push(`?url=${videoUrl}`);

    mutate({
      url: videoUrl,
    });
  };

  useEffect(() => {
    if (preSubmit) {
      mutate({
        url: videoUrl,
      });
    }
  }, [preSubmit]);

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
          defaultValue={videoUrl}
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
          <div className="flex flex-col gap-4 py-4">
            {data.videoInfo?.formats.map((format, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md bg-white p-3 text-sm shadow-md hover:shadow-lg"
              >
                <div>
                  <span className="text-blue-500">{i + 1}.</span>
                  <span className="ml-2">
                    Download {format.mimeType?.split(";")[0]}
                    {!!format.qualityLabel && (
                      <>
                        {" | "}
                        <span className="font-semibold">
                          {format.qualityLabel}
                        </span>
                      </>
                    )}
                    {!!format.fps && (
                      <>
                        {" "}
                        <span className="text-gray-600">
                          ({format.fps} fps)
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <a
                  href={format.url}
                  download={`${data.videoInfo?.videoDetails.title}_${format.qualityLabel}.mp3`} // Change WebM to MP3
                  className="text-blue-500 underline"
                >
                  Download
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
