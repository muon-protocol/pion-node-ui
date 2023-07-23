import Image from "next/image";

export default function Balance() {
  return (
    <div className="h-9 bg-primary13 flex items-center text-sm font-normal rounded-lg	px-5 mr-2">
      <Image
        src="/mini-logo.svg"
        width="21"
        height="5"
        className="mr-3"
      ></Image>
      <span className="mr-3">Balance:</span>
      <b className="text-primary font-semibold mr-2">2340.03</b>
      <b className="font-semibold">Alice</b>
    </div>
  );
}
