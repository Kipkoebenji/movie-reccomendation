import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center ">
          <div>
            <Image width={100} height={100} src="/logo.png" alt="Logo"></Image>
          </div>

          <div>
            <input
              type="search"
              placeholder="Search movies..."
              name="search"
              id="search"
              className="border rounded-3xl p-0.5 pl-3.5 mr-7.5"
            />

            <button>Login</button>
          </div>
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
