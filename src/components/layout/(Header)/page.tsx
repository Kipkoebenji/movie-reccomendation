import Image from "next/image";


export default function Header() {
  return (
    <header>
      <div className="flex flex-row">

        <div className="flex flex-row justify-between items-center">
            <div>
                <Image
                width={100}
                height={100}
                src="/logo.png"
                alt="Logo"
                ></Image>
            </div>

            <div>
                <div>
                    <input 
                    type="search" 
                    placeholder="Search movies..."
                    name="search"
                     id="search" />
                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
        </div>

        <div>
            <div>
                <a href="#">Home</a>
                <a href="#">Movies</a>
                <a href="#">TV Shows</a>
            </div>
        </div>
      </div>
    </header>
  );
}