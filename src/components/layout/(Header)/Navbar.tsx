import Image from "next/image";

export default function Header() {
  return (
    <header className="text-white pt-3 ">
      <div className="flex flex-col">
        <div className="flex flex-row  items-center ">
          <div>
            <Image className="bg-white rounded-full" width={50} height={50} src="/logo.png" alt="Logo"></Image>
          </div>

          
            <input
              type="search"
              placeholder="Search movies..."
              name="search"
              id="search"
              className="w-full h-15 border text-white border-white/10 rounded-3xl p-0.5 pl-3.5 ml-4 mr-7.5"
            />

            <button className="hover:underline">Login</button>
          
        </div>

        <div className="flex flex-row justify-end gap-4 py-2">
          
            <a href="#">Home</a>
            <a href="#">Movies</a>
            <a href="#">TV Shows</a>
          
        </div>
      </div>
    </header>
  );
}
