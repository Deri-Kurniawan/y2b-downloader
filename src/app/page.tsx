import GetVideoInfoForm from "./_components/get-video-info-form";

export default async function Home() {
  return (
    <main className="w-screen px-6">
      <div className="mx-auto mt-20 max-w-lg">
        <h1 className="scroll-m-20 pb-8 text-center text-3xl font-semibold tracking-tight first:mt-0">
          Y2B Downloader
        </h1>
        <p className="scroll-m-20 pb-8 text-center text-sm font-semibold tracking-tight first:mt-0">
          Pengunduh video YouTube online gratis untuk mengunduh video YouTube
          dan Youtube Music dalam format MP4 dan MP3. Unduh video YouTube HD,
          1080p, 4K, dan 8K dengan mudah, dan unduh video YouTube dalam format
          MP3 dengan kualitas audio asli. Konversi video YouTube ke MP3 dalam 30
          detik. Mudah digunakan, tidak ada iklan, dan 100% gratis.
        </p>
        <p className="scroll-m-20 pb-8 text-center text-sm font-semibold tracking-tight first:mt-0">
          Contoh URL Valid:{" "}
          <a
            className="text-blue-500 underline"
            href="https://www.youtube.com/watch?v=pyi0ZfuIIvo"
          >
            https://www.youtube.com/watch?v=pyi0ZfuIIvo
          </a>
          <br />
          Video valid biasanya terdapat kata watch?v= di dalam URL
        </p>

        <GetVideoInfoForm />
      </div>
    </main>
  );
}
