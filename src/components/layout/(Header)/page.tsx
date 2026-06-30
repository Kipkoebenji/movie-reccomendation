import Image from "next/image";


export default function Header() {
  return (
    <header>
      <div>

        <div>
            <div>
                <Image
                width={100}
                height={100}
                src="/logo.png"
                alt="Logo"
                ></Image>
            </div>

            <div>
                <div></div>
                <div></div>
            </div>
        </div>

        <div>
            <div>

            </div>
        </div>
      </div>
    </header>
  );
}